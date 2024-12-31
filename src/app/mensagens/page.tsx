"use client";

import { useEffect, useState } from "react";
import { redirect } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
import { supabase } from "@/lib/supabase";
import { Chat } from "./chat";

async function getConversas() {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/entrar");
  }

  const { data, error } = await supabase
    .from("chats")
    .select(
      `
      *,
      sender: sender_id (username),
      receiver: receiver_id (username),
      product: product_id (name)
    `
    )
    .or(`sender_id.eq.${user.id},receiver_id.eq.${user.id}`)
    .order("created_at", { ascending: false });

  if (error) {
    console.error(error);
    return [];
  }

  return data;
}

export default function PaginaMensagens() {
  const [conversas, setConversas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchConversas() {
      const data = await getConversas();
      setConversas(data);
      setLoading(false);
    }
    fetchConversas();
  }, []);

  return (
    <div className="container mx-auto grid h-[calc(100vh-3.5rem)] grid-cols-1 divide-x md:grid-cols-[300px_1fr]">
      <div className="border-r">
        <div className="p-4">
          <h2 className="text-lg font-semibold">Mensagens</h2>
        </div>
        <div className="divide-y">
          {loading
            ? Array(5)
                .fill(0)
                .map((_, index) => (
                  <div key={index} className="p-4">
                    <Skeleton className="h-6 w-[150px] mb-2" />
                    <Skeleton className="h-4 w-[200px]" />
                  </div>
                ))
            : conversas.map((conversa) => (
                <button
                  key={conversa.id}
                  className="w-full p-4 text-left hover:bg-muted/50"
                >
                  <p className="font-medium">
                    {conversa.sender.username === "você"
                      ? conversa.receiver.username
                      : conversa.sender.username}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {conversa.message}
                  </p>
                  {conversa.product && (
                    <p className="mt-1 text-xs text-muted-foreground">
                      Re: {conversa.product.name}
                    </p>
                  )}
                </button>
              ))}
        </div>
      </div>
      <div className="flex flex-col">
        <Chat />
      </div>
    </div>
  );
}
