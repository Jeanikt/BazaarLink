import { supabase } from "./supabase";

export async function getProdutos() {
  const { data, error } = await supabase
    .from("products")
    .select(
      `
      *,
      bazaars (
        name
      )
    `
    )
    .order("created_at", { ascending: false })
    .limit(20);

  if (error) {
    console.error("Erro ao buscar produtos:", error);
    return [];
  }

  return data.map((produto) => ({
    ...produto,
    bazar_name: produto.bazaars.name,
  }));
}

export async function criarProduto(dados: {
  name: string;
  description: string;
  price: number;
  bazar_id: number;
}) {
  const { data, error } = await supabase
    .from("products")
    .insert(dados)
    .select();

  if (error) {
    throw new Error(`Erro ao criar produto: ${error.message}`);
  }

  return data[0];
}

export async function atualizarProduto(
  id: number,
  dados: {
    name?: string;
    description?: string;
    price?: number;
  }
) {
  const { data, error } = await supabase
    .from("products")
    .update(dados)
    .eq("id", id)
    .select();

  if (error) {
    throw new Error(`Erro ao atualizar produto: ${error.message}`);
  }

  return data[0];
}

export async function deletarProduto(id: number) {
  const { error } = await supabase.from("products").delete().eq("id", id);

  if (error) {
    throw new Error(`Erro ao deletar produto: ${error.message}`);
  }
}
