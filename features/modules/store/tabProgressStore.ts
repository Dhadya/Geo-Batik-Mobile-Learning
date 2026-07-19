import { create } from "zustand"

/** Server-synced progress entry for a single tab. */
export interface TabProgressEntry {
  tab: string
  unlocked: boolean
  completed: boolean
}

/** Zod schema for tab-level progress from GET /progress. */
interface TabProgressState {
  progress: Record<string, TabProgressEntry[]>

  setProgress: (slug: string, tabs: TabProgressEntry[]) => void
  updateTab: (slug: string, tab: string, updates: Partial<TabProgressEntry>) => void
  getProgress: (slug: string) => TabProgressEntry[] | undefined
  resetAll: () => void
}

/** Zustand store caching tab unlock/completion state fetched from the server. */
export const useTabProgressStore = create<TabProgressState>()((set, get) => ({
  progress: {},

  setProgress: (slug, tabs) => {
    set((s) => ({ progress: { ...s.progress, [slug]: tabs } }))
  },

  updateTab: (slug, tab, updates) => {
    const current = get().progress[slug]
    if (!current) return
    set((s) => ({
      progress: {
        ...s.progress,
        [slug]: current.map((t) => (t.tab === tab ? { ...t, ...updates } : t)),
      },
    }))
  },

  getProgress: (slug) => get().progress[slug],

  resetAll: () => set({ progress: {} }),
}))
