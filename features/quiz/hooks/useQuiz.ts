"use client"

import { useMemo } from "react"
import { useQuizStore } from "../store"
import { getQuizModule, PACKAGE_SIZE } from "../data"
import type { PilihanGandaQuestion } from "../types"

/** Quiz logic hook — derives all state from zustand store + route params. */
export function useQuiz(slug: string, nomor: number) {
  const currentPackage = useQuizStore((s) => s.currentPackage)
  const quiz = getQuizModule(slug)
  const packageQuestions = useMemo(
    () => quiz?.questions.slice(currentPackage * PACKAGE_SIZE, currentPackage * PACKAGE_SIZE + PACKAGE_SIZE) ?? [],
    [quiz, currentPackage],
  )
  const total = packageQuestions.length
  const question: PilihanGandaQuestion | undefined = packageQuestions[nomor - 1]
  const storeAnswers = useQuizStore((s) => s.answers)
  const selectAnswer = useQuizStore((s) => s.selectAnswer)

  const selectedOption = useMemo(() => {
    if (!question) return undefined
    return storeAnswers[question.id]
  }, [storeAnswers, question])

  const answeredCount = Object.keys(storeAnswers).length
  const allAnswered = total > 0 && answeredCount >= total
  const isLast = nomor === total
  const isFirst = nomor === 1
  const answeredIds = packageQuestions
    .map((q) => q.id)
    .filter((id) => storeAnswers[id] !== undefined)

  return {
    quiz,
    question,
    total,
    selectedOption,
    answeredCount,
    allAnswered,
    isLast,
    isFirst,
    answers: storeAnswers,
    answeredIds,
    selectAnswer,
  }
}
