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
}

/** Quiz module configuration per slug. */
export interface QuizModule {
  slug: string
  title: string
  badge: string
  questions: PilihanGandaQuestion[]
}

/** Per-question attempt tracking state. */
export interface QuizQuestionAttempt {
  questionId: number
  attempt1Answer: unknown | null
  attempt1Correct: boolean | null
  attempt1Feedback: string | null
  attempt1Score: number | null
  attempt2Answer: unknown | null
  attempt2Correct: boolean | null
  attempt2Feedback: string | null
  attempt2Score: number | null
  finalScore: number
  status: "unanswered" | "correct_attempt1" | "wrong_attempt1" | "wrong_attempt2"
}

/** User answer record keyed by question id. */
export type QuizAnswers = Record<number, number>
