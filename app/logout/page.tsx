"use client"

import { useEffect } from "react"
import { signOut } from "@/lib/auth-client"
import { getQueryClient } from "@/lib/query/client"
import { useAnswerStore } from "@/features/modules/store/answerStore"
import { useTabProgressStore } from "@/features/modules/store/tabProgressStore"
import { useObservationStore } from "@/features/modules/store/observationStore"
import { useQuizStore } from "@/features/quiz"
import { Text } from "@/components/retroui/Text"

/** Auto sign-out page — navigates here to force logout even when UI is stuck. */
export default function LogoutPage() {
  useEffect(() => {
    getQueryClient().clear()
    useAnswerStore.getState().resetAll()
    useQuizStore.getState().resetAnswers()
    useTabProgressStore.getState().resetAll()
    useObservationStore.getState().resetAll()
    signOut({ fetchOptions: { onSuccess: () => { window.location.href = "/login" } } })
  }, [])

  return (
    <div className="min-h-screen flex items-center justify-center">
      <Text className="text-lg font-bold">Keluar dari sesi...</Text>
    </div>
  )
}
