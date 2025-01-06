"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CartaoProduto } from "@/components/cartao-produto";
import { Search, Filter } from "lucide-react";

// Dummy data for products (replace with actual data fetching in a real application)
const dummyProducts = [
  {
    id: 1,
    titulo: "Vaso Antigo",
    preco: 150,
    imagem: "/placeholder.svg",
    vendedor: "Antiquário João",
    curtidas: 25,
  },
  {
    id: 2,
    titulo: "Quadro Vintage",
    preco: 200,
    imagem: "/placeholder.svg",
    vendedor: "Galeria Maria",
    curtidas: 18,
  },
  {
    id: 3,
    titulo: "Relógio de Parede",
    preco: 80,
    imagem: "/placeholder.svg",
    vendedor: "Bazar do Tempo",
    curtidas: 32,
  },
  {
    id: 4,
    titulo: "Luminária Art Déco",
    preco: 120,
    imagem: "/placeholder.svg",
    vendedor: "Luz & Arte",
    curtidas: 15,
  },
];

export default function Explorar() {
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("");

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-primary text-primary-foreground py-6">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-4">Explore Tesouros Únicos</h1>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-grow">
              <Input
                type="text"
                placeholder="Buscar produtos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
              />
            </div>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="w-full md:w-[200px]">
                <SelectValue placeholder="Categoria" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas Categorias</SelectItem>
                <SelectItem value="antiques">Antiguidades</SelectItem>
                <SelectItem value="art">Arte</SelectItem>
                <SelectItem value="jewelry">Joias</SelectItem>
                <SelectItem value="furniture">Móveis</SelectItem>
              </SelectContent>
            </Select>
            <Button className="w-full md:w-auto">
              <Search className="mr-2 h-4 w-4" /> Buscar
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Resultados da Busca</h2>
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" /> Filtrar
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {dummyProducts.map((produto) => (
            <CartaoProduto
              key={produto.id}
              id={produto.id}
              titulo={produto.titulo}
              preco={produto.preco}
              imagem={produto.imagem}
              vendedor={produto.vendedor}
              curtidas={produto.curtidas}
            />
          ))}
        </div>
      </main>
    </div>
  );
}
