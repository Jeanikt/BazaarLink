import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  const currentYear = new Date().getFullYear();

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="absolute inset-0 gradient-background opacity-30" />

      <header className="relative z-10 p-6">
        <nav className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">BazaarLink</h1>
          <div className="flex gap-4">
            <Button variant="ghost" asChild>
              <Link href="/entrar">Entrar</Link>
            </Button>
            <Button asChild>
              <Link href="/cadastro">Cadastrar</Link>
            </Button>
          </div>
        </nav>
      </header>

      <main className="relative container mx-auto px-6 py-24 flex min-h-[calc(100vh-160px)] items-center">
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-24 items-center">
          <div className="space-y-8">
            <div className="space-y-6">
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">
                Descubra Itens Únicos em Bazares Digitais
              </h2>
              <p className="text-xl text-muted-foreground">
                Conecte-se com vendedores locais, encontre tesouros únicos e
                construa sua comunidade no marketplace digital mais vibrante do
                mundo.
              </p>
            </div>

            <div className="space-y-4 md:space-y-6">
              <p className="text-lg">
                ✨ Milhares de itens exclusivos esperando por você
              </p>
              <p className="text-lg">
                🤝 Conecte-se diretamente com vendedores apaixonados
              </p>
              <p className="text-lg">
                💫 Descubra histórias únicas em cada produto
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="w-full sm:w-auto" asChild>
                <Link href="/explorar">Começar a Explorar</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto"
                asChild
              >
                <Link href="/criar-bazar">Criar seu Bazar</Link>
              </Button>
            </div>
          </div>

          <div className="relative hidden lg:block">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-float">
              <div className="w-80 h-80 rounded-full bg-gradient-to-r from-yellow-300 to-red-500 opacity-75 blur-xl" />
            </div>
            <div className="absolute top-1/4 right-0 animate-float delay-1000">
              <div className="w-40 h-40 rounded-full bg-gradient-to-r from-primary to-orange-500 opacity-60 blur-lg" />
            </div>
            <div className="absolute bottom-1/4 left-0 animate-float delay-2000">
              <div className="w-56 h-56 rounded-full bg-gradient-to-r from-red-400 to-yellow-400 opacity-60 blur-lg" />
            </div>
          </div>
        </div>
      </main>

      <section className="relative z-10 container mx-auto px-6 py-24">
        <div className="grid gap-12 lg:grid-cols-3">
          <div className="space-y-4">
            <h3 className="text-2xl font-bold">Para Compradores</h3>
            <p className="text-muted-foreground">
              Explore uma seleção única de produtos, conecte-se com vendedores
              locais e encontre verdadeiros tesouros.
            </p>
          </div>
          <div className="space-y-4">
            <h3 className="text-2xl font-bold">Para Vendedores</h3>
            <p className="text-muted-foreground">
              Crie seu bazar digital, alcance mais clientes e faça parte de uma
              comunidade vibrante de empreendedores.
            </p>
          </div>
          <div className="space-y-4">
            <h3 className="text-2xl font-bold">Comunidade</h3>
            <p className="text-muted-foreground">
              Compartilhe histórias, troque experiências e faça parte de um
              movimento que valoriza o comércio local.
            </p>
          </div>
        </div>
      </section>

      <footer className="relative z-10 border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex flex-col gap-4 py-10 md:flex-row md:justify-between">
          <div className="flex flex-col gap-4 md:gap-2">
            <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
              &copy; {currentYear} BazaarLink. Todos os direitos reservados.
            </p>
          </div>
          <nav className="flex gap-4 md:gap-6">
            <Link
              href="/sobre"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              Sobre
            </Link>
            <Link
              href="/termos"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              Termos
            </Link>
            <Link
              href="/privacidade"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              Privacidade
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}
