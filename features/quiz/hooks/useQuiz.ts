"use client"

import { useQuizStore } from "../store"
import { getQuizModule } from "../data"
import type { QuizQuestion } from "../types"

/** Quiz logic hook — derives all state from zustand store + route params. */
export function useQuiz(slug: string, nomor: number) {
  const quiz = getQuizModule(slug)
  const total = quiz?.questions.length ?? 0
  const question: QuizQuestion | undefined = quiz?.questions[nomor - 1]
  const answers = useQuizStore((s) => s.answers)
  const selectAnswer = useQuizStore((s) => s.selectAnswer)
  const resetAnswers = useQuizStore((s) => s.resetAnswers)

  const selectedOption = question ? answers[question.id] : undefined
  const answeredCount = Object.keys(answers).length
  const allAnswered = total > 0 && answeredCount === total
  const isLast = nomor === total
  const isFirst = nomor === 1

  const score = quiz
    ? quiz.questions.reduce((acc, q) => {
        if (answers[q.id] === q.correctIndex) return acc + 1
        return acc
      }, 0)
    : 0

  return {
    quiz,
    question,
    total,
    selectedOption,
    answeredCount,
    allAnswered,
    isLast,
    isFirst,
    score,
    selectAnswer,
    resetAnswers,
  }
}
