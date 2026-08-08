import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/api/auth-utils";
import { handleError } from "@/lib/api/errors";
import { getAiStatus } from "@/features/modules/services/ai";

/** GET /api/ai/status — return live Gemini API quota, RPM, RPD, and semaphore stats. */
export async function GET() {
  try {
    await requireAuth();
    const status = await getAiStatus();
    return NextResponse.json({ ok: true, data: status });
  } catch (e) {
    return handleError(e);
  }
}
