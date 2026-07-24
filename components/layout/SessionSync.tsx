"use client"

import { useEffect } from "react"
import { authClient } from "@/lib/auth-client"
import { setGlobalUserId } from "@/lib/user-scoped-storage"

/**
 * Syncs the BetterAuth session userId to the user-scoped storage module.
 * Must be rendered inside the root layout (client component) so that
 * Zustand stores can namespace localStorage keys by userId.
 */
export function SessionSync() {
  const { data: session } = authClient.useSession()

  useEffect(() => {
    setGlobalUserId(session?.user?.id ?? null)
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
