"use client"

import { useState, useCallback } from "react"
import type { GGBApplet, GGBWindow, GeoGebraToggle } from "../types"
import { defaultToggleStates } from "../toggles"

/** Hook to manage GeoGebra toggle state and parent-child logic. */
export function useToggleControls(appletRef: React.RefObject<GGBApplet | null>) {
  const [activeToggles, setActiveToggles] = useState<Record<string, boolean>>(defaultToggleStates)

  const getApplet = useCallback((): GGBApplet | null => {
    const ggbWindow = window as unknown as GGBWindow
    return ggbWindow.ggbApplet || appletRef.current
  }, [appletRef])

  const handleToggle = useCallback((toggle: GeoGebraToggle) => {
    const ggbApplet = getApplet()
    if (!ggbApplet) return

    const currentState = activeToggles[toggle.label] ?? true
    const newState = !currentState

    // K1-K4 → auto-check Kuadran (UI + GeoGebra)
    if (newState && ["K1", "K2", "K3", "K4"].includes(toggle.label)) {
      if (!activeToggles["Kuadran"]) {
        ggbApplet.setValue("t", true)
        setActiveToggles(prev => ({ ...prev, "Kuadran": true }))
      }
    }

    // Ruas Garis → sync Garis (GeoGebra only, not UI)
    if (toggle.label === "Ruas Garis") {
      ggbApplet.setValue("p", newState)
    }

    // Bangun → sync Bidang (GeoGebra only, not UI)
    if (toggle.label === "Bangun") {
      ggbApplet.setValue("r", newState)
    }

    // Set the boolean value for each checkbox object
    for (const objName of toggle.objects) {
      try {
        if (ggbApplet.exists(objName)) {
          ggbApplet.setValue(objName, newState)
        }
      } catch {
        // Silently handle errors
      }
    }

    setActiveToggles(prev => ({ ...prev, [toggle.label]: newState }))
  }, [activeToggles, getApplet])

  return { activeToggles, handleToggle }
}
