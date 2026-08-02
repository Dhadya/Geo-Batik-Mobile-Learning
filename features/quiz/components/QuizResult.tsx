"use client"

import { useRouter } from "next/navigation"
import type { ReactNode } from "react"
import { useQuizStore } from "../store"
import { getQuizModule, PACKAGE_SIZE } from "../data"
import { useQuizPembahasan } from "../hooks/useQuizPembahasan"
import { QuizHeader } from "./QuizHeader"
import { QuizResultScore } from "./QuizResultScore"
import { QuizResultExplanation } from "./QuizResultExplanation"
import { QuizResultActions } from "./QuizResultActions"
import type { QuizAnswers } from "../types"

export function QuizResult({
  slug,
  title,
  icon,
  bgColor,
  serverScore,
  serverAnswers,
  attemptNumber,
  totalAttempts,
}: {
  slug: string
  title: string
  icon?: ReactNode
  bgColor?: string
  serverScore?: number | null
  serverAnswers?: QuizAnswers
  attemptNumber?: number | null
  totalAttempts?: number
}) {
  const router = useRouter()
  const submittedAnswers = useQuizStore((s) => s.submittedAnswers)
  const quiz = getQuizModule(slug)

  // Use submittedAnswers (live) or serverAnswers (history navigation)
  const answers = Object.keys(submittedAnswers).length > 0 ? submittedAnswers : serverAnswers
  const hasAnswers = answers != null && Object.keys(answers).length > 0

  // Resolve which package (0 or 1) the student actually answered — the answers'
  // question ids only match one slice, so a mismatched package would show
  // "Tidak dijawab" for every question.
  const packageIndex = (() => {
    if (!quiz || !hasAnswers) return 0
    const keySet = new Set(Object.keys(answers ?? {}).map(Number))
    let best = 0
    let bestMatch = -1
    for (let p = 0; p * PACKAGE_SIZE < quiz.questions.length; p++) {
      const slice = quiz.questions.slice(p * PACKAGE_SIZE, p * PACKAGE_SIZE + PACKAGE_SIZE)
      const match = slice.filter((q) => keySet.has(q.id)).length
      if (match > bestMatch) {
        bestMatch = match
        best = p
      }
    }
    return best
  })()
  const packageQuestions = quiz?.questions.slice(
    packageIndex * PACKAGE_SIZE,
    packageIndex * PACKAGE_SIZE + PACKAGE_SIZE,
  ) ?? []

  const { data: aiFeedback } = useQuizPembahasan(
    packageQuestions,
    answers ?? {},
    hasAnswers,
  )

  const isEmpty = !quiz || (!hasAnswers && serverScore == null)
  if (isEmpty && typeof window !== "undefined") {
    router.replace(`/modul/${slug}/kuis`)
    return null
  }

  if (!quiz) return null

  const correctCount = (() => {
    if (hasAnswers) {
      // Use actual answers (live submitted or server stored) to calculate correct count
      return packageQuestions.filter((q) => answers![q.id] === q.correctIndex).length
    }
    if (serverScore != null) {
      // Fallback: derive from server score when no answers available
      return Math.round((serverScore / 100) * PACKAGE_SIZE)
    }
    // No answers and no score available
    return 0
  })()

  const displayScore = serverScore ?? (hasAnswers ? Math.round((correctCount / PACKAGE_SIZE) * 100) : null)

  const scoreForDescription = displayScore ?? 0
  const ratio = scoreForDescription / 100

  let description = `Kamu menjawab ${correctCount} dari ${PACKAGE_SIZE} soal dengan benar.`
  if (ratio === 1) {
    description = `Sempurna! ${description} Kamu benar-benar menguasai materi ini!`
  } else if (ratio >= 0.7) {
    description = `Bagus! ${description} Terus tingkatkan pemahamanmu!`
  } else if (ratio >= 0.5) {
    description = `Cukup baik. ${description} Pelajari kembali materi yang masih kurang.`
  } else {
    description = `Ayo semangat! ${description} Jangan menyerah, coba ulangi dan pelajari lagi materinya.`
  }

  const attemptLabel = attemptNumber != null && totalAttempts != null && totalAttempts > 0
    ? (() => {
        if (attemptNumber === 1) return "Percobaan Pertama"
        if (totalAttempts === 1) return "Percobaan Pertama"
        if (attemptNumber === totalAttempts)
          return `Percobaan Ke-${attemptNumber} (Akhir)`
        return `Percobaan Ke-${attemptNumber} (Latihan)`
      })()
    : undefined

  return (
    <div className="space-y-4 md:space-y-6">
      <QuizHeader title={title} icon={icon} bgColor={bgColor} description={description} />

      <QuizResultScore score={displayScore} attemptLabel={attemptLabel} />

      {hasAnswers && (
        <QuizResultExplanation questions={packageQuestions} answers={answers!} aiFeedback={aiFeedback} />
      )}
      <QuizResultActions slug={slug} />
    </div>
  )
}
