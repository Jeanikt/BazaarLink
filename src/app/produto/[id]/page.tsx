"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { supabase } from "@/lib/supabase";
import { EnviarProposta } from "./enviar-proposta";

interface Produto {
  id: string;
  name: string;
  image_url: string | null;
  price: number;
  description: string;
  likes_count: number;
  bazaars: {
    name: string;
    owner_id: string;
    users: {
      username: string;
    };
  };
}

async function getProduto(id: string): Promise<Produto | null> {
  const { data, error } = await supabase
    .from("products")
    .select(
      `
      *,
      bazaars (
        name,
        owner_id,
        users (
          username
        )
      )
    `
    )
    .eq("id", id)
    .single();

  if (error || !data) {
    return null;
  }

  return data as Produto; // Confirme que os dados correspondem ao tipo definido
}

export default function PaginaProduto({ params }: { params: { id: string } }) {
  const [produto, setProduto] = useState<Produto | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProduto() {
      const data = await getProduto(params.id);
      setProduto(data);
      setLoading(false);
    }
    fetchProduto();
  }, [params.id]);

  if (!loading && !produto) {
    notFound();
  }

  return (
    <div className="container mx-auto px-6 py-8">
      <div className="grid gap-8 md:grid-cols-2">
        <div className="relative aspect-square overflow-hidden rounded-lg">
          {loading ? (
            <Skeleton className="h-full w-full" />
          ) : (
            <Image
              src={
                produto?.image_url ||
                `/placeholder.svg?height=600&width=600&text=${encodeURIComponent(
                  produto?.name || "Produto"
                )}`
              }
              alt={produto?.name || "Produto"}
              fill
              className="object-cover"
            />
          )}
        </div>
        <div className="space-y-6">
          <div>
            {loading ? (
              <>
                <Skeleton className="h-8 w-[200px] mb-2" />
                <Skeleton className="h-6 w-[150px]" />
              </>
            ) : (
              <>
                <h1 className="text-3xl font-bold">{produto?.name}</h1>
                <p className="text-lg text-muted-foreground">
                  Vendido por{" "}
                  {produto?.bazaars?.users?.username || "Desconhecido"}
                </p>
              </>
            )}
          </div>
          <div className="space-y-2">
            {loading ? (
              <>
                <Skeleton className="h-8 w-[100px]" />
                <Skeleton className="h-6 w-[70px]" />
              </>
            ) : (
              <>
                <p className="text-2xl font-bold">
                  R$ {produto?.price?.toFixed(2) || "0.00"}
                </p>
                <p className="text-muted-foreground">
                  {produto?.likes_count || 0} curtidas
                </p>
              </>
            )}
          </div>
          {loading ? (
            <Skeleton className="h-20 w-full" />
          ) : (
            <p className="text-lg">{produto?.description || "Sem descrição"}</p>
          )}
          <div className="flex gap-4">
            <Button size="lg">Curtir</Button>
            <Button size="lg" variant="outline">
              Compartilhar
            </Button>
          </div>
          <Card className="p-6">
            {loading ? (
              <Skeleton className="h-[200px] w-full" />
            ) : (
              produto && <EnviarProposta produtoId={produto.id} />
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}
