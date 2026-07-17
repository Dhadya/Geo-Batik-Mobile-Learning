import { TranslasiTitikSchema, type TranslasiTitikData } from "@/lib/schemas"
import { useObservationStore } from "../store/observationStore"
import { useFormSubmit } from "./useFormSubmit"

/** Hook managing translasi titik form state, validation, and submission. */
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
