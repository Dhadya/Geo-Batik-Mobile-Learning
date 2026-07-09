import { auth } from "@/lib/auth";
import { toNextJsHandler } from "better-auth/next-js";
import { NextResponse } from "next/server";

// BetterAuth handler for all /api/auth/* routes
const handler = toNextJsHandler(auth);

// Wraps handler with try/catch to return JSON errors instead of crashing
async function safeHandler(request: Request, method: "GET" | "POST") {
  try {
    if (method === "GET") {
      return await handler.GET(request as Request & { nextUrl: URL });
    }
    return await handler.POST(request as Request & { nextUrl: URL });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error(`[Auth ${method}]`, message);
    return NextResponse.json(
      { error: "Terjadi kesalahan autentikasi. Silakan coba lagi." },
      { status: 500 }
    );
  }
}

// GET handler — session lookup, OAuth callbacks
export async function GET(request: Request) {
  return safeHandler(request, "GET");
}

// POST handler — sign in, sign up, sign out, OAuth
export async function POST(request: Request) {
  return safeHandler(request, "POST");
}
