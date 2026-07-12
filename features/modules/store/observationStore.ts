import { create } from "zustand"
import type { TranslasiTitikData, TranslasiBangunData } from "@/lib/schemas"

/** Centralized state for observation panel sandbox, titik, bangun, and mock forms. */
interface ObservationState {
  sandboxX: string
  sandboxY: string
  notes: string

  titikForm: Partial<Record<keyof TranslasiTitikData, string>>
  titikErrors: Partial<Record<keyof TranslasiTitikData, string>>
  isTitikChecked: boolean

  bangunForm: Partial<Record<keyof TranslasiBangunData, string>>
  bangunErrors: Partial<Record<keyof TranslasiBangunData, string>>
  isBangunChecked: boolean

  mockAns: string
  mockError: string
  isMockChecked: boolean

  setSandboxX: (val: string) => void
  setSandboxY: (val: string) => void
  setNotes: (val: string) => void
  setTitikForm: (val: Partial<Record<keyof TranslasiTitikData, string>>) => void
  setTitikErrors: (val: Partial<Record<keyof TranslasiTitikData, string>>) => void
  setTitikChecked: (val: boolean) => void
  setBangunForm: (val: Partial<Record<keyof TranslasiBangunData, string>>) => void
  setBangunErrors: (val: Partial<Record<keyof TranslasiBangunData, string>>) => void
  setBangunChecked: (val: boolean) => void
  setMockAns: (val: string) => void
  setMockError: (val: string) => void
  setMockChecked: (val: boolean) => void
  resetAll: () => void
}

const initial = {
  sandboxX: "",
  sandboxY: "",
  notes: "",
  titikForm: {} as Partial<Record<keyof TranslasiTitikData, string>>,
  titikErrors: {} as Partial<Record<keyof TranslasiTitikData, string>>,
  isTitikChecked: false,
  bangunForm: {} as Partial<Record<keyof TranslasiBangunData, string>>,
  bangunErrors: {} as Partial<Record<keyof TranslasiBangunData, string>>,
  isBangunChecked: false,
  mockAns: "",
  mockError: "",
  isMockChecked: false,
}

/** Zustand store managing all observation panel form state and setters. */
export const useObservationStore = create<ObservationState>((set) => ({
  ...initial,
  setSandboxX: (val) => set({ sandboxX: val }),
  setSandboxY: (val) => set({ sandboxY: val }),
  setNotes: (val) => set({ notes: val }),
  setTitikForm: (val) => set((s) => ({ titikForm: { ...s.titikForm, ...val } })),
  setTitikErrors: (val) => set({ titikErrors: val }),
  setTitikChecked: (val) => set({ isTitikChecked: val }),
  setBangunForm: (val) => set((s) => ({ bangunForm: { ...s.bangunForm, ...val } })),
  setBangunErrors: (val) => set({ bangunErrors: val }),
  setBangunChecked: (val) => set({ isBangunChecked: val }),
  setMockAns: (val) => set({ mockAns: val }),
  setMockError: (val) => set({ mockError: val }),
  setMockChecked: (val) => set({ isMockChecked: val }),
  resetAll: () => set({ ...initial }),
}))
