import { create } from "zustand"
import type { QuizAnswers } from "./types"

interface QuizState {
  /** User answers keyed by question id (1-based). */
  answers: QuizAnswers
  /** Select an answer for a question. */
  selectAnswer: (questionId: number, optionIndex: number) => void
  /** Clear all answers. */
  resetAnswers: () => void
}

export const useQuizStore = create<QuizState>((set) => ({
  answers: {},
  selectAnswer: (questionId, optionIndex) =>
    set((state) => ({
      answers: { ...state.answers, [questionId]: optionIndex },
    })),
  resetAnswers: () => set({ answers: {} }),
}))
