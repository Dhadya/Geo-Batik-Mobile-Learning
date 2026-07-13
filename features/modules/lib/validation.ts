import type {
  SectionItem,
  MatriksItem,
  KoordinatItem,
  UraianItem,
  MemasangkanItem,
  PilihanGandaItem,
} from "../types"

export interface ValidationResult {
  isCorrect: boolean
  errors: Record<string, string>
  summary: string
}

/** Validate all items in a section against stored answers. */
export function validateSection(
  items: SectionItem[],
  fields: Record<string, Record<string, string>>,
  selections?: (number | null)[],
): ValidationResult {
  const errors: Record<string, string> = {}
  let correctCount = 0

  for (let i = 0; i < items.length; i++) {
    const item = items[i]
    const itemAnswers = fields[String(item.id)] ?? {}

    switch (item.type) {
      case "matriks": {
        const m = item as MatriksItem
        const aVal = Number(itemAnswers.a)
        const bVal = Number(itemAnswers.b)
        if (aVal !== m.answer.a) errors[`${item.id}_a`] = "Jawaban belum tepat"
        if (bVal !== m.answer.b) errors[`${item.id}_b`] = "Jawaban belum tepat"
        if (aVal === m.answer.a && bVal === m.answer.b) correctCount++
        break
      }
      case "koordinat": {
        const k = item as KoordinatItem
        const xVal = Number(itemAnswers.x)
        const yVal = Number(itemAnswers.y)
        if (xVal !== k.answer.x) errors[`${item.id}_x`] = "Jawaban belum tepat"
        if (yVal !== k.answer.y) errors[`${item.id}_y`] = "Jawaban belum tepat"
        if (xVal === k.answer.x && yVal === k.answer.y) correctCount++
        break
      }
      case "uraian": {
        const u = item as UraianItem
        const userAns = (itemAnswers.text ?? "").trim().toLowerCase()
        const expected = u.answer.trim().toLowerCase()
        if (!userAns || !expected.split(/[.,;!?]+/).some((p) => p.trim() && userAns.includes(p.trim()))) {
          errors[`${item.id}_text`] = "Jawaban kurang tepat"
        } else {
          correctCount++
        }
        break
      }
      case "memasangkan": {
        const m = item as MemasangkanItem
        const allCorrect = m.leftItems.every(
          (l) => itemAnswers[l.id] === m.correctMatches[l.id],
        )
        for (const [leftId, expectedRightId] of Object.entries(m.correctMatches)) {
          if (itemAnswers[leftId] !== expectedRightId) {
            errors[`${item.id}_${leftId}`] = "Pasangan belum tepat"
          }
        }
        if (allCorrect) correctCount++
        break
      }
      case "pilihan_ganda": {
        const pg = item as PilihanGandaItem
        if (pg.multiSelect && pg.correctIndices) {
          const selectedStr = fields[String(pg.id)]?.selected ?? ""
          const selected = selectedStr ? selectedStr.split(",").map(Number) : []
          const correct = selected.length === pg.correctIndices.length &&
            pg.correctIndices.every((v) => selected.includes(v))
          if (correct) {
            correctCount++
          } else {
            errors[`${pg.id}_selection`] = "Jawaban kurang tepat"
          }
        } else if (selections !== undefined) {
          const idx = selections[i] ?? -1
          if (idx === pg.correctIndex) {
            correctCount++
          } else {
            errors[`${pg.id}_selection`] = "Jawaban kurang tepat"
          }
        } else {
          const idx = fields[String(pg.id)]?.selected !== undefined
            ? Number(fields[String(pg.id)].selected)
            : -1
          if (idx === pg.correctIndex) {
            correctCount++
          } else {
            errors[`${pg.id}_selection`] = "Jawaban kurang tepat"
          }
        }
        break
      }
    }
  }

  return {
    isCorrect: Object.keys(errors).length === 0,
    errors,
    summary:
      correctCount === items.length
        ? "Semua jawaban benar!"
        : `${correctCount}/${items.length} jawaban benar`,
  }
}
