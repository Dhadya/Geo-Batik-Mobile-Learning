import { handleAuthError } from "@/lib/api/auth-error"
import { toast } from "sonner"
import { validateSection } from "./validation"
import type { FieldColor } from "./validation"
import type { SectionItem, MatriksItem, KoordinatItem, UraianItem, MemasangkanItem, PilihanGandaItem, UrutkanItem, PilihanRefleksiItem, ChecklistTableItem } from "../types"

/** Describe correct answer for an item based on its type. */
function describeCorrectAnswer(item: SectionItem): string {
  switch (item.type) {
    case "matriks": {
      const m = item as MatriksItem
      return `${m.label}: (${m.answer.a}, ${m.answer.b})`
    }
    case "koordinat": {
      const k = item as KoordinatItem
      return `${k.label}: (${k.answer.x}, ${k.answer.y})`
    }
    case "uraian": {
      const u = item as UraianItem
      const accept = u.acceptAnswers?.length ? ` (atau: ${u.acceptAnswers.join(", ")})` : ""
      return `${u.question} Jawaban: ${u.answer}${accept}`
    }
    case "memasangkan": {
      const m = item as MemasangkanItem
      return `${m.question} Pasangan: ${JSON.stringify(m.correctMatches)}`
    }
    case "pilihan_ganda": {
      const p = item as PilihanGandaItem
      return `${p.question} Jawaban: ${p.options[p.correctIndex]}`
    }
    case "urutkan": {
      const u = item as UrutkanItem
      return `${u.question} Urutan: ${u.items.join(" → ")}`
    }
    case "pilihan_refleksi": {
      const p = item as PilihanRefleksiItem
      const coords = Object.entries(p.correctAnswers)
        .map(([opt, cs]) => `Opsi ${opt}: (${cs.map((c) => `(${c.x}, ${c.y})`).join(", ")})`)
        .join("; ")
      return `${p.question} ${coords}`
    }
    case "checklist_table": {
      const c = item as ChecklistTableItem
      const stmts = c.statements
        .map((s, i) => `${s}: ${c.correctAnswers[i] ? "Ya" : "Tidak"}`)
        .join(", ")
      return `${c.question} ${stmts}`
    }
    default:
      return `Item ${(item as SectionItem).id}`
  }
}

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
    const local = validateSection(items, fields, undefined)
    const aiScore = json.data.score

    // AI is the sole source of truth when it succeeds
    if (aiCorrect) {
      return {
        ...json.data,
        isCorrect: true,
        score: aiScore != null ? Math.max(aiScore, 100) : 100,
        errors: {},
        fieldColors: local.fieldColors,
      }
    }

    // AI says wrong — use its score or fall back to local calculation
    const numericScore = aiScore != null ? aiScore
      : local.correctCount === local.totalItems ? 100
      : local.correctCount === 0 ? 0
      : 50
    return {
      ...json.data,
      isCorrect: false,
      score: numericScore,
      errors: json.data.errors ?? local.errors ?? {},
      fieldColors: json.data.fieldColors ?? local.fieldColors ?? {},
    }
  } catch {
    const sectionLabels: Record<string, string> = {
      percobaan: "Percobaan",
      pengamatan: "Pengamatan",
      penyimpulan: "Penyimpulan",
      "cek-pemahaman": "Cek Pemahaman",
    }
    const moduleLabel = slug === "translasi" ? "Translasi" : "Refleksi"
    const sectionLabel = sectionLabels[sectionType] ?? sectionType
    const tabLabel = tab.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())
    const attemptLabel = attempt === 1 ? "pertama" : "kedua"

    toast.error(`Gagal memuat feedback AI, menggunakan penilaian lokal`)
    const local = validateSection(items, fields, undefined)
    const allCorrect = local.correctCount === local.totalItems
    const noneCorrect = local.correctCount === 0
    const fallbackScore = allCorrect ? 100 : noneCorrect ? 0 : 50

    let feedback: string
    const isHint = attempt === 1
    if (allCorrect) {
      feedback = `Semua jawaban pada ${sectionLabel} - ${moduleLabel} (${tabLabel}) sudah tepat. Konsep yang kamu pahami sudah sesuai dengan kunci jawaban. Pertahankan dan lanjutkan ke materi selanjutnya.`
    } else if (noneCorrect) {
      if (isHint) {
        feedback = `Belum ada jawaban yang tepat pada ${sectionLabel} - ${moduleLabel} (${tabLabel}). Pelajari kembali materi ${moduleLabel} pada bagian ${tabLabel}, perhatikan rumus dan langkah penyelesaiannya. Coba kerjakan sekali lagi dengan lebih teliti.`
      } else {
        const keyAnswers = items.map((item) => `• ${describeCorrectAnswer(item)}`).join("\n")
        feedback = `Belum ada jawaban yang tepat pada ${sectionLabel} - ${moduleLabel} (${tabLabel}) percobaan ${attemptLabel}. Pelajari kembali materi ${moduleLabel} pada bagian ${tabLabel}.\n\nKunci jawaban:\n${keyAnswers}`
      }
    } else {
      if (isHint) {
        feedback = `${local.correctCount} dari ${local.totalItems} soal pada ${sectionLabel} - ${moduleLabel} (${tabLabel}) sudah benar. Cek kembali soal yang masih salah, pelajari ulang konsep yang terkait.`
      } else {
        const wrongDescriptions: string[] = []
        for (const item of items) {
          const hasError = Object.keys(local.errors).some((k) => k.startsWith(`${item.id}_`))
          if (hasError) {
            wrongDescriptions.push(`• ${describeCorrectAnswer(item)}`)
          }
        }
        const wrongList = wrongDescriptions.join("\n")
        feedback = `${local.correctCount} dari ${local.totalItems} soal pada ${sectionLabel} - ${moduleLabel} (${tabLabel}) sudah benar. Perbaiki soal yang masih salah.\n\nKunci jawaban untuk soal yang belum tepat:\n${wrongList}`
      }
    }

    return {
      isCorrect: allCorrect,
      score: fallbackScore,
      feedback,
      errors: local.errors ?? {},
      fieldColors: local.fieldColors ?? {},
    }
  }
}
