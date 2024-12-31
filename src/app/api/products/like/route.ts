/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(request: Request) {
  try {
    const { product_id } = await request.json();

    const { data: product, error: fetchError } = await supabase
      .from("products")
      .select("likes_count")
      .eq("id", product_id)
      .single();

    if (fetchError) throw fetchError;

    const { error: updateError } = await supabase
      .from("products")
      .update({ likes_count: (product.likes_count || 0) + 1 })
      .eq("id", product_id);

    if (updateError) throw updateError;

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao curtir produto" },
      { status: 400 }
    );
  }
}
