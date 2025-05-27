// middleware.ts
import { auth } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

export default auth(async (req: NextRequest) => {
  const { pathname, origin } = req.nextUrl;

  // Jalur yang butuh login
  const protectedPaths = ["/dashboard", "/profile", "/admin"];

  const isProtected = protectedPaths.some(
    (path) => pathname === path || pathname.startsWith(`${path}/`),
  );

  // Kalau jalur dilindungi dan belum login, redirect ke /sign-in
  if (isProtected && !req.auth) {
    return NextResponse.redirect(new URL("/sign-in", origin));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"], // hindari file statis
};
