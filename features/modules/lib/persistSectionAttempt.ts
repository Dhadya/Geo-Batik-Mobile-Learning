/**
 * Client-side helper to persist a section attempt by POSTing to /api/modul/[slug]/section.
 * Errors are swallowed so local UX is never blocked by a failed network request.
 */
export async function persistSectionAttempt(data: {
  slug: string
  tab: string
  sectionType: string
  attempt: 1 | 2
  answer: Record<string, Record<string, string>>
  feedback: string
  score: number | null
  status: string
}): Promise<void> {
  try {
    const response = await fetch(`/api/modul/${data.slug}/section`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        tab: data.tab,
        sectionType: data.sectionType,
        attempt: data.attempt,
        answer: data.answer as Record<string, unknown>,
        score: data.score,
        status: data.status,
      }),
    })
    if (!response.ok) {
      console.error("[persistSectionAttempt] failed", await response.json())
    }
  } catch (e) {
    console.error("[persistSectionAttempt] network error", e)
  }
}
