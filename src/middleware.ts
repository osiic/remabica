// middleware.ts
import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export default auth(async (req) => {
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
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
