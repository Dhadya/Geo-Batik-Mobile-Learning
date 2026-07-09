"use client"

import { useEffect, useRef } from "react"
import type { GGBApplet, GGBWindow } from "../types"

interface UseGeoGebraOptions {
  materialId: string
  onAppletReady?: (applet: GGBApplet) => void
}

/** Hook to initialize GeoGebra applet via direct embedding. */
export function useGeoGebra({ materialId, onAppletReady }: UseGeoGebraOptions) {
  const containerRef = useRef<HTMLDivElement>(null)
  const appletRef = useRef<GGBApplet | null>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // Check if deployggb.js is already loaded
    const existingScript = document.querySelector('script[src="https://www.geogebra.org/apps/deployggb.js"]')

    const initApplet = () => {
      const ggbWindow = window as unknown as GGBWindow
      if (typeof window !== "undefined" && ggbWindow.GGBApplet) {
        const onAppletLoad = () => {
          const ggbApplet = ggbWindow.ggbApplet
          if (!ggbApplet) return
          appletRef.current = ggbApplet
          onAppletReady?.(ggbApplet)
        }

        const parameters = {
          width: container.clientWidth,
          height: container.clientHeight,
          showToolBar: false,
          showMenuBar: false,
          showAlgebraInput: false,
          showAlgebraView: false,
          showResetIcon: false,
          enableLabelDrags: false,
          enableShiftDragZoom: true,
          enableRightClick: true,
          showToolBarHelp: false,
          showFullscreenButton: true,
          material_id: materialId,
          appletOnLoad: onAppletLoad,
        }

        const applet = new ggbWindow.GGBApplet(parameters, true)
        appletRef.current = applet
        applet.inject(container)
      }
    }

    if (existingScript) {
      // Script already loaded, initialize immediately
      initApplet()
    } else {
      // Load the script
      const script = document.createElement("script")
      script.src = "https://www.geogebra.org/apps/deployggb.js"
      script.async = true
      script.onload = initApplet
      document.body.appendChild(script)
    }

    return () => {
      container.innerHTML = ""
    }
  }, [materialId, onAppletReady])

  return { containerRef, appletRef }
}
