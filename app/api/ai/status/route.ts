import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/api/auth-utils";
import { handleError } from "@/lib/api/errors";
import { cacheControl } from "@/lib/api/cache-control";
import { getOrSet } from "@/lib/cache";
import { getAiStatus } from "@/features/modules/services/ai";

/** GET /api/ai/status — return live Gemini API quota, RPM, RPD, and semaphore stats (global, cached 5 min). */
export async function GET() {
  try {
    await requireAuth();
    const status = await getOrSet("ai:status", () => getAiStatus(), 300);
    return NextResponse.json({ ok: true, data: status }, { headers: cacheControl("private") });
  } catch (e) {
    return handleError(e);
  }
}
