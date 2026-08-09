import { getModuleTabs, getSectionsForTab } from "../data"
import { useTabProgressStore, type TabProgressEntry } from "../store/tabProgressStore"
import { useAnswerStore } from "../store/answerStore"
import type { SectionClaim } from "@/lib/schemas"

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

    const tabs: TabProgressEntry[] = json.data?.tabs ?? []
    useTabProgressStore.getState().setProgress(slug, tabs)
    return tabs
  } catch {
    return null
  }
}

/**
 * Builds terminal section claims from the answer store for a given tab.
 * Returns an empty array when the tab is not yet complete.
 */
function buildTerminalClaims(slug: string, tab: string): SectionClaim[] {
  const tabAnswers = useAnswerStore.getState().getTabAnswers(slug, tab)
  const claims: SectionClaim[] = []

  for (const key of getSectionsForTab(slug, tab)) {
    if (key === "cekPemahaman") {
      const cp = tabAnswers.cekPemahaman
      if (cp.status !== "correct" && cp.status !== "wrong_attempt2") return []
      claims.push({
        sectionType: "cek-pemahaman",
        status: cp.status,
        score: cp.score ?? null,
        attempt: cp.attempt ?? 1,
        answer: cp.selections.length > 0 ? { selections: cp.selections } : undefined,
      })
    } else {
      const sec = tabAnswers[key]
      if (sec.status !== "correct" && sec.status !== "wrong_attempt2") return []
      claims.push({
        sectionType: key,
        status: sec.status,
        score: sec.score ?? null,
        attempt: sec.attempt ?? 1,
        answer: sec.fields,
      })
    }
  }

  return claims
}

/**
 * Checks if all sections in the given tab are in terminal state.
 * If yes, POSTs the terminal section claims to /api/modul/[slug]/progress/unlock so the
 * server can reconcile missing rows and unlock the next tab, then updates the local store.
 *
 * Optimistically marks the tab completed and unlocks the next tab in the store before the
 * POST resolves, so the UI updates instantly; rolls back the snapshot on failure.
 */
export async function triggerTabUnlockIfComplete(slug: string, tab: string): Promise<void> {
  const claims = buildTerminalClaims(slug, tab)
  if (claims.length === 0) return

  const tabs = getModuleTabs(slug) ?? []
  const currentIndex = tabs.findIndex((t) => t.value === tab)
  const nextTab = tabs[currentIndex + 1]?.value

  const store = useTabProgressStore.getState()
  const previous = store.getProgress(slug)

  if (previous) {
    store.setProgress(
      slug,
      previous.map((p) => {
        if (p.tab === tab) return { ...p, completed: true }
        if (nextTab && p.tab === nextTab) return { ...p, unlocked: true }
        return p
      }),
    )
  }

  try {
    const res = await fetch(`${MODUL_API}/${slug}/progress/unlock`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ completedTab: tab, sections: claims }),
    })
    const json = await res.json()
    if (!json.ok) {
      console.error("[progressSync] unlock rejected", {
        slug,
        tab,
        code: json?.error?.code,
        message: json?.error?.message,
      })
      if (previous) store.setProgress(slug, previous)
      return
    }

    if (json.data?.progress) {
      store.setProgress(slug, json.data.progress)
    }
  } catch (e) {
    console.error("[progressSync] unlock failed", { slug, tab, error: e })
    if (previous) store.setProgress(slug, previous)
  }
}
