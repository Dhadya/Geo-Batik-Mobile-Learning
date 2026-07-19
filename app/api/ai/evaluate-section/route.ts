import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/api/auth-utils";
import { handleError } from "@/lib/api/errors";
import { evaluateSection } from "@/features/modules/services/ai";

/** POST /api/ai/evaluate-section — evaluate a section's answers using Gemini AI. */
export async function POST(request: NextRequest) {
  try {
    await requireAuth();
    const body = await request.json();

    const result = await evaluateSection(body);

    return NextResponse.json({ ok: true, data: result });
  } catch (e) {
    return handleError(e);
  }
}
