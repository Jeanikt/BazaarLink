import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function StartSelling() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Começar a Vender</h1>
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Configurar Pagamentos</CardTitle>
            <CardDescription>
              Configure suas opções de pagamento para começar a vender
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="metodo-pagamento">Método de Pagamento</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione um método" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="stripe">Stripe</SelectItem>
                    <SelectItem value="paypal">PayPal</SelectItem>
                    <SelectItem value="mercadopago">MercadoPago</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="conta-bancaria">Conta Bancária</Label>
                <Input id="conta-bancaria" placeholder="Número da conta" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cpf-cnpj">CPF/CNPJ</Label>
                <Input id="cpf-cnpj" placeholder="Digite seu CPF ou CNPJ" />
              </div>
            </form>
          </CardContent>
          <CardFooter>
            <Button className="w-full">
              Salvar Configurações de Pagamento
            </Button>
          </CardFooter>
        </Card>
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Políticas de Venda</CardTitle>
            <CardDescription>
              Defina suas políticas de venda e entrega
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="politica-devolucao">
                  Política de Devolução
                </Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione uma política" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="7-dias">7 dias</SelectItem>
                    <SelectItem value="14-dias">14 dias</SelectItem>
                    <SelectItem value="30-dias">30 dias</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="prazo-entrega">Prazo de Entrega</Label>
                <Input id="prazo-entrega" placeholder="Ex: 3-5 dias úteis" />
              </div>
            </form>
          </CardContent>
          <CardFooter>
            <Button className="w-full">Salvar Políticas</Button>
          </CardFooter>
        </Card>
        <div className="flex justify-between">
          <Button variant="outline" asChild>
            <Link href="/roadmap">Voltar para o Roadmap</Link>
          </Button>
          <Button asChild>
            <Link href="/dashboard">Ir para o Dashboard</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
