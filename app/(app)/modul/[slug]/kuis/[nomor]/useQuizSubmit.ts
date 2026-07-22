"use client"

import { useMutation } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { useQuizStore } from "@/features/quiz"

export interface SubmitAllInput {
  answers: {
    questionId: number
    type: string
    attempt1Answer: unknown
    attempt1Correct: unknown
    attempt1Feedback: unknown
    attempt1Score: unknown
    attempt2Answer: unknown
    attempt2Correct: unknown
    attempt2Feedback: unknown
    attempt2Score: unknown
    finalScore: number
    status: string
  }[]
  totalScore: number
  attemptNumber: number
  packageId: number
}

function useQuizSubmitMutation(slug: string) {
  return useMutation({
    mutationFn: async (input: SubmitAllInput) => {
      const response = await fetch(`/api/modul/${slug}/quiz/submit`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(input),
      })
      const body = await response.json()
      if (!body.ok) throw new Error(body.error?.message ?? "Gagal menyimpan kuis")
      return body.data
    },
  })
}

/**
 * Orchestrates all-answers submission for the entire quiz when the user presses "Selesai".
 * Reads all attempts from Zustand, calculates total score, sends to server, and navigates.
 */
export function useQuizSubmit(slug: string) {
  const submitMutation = useQuizSubmitMutation(slug)
  const router = useRouter()

  const handleSelesai = () => {
    const attempts = useQuizStore.getState().attempts
    const allAnswers = Object.entries(attempts).map(([qid, att]) => ({
      questionId: Number(qid),
      type: "pilihan_ganda" as const,
      attempt1Answer: att.attempt1Answer,
      attempt1Correct: att.attempt1Correct,
      attempt1Feedback: att.attempt1Feedback,
      attempt1Score: att.attempt1Score,
      attempt2Answer: att.attempt2Answer,
      attempt2Correct: att.attempt2Correct,
      attempt2Feedback: att.attempt2Feedback,
      attempt2Score: att.attempt2Score,
      finalScore: att.finalScore,
      status: att.status,
    }))

    const totalScore = Math.round(
      Object.values(attempts).reduce((sum, a) => sum + (a.finalScore ?? 0), 0) /
        Math.max(Object.keys(attempts).length, 1)
    )

    const { attemptNumber, currentPackage } = useQuizStore.getState()

    submitMutation.mutate(
      {
        answers: allAnswers,
        totalScore,
        attemptNumber,
        packageId: currentPackage,
      },
      {
        onSuccess: () => {
          useQuizStore.getState().submitAnswers()
          router.push(`/modul/${slug}/kuis/hasil`)
        },
        onError: () => {
          useQuizStore.getState().submitAnswers()
          router.push(`/modul/${slug}/kuis/hasil`)
        },
      }
    )
  }

  return { handleSelesai, isSubmitting: submitMutation.isPending }
}
