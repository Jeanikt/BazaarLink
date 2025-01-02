/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/lib/supabase";
import { Github } from "lucide-react";

export default function Entrar() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [enviandoCodigo, setEnviandoCodigo] = useState(false);

  async function enviarCodigoVerificacao(e: React.FormEvent) {
    e.preventDefault();
    setEnviandoCodigo(true);

    try {
      const response = await fetch("/api/send-verification-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!response.ok)
        throw new Error("Falha ao enviar o código de verificação");

      router.push("/verificar-codigo");
    } catch (error: any) {
      alert(`Erro ao enviar o código de verificação: ${error.message}`);
    } finally {
      setEnviandoCodigo(false);
    }
  }

  async function loginComGithub() {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "github",
    });

    if (error) {
      console.error("GitHub login error:", error);
      alert("Erro ao fazer login com GitHub. Por favor, tente novamente.");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 gradient-background">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Entrar no BazaarLink</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={enviarCodigoVerificacao} className="space-y-4">
            <div className="space-y-2">
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={enviandoCodigo}>
              {enviandoCodigo ? "Enviando..." : "Enviar código de verificação"}
            </Button>
          </form>
          <div className="mt-4">
            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={loginComGithub}
            >
              <Github className="mr-2 h-4 w-4" />
              Entrar com GitHub
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
