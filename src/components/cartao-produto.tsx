import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, MessageCircle } from "lucide-react";

interface CartaoProdutoProps {
  id: number;
  titulo: string;
  preco: number;
  imagem: string;
  vendedor: string;
  curtidas: number;
}

export function CartaoProduto({
  id,
  titulo,
  preco,
  imagem,
  vendedor,
  curtidas,
}: CartaoProdutoProps) {
  return (
    <Card className="glass-card overflow-hidden group transition-all duration-300 hover:scale-[1.02]">
      <CardContent className="p-0 relative">
        <Link href={`/produto/${id}`}>
          <Image
            src={imagem}
            alt={titulo}
            width={300}
            height={300}
            className="w-full h-[300px] object-cover"
          />
        </Link>
        <div className="absolute top-4 right-4 flex gap-2">
          <Button size="icon" variant="secondary" className="rounded-full">
            <Heart className="w-4 h-4" />
          </Button>
          <Button size="icon" variant="secondary" className="rounded-full">
            <MessageCircle className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
      <CardFooter className="p-4 flex justify-between items-center">
        <div>
          <h3 className="font-semibold">{titulo}</h3>
          <p className="text-sm text-muted-foreground">por {vendedor}</p>
        </div>
        <div className="text-right">
          <p className="font-bold">R$ {preco.toFixed(2)}</p>
          <p className="text-sm text-muted-foreground">{curtidas} curtidas</p>
        </div>
      </CardFooter>
    </Card>
  );
}
