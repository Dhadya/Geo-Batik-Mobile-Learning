import { create } from "zustand"
import type { QuizAnswers } from "./types"

interface QuizState {
  /** User answers keyed by question id (1-based). */
  answers: QuizAnswers
  /** Snapshot of answers submitted for the current attempt (persists after reset). */
  submittedAnswers: QuizAnswers
  /** Select an answer for a question. */
  selectAnswer: (questionId: number, optionIndex: number) => void
  /** Submit current answers — snapshots them then clears in-progress state. */
  submitAnswers: () => void
  /** Clear all answers. */
  resetAnswers: () => void
}

export const useQuizStore = create<QuizState>((set) => ({
  answers: {},
  submittedAnswers: {},
  selectAnswer: (questionId, optionIndex) =>
    set((state) => ({
      answers: { ...state.answers, [questionId]: optionIndex },
    })),
  submitAnswers: () =>
    set((state) => ({
      submittedAnswers: { ...state.answers },
      answers: {},
    })),
  resetAnswers: () => set({ answers: {}, submittedAnswers: {} }),
}))
