"use client"

import { useCallback } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/retroui/Button"
import { MaterialIcon } from "@/components/common/MaterialIcon"
import { useQuizStore } from "@/features/quiz"

interface AttemptRecord {
  attemptNumber: number
  packageId: number
}

const HISTORY_KEY_PREFIX = "gematri-quiz-history-"

function getHistory(slug: string): AttemptRecord[] {
  try {
    const raw = localStorage.getItem(`${HISTORY_KEY_PREFIX}${slug}`)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

function calcNextAttempt(history: AttemptRecord[]): { attemptNumber: number; packageId: number } {
  const attemptNumber = history.length + 1
  if (attemptNumber === 1) {
    return { attemptNumber, packageId: Math.round(Math.random()) as 0 | 1 }
  }
  if (attemptNumber === 2) {
    const used = history[0].packageId
    return { attemptNumber, packageId: used === 0 ? 1 : 0 }
  }
  return { attemptNumber, packageId: Math.round(Math.random()) as 0 | 1 }
}

function saveHistory(slug: string, record: AttemptRecord) {
  const history = getHistory(slug)
  history.push(record)
  localStorage.setItem(`${HISTORY_KEY_PREFIX}${slug}`, JSON.stringify(history))
}

export function KuisStartButton({ slug }: { slug: string }) {
  const router = useRouter()
  const setQuizMeta = useQuizStore((s) => s.setQuizMeta)
  const resetAnswers = useQuizStore((s) => s.resetAnswers)

  const handleStart = useCallback(() => {
    resetAnswers()
    const history = getHistory(slug)
    const { attemptNumber, packageId } = calcNextAttempt(history)
    saveHistory(slug, { attemptNumber, packageId })
    setQuizMeta(attemptNumber, packageId)
    router.push(`/modul/${slug}/kuis/1`)
  }, [slug, router, setQuizMeta, resetAnswers])

  return (
    <Button
      variant="default"
      size="lg"
      className="px-12 md:px-16 py-6 md:py-8 text-xl md:text-2xl font-black uppercase gap-4 md:gap-5"
      onClick={handleStart}
    >
      Mulai Kuis
      <MaterialIcon className="size-7 md:size-8" name="arrow_forward" />
    </Button>
  )
}
