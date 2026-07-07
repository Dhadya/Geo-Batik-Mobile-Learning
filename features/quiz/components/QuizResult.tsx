"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useQuizStore } from "../store"
import { getQuizModule } from "../data"
import { QuizResultScore } from "./QuizResultScore"
import { QuizResultExplanation } from "./QuizResultExplanation"
import { QuizResultActions } from "./QuizResultActions"

export function QuizResult({ slug }: { slug: string }) {
  const router = useRouter()
  const answers = useQuizStore((s) => s.answers)
  const quiz = getQuizModule(slug)

  useEffect(() => {
    if (!quiz || Object.keys(answers).length === 0) {
      router.replace(`/modul/${slug}/kuis`)
    }
  }, [answers, quiz, router, slug])

  if (!quiz || Object.keys(answers).length === 0) return null

  const total = quiz.questions.length
  const correctCount = quiz.questions.filter(
    (q) => answers[q.id] === q.correctIndex
  ).length

  return (
    <div className="space-y-6 md:space-y-8">
      <QuizResultScore correctCount={correctCount} total={total} />
      <QuizResultExplanation questions={quiz.questions} answers={answers} />
      <QuizResultActions slug={slug} />
    </div>
  )
}
