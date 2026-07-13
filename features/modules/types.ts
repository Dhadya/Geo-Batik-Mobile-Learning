// ============================================================
// Module Tab Configuration
// ============================================================

/** Tab configuration for each module section. */
export interface ModuleTab {
  label: string
  value: string
  title: string
  instruction: string
  materialId?: string
  formula: {
    prefix: string
    suffix: string
    placeholders: [string, string]
  }
  assessment: AssessmentQuestion[]
  sections?: ModuleSections
}

// ============================================================
// Assessment (Cek Pemahaman) — kept for backward compat
// ============================================================

/** Assessment question with multiple choice options. */
export interface AssessmentQuestion {
  id: number
  question: string
  options: string[]
  correctIndex: number
  optionFormat?: "matrix" | "image"
  imageOptions?: string[]
  multiSelect?: boolean
  correctIndices?: number[]
  questionImage?: string
}

// ============================================================
// Module Sections — unified content model for all 4 sections
// ============================================================

/**
 * All 4 learning sections of a module tab.
 * Each section has an ordered list of `items` (numbered questions/activities)
 * with a `type` discriminator that determines the UI renderer.
 */
export interface ModuleSections {
  percobaan: SectionBlock
  pengamatan: SectionBlock
  penyimpulan: SectionBlock
  cekPemahaman: SectionBlock
}

/** A section block with instruction and ordered items. */
export interface SectionBlock {
  instruction: string
  items: SectionItem[]
}

// ============================================================
// Section Item — discriminated union on `type`
// ============================================================

/** Discriminated union of all possible question/activity types. */
export type SectionItem =
  | MatriksItem
  | KoordinatItem
  | UraianItem
  | MemasangkanItem
  | PilihanGandaItem

/** Base fields shared by every item type. */
interface BaseItem {
  id: number
}

// ── Matriks (vertical vector input: stacked a/b fields) ─────

/** Vertical vector input with two stacked number fields (a over b). */
export interface MatriksItem extends BaseItem {
  type: "matriks"
  label: string
  targetBayangan: string
  answer: { a: number; b: number }
}

// ── Koordinat (horizontal coordinate input: x/y side by side) ─

/** Horizontal coordinate input with (x, y) side-by-side fields. */
export interface KoordinatItem extends BaseItem {
  type: "koordinat"
  label: string
  bayangan?: string
  answer: { x: number; y: number }
}

// ── Uraian (free-text essay answer) ────────────────────────

/** Free-text essay / uraian question. */
export interface UraianItem extends BaseItem {
  type: "uraian"
  question: string
  answer: string
}

// ── Memasangkan (drag-and-drop matching) ───────────────────

/** Drag-and-drop matching / memasangkan exercise. */
export interface MemasangkanItem extends BaseItem {
  type: "memasangkan"
  question: string
  leftItems: MatchItem[]
  rightItems: MatchItem[]
  correctMatches: Record<string, string>
}

/** A matchable item with an id and display label. */
export interface MatchItem {
  id: string
  label: string
}

// ── Pilihan Ganda (multiple choice) ────────────────────────

/** Multiple-choice question with 4 options. */
export interface PilihanGandaItem extends BaseItem {
  type: "pilihan_ganda"
  question: string
  options: string[]
  correctIndex: number
  optionFormat?: "matrix" | "image"
  imageOptions?: string[]
  multiSelect?: boolean
  correctIndices?: number[]
  questionImage?: string
}

// ============================================================
// Slug Types
// ============================================================

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
