"use client"

import { useMutation, useQuery } from "@tanstack/react-query"
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

/** Mutates a section attempt submission. */
export function useSubmitSection(slug: string) {
  return useMutation<SaveSectionResult, Error, SaveSectionInput>({
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
      const response = await fetch(`/api/modul/${slug}/section${qs ? `?${qs}` : ""}`)
      const body = await response.json()
      if (!body.ok) throw new Error(body.error?.message ?? "Gagal memuat progres")
      return body.data?.sections ?? []
    },
    enabled: slug.length > 0,
  })
}
