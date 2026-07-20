/** Supported quiz question types. */
export const QUIZ_QUESTION_TYPES = ["pilihan_ganda", "uraian", "angka", "campuran"] as const
export type QuizQuestionType = (typeof QUIZ_QUESTION_TYPES)[number]

/** Base fields shared by every question type. */
interface BaseQuizQuestion {
  id: number
  type: QuizQuestionType
  question: string
  module: string
  tab?: string
}

/** Multiple-choice question with selectable options. */
export interface PilihanGandaQuestion extends BaseQuizQuestion {
  type: "pilihan_ganda"
  options: string[]
  correctIndex: number
  explanation: string
}

/** Free-text essay/uraian question. */
export interface UraianQuestion extends BaseQuizQuestion {
  type: "uraian"
  answer: string
  acceptAnswers?: string[]
  explanation: string
}

/** Numeric/coordinate answer question. */
export interface AngkaQuestion extends BaseQuizQuestion {
  type: "angka"
  answer: { x?: number; y?: number; value?: number }
  acceptFormats?: string[]
  explanation: string
}

/** Mixed-type question with sub-questions. */
export interface CampuranQuestion extends BaseQuizQuestion {
  type: "campuran"
  subQuestions: (PilihanGandaQuestion | UraianQuestion | AngkaQuestion)[]
}

/** Discriminated union of all quiz question types. */
export type QuizQuestion = PilihanGandaQuestion | UraianQuestion | AngkaQuestion | CampuranQuestion

/** Quiz module configuration per slug. */
export interface QuizModule {
  slug: string
  title: string
  badge: string
  questions: QuizQuestion[]
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

/** User answer record keyed by question id (backward compat). */
export type QuizAnswers = Record<number, number>
