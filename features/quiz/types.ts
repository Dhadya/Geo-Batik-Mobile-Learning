/** Multiple-choice question. */
export interface PilihanGandaQuestion {
  id: number
  type: "pilihan_ganda"
  question: string
  module: string
  tab?: string
  options: string[]
  correctIndex: number
  explanation: string
  /** Matrix/vector displayed inline in question (format: "a,b" → vertical 2×1). */
  questionMatrix?: string
  /** Text appended after the matrix display. */
  questionSuffix?: string
  /** Per-option matrix values for options that render as vertical 2×1 vectors (key: option index). */
  optionMatrices?: Record<number, string>
}

/** Quiz module configuration per slug. */
export interface QuizModule {
  slug: string
  title: string
  badge: string
  questions: PilihanGandaQuestion[]
}

/** User answer record keyed by question id. */
export type QuizAnswers = Record<number, number>
