"use client"

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

/** A single tab progress entry. */
export interface TabProgressEntry {
  tab: string
  unlocked: boolean
  completed: boolean
}

/** Fetches tab progress for a module. */
export function useTabProgress(slug: string) {
  return useQuery<TabProgressEntry[]>({
    queryKey: ["tab-progress", slug],
    queryFn: async () => {
      const response = await fetch(`/api/modul/${slug}/progress`, { cache: "no-store" })
      if (response.status === 401 || response.status === 404) {
        window.location.href = "/login"
        throw new Error("Sesi berakhir, silakan masuk kembali")
      }
      const body = await response.json()
      if (!body.ok) throw new Error(body.error?.message ?? "Gagal memuat progres tab")
      return body.data.tabs
    },
    enabled: slug.length > 0,
    staleTime: 30000,
  })
}

/** Payload for unlocking the next tab. */
export interface UnlockTabInput {
  completedTab: string
}

/** Result from unlocking a tab. */
export interface UnlockTabResult {
  unlockedTab: string | null
  progress: TabProgressEntry[]
}

/** Mutates tab unlock for a module. */
export function useUnlockTab(slug: string) {
  const queryClient = useQueryClient()
  return useMutation<UnlockTabResult, Error, UnlockTabInput>({
    mutationFn: async (input) => {
      const response = await fetch(`/api/modul/${slug}/progress/unlock`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(input),
      })
      if (response.status === 401 || response.status === 404) {
        window.location.href = "/login"
        throw new Error("Sesi berakhir, silakan masuk kembali")
      }
      const body = await response.json()
      if (!body.ok) throw new Error(body.error?.message ?? "Gagal membuka tab")
      return body.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tab-progress", slug] })
      queryClient.invalidateQueries({ queryKey: ["section-progress", slug] })
    },
  })
}
