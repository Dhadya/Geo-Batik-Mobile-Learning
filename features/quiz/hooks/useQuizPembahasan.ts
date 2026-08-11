"use client"

import { useQuery } from "@tanstack/react-query"
import type { PilihanGandaQuestion } from "../types"

interface PembahasanEntry {
  questionId: number
  feedback: string
}

/**
 * Fetches AI-generated dynamic pembahasan for all quiz questions based on the student's answers.
 * Falls back to static explanation on failure.
 */
export function useQuizPembahasan(
  questions: PilihanGandaQuestion[],
  answers: Record<number, number>,
  enabled: boolean,
) {
  return useQuery({
    queryKey: ["quizPembahasan", questions.map((q) => q.id).join(","), JSON.stringify(answers)],
    queryFn: async () => {
      const response = await fetch("/api/ai/generate-pembahasan", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ questions, answers }),
      })
      if (response.status === 401 || response.status === 404) {
        window.location.href = "/login"
        throw new Error("Sesi berakhir, silakan masuk kembali")
      }
      const body = await response.json()
      if (!body.ok) throw new Error(body.error?.message ?? "Gagal memuat pembahasan")
      const feedbackMap: Record<number, string> = {}
      for (const entry of body.data.feedback as PembahasanEntry[]) {
        feedbackMap[entry.questionId] = entry.feedback
      }
      return feedbackMap
    },
    enabled: enabled && questions.length > 0 && Object.keys(answers).length > 0,
    staleTime: 5 * 60 * 1000,
    retry: 1,
  })
}
