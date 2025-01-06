import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Facebook, Instagram, Twitter } from "lucide-react";

export default function PromoteBazar() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Promover seu Bazar</h1>
        <div className="grid gap-6 md:grid-cols-2 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Redes Sociais</CardTitle>
              <CardDescription>
                Compartilhe seu bazar nas redes sociais
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex space-x-4">
                <Button variant="outline">
                  <Facebook className="mr-2" /> Facebook
                </Button>
                <Button variant="outline">
                  <Instagram className="mr-2" /> Instagram
                </Button>
                <Button variant="outline">
                  <Twitter className="mr-2" /> Twitter
                </Button>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Convide Amigos</CardTitle>
              <CardDescription>
                Convide amigos para visitar seu bazar
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full">Enviar Convites por Email</Button>
            </CardContent>
          </Card>
        </div>
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Dicas de Promoção</CardTitle>
            <CardDescription>
              Aprenda como promover seu bazar efetivamente
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside space-y-2">
              <li>Use hashtags relevantes nas redes sociais</li>
              <li>Crie conteúdo interessante sobre seus produtos</li>
              <li>Ofereça promoções especiais para novos clientes</li>
              <li>Participe de grupos e fóruns relacionados ao seu nicho</li>
            </ul>
          </CardContent>
        </Card>
        <div className="flex justify-between">
          <Button variant="outline" asChild>
            <Link href="/roadmap">Voltar para o Roadmap</Link>
          </Button>
          <Button asChild>
            <Link href="/roadmap/start-selling">Próximo: Começar a Vender</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
