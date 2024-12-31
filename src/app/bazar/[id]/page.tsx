"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { notFound } from "next/navigation";
import { CartaoProduto } from "@/components/cartao-produto";
import { ProdutoSkeleton } from "@/components/produto-skeleton";
import { SeguirBazar } from "./seguir-bazar";
import { Skeleton } from "@/components/ui/skeleton";
import { supabase } from "@/lib/supabase";

// Tipos do bazar e produtos
interface Produto {
  id: string;
  name: string;
  price: number;
  image_url: string | null;
  likes_count: number;
}

interface Bazar {
  id: string;
  name: string;
  description: string;
  banner_url: string | null;
  followers_count: number;
  users: {
    username: string;
  };
  products: Produto[];
}

async function getBazar(id: string): Promise<Bazar | null> {
  const { data: bazar, error } = await supabase
    .from("bazaars")
    .select(
      `
      *,
      users (
        username
      ),
      products (
        *
      )
    `
    )
    .eq("id", id)
    .single();

  if (error || !bazar) {
    return null;
  }

  return bazar;
}

export default function PaginaBazar({ params }: { params: { id: string } }) {
  const [bazar, setBazar] = useState<Bazar | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBazar() {
      const data = await getBazar(params.id);
      setBazar(data);
      setLoading(false);
    }
    fetchBazar();
  }, [params.id]);

  if (!loading && !bazar) {
    notFound();
  }

  return (
    <div>
      <div className="relative h-48 md:h-64">
        {loading ? (
          <Skeleton className="h-full w-full" />
        ) : (
          <Image
            src={bazar?.banner_url || "/placeholder.svg?height=300&width=1200"}
            alt=""
            fill
            className="object-cover"
          />
        )}
      </div>
      <div className="container mx-auto px-6 py-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            {loading ? (
              <Skeleton className="h-8 w-[200px] mb-2" />
            ) : (
              <h1 className="text-3xl font-bold">{bazar?.name}</h1>
            )}
            {loading ? (
              <Skeleton className="h-6 w-[150px]" />
            ) : (
              <p className="text-lg text-muted-foreground">
                por {bazar?.users.username}
              </p>
            )}
          </div>
          <div className="flex items-center gap-4">
            {loading ? (
              <>
                <Skeleton className="h-6 w-[100px]" />
                <Skeleton className="h-10 w-[100px]" />
              </>
            ) : (
              <>
                <p className="text-muted-foreground">
                  {bazar?.followers_count} seguidores
                </p>
                <SeguirBazar bazarId={parseInt(bazar?.id || "0", 10)} />
              </>
            )}
          </div>
        </div>
        {loading ? (
          <Skeleton className="h-20 w-full mt-6" />
        ) : (
          <p className="mt-6 text-lg">{bazar?.description}</p>
        )}
        <div className="mt-12">
          <h2 className="mb-6 text-2xl font-bold">Produtos</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {loading
              ? Array(8)
                  .fill(0)
                  .map((_, index) => <ProdutoSkeleton key={index} />)
              : bazar?.products.map((produto: Produto) => (
                  <CartaoProduto
                    key={produto.id}
                    id={parseInt(produto.id, 10)}
                    titulo={produto.name}
                    preco={produto.price}
                    imagem={
                      produto.image_url ||
                      `/placeholder.svg?height=300&width=300&text=${encodeURIComponent(
                        produto.name
                      )}`
                    }
                    vendedor={bazar?.users.username || ""}
                    curtidas={produto.likes_count}
                  />
                ))}
          </div>
        </div>
      </div>
    </div>
  );
}
