import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  // Get the user's IP address
  const ip = req.headers.get("x-forwarded-for") ?? "Unknown";

  if (session) {
    // If the user is logged in, update their last_seen and last_ip
    await supabase
      .from("users")
      .update({ last_seen: new Date().toISOString(), last_ip: ip })
      .eq("id", session.user.id);
  }

  // Check if the user is authenticated
  if (!session && req.nextUrl.pathname !== "/entrar") {
    return NextResponse.redirect(new URL("/entrar", req.url));
  }

  return res;
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
