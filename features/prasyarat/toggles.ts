import type { GeoGebraToggle } from "./types"

/** GeoGebra object names that correspond to the checkboxes in the saved material. */
export const toggles: GeoGebraToggle[] = [
  { label: "Sumbu X", icon: "axis_horizontal", objects: ["i"], conceptKey: "Sumbu x" },
  { label: "Sumbu Y", icon: "axis_vertical", objects: ["j"], conceptKey: "Sumbu y" },
  { label: "Kuadran", icon: "grid_view", objects: ["t"], conceptKey: "Kuadran" },
  { label: "K1", icon: "grid_view", objects: ["e"], conceptKey: "Kuadran I" },
  { label: "K2", icon: "grid_view", objects: ["k"], conceptKey: "Kuadran II" },
  { label: "K3", icon: "grid_view", objects: ["l"], conceptKey: "Kuadran III" },
  { label: "K4", icon: "grid_view", objects: ["n"], conceptKey: "Kuadran IV" },
  { label: "Titik", icon: "ads_click", objects: ["o"], conceptKey: "Titik" },
  { label: "Garis", icon: "line_garis", objects: ["p"], conceptKey: "Garis" },
  { label: "Ruas Garis", icon: "line_ruas_garis", objects: ["q"], conceptKey: "Ruas Garis" },
  { label: "Bidang", icon: "view_compact", objects: ["r"], conceptKey: "Bidang" },
  { label: "Bangun", icon: "category", objects: ["s"], conceptKey: "Bangun Datar" },
]

export const accordionGroups: {
  label: string
  icon: string
  items: readonly string[]
  description?: string
}[] = [
  { label: "Kuadran", icon: "grid_view", items: ["K1", "K2", "K3", "K4"], description: "Sumbu x dan sumbu y membagi bidang koordinat menjadi empat bagian yang disebut kuadran. Kuadran diberi nomor I, II, III, dan IV dengan arah berlawanan jarum jam." },
  { label: "Garis", icon: "line_garis", items: ["Garis", "Ruas Garis"] },
  { label: "Bidang", icon: "view_compact", items: ["Bidang", "Bangun"] },
]

export const accordionItemLabels = [
  "Kuadran", "K1", "K2", "K3", "K4",
  "Garis", "Ruas Garis",
  "Bidang", "Bangun",
]

export const defaultToggleStates: Record<string, boolean> = {
  "Sumbu X": false,
  "Sumbu Y": false,
  "Kuadran": false,
  "K1": false,
  "K2": false,
  "K3": false,
  "K4": false,
  "Titik": false,
  "Garis": false,
  "Ruas Garis": false,
  "Bidang": false,
  "Bangun": false,
}
