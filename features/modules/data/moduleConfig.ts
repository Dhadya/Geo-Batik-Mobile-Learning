/** Module display labels keyed by slug. */
export const MODULE_LABELS: Record<string, string> = {
  translasi: "Translasi",
  refleksi: "Refleksi",
} as const

/** Material Symbols icon names keyed by slug. */
export const MODULE_ICONS: Record<string, string> = {
  translasi: "transform",
  refleksi: "flip",
} as const

/** Tailwind background classes keyed by slug. */
export const MODULE_BG: Record<string, string> = {
  translasi: "bg-module-translasi",
  refleksi: "bg-module-refleksi",
} as const

/** Reflection axis labels keyed by tab slug. */
export const REFLECTION_LABELS: Record<string, string> = {
  "sumbu-x": "Sumbu X",
  "sumbu-y": "Sumbu Y",
  titik: "Titik (0,0)",
  "garis-x=y": "Garis x=y",
  "garis-x=-y": "Garis x=-y",
  "garis-x=h": "Garis x=h",
  "garis-y=h": "Garis y=h",
} as const

/** Human-readable labels for section types (used in feedback prose). */
export const SECTION_TYPE_LABELS: Record<string, string> = {
  percobaan: "Percobaan",
  pengamatan: "Pengamatan",
  penyimpulan: "Penyimpulan",
  "cek-pemahaman": "Cek Pemahaman",
} as const

/** Section-specific focus guidance for feedback (matching AI prompt instructions). */
export const SECTION_FOCUS: Record<string, string> = {
  percobaan: "fokus pada perhitungan koordinat dan vektornya",
  pengamatan: "fokus pada sifat-sifat yang terlihat pada visualisasi GeoGebra",
  penyimpulan: "fokus pada penjelasan konsep dari pertanyaan yang diajukan",
  "cek-pemahaman": "fokus pada kebenaran jawaban dan cara memperolehnya",
} as const
