import { handleAuthError } from "@/lib/api/auth-error"
import { toast } from "sonner"

/**
 * Client-side helper to persist a section attempt by POSTing to /api/modul/[slug]/section.
 * - 409 (SECTION_ALREADY_COMPLETED) is silently ignored — already persisted from a prior attempt.
 * - All other errors show a toast notification.
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
        feedback: data.feedback,
      }),
    })

    if (!response.ok) {
      if (response.status === 401) { handleAuthError(new Error("UNAUTHORIZED")); return }
      const json = await response.json().catch(() => null)
      const code = json?.error?.code
      if (response.status === 409 || code === "SECTION_ALREADY_COMPLETED") return
      console.error("[persistSectionAttempt] failed", { status: response.status, code })
      toast.error("Gagal menyimpan jawaban")
    }
  } catch (e) {
    console.error("[persistSectionAttempt] network error", e)
    toast.error("Gagal menyimpan jawaban, periksa koneksi internet")
  }
}
