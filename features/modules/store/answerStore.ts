import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"
import {
  createUserScopedStorage,
  getGlobalUserId,
} from "@/lib/user-scoped-storage"

// ── Per-section answer shapes ──

export interface SectionAnswers {
  fields: Record<string, Record<string, string>>
  isChecked: boolean
  aiFeedback?: string
  status?: "unsubmitted" | "correct" | "wrong_attempt1" | "wrong_attempt2" | "locked"
  attempt?: 1 | 2
  /** Numeric score (0–100) from AI evaluation. Only student-visible as color indicator. */
  score?: number | null
}

export interface CekPemahamanAnswers {
  selections: (number | null)[]
  isChecked: boolean
  aiFeedback?: string
  status?: "unsubmitted" | "correct" | "wrong_attempt1" | "wrong_attempt2"
  attempt?: 1 | 2
  /** Numeric score (0–100) from AI evaluation. Only student-visible as color indicator. */
  score?: number | null
}

export interface TabAnswers {
  slug: string
  tab: string
  percobaan: SectionAnswers
  pengamatan: SectionAnswers
  penyimpulan: SectionAnswers
  cekPemahaman: CekPemahamanAnswers
  completedAt?: string
}

type SectionName = "percobaan" | "pengamatan" | "penyimpulan"

// ── Store interface ──

interface AnswerStore {
  answers: Record<string, TabAnswers>

  setField: (
    slug: string,
    tab: string,
    section: SectionName,
    itemId: string,
    fieldKey: string,
    value: string,
  ) => void
  setSelections: (slug: string, tab: string, selections: (number | null)[]) => void
  setChecked: (slug: string, tab: string, section: SectionName, checked: boolean) => void
  setAIFeedback: (slug: string, tab: string, section: SectionName, feedback: string) => void
  setCekPemahamanFeedback: (slug: string, tab: string, feedback: string) => void
  setSectionStatus: (
    slug: string,
    tab: string,
    section: SectionName,
    status: SectionAnswers["status"],
    attempt: 1 | 2,
  ) => void
  /** Set status/attempt for the cekPemahaman section (separate because it uses CekPemahamanAnswers, not SectionAnswers). */
  setCekPemahamanStatus: (
    slug: string,
    tab: string,
    status: CekPemahamanAnswers["status"],
    attempt: 1 | 2,
  ) => void
  /** Set score for a standard section (percobaan/pengamatan/penyimpulan). Score is never shown as raw number — only used for color indicator. */
  setSectionScore: (slug: string, tab: string, section: SectionName, score: number | null) => void
  /** Set score for cekPemahaman section. */
  setCekPemahamanScore: (slug: string, tab: string, score: number | null) => void
  getTabAnswers: (slug: string, tab: string) => TabAnswers
  resetTab: (slug: string, tab: string) => void
  resetAll: () => void
}

/** Create an empty TabAnswers record for a given slug + tab. */
export function emptyTab(slug: string, tab: string): TabAnswers {
  return {
    slug,
    tab,
    percobaan: { fields: {}, isChecked: false, status: "unsubmitted", attempt: 1 },
    pengamatan: { fields: {}, isChecked: false, status: "unsubmitted", attempt: 1 },
    penyimpulan: { fields: {}, isChecked: false, status: "unsubmitted", attempt: 1 },
    cekPemahaman: { selections: [], isChecked: false },
  }
}

/** Persisted state version — bump when the TabAnswers shape changes. */
const ANSWER_STORE_VERSION = 1

/** Zustand store for module answer persistence (localStorage-backed, user-scoped). */
export const useAnswerStore = create<AnswerStore>()(
  persist(
    (set, get) => ({
      answers: {},

      setField: (slug, tab, section, itemId, fieldKey, value) => {
        const id = `${slug}-${tab}`
        const current = get().answers[id] ?? emptyTab(slug, tab)
        const sectionData = current[section] as SectionAnswers

        set({
          answers: {
            ...get().answers,
            [id]: {
              ...current,
              [section]: {
                ...sectionData,
                fields: {
                  ...sectionData.fields,
                  [itemId]: {
                    ...sectionData.fields[itemId],
                    [fieldKey]: value,
                  },
                },
              },
            },
          },
        })
      },

      setSelections: (slug, tab, selections) => {
        const id = `${slug}-${tab}`
        const current = get().answers[id] ?? emptyTab(slug, tab)

        set({
          answers: {
            ...get().answers,
            [id]: {
              ...current,
              cekPemahaman: { ...current.cekPemahaman, selections },
            },
          },
        })
      },

      setCekPemahamanStatus: (slug, tab, status, attempt) => {
        const id = `${slug}-${tab}`
        const current = get().answers[id] ?? emptyTab(slug, tab)
        set({
          answers: {
            ...get().answers,
            [id]: {
              ...current,
              cekPemahaman: { ...current.cekPemahaman, status, attempt, isChecked: true },
            },
          },
        })
      },

      setChecked: (slug, tab, section, checked) => {
        const id = `${slug}-${tab}`
        const current = get().answers[id] ?? emptyTab(slug, tab)

        set({
          answers: {
            ...get().answers,
            [id]: {
              ...current,
              [section]: {
                ...current[section] as SectionAnswers,
                isChecked: checked,
              },
            },
          },
        })
      },

      setAIFeedback: (slug, tab, section, feedback) => {
        const id = `${slug}-${tab}`
        const current = get().answers[id] ?? emptyTab(slug, tab)

        set({
          answers: {
            ...get().answers,
            [id]: {
              ...current,
              [section]: {
                ...current[section] as SectionAnswers,
                aiFeedback: feedback,
              },
            },
          },
        })
      },

      setCekPemahamanFeedback: (slug, tab, feedback) => {
        const id = `${slug}-${tab}`
        const current = get().answers[id] ?? emptyTab(slug, tab)

        set({
          answers: {
            ...get().answers,
            [id]: {
              ...current,
              cekPemahaman: {
                ...current.cekPemahaman,
                aiFeedback: feedback,
              },
            },
          },
        })
      },

      setSectionScore: (slug, tab, section, score) => {
        const id = `${slug}-${tab}`
        const current = get().answers[id] ?? emptyTab(slug, tab)
        const existing = (current[section] as SectionAnswers).score
        const highest = score != null && existing != null ? Math.max(score, existing) : (score ?? existing)
        set({
          answers: {
            ...get().answers,
            [id]: {
              ...current,
              [section]: {
                ...current[section] as SectionAnswers,
                score: highest,
              },
            },
          },
        })
      },

      setCekPemahamanScore: (slug, tab, score) => {
        const id = `${slug}-${tab}`
        const current = get().answers[id] ?? emptyTab(slug, tab)
        const existing = current.cekPemahaman.score
        const highest = score != null && existing != null ? Math.max(score, existing) : (score ?? existing)
        set({
          answers: {
            ...get().answers,
            [id]: {
              ...current,
              cekPemahaman: { ...current.cekPemahaman, score: highest },
            },
          },
        })
      },

      setSectionStatus: (slug, tab, section, status, attempt) => {
        const id = `${slug}-${tab}`
        const current = get().answers[id] ?? emptyTab(slug, tab)
        set({
          answers: {
            ...get().answers,
            [id]: {
              ...current,
              [section]: {
                ...current[section] as SectionAnswers,
                status,
                attempt,
              },
            },
          },
        })
      },

      getTabAnswers: (slug, tab) =>
        get().answers[`${slug}-${tab}`] ?? emptyTab(slug, tab),

      resetTab: (slug, tab) => {
        const key = `${slug}-${tab}`
        const rest = { ...get().answers }
        delete rest[key]
        set({ answers: rest })
      },

      /** Clear in-memory state AND persisted storage. */
      resetAll: () => {
        set({ answers: {} })
        // Also clear the persisted localStorage key so no stale data remains
        const uid = getGlobalUserId()
        const key = uid ? `gematri-module-answers-${uid}` : "gematri-module-answers"
        try {
          localStorage.removeItem(key)
        } catch {
          // localStorage may not be available (SSR, etc.)
        }
      },
    }),
    {
      name: "gematri-module-answers",
      version: ANSWER_STORE_VERSION,
      storage: createJSONStorage(createUserScopedStorage),
      partialize: (state) => ({ answers: state.answers }),
      migrate: (persisted, version) => {
        if (version < ANSWER_STORE_VERSION) {
          // Future: add migration logic here when schema changes
          // For now, the persisted shape is compatible
          return persisted as { answers: Record<string, TabAnswers> }
        }
        return persisted as { answers: Record<string, TabAnswers> }
      },
    },
  ),
)
