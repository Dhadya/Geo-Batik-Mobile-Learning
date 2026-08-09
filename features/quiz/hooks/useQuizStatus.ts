"use client"

import { useQuery } from "@tanstack/react-query"

/** Fetches whether the current user has at least one quiz attempt for a module. */
export function useQuizStatus(slug: string) {
  return useQuery<{ hasAttempt: boolean }>({
    queryKey: ["quiz-status", slug],
    queryFn: async () => {
      const response = await fetch(`/api/modul/${slug}/quiz/status`, { cache: "no-store" })
      const body = await response.json()
      if (!body.ok) throw new Error(body.error?.message ?? "Gagal memuat status kuis")
      return body.data
    },
    enabled: slug.length > 0,
  })
}
