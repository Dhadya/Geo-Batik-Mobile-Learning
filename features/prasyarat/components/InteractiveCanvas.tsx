"use client"

import { useCallback } from "react"
import { MaterialIcon } from "@/components/common/MaterialIcon"
import { useGeoGebra } from "../hooks/useGeoGebra"
import { useToggleControls } from "../hooks/useToggleControls"
import { GeoGebraCanvas } from "./GeoGebraCanvas"
import { ControlPanel } from "./ControlPanel"
import type { GGBApplet } from "../types"

interface InteractiveCanvasProps {
  materialId: string
  alt?: string
}

/** Interactive GeoGebra canvas with toggle controls for geometric transformations. */
export function InteractiveCanvas({ materialId, alt = "Interactive canvas" }: InteractiveCanvasProps) {
  const onAppletReady = useCallback((applet: GGBApplet) => {
    try {
      if (applet.exists("i")) applet.setValue("i", true)
      if (applet.exists("j")) applet.setValue("j", false)
      if (applet.exists("t")) applet.setValue("t", false)
      if (applet.exists("e")) applet.setValue("e", false)
      if (applet.exists("k")) applet.setValue("k", false)
      if (applet.exists("l")) applet.setValue("l", false)
      if (applet.exists("n")) applet.setValue("n", false)
      if (applet.exists("o")) applet.setValue("o", false)
      if (applet.exists("p")) applet.setValue("p", false)
      if (applet.exists("q")) applet.setValue("q", false)
      if (applet.exists("r")) applet.setValue("r", false)
      if (applet.exists("s")) applet.setValue("s", false)
    } catch {
      // Silently handle errors
    }
  }, [])

  const { containerRef, appletRef } = useGeoGebra({ materialId, onAppletReady })
  const { activeToggles, handleToggle } = useToggleControls(appletRef)

  return (
    <section className="w-full space-y-6 md:space-y-8">
      {/* Section header */}
      <div className="flex items-center gap-3 md:gap-4">
        <div className="size-10 md:size-14 bg-secondary border-4 border-black shadow-md flex items-center justify-center">
          <MaterialIcon name="grid_4x4" className="text-2xl md:text-3xl text-secondary-foreground" />
        </div>
        <h2 className="text-lg md:text-2xl font-black uppercase">Interactive Canvas</h2>
      </div>

      {/* Canvas + controls grid */}
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 md:gap-8 items-start">
        <GeoGebraCanvas containerRef={containerRef} alt={alt} />
        <ControlPanel activeToggles={activeToggles} onToggle={handleToggle} />
      </div>
    </section>
  )
}
