import { create } from "zustand"
import type { QuizAnswers, QuizQuestionAttempt } from "./types"

interface QuizState {
  /** User answers keyed by question id (1-based). */
  answers: QuizAnswers
  /** Snapshot of answers submitted for the current attempt (persists after reset). */
  submittedAnswers: QuizAnswers
  /** Per-question two-attempt tracking. */
  attempts: Record<number, QuizQuestionAttempt>
  /** Select an answer for a question. */
  selectAnswer: (questionId: number, optionIndex: number) => void
  /** Set a free-form answer (for uraian/angka types). */
  setFreeformAnswer: (questionId: number, answer: unknown) => void
  /** Submit current answers — snapshots them then clears in-progress state. */
  submitAnswers: () => void
  /** Record a completed attempt for a single question. */
  recordAttempt: (questionId: number, attempt: Partial<QuizQuestionAttempt>) => void
  /** Clear all answers. */
  resetAnswers: () => void
}

export const useQuizStore = create<QuizState>((set) => ({
  answers: {},
  submittedAnswers: {},
  attempts: {},
  selectAnswer: (questionId, optionIndex) =>
    set((state) => ({
      answers: { ...state.answers, [questionId]: optionIndex },
    })),
  setFreeformAnswer: (questionId, answer) =>
    set((state) => ({
      answers: { ...state.answers, [questionId]: answer as number },
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
  resetAnswers: () => set({ answers: {}, submittedAnswers: {}, attempts: {} }),
}))
