/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/lib/supabase";

export default function VerificarCodigo() {
  const router = useRouter();
  const [codigo, setCodigo] = useState(Array(6).fill(""));
  const [verificando, setVerificando] = useState(false);
  const [erro, setErro] = useState(""); // Estado para exibir erros

  const handleInputChange = (value: string, index: number) => {
    if (/^\d?$/.test(value)) {
      const updatedCodigo = [...codigo];
      updatedCodigo[index] = value;
      setCodigo(updatedCodigo);

      if (value && index < 5) {
        const nextInput = document.getElementById(`codigo-${index + 1}`);
        nextInput?.focus();
      }
    }
  };

  async function verificarCodigo(e: React.FormEvent) {
    e.preventDefault();
    setVerificando(true);
    setErro(""); // Limpar o erro antes de verificar

    const joinedCodigo = codigo.join(""); // Combinar os dígitos

    try {
      const { data, error } = await supabase
        .from("verification_codes")
        .select("*")
        .eq("code", joinedCodigo)
        .gt("expires_at", new Date().toISOString())
        .single();

      if (error || !data) {
        throw new Error("Código inválido ou expirado");
      }

      const { error: userError } = await supabase.auth.signUp({
        email: data.email,
        password: joinedCodigo,
      });

      if (userError) throw userError;

      await supabase
        .from("verification_codes")
        .delete()
        .eq("email", data.email)
        .eq("code", joinedCodigo);

      router.push("/feed");
    } catch (error) {
      setErro("O código inserido é inválido ou expirou."); // Atualizar o estado de erro
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
            <div className="flex justify-center gap-2">
              {codigo.map((digit, index) => (
                <input
                  key={index}
                  id={`codigo-${index}`}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleInputChange(e.target.value, index)}
                  aria-label={`Digite o dígito ${index + 1} do código`}
                  className="w-12 h-12 text-center text-lg font-medium border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-400"
                />
              ))}
            </div>

            {erro && (
              <div className="text-red-500 text-sm text-center mt-2">
                {erro}
              </div>
            )}

            <Button
              type="submit"
              className="w-full mt-4"
              disabled={verificando}
            >
              {verificando ? "Verificando..." : "Verificar código"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
