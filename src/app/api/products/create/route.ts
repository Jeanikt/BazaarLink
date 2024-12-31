/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(request: Request) {
  try {
    const { name, description, price, bazar_id } = await request.json();

    const { data, error } = await supabase
      .from("products")
      .insert({
        name,
        description,
        price,
        bazar_id,
      })
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao criar produto" },
      { status: 400 }
    );
  }
}
