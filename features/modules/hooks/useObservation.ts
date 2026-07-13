"use client"

import { useCallback, useMemo, useState } from "react"
import { toast } from "sonner"
import { ZodError, type ZodSchema } from "zod"
import {
  TranslasiTitikSchema,
  TranslasiBangunSchema,
  type TranslasiTitikData,
  type TranslasiBangunData,
} from "@/lib/schemas"
import { useObservationStore } from "../store/observationStore"
import { useAnswerStore, emptyTab } from "../store/answerStore"
import { getModuleTab } from "../data"
import { validateSection } from "../lib/validation"
import type { SectionItem, SectionBlock } from "../types"

/** Blocks non-numeric keystrokes; allows digits, leading minus, and control keys. */
export const allowOnlyNumbers = (e: React.KeyboardEvent<HTMLInputElement>) => {
  if (e.ctrlKey || e.metaKey) return
  if (["Backspace", "Tab", "Escape", "Enter", "ArrowLeft", "ArrowRight", "Delete"].includes(e.key)) return
  if (e.key === "-" && (e.target as HTMLInputElement).selectionStart === 0) return
  if (!/^\d$/.test(e.key)) e.preventDefault()
}

type SectionName = "percobaan" | "pengamatan" | "penyimpulan"

/** Check whether all fields for a set of items are filled. */
function isSectionFilled(items: SectionItem[], fields: Record<string, Record<string, string>>): boolean {
  return items.every((item) => {
    const f = fields[String(item.id)] ?? {}
    if (item.type === "matriks") return f.a !== "" && f.a !== undefined && f.b !== "" && f.b !== undefined
    if (item.type === "koordinat") return f.x !== "" && f.x !== undefined && f.y !== "" && f.y !== undefined
    if (item.type === "uraian") return (f.text ?? "").trim() !== ""
    if (item.type === "memasangkan") {
      const m = item as import("../types").MemasangkanItem
      return m.leftItems.every((l) => (f[l.id] ?? "") !== "")
    }
    if (item.type === "pilihan_ganda") return true
    return false
  })
}

/** Generic hook for reading/writing/validating any section from answerStore. */
export function useSection(slug: string, tab: string, section: SectionName) {
  const tabConfig = getModuleTab(slug, tab)

  // Select raw store entry by key to avoid new-object-on-every-call from getTabAnswers
  const tabKey = useMemo(() => `${slug}-${tab}`, [slug, tab])
  const rawTab = useAnswerStore((s) => s.answers[tabKey])
  const answers = useMemo(() => rawTab ?? emptyTab(slug, tab), [rawTab, slug, tab])

  const setField = useAnswerStore((s) => s.setField)
  const setChecked = useAnswerStore((s) => s.setChecked)
  const setAIFeedback = useAnswerStore((s) => s.setAIFeedback)

  const block = tabConfig?.sections?.[section] as SectionBlock | undefined
  const items = useMemo(() => block?.items ?? [], [block])
  const sectionAnswers = answers[section]
  const fields = useMemo(() => sectionAnswers?.fields ?? {}, [sectionAnswers])
  const isChecked = sectionAnswers?.isChecked ?? false
  const aiFeedback = sectionAnswers?.aiFeedback

  const [errors, setErrors_] = useState<Record<string, string>>({})

  const boundSetField = useCallback(
    (itemId: string, fieldKey: string, value: string) => {
      setField(slug, tab, section, itemId, fieldKey, value)
    },
    [setField, slug, tab, section],
  )

  const boundSetChecked = useCallback(
    (checked: boolean) => setChecked(slug, tab, section, checked),
    [setChecked, slug, tab, section],
  )

  const isFilled = isSectionFilled(items, fields)

  const handleSubmit = useCallback(async () => {
    const result = validateSection(items, fields, undefined)
    setErrors_(result.errors)
    boundSetChecked(true)

    if (result.isCorrect) {
      toast.success(result.summary)
    } else {
      toast.error(result.summary)
    }
  }, [items, fields, boundSetChecked])

  return {
    items,
    fields,
    errors: isChecked ? errors : {},
    isChecked,
    isFilled,
    aiFeedback,
    setField: boundSetField,
    setAIFeedback,
    setChecked: boundSetChecked,
    setErrors: setErrors_,
    handleSubmit,
    block,
  }
}

/** Hook providing sandbox coordinate input, live preview, and notes state. */
export function useSandbox(slug: string, tab: string) {
  // Sandbox coordinate state from zustand store
  const sandboxX = useObservationStore((s) => s.sandboxX)
  const sandboxY = useObservationStore((s) => s.sandboxY)
  const notes = useObservationStore((s) => s.notes)
  const setSandboxX = useObservationStore((s) => s.setSandboxX)
  const setSandboxY = useObservationStore((s) => s.setSandboxY)
  const setNotes = useObservationStore((s) => s.setNotes)

  // Compute preview bayangan based on slug/tab transformation rules
  const preview = useCallback(() => {
    const x = Number(sandboxX)
    const y = Number(sandboxY)
    if (Number.isNaN(x) || Number.isNaN(y)) return { x: "?", y: "?" }

    if (slug === "translasi") {
      return { x: x + 2, y: y + 3 }
    }
    if (slug === "refleksi") {
      if (tab === "sumbu-x") return { x, y: -y }
      if (tab === "sumbu-y") return { x: -x, y }
      if (tab === "titik") return { x: -x, y: -y }
      if (tab === "garis-x=y") return { x: y, y: x }
      if (tab === "garis-x=-y") return { x: -y, y: -x }
      if (tab === "garis-x=h") return { x: 4 - x, y }
      if (tab === "garis-y=h") return { x, y: 4 - y }
    }
    return { x: x + 1, y: y + 1 }
  }, [sandboxX, sandboxY, slug, tab])

  return { sandboxX, sandboxY, notes, setSandboxX, setSandboxY, setNotes, preview: preview() }
}

type FormErrors<T> = Partial<Record<keyof T, string>>

/** Generic form submit handler with Zod validation and toast feedback. */
function useFormSubmit<T extends Record<string, number>>(
  schema: ZodSchema<T>,
  form: Partial<Record<keyof T, string>>,
  setErrors: (e: FormErrors<T>) => void,
  setChecked: (v: boolean) => void,
  successMsg: string,
  errorMsg: string,
) {
  return useCallback(
    (e: React.FormEvent) => {
      e.preventDefault()
      try {
        // Coerce string form values to numbers, empty strings become undefined
        const cleaned = Object.fromEntries(
          Object.entries(form).map(([k, v]) => [k, v === "" ? undefined : Number(v)]),
        )
        schema.parse(cleaned)
        setErrors({})
        setChecked(true)
        toast.success(successMsg)
      } catch (err) {
        if (err instanceof ZodError) {
          const fieldErrors: FormErrors<T> = {}
          err.issues.forEach((issue) => {
            if (issue.path[0]) {
              fieldErrors[issue.path[0] as keyof T] = issue.message
            }
          })
          setErrors(fieldErrors)
          toast.error(errorMsg)
        }
      }
    },
    [schema, form, setErrors, setChecked, successMsg, errorMsg],
  )
}

/** Hook managing translasi titik form state, validation, and submission. */
export function useTitikForm() {
  // Titik form state from zustand store
  const form = useObservationStore((s) => s.titikForm)
  const errors = useObservationStore((s) => s.titikErrors)
  const isChecked = useObservationStore((s) => s.isTitikChecked)
  const setForm = useObservationStore((s) => s.setTitikForm)
  const setErrors = useObservationStore((s) => s.setTitikErrors)
  const setChecked = useObservationStore((s) => s.setTitikChecked)

  const handleSubmit = useFormSubmit<TranslasiTitikData>(
    TranslasiTitikSchema,
    form as Partial<Record<keyof TranslasiTitikData, string>>,
    setErrors,
    setChecked,
    "Hebat! Semua jawaban Anda benar! 🎉",
    "Ada beberapa jawaban yang masih belum tepat.",
  )

  return { form, errors, isChecked, setForm, handleSubmit }
}

/** Hook managing translasi bangun form state, validation, and submission. */
export function useBangunForm() {
  // Bangun form state from zustand store
  const form = useObservationStore((s) => s.bangunForm)
  const errors = useObservationStore((s) => s.bangunErrors)
  const isChecked = useObservationStore((s) => s.isBangunChecked)
  const setForm = useObservationStore((s) => s.setBangunForm)
  const setErrors = useObservationStore((s) => s.setBangunErrors)
  const setChecked = useObservationStore((s) => s.setBangunChecked)

  const handleSubmit = useFormSubmit<TranslasiBangunData>(
    TranslasiBangunSchema,
    form as Partial<Record<keyof TranslasiBangunData, string>>,
    setErrors,
    setChecked,
    "Hebat! Semua koordinat bayangan benar!",
    "Silakan periksa kembali koordinat bayangan Anda.",
  )

  return { form, errors, isChecked, setForm, handleSubmit }
}

/** Hook managing mock/fallback form with empty-field validation. */
export function useMockForm() {
  // Mock answer state from zustand store
  const mockAns = useObservationStore((s) => s.mockAns)
  const mockError = useObservationStore((s) => s.mockError)
  const isMockChecked = useObservationStore((s) => s.isMockChecked)
  const setMockAns = useObservationStore((s) => s.setMockAns)
  const setMockError = useObservationStore((s) => s.setMockError)
  const setMockChecked = useObservationStore((s) => s.setMockChecked)

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault()
      if (mockAns.trim() === "") {
        setMockError("Jawaban wajib diisi")
        toast.error("Isi jawaban Anda terlebih dahulu.")
      } else {
        setMockError("")
        setMockChecked(true)
        toast.success("Jawaban Anda disimpan!")
      }
    },
    [mockAns, setMockError, setMockChecked],
  )

  return { mockAns, mockError, isMockChecked, setMockAns, handleSubmit }
}
