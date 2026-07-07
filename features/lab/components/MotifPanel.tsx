"use client"

import Image from "next/image"
import type { Motif } from "@/features/lab/types"
import { MaterialIcon } from "@/components/common/MaterialIcon"

interface MotifPanelProps {
  motifs: Motif[]
  selectedMotif: string
  onSelect: (id: string) => void
}

export function MotifPanel({ motifs, selectedMotif, onSelect }: MotifPanelProps) {
  return (
    <div className="bg-surface border-4 border-black p-5 neubrutal-shadow shrink-0">
      <h2 className="font-black text-2xl mb-4 border-b-4 border-black pb-2 flex items-center gap-3 uppercase">
        <MaterialIcon name="palette" className="text-2xl" />
        MOTIF
      </h2>
      <div className="grid grid-cols-2 gap-2">
        {motifs.map((motif) => {
          const isActive = selectedMotif === motif.id
          return (
            <button
              key={motif.id}
              onClick={() => onSelect(motif.id)}
              className={`flex flex-col items-center border-4 border-black transition-all p-2 ${
                isActive
                  ? "bg-primary-container neubrutal-shadow-sm"
                  : "bg-white hover-shift active-shift"
              }`}
            >
              <div className="w-full aspect-square border-2 border-black mb-2 overflow-hidden bg-white">
                <Image
                  className="w-full h-full object-cover"
                  src={motif.src}
                  alt={motif.alt}
                  width={80}
                  height={80}
                  unoptimized
                />
              </div>
              <span className="font-black text-xs">{motif.name}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
