"use client"

import { useMutation } from "@tanstack/react-query"
import { validateSection } from "../lib/validation"
import type { SectionItem } from "../types"

/** Input for AI section evaluation. */
export interface EvaluateSectionInput {
  module: string
  tab: string
  sectionType: string
  items: SectionItem[]
  answers: Record<string, Record<string, string>>
  attempt: 1 | 2
}

/** Result from AI section evaluation. */
export interface EvaluateSectionResult {
  isCorrect: boolean
  score: number | null
  feedback: string
  errors: Record<string, string>
}

/**
 * Mutates a section evaluation via the AI endpoint.
 * Falls back to local validation on network or API error.
 */
export function useEvaluateSection() {
  return useMutation<EvaluateSectionResult, Error, EvaluateSectionInput>({
    mutationFn: async (input) => {
      try {
        const response = await fetch("/api/ai/evaluate-section", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(input),
        })
        if (!response.ok) throw new Error(`API ${response.status}`)
        const body = await response.json()
        if (!body.ok) throw new Error(body.error?.message ?? "AI evaluation failed")
        return body.data
      } catch {
        const local = validateSection(input.items, input.answers, undefined)
        const allCorrect = local.correctCount === local.totalItems
        const noneCorrect = local.correctCount === 0
        return {
          isCorrect: allCorrect,
          score: allCorrect ? 100 : noneCorrect ? 0 : 50,
          feedback: allCorrect
            ? "Jawaban kamu benar. Pertahankan pemahamanmu!"
            : "Jawaban kamu belum tepat. Periksa kembali.",
          errors: local.errors ?? {},
        }
      }
    },
  })
}
