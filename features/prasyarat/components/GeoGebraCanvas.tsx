"use client"

import type { RefObject } from "react"

interface GeoGebraCanvasProps {
  containerRef: RefObject<HTMLDivElement | null>
  alt: string
}

/** GeoGebra canvas container with responsive sizing. */
export function GeoGebraCanvas({ containerRef, alt }: GeoGebraCanvasProps) {
  return (
    <div className="xl:col-span-3 bg-card border-4 border-black shadow-xl overflow-hidden kawung-pattern aspect-[3/2]">
      <div className="w-full h-full [&>div]:!h-full [&>div]:!w-full">
        <div
          ref={containerRef}
          className="w-full h-full [&>div]:!h-full [&>div]:!w-full"
          title={alt}
        />
      </div>
    </div>
  )
}
