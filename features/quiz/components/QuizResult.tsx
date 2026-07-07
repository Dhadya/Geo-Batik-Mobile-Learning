"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import type { ReactNode } from "react"
import { useQuizStore } from "../store"
import { getQuizModule } from "../data"
import { QuizHeader } from "./QuizHeader"
import { QuizResultScore } from "./QuizResultScore"
import { QuizResultExplanation } from "./QuizResultExplanation"
import { QuizResultActions } from "./QuizResultActions"

export function QuizResult({
  slug,
  title,
  badge,
  icon,
  bgColor,
}: {
  slug: string
  title: string
  badge: string
  icon?: ReactNode
  bgColor?: string
}) {
  const router = useRouter()
  const submittedAnswers = useQuizStore((s) => s.submittedAnswers)
  const quiz = getQuizModule(slug)

  useEffect(() => {
    if (!quiz || Object.keys(submittedAnswers).length === 0) {
      router.replace(`/modul/${slug}/kuis`)
    }
  }, [submittedAnswers, quiz, router, slug])

  if (!quiz || Object.keys(submittedAnswers).length === 0) return null

  const total = quiz.questions.length
  const correctCount = quiz.questions.filter(
    (q) => submittedAnswers[q.id] === q.correctIndex
  ).length

  const ratio = correctCount / total
  let description = `Kamu menjawab ${correctCount} dari ${total} soal dengan benar.`
  if (ratio === 1) {
    description = `Sempurna! ${description} Kamu benar-benar menguasai materi ini!`
  } else if (ratio >= 0.7) {
    description = `Bagus! ${description} Terus tingkatkan pemahamanmu!`
  } else if (ratio >= 0.5) {
    description = `Cukup baik. ${description} Pelajari kembali materi yang masih kurang.`
  } else {
    description = `Ayo semangat! ${description} Jangan menyerah, coba ulangi dan pelajari lagi materinya.`
  }

  return (
    <div className="space-y-6 md:space-y-8">
      <QuizHeader title={title} badge={badge} icon={icon} bgColor={bgColor} description={description} />
      <QuizResultScore correctCount={correctCount} total={total} />
      <QuizResultExplanation questions={quiz.questions} answers={submittedAnswers} />
      <QuizResultActions slug={slug} />
    </div>
  )
}
