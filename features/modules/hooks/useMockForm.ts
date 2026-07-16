import { useCallback } from "react"
import { toast } from "sonner"
import { useObservationStore } from "../store/observationStore"

/** Hook managing mock/fallback form with empty-field validation. */
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
