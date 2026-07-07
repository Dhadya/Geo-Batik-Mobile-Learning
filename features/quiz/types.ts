/** A single multiple-choice quiz question. */
export interface QuizQuestion {
  id: number
  question: string
  options: string[]
  correctIndex: number
}

/** Quiz module configuration per slug. */
export interface QuizModule {
  slug: string
  title: string
  badge: string
  questions: QuizQuestion[]
}

/** User answer record keyed by question id. */
export type QuizAnswers = Record<number, number>
