import { NextRequest, NextResponse } from "next/server";
import { handleError } from "./errors";

type Handler<T> = (request: NextRequest, params: { slug: string }) => Promise<T>;

export function apiHandler<T>(fn: Handler<T>) {
  return async (request: NextRequest, { params }: { params: Promise<{ slug: string }> }) => {
    try {
      const resolvedParams = await params;
      const data = await fn(request, resolvedParams);
      return NextResponse.json({ ok: true, data });
    } catch (e) {
      return handleError(e);
    }
  };
}
