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
      className="px-12 md:px-16 py-6 md:py-8 text-xl md:text-2xl font-black uppercase gap-4 md:gap-5"
      onClick={handleStart}
    >
      {sessionStarted ? "Lanjutkan Kuis" : "Mulai Kuis"}
      <MaterialIcon className="size-7 md:size-8" name="arrow_forward" />
    </Button>
  )
}
