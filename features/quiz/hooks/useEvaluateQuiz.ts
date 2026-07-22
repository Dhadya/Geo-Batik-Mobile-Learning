"use client"

import { useMutation } from "@tanstack/react-query"

/** Input for evaluating a quiz question via AI. */
export interface EvaluateQuizInput {
  question: {
    id: number
    type: "pilihan_ganda"
    question: string
    options: string[]
    correctIndex: number
    explanation: string
    module?: string
    tab?: string
    questionMatrix?: string
    questionSuffix?: string
  }
  answer: number
  attempt: 1 | 2
}

/** Result from the AI evaluation. */
export interface EvaluateQuizResult {
  isCorrect: boolean
  score: number
  feedback: string
}

/** Mutates a quiz question evaluation via the AI endpoint. */
export function useEvaluateQuiz() {
  return useMutation<EvaluateQuizResult, Error, EvaluateQuizInput>({
    mutationFn: async (input) => {
      const response = await fetch("/api/ai/evaluate-quiz", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(input),
      })
      const body = await response.json()
      if (!body.ok) throw new Error(body.error?.message ?? "Gagal mengevaluasi jawaban")
      return body.data
    },
  })
}
