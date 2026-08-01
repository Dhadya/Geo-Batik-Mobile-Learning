import type { SectionItem } from "../types"
import { SECTION_TYPE_LABELS, SECTION_FOCUS, REFLECTION_RULES } from "../data/moduleConfig"
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
        return "• Vektor translasi belum tepat. Ingat kembali: vektor translasi diperoleh dari selisih koordinat bayangan dengan titik awal, dihitung per komponen (a = x' - x, b = y' - y). Perhatikan tanda positif dan negatif hasilnya."
      }
      return `• Titik ${item.label} ditranslasikan ke ${item.targetBayangan}: a = x' - x dan b = y' - y, sehingga diperoleh T(${item.answer.a}, ${item.answer.b}).`
    }
    case "pilihan_ganda": {
      if (isHint) {
        if (item.hint) return `• ${item.hint}`
        const letters = item.options.map((_, i) => optionLetter(i)).join(", ")
        return `• Cermati kembali pertanyaan dan terapkan konsep yang dipelajari pada bagian ini. Bandingkan setiap pilihan ${letters} sebelum menentukan jawaban.`
      }
      if (item.explanation) return `• ${item.explanation}`
      if (item.multiSelect && item.correctIndices) {
        const letters = item.correctIndices.map((i) => optionLetter(i)).join(", ")
        const texts = item.correctIndices.map((i) => item.options[i]).join(" | ")
        return `• Jawaban yang benar: ${letters}. ${texts}`
      }
      return `• Jawaban yang benar: ${optionLetter(item.correctIndex)}. ${item.options[item.correctIndex]}`
    }
    case "memasangkan": {
      if (isHint) {
        return "• Periksa kembali setiap pasangan dan cocokkan berdasarkan konsep yang telah dipelajari."
      }
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
        return "• Perhatikan urutan logis langkah-langkah berdasarkan konsep yang dipelajari."
      }
      return `• Urutan yang benar: ${item.items.join(" → ")}.`
    }
    case "pilihan_refleksi": {
      const selected = answers[String(item.id)]?.selected ?? ""
      if (isHint) {
        return "• Periksa kembali jenis refleksi yang dipilih lalu hitung ulang koordinat bayangan setiap titik dengan rumus refleksi yang sesuai."
      }
      const coords = item.correctAnswers[selected]
      if (coords) {
        const idx = item.options.indexOf(selected)
        const letter = idx >= 0 ? optionLetter(idx) : selected
        return `• Koordinat bayangan untuk opsi ${letter}: (${coords.map((c) => `(${c.x}, ${c.y})`).join(" | ")}).`
      }
      return "• Pilih salah satu jenis refleksi terlebih dahulu."
    }
    case "checklist_table": {
      if (isHint) {
        return "• Periksa kembali setiap pernyataan berdasarkan hasil pengamatan pada GeoGebra."
      }
      const results = item.statements
        .map((s, i) => `${s}: ${item.correctAnswers[i] ? "Ya" : "Tidak"}`)
        .join(" | ")
      return `• Hasil pengamatan yang benar: ${results}.`
    }
    case "uraian": {
      if (isHint) {
        return item.hint
          ? `• ${item.hint}`
          : `• Jawaban uraian belum diisi. Tinjau kembali: ${item.question}`
      }
      return item.explanation
        ? `• ${item.explanation}`
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
}

/** Grouping key so koordinat items sharing the same concept merge into one bullet. */
function koordinatGroupKey(slug: string, tab: string, attempt: 1 | 2, bayangan?: string): string {
  if (slug === "refleksi") return `refleksi:${tab}:${attempt}`
  return `translasi:${bayangan ?? "none"}:${attempt}`
}

/**
 * Build one merged bullet for all wrong koordinat items sharing the same concept,
 * listing every affected point instead of repeating the same hint per point.
 */
function buildKoordinatFeedback(
  points: KoordinatPoint[],
  slug: string,
  tab: string,
  attempt: 1 | 2,
): string {
  const isHint = attempt === 1
  const listed = joinList(points.map((p) => p.label))

  if (slug === "refleksi") {
    const rule = REFLECTION_RULES[tab]
    const axis = rule?.label ?? tab
    if (isHint) {
      return `• Ingat kembali sifat refleksi terhadap ${axis}: ${rule?.hint ?? "koordinat yang tegak lurus sumbu berubah tanda"}. Terapkan pada titik ${listed}.`
    }
    const hasil = points.map((p) => `${p.label} → (${p.bayangan.x}, ${p.bayangan.y})`).join("; ")
    return `• Titik ${listed} direfleksikan terhadap ${axis}: ${rule?.rule ?? "koordinat yang sesuai berubah tanda"}, sehingga bayangannya: ${hasil}.`
  }

  if (isHint) {
    const vektor = points[0]?.bayanganText ?? "yang diberikan"
    return `• Terapkan rumus translasi: titik (x, y) digeser sejauh (a, b) menjadi (x + a, y + b). Jumlahkan koordinat ${listed} dengan komponen translasi ${vektor}.`
  }
  const hasil = points.map((p) => `${p.label} → (${p.bayangan.x}, ${p.bayangan.y})`).join("; ")
  return `• Titik ${listed} ditranslasikan: x' = x + a dan y' = y + b, sehingga bayangannya: ${hasil}.`
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
  const focus = SECTION_FOCUS[context.sectionType] ?? ""
  const lines: string[] = [`• Pelajari kembali bagian ini dengan ${focus}.`]

  const seen = new Set<string>()
  const koordinatGroups = new Map<string, KoordinatPoint[]>()

  for (const item of context.items) {
    const wrong = Object.keys(local.errors).some((k) => k.startsWith(`${item.id}_`))
    if (!wrong) continue
    if (!includeAnsweredUraian && item.type === "uraian" && hasAnswerText(context.answers, item.id)) continue // answered uraian goes to Gemini

    if (item.type === "koordinat") {
      const key = koordinatGroupKey(context.module, context.tab, context.attempt, item.bayangan)
      const group = koordinatGroups.get(key) ?? []
      group.push({ label: item.label, bayangan: item.answer, bayanganText: item.bayangan })
      koordinatGroups.set(key, group)
      continue
    }

    const bullet = buildItemFeedback(item, context.answers, context.attempt)
    if (!bullet) continue
    if (seen.has(bullet)) continue
    seen.add(bullet)
    lines.push(bullet)
  }

  for (const [key, points] of koordinatGroups) {
    void key
    lines.push(buildKoordinatFeedback(points, context.module, context.tab, context.attempt))
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

/** Section-type-aware reinforcement text for a fully correct submission. */
export function feedbackForCorrect(sectionType: string): string {
  const label = SECTION_TYPE_LABELS[sectionType] ?? sectionType
  return `Semua jawaban pada bagian ${label} sudah tepat. Konsep yang kamu pahami sudah sesuai dengan kunci jawaban. Pertahankan dan lanjutkan ke materi selanjutnya.`
}
