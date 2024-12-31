/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/lib/supabase";

export function EnviarProposta({ produtoId }: { produtoId: string }) {
  const [valor, setValor] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [enviando, setEnviando] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setEnviando(true);

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) throw new Error("Usuário não autenticado");

      await supabase.from("proposals").insert({
        product_id: produtoId,
        user_id: user.id,
        offer_amount: parseFloat(valor),
        message: mensagem,
      });

      setValor("");
      setMensagem("");
      alert("Proposta enviada com sucesso!");
    } catch (error) {
      alert("Erro ao enviar proposta");
    } finally {
      setEnviando(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h3 className="text-lg font-semibold">Enviar Proposta</h3>
      <div className="space-y-2">
        <Input
          type="number"
          step="0.01"
          placeholder="Valor da proposta"
          value={valor}
          onChange={(e) => setValor(e.target.value)}
          required
        />
      </div>
      <div className="space-y-2">
        <Textarea
          placeholder="Mensagem para o vendedor"
          value={mensagem}
          onChange={(e) => setMensagem(e.target.value)}
          required
        />
      </div>
      <Button type="submit" className="w-full" disabled={enviando}>
        {enviando ? "Enviando..." : "Enviar Proposta"}
      </Button>
    </form>
  );
}
