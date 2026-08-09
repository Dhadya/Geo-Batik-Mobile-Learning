"use client"

import { useQuery } from "@tanstack/react-query"

/** A single quiz result from the server. */
export interface QuizResultItem {
  id: string
  attemptNumber: number
  packageId: number
  totalScore: number
  answers: unknown[]
  completedAt: string | null
}

/** Shape of the quiz result API response. */
export interface QuizResultResponse {
  result: QuizResultItem | null
  allResults: QuizResultItem[]
  finalResult: QuizResultItem | null
}

/** Fetches all quiz results for a module. */
export function useQuizResult(slug: string) {
  return useQuery<QuizResultResponse>({
    queryKey: ["quiz-result", slug],
    queryFn: async () => {
      const response = await fetch(`/api/modul/${slug}/quiz/result`, { cache: "no-store" })
      const body = await response.json()
      if (!body.ok) throw new Error(body.error?.message ?? "Gagal memuat hasil kuis")
      return body.data
    },
  })
}
