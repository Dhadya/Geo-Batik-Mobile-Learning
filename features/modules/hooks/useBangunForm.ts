import { TranslasiBangunSchema, type TranslasiBangunData } from "@/lib/schemas"
import { useObservationStore } from "../store/observationStore"
import { useFormSubmit } from "./useFormSubmit"

/** Hook managing translasi bangun form state, validation, and submission. */
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
    "Hebat! Semua koordinat bayangan benar!",
    "Silakan periksa kembali koordinat bayangan Anda.",
  )

  return { form, errors, isChecked, setForm, handleSubmit }
}
