"use client"

import { useMemo } from "react"
import { useQuizStore } from "../store"
import { getQuizModule } from "../data"
import type { PilihanGandaQuestion } from "../types"

/** Quiz logic hook — derives all state from zustand store + route params. */
export function useQuiz(slug: string, nomor: number) {
  const quiz = getQuizModule(slug)
  const total = quiz?.questions.length ?? 0
  const question: PilihanGandaQuestion | undefined = quiz?.questions[nomor - 1]
  const storeAnswers = useQuizStore((s) => s.answers)
  const selectAnswer = useQuizStore((s) => s.selectAnswer)
  const resetAnswers = useQuizStore((s) => s.resetAnswers)
  const attempts = useQuizStore((s) => s.attempts)

  const selectedOption = useMemo(() => {
    if (!question) return undefined
    return storeAnswers[question.id]
  }, [storeAnswers, question])

  const answeredCount = Object.keys(storeAnswers).length
  const allAnswered = total > 0 && answeredCount >= total
  const isLast = nomor === total
  const isFirst = nomor === 1

  const score = useMemo(() => {
    if (!quiz) return 0
    return quiz.questions.reduce((acc, q) => {
      return storeAnswers[q.id] === q.correctIndex ? acc + 1 : acc
    }, 0)
  }, [quiz, storeAnswers])

  const currentAttempt = useMemo((): 1 | 2 => {
    if (!question) return 1
    const a = attempts[question.id]
    if (!a || a.status === "unanswered") return 1
    if (a.status === "wrong_attempt1") return 2
    return 1
  }, [attempts, question])

  const isLocked = useMemo(() => {
    if (!question) return false
    const a = attempts[question.id]
    return a?.status === "correct_attempt1" || a?.status === "wrong_attempt2"
  }, [attempts, question])

  const feedback = useMemo(() => {
    if (!question) return null
    const a = attempts[question.id]
    if (!a) return null
    if (a.status === "correct_attempt1") return a.attempt1Feedback
    if (a.attempt2Feedback) return a.attempt2Feedback
    if (a.status === "wrong_attempt1") return a.attempt1Feedback
    return null
  }, [attempts, question])

  const isCorrectEvaluation = useMemo(() => {
    if (!question) return null
    const a = attempts[question.id]
    if (!a) return null
    if (a.status === "correct_attempt1") return true
    if (a.status === "wrong_attempt2") return false
    return null
  }, [attempts, question])

  const showCobaLagi = useMemo(() => {
    if (!question) return false
    const a = attempts[question.id]
    return a?.status === "wrong_attempt1"
  }, [attempts, question])

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
    answers: storeAnswers,
    attempts,
    currentAttempt,
    isLocked,
    feedback,
    isCorrectEvaluation,
    showCobaLagi,
    selectAnswer,
    resetAnswers,
  }
}
