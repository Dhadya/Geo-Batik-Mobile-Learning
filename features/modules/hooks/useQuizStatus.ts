"use client"

import { useQuery } from "@tanstack/react-query"

/** TanStack Query hook to check whether the user has any quiz attempt for a module. */
export function useQuizStatus(slug: string) {
  return useQuery({
    queryKey: ["quizStatus", slug],
    queryFn: async () => {
      const res = await fetch(`/api/modul/${slug}/quiz/status`)
      const json = await res.json()
      if (!json.ok) throw new Error(json.error?.message ?? "Gagal memeriksa status kuis")
      return json.data as { hasAttempt: boolean }
    },
  })
}
