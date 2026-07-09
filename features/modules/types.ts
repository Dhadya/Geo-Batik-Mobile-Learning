/** Tab configuration for each module section. */
export interface ModuleTab {
  label: string
  value: string
  title: string
  instruction: string
  formula: {
    prefix: string
    suffix: string
    placeholders: [string, string]
  }
  assessment: AssessmentQuestion[]
}

/** Assessment question with multiple choice options. */
export interface AssessmentQuestion {
  id: number
  question: string
  options: string[]
  correctIndex: number
}

/** Module slug identifiers. */
export type ModuleSlug = "translasi" | "refleksi"

/** Tab slug identifiers for translasi. */
export type TranslasiTab = "titik" | "garis" | "bangun"

/** Tab slug identifiers for refleksi. */
export type RefleksiTab =
  | "sumbu-x"
  | "sumbu-y"
  | "titik"
  | "garis-x=y"
  | "garis-x=-y"
  | "garis-x=h"
  | "garis-y=h"

/** All tab slug identifiers. */
export type TabSlug = TranslasiTab | RefleksiTab
