import { create } from "zustand"
import { persist } from "zustand/middleware"

// ── Per-section answer shapes ──

export interface SectionAnswers {
  fields: Record<string, Record<string, string>>
  isChecked: boolean
  aiFeedback?: string
}

export interface CekPemahamanAnswers {
  selections: (number | null)[]
  isChecked: boolean
  aiFeedback?: string
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
  getTabAnswers: (slug: string, tab: string) => TabAnswers
  resetTab: (slug: string, tab: string) => void
  resetAll: () => void
}

/** Create an empty TabAnswers record for a given slug + tab. */
export function emptyTab(slug: string, tab: string): TabAnswers {
  return {
    slug,
    tab,
    percobaan: { fields: {}, isChecked: false },
    pengamatan: { fields: {}, isChecked: false },
    penyimpulan: { fields: {}, isChecked: false },
    cekPemahaman: { selections: [], isChecked: false },
  }
}

/** Zustand store for module answer persistence (localStorage-backed). */
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

      getTabAnswers: (slug, tab) =>
        get().answers[`${slug}-${tab}`] ?? emptyTab(slug, tab),

      resetTab: (slug, tab) => {
        const key = `${slug}-${tab}`
        const rest = { ...get().answers }
        delete rest[key]
        set({ answers: rest })
      },

      resetAll: () => set({ answers: {} }),
    }),
    {
      name: "gematri-module-answers",
      partialize: (state) => ({ answers: state.answers }),
    },
  ),
)
