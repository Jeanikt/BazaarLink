/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";

export function SeguirBazar({ bazarId }: { bazarId: number }) {
  const [seguindo, setSeguindo] = useState(false);
  const [carregando, setCarregando] = useState(false);

  async function handleClick() {
    setCarregando(true);

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) throw new Error("Usuário não autenticado");

      if (seguindo) {
        await supabase
          .from("follows")
          .delete()
          .eq("user_id", user.id)
          .eq("bazar_id", bazarId);
      } else {
        await supabase.from("follows").insert({
          user_id: user.id,
          bazar_id: bazarId,
        });
      }

      setSeguindo(!seguindo);
    } catch (error) {
      alert("Erro ao seguir/deixar de seguir");
    } finally {
      setCarregando(false);
    }
  }

  return (
    <Button
      variant={seguindo ? "outline" : "default"}
      onClick={handleClick}
      disabled={carregando}
    >
      {seguindo ? "Deixar de Seguir" : "Seguir"}
    </Button>
  );
}
