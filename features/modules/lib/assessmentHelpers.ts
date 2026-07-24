import type { AssessmentQuestion, PilihanGandaItem } from "../types"

/** Option label letters A–F. */
export const LABELS = ["A", "B", "C", "D", "E", "F"]

/** Count number of set bits in a bitmap. */
export function countBits(n: number): number {
  let c = 0
  while (n) {
    c += n & 1
    n >>= 1
  }
  return c
}

/** Convert selections to the fields format expected by evaluateSection — uses question ID as key. */
export function selectionsToFields(
  sel: (number | null)[],
  questions: AssessmentQuestion[],
): Record<string, Record<string, string>> {
  const fields: Record<string, Record<string, string>> = {}
  sel.forEach((s, qi) => {
    if (s != null && questions[qi]) {
      fields[String(questions[qi].id)] = { selected: String(s) }
    }
  })
  return fields
}

/** Convert AssessmentQuestion[] to PilihanGandaItem[] for AI evaluation. */
export function toSectionItems(qs: AssessmentQuestion[]): PilihanGandaItem[] {
  return qs.map((q) => ({
    id: q.id,
    type: "pilihan_ganda" as const,
    question: q.question,
    options: q.options,
    correctIndex: q.correctIndex,
    optionFormat: q.optionFormat,
    imageOptions: q.imageOptions,
    multiSelect: q.multiSelect,
    correctIndices: q.correctIndices,
    questionImage: q.questionImage,
    questionMatrix: q.questionMatrix,
    questionSuffix: q.questionSuffix,
  }))
}

/** Compute local validation errors for display. */
export function computeErrors(
  sel: (number | null)[],
  qs: AssessmentQuestion[],
): Record<string, boolean> {
  const errs: Record<string, boolean> = {}
  qs.forEach((q, qi) => {
    if (q.multiSelect && q.correctIndices) {
      const bitmap = Number(sel[qi] ?? 0)
      const correct =
        q.correctIndices.every((ci: number) => bitmap & (1 << ci)) &&
        q.correctIndices.length === countBits(bitmap)
      if (!correct) errs[`${q.id}`] = true
    } else if (sel[qi] !== q.correctIndex) {
      errs[`${q.id}`] = true
    }
  })
  return errs
}
