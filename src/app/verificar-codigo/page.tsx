/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/lib/supabase";

export default function VerificarCodigo() {
  const router = useRouter();
  const [codigo, setCodigo] = useState("");
  const [verificando, setVerificando] = useState(false);

  async function verificarCodigo(e: React.FormEvent) {
    e.preventDefault();
    setVerificando(true);

    try {
      const { data, error } = await supabase
        .from("verification_codes")
        .select("*")
        .eq("code", codigo)
        .gt("expires_at", new Date().toISOString())
        .single();

      if (error || !data) throw new Error("Código inválido ou expirado");

      // Create user in Supabase
      const { error: userError } = await supabase.auth.signUp({
        email: data.email,
        password: codigo, // Use the verification code as a temporary password
      });

      if (userError) throw userError;

      // Delete the used verification code
      await supabase
        .from("verification_codes")
        .delete()
        .eq("email", data.email)
        .eq("code", codigo);

      router.push("/feed");
    } catch (error) {
      alert("Erro ao verificar o código. Por favor, tente novamente.");
    } finally {
      setVerificando(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 gradient-background">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Verificar Código</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={verificarCodigo} className="space-y-4">
            <div className="space-y-2">
              <Input
                type="text"
                placeholder="Código de verificação"
                value={codigo}
                onChange={(e) => setCodigo(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={verificando}>
              {verificando ? "Verificando..." : "Verificar código"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
