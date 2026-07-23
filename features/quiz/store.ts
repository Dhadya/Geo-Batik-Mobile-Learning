import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"
import {
  createUserScopedStorage,
  getGlobalUserId,
} from "@/lib/user-scoped-storage"
import type { QuizAnswers } from "./types"

interface QuizState {
  /** User answers keyed by question id (1-based). */
  answers: QuizAnswers
  /** Snapshot of answers submitted for the current attempt. */
  submittedAnswers: QuizAnswers
  /** Current quiz attempt number (1, 2, 3, ...). */
  attemptNumber: number
  /** Assigned package: 0 = Paket 1, 1 = Paket 2. */
  currentPackage: number
  /** True after setQuizMeta is called by KuisStartButton. Used to detect direct URL entry. */
  sessionStarted: boolean
  /** Persisted attempt history — replaces localStorage-based tracking. */
  history: { attemptNumber: number; packageId: number }[]
  /** Select an answer for a question. */
  selectAnswer: (questionId: number, optionIndex: number) => void
  /** Submit current answers — snapshots them then clears in-progress state. */
  submitAnswers: () => void
  /** Set the current attempt number and package. */
  setQuizMeta: (attemptNumber: number, currentPackage: number) => void
  /** Add a history entry and clear answers for a new attempt. */
  startNewAttempt: (attemptNumber: number, packageId: number) => void
  /** Clear all answers and persisted storage. */
  resetAnswers: () => void
}

/** Persisted state version — bump when the QuizState shape changes. */
const QUIZ_STORE_VERSION = 1

export const useQuizStore = create<QuizState>()(
  persist(
    (set) => ({
      answers: {},
      submittedAnswers: {},
      attemptNumber: 1,
      currentPackage: 0,
      sessionStarted: false,
      history: [],
      selectAnswer: (questionId, optionIndex) =>
        set((state) => ({
          answers: { ...state.answers, [questionId]: optionIndex },
        })),
      submitAnswers: () =>
        set((state) => ({
          submittedAnswers: { ...state.answers },
          answers: {},
          sessionStarted: false,
        })),
      setQuizMeta: (attemptNumber, currentPackage) =>
        set({ attemptNumber, currentPackage, sessionStarted: true }),
      startNewAttempt: (attemptNumber, packageId) =>
        set((state) => ({
          answers: {},
          submittedAnswers: {},
          attemptNumber,
          currentPackage: packageId,
          sessionStarted: true,
          history: [...state.history, { attemptNumber, packageId }],
        })),
      /** Clear in-memory state AND persisted storage. */
      resetAnswers: () => {
        set({
          answers: {},
          submittedAnswers: {},
          attemptNumber: 1,
          currentPackage: 0,
          sessionStarted: false,
          history: [],
        })
        const uid = getGlobalUserId()
        const key = uid ? `gematri-quiz-store-${uid}` : "gematri-quiz-store"
        try {
          localStorage.removeItem(key)
        } catch {
          // localStorage may not be available
        }
      },
    }),
    {
      name: "gematri-quiz-store",
      version: QUIZ_STORE_VERSION,
      storage: createJSONStorage(createUserScopedStorage),
      migrate: (persisted, version) => {
        if (version < QUIZ_STORE_VERSION) {
          return persisted as Omit<QuizState, "selectAnswer" | "submitAnswers" | "setQuizMeta" | "startNewAttempt" | "resetAnswers">
        }
        return persisted as Omit<QuizState, "selectAnswer" | "submitAnswers" | "setQuizMeta" | "startNewAttempt" | "resetAnswers">
      },
    },
  ),
)
