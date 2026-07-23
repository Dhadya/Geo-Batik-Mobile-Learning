import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { QuizAnswers, QuizQuestionAttempt } from "./types"

interface QuizState {
  /** User answers keyed by question id (1-based). */
  answers: QuizAnswers
  /** Snapshot of answers submitted for the current attempt. */
  submittedAnswers: QuizAnswers
  /** Per-question two-attempt tracking. */
  attempts: Record<number, QuizQuestionAttempt>
  /** Current quiz attempt number (1, 2, 3, ...). */
  attemptNumber: number
  /** Assigned package: 0 = Paket 1, 1 = Paket 2. */
  currentPackage: number
  /** True after setQuizMeta is called by KuisStartButton. Used to detect direct URL entry. */
  sessionStarted: boolean
  /** Select an answer for a question. */
  selectAnswer: (questionId: number, optionIndex: number) => void
  /** Submit current answers — snapshots them then clears in-progress state. */
  submitAnswers: () => void
  /** Record a completed attempt for a single question. */
  recordAttempt: (questionId: number, attempt: Partial<QuizQuestionAttempt>) => void
  /** Set the current attempt number and package. */
  setQuizMeta: (attemptNumber: number, currentPackage: number) => void
  /** Clear all answers. */
  resetAnswers: () => void
}

export const useQuizStore = create<QuizState>()(
  persist(
    (set) => ({
      answers: {},
      submittedAnswers: {},
      attempts: {},
      attemptNumber: 1,
      currentPackage: 0,
      sessionStarted: false,
      selectAnswer: (questionId, optionIndex) =>
        set((state) => ({
          answers: { ...state.answers, [questionId]: optionIndex },
        })),
      submitAnswers: () =>
        set((state) => ({
          submittedAnswers: { ...state.answers },
          answers: {},
        })),
      recordAttempt: (questionId, attempt) =>
        set((state) => ({
          attempts: {
            ...state.attempts,
            [questionId]: {
              ...(state.attempts[questionId] ?? {
                questionId,
                attempt1Answer: null,
                attempt1Correct: null,
                attempt1Feedback: null,
                attempt1Score: null,
                attempt2Answer: null,
                attempt2Correct: null,
                attempt2Feedback: null,
                attempt2Score: null,
                finalScore: 0,
                status: "unanswered" as const,
              }),
              ...attempt,
            },
          },
        })),
      setQuizMeta: (attemptNumber, currentPackage) =>
        set({ attemptNumber, currentPackage, sessionStarted: true }),
      resetAnswers: () => set({ answers: {}, submittedAnswers: {}, attempts: {}, attemptNumber: 1, currentPackage: 0, sessionStarted: false }),
    }),
    { name: "gematri-quiz-store" },
  ),
)
