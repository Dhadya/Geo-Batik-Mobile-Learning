export interface Motif {
  id: string
  name: string
  src: string
  alt: string
}

export interface HistoryEntry {
  id: string
  type: "translasi" | "refleksi"
  title: string
  description: string
  status: "success" | "pending"
}

export interface Coord {
  x: number
  y: number
}
