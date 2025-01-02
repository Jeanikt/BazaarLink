import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true,
    },
  }
);

export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          id: number;
          email: string;
          password_hash: string;
          username: string | null;
          role: "admin" | "user" | "seller";
          created_at: string;
        };
        Insert: {
          email: string;
          password_hash: string;
          username?: string | null;
          role?: "admin" | "user" | "seller";
        };
        Update: {
          email?: string;
          password_hash?: string;
          username?: string | null;
          role?: "admin" | "user" | "seller";
        };
      };
      bazaars: {
        Row: {
          id: number;
          name: string;
          owner_id: number;
          description: string | null;
          followers_count: number;
          created_at: string;
        };
        Insert: {
          name: string;
          owner_id: number;
          description?: string | null;
        };
        Update: {
          name?: string;
          description?: string | null;
          followers_count?: number;
        };
      };
      products: {
        Row: {
          id: number;
          bazar_id: number;
          name: string;
          description: string | null;
          price: number;
          likes_count: number;
          created_at: string;
        };
        Insert: {
          bazar_id: number;
          name: string;
          description?: string | null;
          price: number;
        };
        Update: {
          name?: string;
          description?: string | null;
          price?: number;
          likes_count?: number;
        };
      };
      proposals: {
        Row: {
          id: number;
          product_id: number;
          user_id: number;
          offer_amount: number;
          message: string | null;
          created_at: string;
        };
        Insert: {
          product_id: number;
          user_id: number;
          offer_amount: number;
          message?: string | null;
        };
        Update: {
          offer_amount?: number;
          message?: string | null;
        };
      };
      chats: {
        Row: {
          id: number;
          sender_id: number;
          receiver_id: number;
          message: string;
          product_id: number | null;
          created_at: string;
        };
        Insert: {
          sender_id: number;
          receiver_id: number;
          message: string;
          product_id?: number | null;
        };
        Update: {
          message?: string;
        };
      };
      follows: {
        Row: {
          id: number;
          user_id: number;
          bazar_id: number;
          created_at: string;
        };
        Insert: {
          user_id: number;
          bazar_id: number;
        };
        Update: {
          user_id?: number;
          bazar_id?: number;
        };
      };
      verification_codes: {
        Row: {
          id: number;
          email: string;
          code: string;
          expires_at: string;
          created_at: string;
        };
        Insert: {
          email: string;
          code: string;
          expires_at: string;
        };
        Update: {
          email?: string;
          code?: string;
          expires_at?: string;
        };
      };
    };
  };
};
