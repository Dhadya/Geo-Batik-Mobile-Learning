"use client"

import { useCallback } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/retroui/Button"
import { MaterialIcon } from "@/components/common/MaterialIcon"
import { useQuizStore } from "@/features/quiz"

function calcNextAttempt(history: { attemptNumber: number; packageId: number }[]): {
  attemptNumber: number
  packageId: number
} {
  const attemptNumber = history.length + 1
  if (attemptNumber <= 1) {
    return { attemptNumber, packageId: Math.round(Math.random()) as 0 | 1 }
  }
  const prev = history[0]
  if (attemptNumber === 2 && prev) {
    return { attemptNumber, packageId: prev.packageId === 0 ? 1 : 0 }
  }
  return { attemptNumber, packageId: Math.round(Math.random()) as 0 | 1 }
}

export function KuisStartButton({ slug }: { slug: string }) {
  const router = useRouter()
  const startNewAttempt = useQuizStore((s) => s.startNewAttempt)
  const history = useQuizStore((s) => s.history)
  const sessionStarted = useQuizStore((s) => s.sessionStarted)
  const answers = useQuizStore((s) => s.answers)

  // A resumable attempt only exists once the user has saved at least one answer.
  const hasInProgressAttempt = sessionStarted && Object.keys(answers).length > 0

  const handleStart = useCallback(() => {
    if (sessionStarted) {
      router.push(`/modul/${slug}/kuis/1`)
      return
    }
    const { attemptNumber, packageId } = calcNextAttempt(history)
    startNewAttempt(attemptNumber, packageId)
    router.push(`/modul/${slug}/kuis/1`)
  }, [slug, router, history, startNewAttempt, sessionStarted])

  return (
    <Button
      variant="default"
      size="lg"
      className="px-6 md:px-8 py-3 md:py-4 text-base md:text-lg font-black uppercase gap-3 md:gap-4"
      onClick={handleStart}
    >
      {hasInProgressAttempt ? "Lanjutkan Kuis" : "Mulai Kuis"}
      <MaterialIcon className="size-5 md:size-6" name="arrow_forward" />
    </Button>
  )
}
