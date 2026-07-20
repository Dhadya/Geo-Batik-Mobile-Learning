import { useTabProgressStore, type TabProgressEntry } from "../store/tabProgressStore"
import { useAnswerStore } from "../store/answerStore"

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

/**
 * Checks if all sections in the given tab are in terminal state.
 * If yes, POSTs to /api/modul/[slug]/progress/unlock and updates the local store.
 */
export async function triggerTabUnlockIfComplete(slug: string, tab: string): Promise<void> {
  const tabAnswers = useAnswerStore.getState().getTabAnswers(slug, tab)

  const sections = slug === "refleksi" && tab === "bangun"
    ? (["pengamatan", "percobaan", "cekPemahaman"] as const)
    : (["pengamatan", "percobaan", "penyimpulan", "cekPemahaman"] as const)

  const allDone = sections.every((s) => {
    if (s === "cekPemahaman") return tabAnswers.cekPemahaman.isChecked
    const sec = tabAnswers[s]
    return sec.status === "correct" || sec.status === "wrong_attempt2"
  })

  if (!allDone) return

  try {
    const res = await fetch(`${MODUL_API}/${slug}/progress/unlock`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ completedTab: tab }),
    })
    const json = await res.json()
    if (!json.ok) return

    if (json.data?.progress) {
      useTabProgressStore.getState().setProgress(slug, json.data.progress)
    }
  } catch {
    // best-effort — never blocks the user
  }
}
