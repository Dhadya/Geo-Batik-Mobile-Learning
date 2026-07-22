"use client"

import { useCallback, useState } from "react"
import { useQuizStore } from "@/features/quiz"
import { useEvaluateQuiz } from "@/features/quiz/hooks/useEvaluateQuiz"
import type { PilihanGandaQuestion } from "@/features/quiz/types"

/**
 * Manages per-question AI evaluation, attempt tracking, and retry.
 *
 * Accepts the current question object and initialises local overrides from the
 * `useQuiz` hook values so local state can diverge after the user acts.
 */
export function useQuizQuestion(
  question: PilihanGandaQuestion | undefined,
  initialAttempt: 1 | 2,
  initialLocked: boolean,
  initialShowCobaLagi: boolean,
) {
  const [evaluating, setEvaluating] = useState(false)
  const [localFeedback, setLocalFeedback] = useState<string | null>(null)
  const [localIsCorrect, setLocalIsCorrect] = useState<boolean | null>(null)
  const [localAttempt, setLocalAttempt] = useState<1 | 2>(initialAttempt)
  const [localLocked, setLocalLocked] = useState(initialLocked)
  const [localShowCobaLagi, setLocalShowCobaLagi] = useState(initialShowCobaLagi)

  const evaluateMutation = useEvaluateQuiz()

  /**
   * Submit the current answer for AI evaluation.
   * @param selectedOption — the index of the option chosen by the user
   * @param attempt — the current attempt number (1 or 2)
   */
  const handleSubmit = useCallback(
    async (selectedOption: number | undefined, attempt: 1 | 2) => {
      if (!question || evaluating || localLocked) return
      if (selectedOption === undefined) return

      setEvaluating(true)
      try {
        const result = await evaluateMutation.mutateAsync({
          question,
          answer: selectedOption,
          attempt,
        })

        setLocalFeedback(result.feedback)
        setLocalIsCorrect(result.isCorrect)

        const attemptField = attempt === 1 ? "attempt1" : "attempt2"
        useQuizStore.getState().recordAttempt(question.id, {
          [`${attemptField}Answer`]: selectedOption,
          [`${attemptField}Correct`]: result.isCorrect,
          [`${attemptField}Feedback`]: result.feedback,
          [`${attemptField}Score`]: result.score,
          finalScore: result.isCorrect ? 100 : 0,
          status: result.isCorrect
            ? ("correct_attempt1" as const)
            : attempt === 1
              ? ("wrong_attempt1" as const)
              : ("wrong_attempt2" as const),
        })

        if (result.isCorrect) {
          setLocalLocked(true)
          setLocalShowCobaLagi(false)
        } else if (attempt === 1) {
          setLocalAttempt(2)
          setLocalShowCobaLagi(true)
        } else {
          setLocalLocked(true)
          setLocalShowCobaLagi(false)
        }
      } catch {
        setLocalFeedback("Gagal mengevaluasi jawaban. Silakan coba lagi.")
      } finally {
        setEvaluating(false)
      }
    },
    [question, evaluating, localLocked, evaluateMutation],
  )

  /** Reset to allow the second attempt. */
  const handleCobaLagi = useCallback(() => {
    setLocalFeedback(null)
    setLocalIsCorrect(null)
    setLocalShowCobaLagi(false)
  }, [])

  return {
    evaluating,
    localFeedback,
    localIsCorrect,
    localAttempt,
    localLocked,
    localShowCobaLagi,
    handleSubmit,
    handleCobaLagi,
  }
}
