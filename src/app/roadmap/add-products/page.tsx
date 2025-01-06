import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function AddProducts() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Adicionar Produtos</h1>
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Novo Produto</CardTitle>
            <CardDescription>
              Adicione as informações do seu produto
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="nome">Nome do Produto</Label>
                <Input id="nome" placeholder="Ex: Vaso Antigo" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="descricao">Descrição</Label>
                <Textarea
                  id="descricao"
                  placeholder="Descreva seu produto..."
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="preco">Preço</Label>
                <Input id="preco" type="number" placeholder="0.00" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="imagem">Imagem do Produto</Label>
                <Input id="imagem" type="file" />
              </div>
            </form>
          </CardContent>
          <CardFooter>
            <Button className="w-full">Adicionar Produto</Button>
          </CardFooter>
        </Card>
        <div className="flex justify-between">
          <Button variant="outline" asChild>
            <Link href="/roadmap">Voltar para o Roadmap</Link>
          </Button>
          <Button asChild>
            <Link href="/roadmap/customize-bazar">
              Próximo: Personalizar Bazar
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
