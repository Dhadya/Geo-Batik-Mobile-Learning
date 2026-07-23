import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { requireAuth } from "@/lib/api/auth-utils";
import { handleError } from "@/lib/api/errors";
import { evaluateSection } from "@/features/modules/services/ai";

const evaluateSectionSchema = z.object({
  module: z.string().min(1),
  tab: z.string().min(1),
  sectionType: z.enum(["percobaan", "pengamatan", "penyimpulan", "cek-pemahaman"]),
  items: z.array(z.object({}).passthrough()).min(1),
  answers: z.record(z.record(z.string())),
  attempt: z.union([z.literal(1), z.literal(2)]),
});

/** POST /api/ai/evaluate-section — evaluate a section's answers using Gemini AI. */
export async function POST(request: NextRequest) {
  try {
    await requireAuth();
    const body = await request.json();

    const parsed = evaluateSectionSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { ok: false, error: { code: "VALIDATION_ERROR", message: "Data evaluasi tidak valid", issues: parsed.error.issues } },
        { status: 422 },
      );
    }

    const result = await evaluateSection(parsed.data);

    return NextResponse.json({ ok: true, data: result });
  } catch (e) {
    return handleError(e);
  }
}
