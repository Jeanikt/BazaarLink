"use client";

import { useEffect, useRef, useState } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/lib/supabase";

interface Mensagem {
  id: number;
  sender_id: string;
  message: string;
  created_at: string;
}

export function Chat() {
  const [mensagens, setMensagens] = useState<Mensagem[]>([]);
  const [novaMensagem, setNovaMensagem] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const channel = supabase
      .channel("mensagens")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "chats",
        },
        (payload) => {
          setMensagens((atual) => [...atual, payload.new as Mensagem]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [mensagens]);

  async function enviarMensagem(e: React.FormEvent) {
    e.preventDefault();
    if (!novaMensagem.trim()) return;

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    try {
      await supabase.from("chats").insert({
        sender_id: user.id,
        message: novaMensagem,
      });

      setNovaMensagem("");
    } catch (error) {
      console.error("Erro ao enviar mensagem:", error);
    }
  }

  return (
    <>
      <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto p-4">
        {mensagens.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${
              msg.sender_id === "você" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[70%] rounded-lg p-3 ${
                msg.sender_id === "você"
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted"
              }`}
            >
              {msg.message}
            </div>
          </div>
        ))}
      </div>
      <form onSubmit={enviarMensagem} className="flex gap-2 border-t p-4">
        <Input
          value={novaMensagem}
          onChange={(e) => setNovaMensagem(e.target.value)}
          placeholder="Digite sua mensagem..."
        />
        <Button type="submit" size="icon">
          <Send className="h-4 w-4" />
        </Button>
      </form>
    </>
  );
}
