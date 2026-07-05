import type { GeoGebraToggle } from "./types"

/** GeoGebra object names that correspond to the checkboxes in the saved material. */
export const toggles: GeoGebraToggle[] = [
  { label: "Sumbu X", icon: "east", objects: ["i"] },
  { label: "Sumbu Y", icon: "north", objects: ["j"] },
  { label: "Kuadran", icon: "grid_view", objects: ["t"] },
  { label: "K1", icon: "grid_view", objects: ["e"] },
  { label: "K2", icon: "grid_view", objects: ["k"] },
  { label: "K3", icon: "grid_view", objects: ["l"] },
  { label: "K4", icon: "grid_view", objects: ["n"] },
  { label: "Titik", icon: "ads_click", objects: ["o"] },
  { label: "Garis", icon: "show_chart", objects: ["p"] },
  { label: "Ruas Garis", icon: "horizontal_rule", objects: ["q"] },
  { label: "Bidang", icon: "view_compact", objects: ["r"] },
  { label: "Bangun", icon: "category", objects: ["s"] },
]

export const accordionGroups = [
  { label: "Kuadran", icon: "grid_view", items: ["K1", "K2", "K3", "K4"] },
  { label: "Garis", icon: "show_chart", items: ["Garis", "Ruas Garis"] },
  { label: "Bidang", icon: "view_compact", items: ["Bidang", "Bangun"] },
] as const

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
