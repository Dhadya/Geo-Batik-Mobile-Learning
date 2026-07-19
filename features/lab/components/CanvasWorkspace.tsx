"use client"

import Image from "next/image"
import { MaterialIcon } from "@/components/common/MaterialIcon"
import { canvasMotifSrc } from "@/features/lab/data"

interface CanvasWorkspaceProps {
  selectedMotif?: string
}

export function CanvasWorkspace({ selectedMotif }: CanvasWorkspaceProps) {
  return (
    <div className="flex-1 bg-white border-4 border-black neubrutal-shadow relative flex flex-col min-h-[400px]">
      {/* Canvas Toolbar Overlay */}
      <div className="absolute top-4 left-4 flex gap-2 z-10">
        <button className="w-10 h-10 border-4 border-black bg-white neubrutal-shadow-sm flex items-center justify-center hover-shift active-shift">
          <MaterialIcon name="navigation" className="text-xl" />
        </button>
        <button className="w-10 h-10 border-4 border-black bg-white neubrutal-shadow-sm flex items-center justify-center hover-shift active-shift">
          <MaterialIcon name="gesture" className="text-xl" />
        </button>
        <button className="w-10 h-10 border-4 border-black bg-white neubrutal-shadow-sm flex items-center justify-center hover-shift active-shift">
          <MaterialIcon name="change_history" className="text-xl" />
        </button>
      </div>

      {/* GeoGebra Content Placeholder */}
      <div className="flex-1 relative flex items-center justify-center kawung-pattern overflow-hidden">
        {/* Watermark */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <h1 className="text-6xl font-black text-black/5 uppercase tracking-wide text-center select-none">
            GEOGEBRA
            <br />
            CANVAS
          </h1>
        </div>

        {/* Coordinate Grid Simulation */}
        <div className="relative w-4/5 h-4/5 border-2 border-black/10">
          {/* Axis lines */}
          <div className="absolute top-1/2 left-0 w-full h-0.5 bg-black/40" />
          <div className="absolute top-0 left-1/2 w-0.5 h-full bg-black/40" />

          {/* Active Motif Object */}
          <div className="absolute top-[35%] left-[55%] w-32 h-32 border-4 border-primary bg-primary-container/30 p-2 flex items-center justify-center">
            <Image
              className="w-full h-full object-contain opacity-90"
              src={canvasMotifSrc}
              alt={`Active motif: ${selectedMotif ?? "kawung"}`}
              width={128}
              height={128}
              unoptimized
            />
            <div className="absolute -top-3 -left-3 w-6 h-6 bg-black text-white flex items-center justify-center text-[10px] font-bold">
              A
            </div>
          </div>
        </div>

        {/* Floating Cursor Coords */}
        <div className="absolute bottom-4 right-4 bg-black text-white px-3 py-1 font-black text-xs flex items-center gap-2">
          <MaterialIcon name="location_searching" className="text-xs" />
          <span>P: (4.0, 2.5)</span>
        </div>
      </div>

      {/* Canvas Action Bar */}
      <div className="h-16 border-t-4 border-black bg-surface-container flex items-stretch">
        <button className="flex-1 flex items-center justify-center gap-2 font-black text-white bg-tertiary border-r-4 border-black hover:bg-tertiary/90 active-shift">
          <MaterialIcon name="undo" className="text-lg" />
          UNDO
        </button>
        <button className="flex-1 flex items-center justify-center gap-2 font-black text-black bg-primary-container border-r-4 border-black hover:bg-primary-container/90 active-shift">
          <MaterialIcon name="refresh" className="text-lg" />
          RESET
        </button>
        <button className="flex-1 flex items-center justify-center gap-2 font-black text-white bg-secondary hover:bg-secondary/90 active-shift">
          <MaterialIcon name="save" className="text-lg" />
          SIMPAN
        </button>
      </div>
    </div>
  )
}
