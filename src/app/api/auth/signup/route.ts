/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(request: Request) {
  try {
    const { email, password, username } = await request.json();

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          username,
          role: "user",
        },
      },
    });

    if (error) throw error;

    return NextResponse.json({ user: data.user });
  } catch (error) {
    return NextResponse.json({ error: "Erro ao criar conta" }, { status: 400 });
  }
}
