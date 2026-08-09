"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query"

/** Single question answer data sent to the server. */
export interface QuizAnswerPayload {
  questionId: number
  type: "pilihan_ganda" | "uraian" | "angka" | "campuran"
  attempt1Answer: unknown | null
  attempt1Correct: boolean | null
  attempt1Feedback: string | null
  attempt1Score: number | null
  attempt2Answer: unknown | null
  attempt2Correct: boolean | null
  attempt2Feedback: string | null
  attempt2Score: number | null
  finalScore: number
  status: "correct_attempt1" | "wrong_attempt1" | "wrong_attempt2"
}

/** Input for submitting all quiz answers. */
export interface SubmitQuizInput {
  answers: QuizAnswerPayload[]
  totalScore: number
  attemptNumber: number
  packageId: number
}

/** Result returned from the server after saving. */
export interface SubmitQuizResult {
  id: string
  totalScore: number
  attemptNumber: number
}

/** Mutates quiz submission for a given module. */
export function useSubmitQuiz(slug: string) {
  const queryClient = useQueryClient()
  return useMutation<SubmitQuizResult, Error, SubmitQuizInput>({
    mutationFn: async (input) => {
      const response = await fetch(`/api/modul/${slug}/quiz/submit`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(input),
      })
      const body = await response.json()
      if (!body.ok) throw new Error(body.error?.message ?? "Gagal menyimpan kuis")
      return body.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["quiz-result", slug] })
      queryClient.invalidateQueries({ queryKey: ["quiz-status", slug] })
    },
  })
}
