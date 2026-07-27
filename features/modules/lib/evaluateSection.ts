import { handleAuthError } from "@/lib/api/auth-error"
import { toast } from "sonner"
import { validateSection } from "./validation"
import type { FieldColor } from "./validation"
import type { SectionItem } from "../types"

/**
 * Client-side AI evaluation caller with local validation fallback.
 * Posts to /api/ai/evaluate-section; falls back to validateSection() on network or API error.
 * Shows toast notification when falling back to local validation.
 */
export async function evaluateSection(
  slug: string,
  tab: string,
  sectionType: string,
  items: SectionItem[],
  fields: Record<string, Record<string, string>>,
  attempt: 1 | 2,
): Promise<{
  isCorrect: boolean
  score: number | null
  feedback: string
  errors: Record<string, string>
  fieldColors: Record<string, FieldColor>
}> {
  try {
    const response = await fetch("/api/ai/evaluate-section", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ module: slug, tab, sectionType, items, answers: fields, attempt }),
    })
    if (response.status === 401) { handleAuthError(new Error("UNAUTHORIZED")); throw new Error("Unauthorized") }
    const json = await response.json()
    if (!json.ok) throw new Error(json.error?.message ?? "AI evaluation failed")
    const aiCorrect = json.data.isCorrect
    if (aiCorrect) {
      return {
        ...json.data,
        errors: {},
        fieldColors: {},
      }
    }
    const local = validateSection(items, fields, undefined)
    return {
      ...json.data,
      errors: json.data.errors ?? local.errors ?? {},
      fieldColors: json.data.fieldColors ?? local.fieldColors ?? {},
    }
  } catch {
    toast.error("Gagal memuat feedback AI, menggunakan penilaian lokal")
    const local = validateSection(items, fields, undefined)
    const allCorrect = local.correctCount === local.totalItems
    const noneCorrect = local.correctCount === 0
    return {
      isCorrect: allCorrect,
      score: allCorrect ? 100 : noneCorrect ? 0 : 50,
      feedback: allCorrect
        ? "Jawaban kamu benar. Semua jawaban sesuai dengan kunci jawaban yang diharapkan. Pertahankan pemahamanmu dan lanjutkan ke materi selanjutnya."
        : "Jawaban kamu belum sepenuhnya tepat. Periksa kembali setiap pernyataan dan pastikan pemahamanmu tentang konsep yang sedang dipelajari. Coba bandingkan dengan hasil percobaan yang sudah kamu lakukan.",
      errors: local.errors ?? {},
      fieldColors: local.fieldColors ?? {},
    }
  }
}
