import { useTabProgressStore, type TabProgressEntry } from "../store/tabProgressStore"
import type { ModuleSlug } from "../types"

/** Base path for module API routes. */
const MODUL_API = "/api/modul"

/**
 * Fetches tab progress from the server and populates the tabProgressStore.
 * Call this on mount when the user enters a module page.
 */
export async function syncTabProgress(slug: string): Promise<TabProgressEntry[] | null> {
  try {
    const res = await fetch(`${MODUL_API}/${slug}/progress`)
    if (!res.ok) return null
    const json = await res.json()
    if (!json.ok) return null

    const tabs: TabProgressEntry[] = json.data.tabs
    useTabProgressStore.getState().setProgress(slug, tabs)
    return tabs
  } catch {
    return null
  }
}

export interface SectionSyncInput {
  tab: string
  sectionType: "percobaan" | "pengamatan" | "penyimpulan" | "cek-pemahaman"
  attempt: 1 | 2
  answer: Record<string, unknown>
  score?: number | null
  status?: "correct" | "wrong_attempt1" | "wrong_attempt2"
}

/**
 * POSTs a section attempt to the server for persistence.
 * Returns the saved result or null on failure.
 */
export async function syncSectionAttempt(
  slug: ModuleSlug,
  input: SectionSyncInput,
): Promise<{ id: string; status: string; finalScore: number | null } | null> {
  try {
    const res = await fetch(`${MODUL_API}/${slug}/section`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(input),
    })
    if (!res.ok) return null
    const json = await res.json()
    if (!json.ok) return null
    return json.data
  } catch {
    return null
  }
}
