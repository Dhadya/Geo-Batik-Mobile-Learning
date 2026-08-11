"use client"

import { useEffect, useRef } from "react"
import { authClient } from "@/lib/auth-client"
import { getQueryClient } from "@/lib/query/client"
import { setGlobalUserId } from "@/lib/user-scoped-storage"
import { useAnswerStore } from "@/features/modules/store/answerStore"
import { useTabProgressStore } from "@/features/modules/store/tabProgressStore"
import { useObservationStore } from "@/features/modules/store/observationStore"
import { useQuizStore } from "@/features/quiz"

/**
 * Syncs the BetterAuth session userId to the user-scoped storage module.
 * Must be rendered inside the root layout (client component) so that
 * Zustand stores can namespace localStorage keys by userId.
 *
 * On userId change, clears all TanStack Query cache and resets in-memory
 * stores so the new user starts with a clean slate.
 */
export function SessionSync() {
  const { data: session } = authClient.useSession()
  const prevUserId = useRef<string | null>(null)

  useEffect(() => {
    const newUserId = session?.user?.id ?? null
    const oldUserId = prevUserId.current

    if (oldUserId !== newUserId) {
      getQueryClient().clear()
      useAnswerStore.getState().resetAll()
      useQuizStore.getState().resetAnswers()
      useTabProgressStore.getState().resetAll()
      useObservationStore.getState().resetAll()

      prevUserId.current = newUserId
    }

    setGlobalUserId(newUserId)
  }, [session?.user?.id])

  // Cross-tab synchronization: when another tab writes to localStorage,
  // rehydrate the Zustand stores so all tabs see the same data.
  useEffect(() => {
    function handleStorageChange(e: StorageEvent) {
      if (!e.key) return
      const isAnswerStore = e.key.startsWith("gematri-module-answers")
      const isQuizStore = e.key.startsWith("gematri-quiz-store")
      if (!isAnswerStore && !isQuizStore) return

      // Lazy import to rehydrate the affected store
      if (isAnswerStore) {
        import("@/features/modules/store/answerStore").then((m) =>
          m.useAnswerStore.persist.rehydrate(),
        )
      }
      if (isQuizStore) {
        import("@/features/quiz/store").then((m) =>
          m.useQuizStore.persist.rehydrate(),
        )
      }
    }

    window.addEventListener("storage", handleStorageChange)
    return () => window.removeEventListener("storage", handleStorageChange)
  }, [])

  return null
}
