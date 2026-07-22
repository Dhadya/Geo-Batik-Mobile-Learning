"use client"

import { useMutation } from "@tanstack/react-query"

/** Input for AI section evaluation. */
export interface EvaluateSectionInput {
  module: string
  tab: string
  sectionType: string
  items: unknown[]
  answers: Record<string, Record<string, string>>
  attempt: 1 | 2
}

/** Result from AI section evaluation. */
export interface EvaluateSectionResult {
  isCorrect: boolean
  score: number | null
  feedback: string
}

/** Mutates a section evaluation via the AI endpoint. */
export function useEvaluateSection() {
  return useMutation<EvaluateSectionResult, Error, EvaluateSectionInput>({
    mutationFn: async (input) => {
      const response = await fetch("/api/ai/evaluate-section", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(input),
      })
      const body = await response.json()
      if (!body.ok) throw new Error(body.error?.message ?? "Gagal mengevaluasi")
      return body.data
    },
  })
}
