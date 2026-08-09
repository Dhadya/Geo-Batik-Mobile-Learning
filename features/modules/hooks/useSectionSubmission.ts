"use client"

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import type { QueryKey } from "@tanstack/react-query"
import type { FieldColor } from "@/features/modules/lib/validation"

/** Payload for saving a section attempt. */
export interface SaveSectionInput {
  tab: string
  sectionType: string
  attempt: 1 | 2
  answer: Record<string, unknown>
  score?: number | null
  status?: string
  feedback?: string
  fieldColors?: Record<string, FieldColor>
}

/** Result from saving a section attempt. */
export interface SaveSectionResult {
  id: string
  status: string
  finalScore: number | null
}

/** A single section progress entry. */
export interface SectionProgressEntry {
  tab: string
  sectionType: string
  status: string
  finalScore: number | null
  attempt1Answer: string | null
  attempt1Feedback: string | null
  attempt1Score: number | null
  attempt2Answer: string | null
  attempt2Feedback: string | null
  completedAt: string | null
}

/** Snapshot of section-progress cache entries captured before an optimistic update. */
export interface SectionProgressSnapshot {
  previous: [QueryKey, SectionProgressEntry[] | undefined][]
}

/** Mutates a section attempt submission. */
export function useSubmitSection(slug: string) {
  const queryClient = useQueryClient()
  return useMutation<SaveSectionResult, Error, SaveSectionInput, SectionProgressSnapshot>({
    mutationFn: async (input) => {
      const response = await fetch(`/api/modul/${slug}/section`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(input),
      })
      const body = await response.json()
      if (!body.ok) throw new Error(body.error?.message ?? "Gagal menyimpan")
      return body.data
    },
    onMutate: async (input) => {
      await queryClient.cancelQueries({ queryKey: ["section-progress", slug] })
      const previous = queryClient.getQueriesData<SectionProgressEntry[]>({
        queryKey: ["section-progress", slug],
      })
      queryClient.setQueriesData<SectionProgressEntry[]>(
        { queryKey: ["section-progress", slug] },
        (old) => {
          if (!old) return old
          return old.map((s) =>
            s.tab === input.tab && s.sectionType === input.sectionType
              ? { ...s, status: input.status ?? s.status, finalScore: input.score ?? s.finalScore }
              : s,
          )
        },
      )
      return { previous }
    },
    onError: (_err, _input, context) => {
      context?.previous.forEach(([key, data]) => queryClient.setQueryData(key, data))
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["section-progress", slug] })
      queryClient.invalidateQueries({ queryKey: ["tab-progress", slug] })
    },
  })
}

/** Fetches section progress for a module tab. */
export function useSectionProgress(
  slug: string,
  options?: { tab?: string; sectionType?: string },
) {
  const params = new URLSearchParams()
  if (options?.tab) params.set("tab", options.tab)
  if (options?.sectionType) params.set("sectionType", options.sectionType)
  const qs = params.toString()

  return useQuery<SectionProgressEntry[]>({
    queryKey: ["section-progress", slug, options?.tab, options?.sectionType],
    queryFn: async () => {
      const response = await fetch(`/api/modul/${slug}/section${qs ? `?${qs}` : ""}`, { cache: "no-store" })
      const body = await response.json()
      if (!body.ok) throw new Error(body.error?.message ?? "Gagal memuat progres")
      return body.data?.sections ?? []
    },
    enabled: slug.length > 0,
  })
}
