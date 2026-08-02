import type { SectionItem } from "../types"
import { SECTION_TYPE_LABELS, REFLECTION_LABELS } from "../data/moduleConfig"
import type { ValidationResult } from "./validation"

/** Option letters A–F for student-facing feedback. */
export const OPTION_LETTERS = ["A", "B", "C", "D", "E", "F"]

/** Context needed to build deterministic feedback for a section submission. */
export interface FeedbackContext {
  module: string
  tab: string
  sectionType: string
  items: SectionItem[]
  answers: Record<string, Record<string, string>>
  attempt: 1 | 2
}

/** Map a 0-indexed option position to a letter (0 → A, 1 → B, ...). */
export function optionLetter(index: number): string {
  return OPTION_LETTERS[index] ?? String(index + 1)
}

/** Join a list into Indonesian phrasing: "A dan B" or "A, B, dan C". */
function joinList(items: string[]): string {
  if (items.length <= 1) return items[0] ?? ""
  if (items.length === 2) return `${items[0]} dan ${items[1]}`
  return `${items.slice(0, -1).join(", ")}, dan ${items[items.length - 1]}`
}

/** Convert a multi-line authored string into bullet points, one per line. */
function toBullets(text: string): string {
  return text
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => `• ${line}`)
    .join("\n")
}

/** Check whether an item has any non-empty answer text. */
function hasAnswerText(
  answers: Record<string, Record<string, string>>,
  itemId: number,
): boolean {
  return Object.values(answers[String(itemId)] ?? {}).some((v) => v && v.trim() !== "")
}

/**
 * Build a single feedback bullet for one wrong item, matching AI feedback rules:
 * hints (attempt 1) never reveal the answer, pembahasan (attempt 2) gives the
 * correct result and how to obtain it, options are shown as A/B/C/D.
 * Koordinat items are handled by buildKoordinatFeedback (grouped per concept).
 */
export function buildItemFeedback(
  item: SectionItem,
  answers: Record<string, Record<string, string>>,
  attempt: 1 | 2,
): string {
  const isHint = attempt === 1
  switch (item.type) {
    case "matriks": {
      if (isHint) {
        return item.hint
          ? toBullets(item.hint)
          : "• Vektor translasi belum tepat. Amati kembali pada GeoGebra bagaimana titik awal berpindah menuju titik bayangannya, lalu tentukan besar pergeseran mendatar dan tegaknya."
      }
      return item.explanation
        ? toBullets(item.explanation)
        : `• Titik ${item.label} ditranslasikan ke ${item.targetBayangan}, sehingga nilai translasinya T(${item.answer.a}, ${item.answer.b}).`
    }
    case "pilihan_ganda": {
      if (isHint) {
        if (item.hint) return toBullets(item.hint)
        const letters = item.options.map((_, i) => optionLetter(i)).join(", ")
        return `• Cermati kembali pertanyaan dan terapkan konsep yang dipelajari pada bagian ini. Bandingkan setiap pilihan ${letters} sebelum menentukan jawaban.`
      }
      if (item.explanation) return toBullets(item.explanation)
      if (item.multiSelect && item.correctIndices) {
        const letters = item.correctIndices.map((i) => optionLetter(i)).join(", ")
        const texts = item.correctIndices.map((i) => item.options[i]).join(" | ")
        return `• Jawaban yang benar: ${letters}. ${texts}`
      }
      return `• Jawaban yang benar: ${optionLetter(item.correctIndex)}. ${item.options[item.correctIndex]}`
    }
    case "memasangkan": {
      if (isHint) {
        return item.hint
          ? toBullets(item.hint)
          : "• Periksa kembali setiap pasangan dan cocokkan berdasarkan konsep yang telah dipelajari."
      }
      if (item.explanation) return toBullets(item.explanation)
      const pairs = Object.entries(item.correctMatches)
        .map(([leftId, rightId]) => {
          const left = item.leftItems.find((l) => l.id === leftId)?.label ?? leftId
          const right = item.rightItems.find((r) => r.id === rightId)?.label ?? rightId
          return `${left} → ${right}`
        })
        .join(" | ")
      return `• Pasangan yang benar: ${pairs}.`
    }
    case "urutkan": {
      if (isHint) {
        return item.hint
          ? toBullets(item.hint)
          : "• Perhatikan urutan logis langkah-langkah berdasarkan konsep yang dipelajari."
      }
      return item.explanation
        ? toBullets(item.explanation)
        : `• Urutan yang benar: ${item.items.join(" → ")}.`
    }
    case "pilihan_refleksi": {
      const selected = answers[String(item.id)]?.selected ?? ""
      if (isHint) {
        return item.hint
          ? toBullets(item.hint)
          : "• Periksa kembali jenis refleksi yang dipilih lalu hitung ulang koordinat bayangan setiap titik dengan rumus refleksi yang sesuai."
      }
      const coords = item.correctAnswers[selected]
      const coordsLine = coords
        ? `• Koordinat bayangan: (${coords.map((c) => `(${c.x}, ${c.y})`).join(" | ")}).`
        : "• Pilih salah satu jenis refleksi terlebih dahulu."
      if (item.explanation) {
        return `${toBullets(item.explanation)}\n${coordsLine}`
      }
      return coordsLine
    }
    case "checklist_table": {
      if (isHint) {
        return item.hint
          ? toBullets(item.hint)
          : "• Periksa kembali setiap pernyataan berdasarkan hasil pengamatan pada GeoGebra."
      }
      if (item.explanation) return toBullets(item.explanation)
      const results = item.statements
        .map((s, i) => `${s}: ${item.correctAnswers[i] ? "Ya" : "Tidak"}`)
        .join(" | ")
      return `• Hasil pengamatan yang benar: ${results}.`
    }
    case "uraian": {
      if (isHint) {
        return item.hint
          ? toBullets(item.hint)
          : `• Jawaban uraian belum diisi. Tinjau kembali: ${item.question}`
      }
      return item.explanation
        ? toBullets(item.explanation)
        : `• Kunci jawaban: ${item.answer}`
    }
    default:
      return ""
  }
}

/** A single wrong koordinat item collected into a concept group. */
interface KoordinatPoint {
  label: string
  bayangan: { x: number; y: number }
  bayanganText?: string
  hint?: string
  explanation?: string
}

/** A single wrong matriks item collected into a concept group. */
interface MatriksPoint {
  label: string
  bayangan: string
  hint?: string
  explanation?: string
}

/** Grouping key so koordinat items sharing the same concept merge into one bullet. */
function koordinatGroupKey(
  slug: string,
  tab: string,
  attempt: 1 | 2,
  bayangan?: string,
  label?: string,
): string {
  if (slug === "refleksi") return `refleksi:${tab}:${attempt}`
  return `translasi:${bayangan ?? label ?? "none"}:${attempt}`
}

/**
 * Build one merged bullet for all wrong koordinat items sharing the same concept,
 * listing every affected point instead of repeating the same hint per point.
 * Hints never state the general transformation formula (that rumus is concluded in
 * penyimpulan) — they direct the student back to the GeoGebra observation. Explanations
 * give the specific bayangan result for each affected point without restating the formula.
 */
function buildKoordinatFeedback(
  points: KoordinatPoint[],
  slug: string,
  tab: string,
  attempt: 1 | 2,
): string {
  const isHint = attempt === 1
  const listed = joinList(points.map((p) => p.label))
  const axis = REFLECTION_LABELS[tab] ?? tab

  if (isHint) {
    const authored = points.find((p) => p.hint)?.hint
    if (authored) return toBullets(authored)
    if (slug === "refleksi") {
      return `• Amati kembali pada GeoGebra posisi titik ${listed} dan bayangannya terhadap ${axis}. Bandingkan koordinat titik awal dengan bayangannya, lalu tentukan koordinat bayangan yang benar.`
    }
    const vektor = points[0]?.bayanganText ?? "yang diberikan"
    return `• Amati kembali pada GeoGebra arah dan besar pergeseran titik ${listed} oleh vektor ${vektor}. Perhatikan bagaimana koordinat x dan y berubah, lalu tentukan koordinat bayangan yang benar.`
  }

  if (slug === "refleksi") {
    const hasil = points.map((p) => `${p.label} → (${p.bayangan.x}, ${p.bayangan.y})`).join("; ")
    return `• Perhatikan kembali hasil pengamatan pada GeoGebra: titik ${listed} direfleksikan terhadap ${axis}, sehingga bayangannya: ${hasil}.`
  }
  const vektor = points[0]?.bayanganText ?? "yang diberikan"
  const hasil = points.map((p) => `${p.label} → (${p.bayangan.x}, ${p.bayangan.y})`).join("; ")
  return `• Perhatikan kembali hasil pengamatan pada GeoGebra: titik ${listed} digeser sejauh ${vektor}, sehingga bayangannya: ${hasil}.`
}

/**
 * Build one merged bullet for all wrong matriks items sharing the same translasi vector.
 * Avoids repeating the same hint per point — lists all affected points in one bullet.
 */
function buildMatriksFeedback(
  points: MatriksPoint[],
  attempt: 1 | 2,
): string {
  const isHint = attempt === 1
  const listed = joinList(points.map((p) => p.label))

  if (isHint) {
    return `• Perhatikan kembali pada GeoGebra bagaimana titik ${listed} bergeser oleh vektor translasi yang sama. Amati besar pergeseran mendatar dan tegaknya, lalu tentukan nilai translasinya.`
  }
  const hasil = points.map((p) => `${p.label} → T${p.bayangan}`).join("; ")
  return `• Perhatikan kembali hasil pengamatan pada GeoGebra: titik ${listed} ditranslasikan, sehingga hasilnya: ${hasil}.`
}

/**
 * Build section-aware feedback for wrong deterministic items and unanswered uraian from local results.
 * Identical bullets are shown once; koordinat items sharing one concept are merged into a single
 * bullet listing every affected point.
 * Answered-but-wrong uraian items are skipped by default because Gemini judges them server-side;
 * pass `includeAnsweredUraian` (client fallback, no AI) to include their authored hints/explanations.
 */
export function buildDeterministicFeedback(
  context: FeedbackContext,
  local: ValidationResult,
  includeAnsweredUraian?: boolean,
): string {
  if (local.isCorrect) {
    return "Semua jawaban sudah tepat. Pertahankan pemahamanmu."
  }
  const lines: string[] = []

  const seen = new Set<string>()
  const koordinatGroups = new Map<string, { points: KoordinatPoint[]; firstIdx: number }>()
  const matriksGroups = new Map<string, { points: MatriksPoint[]; firstIdx: number }>()
  const emittedGroups = new Set<string>()

  for (let idx = 0; idx < context.items.length; idx++) {
    const item = context.items[idx]
    const wrong = Object.keys(local.errors).some((k) => k.startsWith(`${item.id}_`))
    if (!wrong) continue
    if (!includeAnsweredUraian && item.type === "uraian" && hasAnswerText(context.answers, item.id)) continue

    if (item.type === "koordinat") {
      const key = koordinatGroupKey(context.module, context.tab, context.attempt, item.bayangan, item.label)
      const existing = koordinatGroups.get(key)
      if (existing) {
        existing.points.push({ label: item.label, bayangan: item.answer, bayanganText: item.bayangan, hint: item.hint, explanation: item.explanation })
      } else {
        koordinatGroups.set(key, {
          points: [{ label: item.label, bayangan: item.answer, bayanganText: item.bayangan, hint: item.hint, explanation: item.explanation }],
          firstIdx: idx,
        })
      }
      continue
    }

    if (item.type === "matriks" && item.targetBayangan) {
      const key = `matriks:${item.targetBayangan}:${context.attempt}`
      const existing = matriksGroups.get(key)
      if (existing) {
        existing.points.push({ label: item.label, bayangan: item.targetBayangan, hint: item.hint, explanation: item.explanation })
      } else {
        matriksGroups.set(key, {
          points: [{ label: item.label, bayangan: item.targetBayangan, hint: item.hint, explanation: item.explanation }],
          firstIdx: idx,
        })
      }
      continue
    }

    const bullet = buildItemFeedback(item, context.answers, context.attempt)
    if (!bullet) continue
    if (seen.has(bullet)) continue
    seen.add(bullet)

    // Before pushing this bullet, emit any groups whose first item came before this item
    // and haven't been emitted yet
    for (const [gKey, g] of koordinatGroups) {
      if (!emittedGroups.has(gKey) && g.firstIdx < idx) {
        emittedGroups.add(gKey)
        lines.push(buildKoordinatFeedback(g.points, context.module, context.tab, context.attempt))
      }
    }
    for (const [gKey, g] of matriksGroups) {
      if (!emittedGroups.has(gKey) && g.firstIdx < idx) {
        emittedGroups.add(gKey)
        lines.push(buildMatriksFeedback(g.points, context.attempt))
      }
    }

    lines.push(bullet)
  }

  // Emit any remaining groups that weren't emitted yet (at the end)
  for (const [gKey, g] of koordinatGroups) {
    if (!emittedGroups.has(gKey)) {
      lines.push(buildKoordinatFeedback(g.points, context.module, context.tab, context.attempt))
    }
  }
  for (const [gKey, g] of matriksGroups) {
    if (!emittedGroups.has(gKey)) {
      lines.push(buildMatriksFeedback(g.points, context.attempt))
    }
  }

  return lines.join("\n")
}

/** Prepend deterministic hints to AI feedback without duplicating content. */
export function mergeFeedback(deterministic: string, ai: string): string {
  const parts = [deterministic, ai].filter((s) => s && s.trim() !== "")
  return parts.join("\n\n")
}

/** Deterministic score from correct/total ratio, rounded to an integer 0-100. */
export function localScore(local: ValidationResult): number {
  if (local.totalItems === 0) return 0
  return Math.round((local.correctCount / local.totalItems) * 100)
}

/** Build review feedback for a fully correct submission — shows each item's explanation. */
export function feedbackForCorrect(
  sectionType: string,
  items: SectionItem[],
  answers: Record<string, Record<string, string>>,
): string {
  const label = SECTION_TYPE_LABELS[sectionType] ?? sectionType
  const explanations: string[] = []
  for (const item of items) {
    const bullet = buildItemFeedback(item, answers, 2)
    if (bullet) explanations.push(bullet)
  }
  if (explanations.length === 0) {
    return `Semua jawaban pada bagian ${label} sudah tepat. Pertahankan pemahamanmu.`
  }
  return `Semua jawaban pada bagian ${label} sudah tepat.\n\nPembahasan:\n${explanations.join("\n")}`
}
