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

/** Reflection concept guidance keyed by tab slug (used for deterministic feedback). */
export const REFLECTION_RULES: Record<
  string,
  { label: string; hint: string; rule: string }
> = {
  "sumbu-x": {
    label: "sumbu x",
    hint: "koordinat y berubah tanda menjadi -y, sedangkan koordinat x tetap",
    rule: "koordinat y berubah tanda",
  },
  "sumbu-y": {
    label: "sumbu y",
    hint: "koordinat x berubah tanda menjadi -x, sedangkan koordinat y tetap",
    rule: "koordinat x berubah tanda",
  },
  titik: {
    label: "titik (0,0)",
    hint: "kedua koordinat berubah tanda, (x, y) menjadi (-x, -y)",
    rule: "kedua koordinat berubah tanda",
  },
  "garis-x=y": {
    label: "garis x = y",
    hint: "koordinat x dan y saling ditukar, (x, y) menjadi (y, x)",
    rule: "koordinat x dan y saling ditukar",
  },
  "garis-x=-y": {
    label: "garis x = -y",
    hint: "koordinat x dan y saling ditukar lalu tandanya dibalik, (x, y) menjadi (-y, -x)",
    rule: "koordinat x dan y ditukar lalu tandanya dibalik",
  },
  "garis-x=h": {
    label: "garis x = h",
    hint: "koordinat x dihitung dengan (2h - x), sedangkan koordinat y tetap",
    rule: "koordinat x dihitung dengan (2h - x)",
  },
  "garis-y=h": {
    label: "garis y = h",
    hint: "koordinat y dihitung dengan (2h - y), sedangkan koordinat x tetap",
    rule: "koordinat y dihitung dengan (2h - y)",
  },
} as const
