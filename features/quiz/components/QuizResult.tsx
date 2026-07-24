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
  badge,
  icon,
  bgColor,
  serverScore,
  serverAnswers,
  attemptNumber,
  totalAttempts,
}: {
  slug: string
  title: string
  badge: string
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

  const { data: aiFeedback } = useQuizPembahasan(
    quiz?.questions ?? [],
    answers ?? {},
    hasAnswers,
  )

  const isEmpty = !quiz || (!hasAnswers && serverScore == null)
  if (isEmpty && typeof window !== "undefined") {
    router.replace(`/modul/${slug}/kuis`)
    return null
  }

  if (!quiz) return null

  const correctCount = hasAnswers
    ? quiz.questions.slice(0, PACKAGE_SIZE).filter((q) => answers![q.id] === q.correctIndex).length
    : serverScore != null
      ? Math.round((serverScore / 100) * PACKAGE_SIZE)
      : 0

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
    ? `Percobaan Ke-${attemptNumber} — ${attemptNumber === 1 ? "Nilai Akhir" : "Latihan"}`
    : undefined

  return (
    <div className="space-y-6 md:space-y-8">
      <QuizHeader title={title} badge={badge} icon={icon} bgColor={bgColor} description={description} />

      <QuizResultScore score={displayScore} attemptLabel={attemptLabel} />

      {hasAnswers && (
        <QuizResultExplanation questions={quiz.questions.slice(0, PACKAGE_SIZE)} answers={answers!} aiFeedback={aiFeedback} />
      )}
      <QuizResultActions slug={slug} />
    </div>
  )
}
