"use client"

import { useState } from "react"
import Image from "next/image"
import { MaterialIcon } from "@/components/common/MaterialIcon"
import { targetMotifSrc } from "@/features/lab/data"
import type { HistoryEntry } from "@/features/lab/types"

interface TargetPanelProps {
  history: HistoryEntry[]
}

export function TargetPanel({ history }: TargetPanelProps) {
  const [zoom, setZoom] = useState(100)

  return (
    <>
      {/* Target Preview */}
      <div className="bg-surface border-4 border-black p-5 neubrutal-shadow flex flex-col">
        <h3 className="font-black text-sm mb-4 flex items-center justify-between uppercase">
          <span>TARGET MOTIF</span>
          <MaterialIcon name="target" className="text-lg" />
        </h3>
        <div className="w-full aspect-square border-4 border-black bg-white p-3 mb-4 flex items-center justify-center">
          <Image
            className="max-w-full max-h-full object-contain"
            src={targetMotifSrc}
            alt="Target Batik Goal"
            width={200}
            height={200}
            unoptimized
          />
        </div>
        <div className="flex items-center gap-2">
          <MaterialIcon name="zoom_in" className="text-lg" />
          <input
            type="range"
            min="0"
            max="200"
            value={zoom}
            onChange={(e) => setZoom(Number(e.target.value))}
            className="flex-1 h-2 bg-white border-2 border-black appearance-none cursor-pointer"
          />
          <span className="font-black text-xs">{zoom}%</span>
        </div>
      </div>

      {/* History Log */}
      <div className="flex-1 bg-surface border-4 border-black p-5 neubrutal-shadow flex flex-col overflow-hidden">
        <h3 className="font-black text-sm mb-4 flex items-center justify-between uppercase">
          <span>RIWAYAT</span>
          <MaterialIcon name="history" className="text-lg" />
        </h3>
        <div className="flex-1 overflow-y-auto pr-1 space-y-3 custom-scrollbar">
          {history.map((entry) => (
            <div
              key={entry.id}
              className={`border-2 border-black flex items-start gap-2 p-2 ${
                entry.type === "translasi"
                  ? "bg-secondary-container/20"
                  : "bg-tertiary-container/20"
              }`}
            >
              <MaterialIcon
                name="check_circle"
                className={`text-base ${
                  entry.type === "translasi" ? "text-secondary" : "text-tertiary"
                }`}
              />
              <div>
                <p className="font-bold text-[10px] uppercase">{entry.title}</p>
                <p className="text-[9px] text-on-surface-variant">
                  {entry.description}
                </p>
              </div>
            </div>
          ))}
          <div className="border-2 border-black bg-white flex items-center gap-2 opacity-30 p-2">
            <MaterialIcon name="radio_button_unchecked" className="text-base" />
            <p className="font-black text-[9px] italic">MENUNGGU AKSI...</p>
          </div>
        </div>
      </div>
    </>
  )
}
