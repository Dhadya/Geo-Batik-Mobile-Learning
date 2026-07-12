"use client"

import { useCallback } from "react"
import { toast } from "sonner"
import { ZodError, type ZodSchema } from "zod"
import {
  TranslasiTitikSchema,
  TranslasiBangunSchema,
  type TranslasiTitikData,
  type TranslasiBangunData,
} from "@/lib/schemas"
import { useObservationStore } from "../store/observationStore"

export function useSandbox(slug: string, tab: string) {
  const sandboxX = useObservationStore((s) => s.sandboxX)
  const sandboxY = useObservationStore((s) => s.sandboxY)
  const notes = useObservationStore((s) => s.notes)
  const setSandboxX = useObservationStore((s) => s.setSandboxX)
  const setSandboxY = useObservationStore((s) => s.setSandboxY)
  const setNotes = useObservationStore((s) => s.setNotes)

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

export function useTitikForm() {
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

export function useBangunForm() {
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
    "Hebat! Semua koordinat bayangan benar! 🌟",
    "Silakan periksa kembali koordinat bayangan Anda.",
  )

  return { form, errors, isChecked, setForm, handleSubmit }
}

export function useMockForm() {
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
