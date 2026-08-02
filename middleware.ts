import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Prevent redirect loops — if already on error/auth pages, let through
  if (pathname.startsWith("/api/auth/error") || pathname.startsWith("/api/auth/sign-out")) {
    return NextResponse.next();
  }

  // Check for BetterAuth session cookie. Production secure cookies use __Secure- prefix.
  const sessionCookie =
    request.cookies.get("better-auth.session_token") ||
    request.cookies.get("__Secure-better-auth.session_token");

  // Redirect logged-in users from auth pages to menu
  const authRoutes = ["/login", "/register"];
  if (authRoutes.some((route) => pathname === route || pathname.startsWith(route + "/"))) {
    if (sessionCookie) {
      return NextResponse.redirect(new URL("/prasyarat", request.url));
    }
    return NextResponse.next();
  }

  // Public routes that don't require authentication (homepage, API auth, logout)
  const publicRoutes = ["/", "/api/auth", "/logout"];
  if (publicRoutes.some((route) => pathname === route || pathname.startsWith(route + "/"))) {
    return NextResponse.next();
  }

  // Protected routes require session
  const protectedRoutes = ["/menu", "/prasyarat", "/apersepsi", "/modul", "/lab"];
  const isProtected = protectedRoutes.some((route) => pathname.startsWith(route));

  if (isProtected && !sessionCookie) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
