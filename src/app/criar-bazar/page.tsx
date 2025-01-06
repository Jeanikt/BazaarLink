"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Upload } from "lucide-react";

export default function CriarBazar() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    nome: "",
    descricao: "",
    categoria: "",
    imagem: null as File | null,
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData((prev) => ({ ...prev, imagem: e.target.files![0] }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend
    console.log("Form submitted:", formData);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    // Redirect to roadmap overview
    router.push("/roadmap");
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle>Crie Seu Bazar</CardTitle>
          <CardDescription>
            Comece a vender seus produtos únicos hoje mesmo!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="nome">Nome do Bazar</Label>
              <Input
                id="nome"
                name="nome"
                value={formData.nome}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="descricao">Descrição</Label>
              <Textarea
                id="descricao"
                name="descricao"
                value={formData.descricao}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="categoria">Categoria Principal</Label>
              <Input
                id="categoria"
                name="categoria"
                value={formData.categoria}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="imagem">Imagem de Capa</Label>
              <div className="flex items-center space-x-2">
                <Input
                  id="imagem"
                  name="imagem"
                  type="file"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => document.getElementById("imagem")?.click()}
                >
                  <Upload className="mr-2 h-4 w-4" /> Escolher Imagem
                </Button>
                {formData.imagem && <span>{formData.imagem.name}</span>}
              </div>
            </div>
            <Button type="submit" className="w-full">
              Criar Bazar
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
