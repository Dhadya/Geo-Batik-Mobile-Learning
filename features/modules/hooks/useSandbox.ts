import { useCallback } from "react"
import { useObservationStore } from "../store/observationStore"

/** Hook providing sandbox coordinate input, live preview, and notes state. */
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
