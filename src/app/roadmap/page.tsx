import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CheckCircle, Circle } from "lucide-react";

const steps = [
  {
    title: "Adicionar Produtos",
    description: "Comece a adicionar seus produtos únicos ao seu bazar.",
    link: "/roadmap/add-products",
  },
  {
    title: "Personalizar Bazar",
    description:
      "Personalize a aparência do seu bazar para atrair mais clientes.",
    link: "/roadmap/customize-bazar",
  },
  {
    title: "Promover seu Bazar",
    description: "Aprenda como promover seu bazar e alcançar mais compradores.",
    link: "/roadmap/promote-bazar",
  },
  {
    title: "Começar a Vender",
    description: "Configure suas opções de pagamento e comece a vender!",
    link: "/roadmap/start-selling",
  },
];

export default function Roadmap() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Roadmap do Seu Bazar</h1>
        <p className="text-xl mb-8">
          Parabéns por criar seu bazar! Siga estes passos para começar a vender:
        </p>
        <div className="grid gap-6 md:grid-cols-2">
          {steps.map((step, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="flex items-center">
                  {index === 0 ? (
                    <CheckCircle className="mr-2 text-green-500" />
                  ) : (
                    <Circle className="mr-2" />
                  )}
                  {step.title}
                </CardTitle>
                <CardDescription>{step.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild>
                  <Link href={step.link}>Ir para {step.title}</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
