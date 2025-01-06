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

export default function CustomizeBazar() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Personalizar Bazar</h1>
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Aparência do Bazar</CardTitle>
            <CardDescription>
              Personalize a aparência do seu bazar
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="tema">Tema</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione um tema" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">Claro</SelectItem>
                    <SelectItem value="dark">Escuro</SelectItem>
                    <SelectItem value="vintage">Vintage</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="cor-primaria">Cor Primária</Label>
                <Input id="cor-primaria" type="color" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="logo">Logo do Bazar</Label>
                <Input id="logo" type="file" />
              </div>
            </form>
          </CardContent>
          <CardFooter>
            <Button className="w-full">Salvar Personalização</Button>
          </CardFooter>
        </Card>
        <div className="flex justify-between">
          <Button variant="outline" asChild>
            <Link href="/roadmap">Voltar para o Roadmap</Link>
          </Button>
          <Button asChild>
            <Link href="/roadmap/promote-bazar">
              Próximo: Promover seu Bazar
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
