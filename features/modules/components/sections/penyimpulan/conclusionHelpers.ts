/** Map tab slug to human-readable reflection label used in conclusion tables. */
export const reflectionLabels: Record<string, string> = {
  "sumbu-x": "Sumbu x",
  "sumbu-y": "Sumbu y",
  "titik": "Titik (0,0)",
  "garis-x=y": "Garis x=y",
  "garis-x=-y": "Garis x=-y",
  "garis-x=h": "Garis x=h",
  "garis-y=h": "Garis y=h",
  "garis": "Ruas Garis",
}

/** Resolve human-readable reflection label from a tab slug. */
export function getReflectionLabel(tab: string): string {
  return reflectionLabels[tab] ?? tab
}

/** Validate item 11 matrix input — expects "a" in first field and "b" in second. */
export function validateVector(
  aVal: string,
  bVal: string,
  setError: (err: string) => void,
): void {
  if (!aVal.trim() && !bVal.trim()) {
    setError("")
    return
  }
  if (aVal.trim().toLowerCase() === "a" && bVal.trim().toLowerCase() === "b") {
    setError("")
  } else {
    setError("Jawaban kurang tepat")
  }
}
