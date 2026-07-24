import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/api/auth-utils";
import { handleError } from "@/lib/api/errors";
import { pembahasanSchema } from "@/lib/schemas";
import { generatePembahasan } from "@/features/modules/services/ai";

/** POST /api/ai/generate-pembahasan — generate AI-powered feedback for a completed quiz. */
export async function POST(request: NextRequest) {
  try {
    await requireAuth();
    const body = await request.json();

    const parsed = pembahasanSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { ok: false, error: { code: "VALIDATION_ERROR", message: "Data tidak valid" } },
        { status: 422 },
      );
    }

    const feedback = await generatePembahasan(parsed.data.questions, parsed.data.answers);
    return NextResponse.json({ ok: true, data: { feedback } });
  } catch (e) {
    return handleError(e);
  }
}
