"use client";

import { useEffect, useState } from "react";
import { CartaoProduto } from "@/components/cartao-produto";
import { ProdutoSkeleton } from "@/components/produto-skeleton";
import { getProdutos } from "@/lib/produtos";

// Definindo o tipo dos produtos
interface Produto {
  id: number;
  name: string;
  price: number;
  image_url?: string;
  bazar_name: string;
  likes_count: number;
}

export default function Feed() {
  // Tipando o estado produtos
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProdutos() {
      const data: Produto[] = await getProdutos(); // Certifique-se de que `getProdutos` retorna esse tipo.
      setProdutos(data);
      setLoading(false);
    }
    fetchProdutos();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-6 py-8">
        <h1 className="text-3xl font-bold mb-6">Descubra Produtos Únicos</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {loading
            ? Array(8)
                .fill(0)
                .map((_, index) => <ProdutoSkeleton key={index} />)
            : produtos.map((produto) => (
                <CartaoProduto
                  key={produto.id}
                  id={produto.id}
                  titulo={produto.name}
                  preco={produto.price}
                  imagem={
                    produto.image_url ||
                    `/placeholder.svg?height=300&width=300&text=${encodeURIComponent(
                      produto.name
                    )}`
                  }
                  vendedor={produto.bazar_name}
                  curtidas={produto.likes_count}
                />
              ))}
        </div>
      </div>
    </div>
  );
}
