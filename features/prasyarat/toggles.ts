import type { GeoGebraToggle } from "./types"

/** GeoGebra object names that correspond to the checkboxes in the saved material. */
export const toggles: GeoGebraToggle[] = [
  { label: "Sumbu X", icon: "east", objects: ["i"], conceptKey: "Sumbu x" },
  { label: "Sumbu Y", icon: "north", objects: ["j"], conceptKey: "Sumbu y" },
  { label: "Kuadran", icon: "grid_view", objects: ["t"], conceptKey: "Kuadran" },
  { label: "K1", icon: "grid_view", objects: ["e"], conceptKey: "K1" },
  { label: "K2", icon: "grid_view", objects: ["k"], conceptKey: "K2" },
  { label: "K3", icon: "grid_view", objects: ["l"], conceptKey: "K3" },
  { label: "K4", icon: "grid_view", objects: ["n"], conceptKey: "K4" },
  { label: "Titik", icon: "ads_click", objects: ["o"], conceptKey: "Titik" },
  { label: "Garis", icon: "show_chart", objects: ["p"], conceptKey: "Garis" },
  { label: "Ruas Garis", icon: "horizontal_rule", objects: ["q"], conceptKey: "Ruas Garis" },
  { label: "Bidang", icon: "view_compact", objects: ["r"], conceptKey: "Bidang" },
  { label: "Bangun", icon: "category", objects: ["s"], conceptKey: "Bangun Datar" },
]

export const accordionGroups: {
  label: string
  icon: string
  items: readonly string[]
  description?: string
}[] = [
  { label: "Kuadran", icon: "grid_view", items: ["K1", "K2", "K3", "K4"], description: "Daerah yang terbagi karena perpotongan sumbu x dan sumbu y." },
  { label: "Garis", icon: "show_chart", items: ["Garis", "Ruas Garis"] },
  { label: "Bidang", icon: "view_compact", items: ["Bidang", "Bangun"] },
]

export const accordionItemLabels = [
  "Kuadran", "K1", "K2", "K3", "K4",
  "Garis", "Ruas Garis",
  "Bidang", "Bangun",
]

export const defaultToggleStates: Record<string, boolean> = {
  "Sumbu X": true,
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
