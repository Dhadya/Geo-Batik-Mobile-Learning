"use client"

import { Text } from "@/components/retroui/Text"
import { Button } from "@/components/retroui/Button"
import { Grid } from "lucide-react"
import { useGeoGebra } from "@/features/prasyarat/hooks/useGeoGebra"
import type { GGBWindow } from "@/features/prasyarat/types"

/** GeoGebra interactive canvas workspace with placeholder and controls. */
export function InteractiveWorkspace({ materialId }: { materialId?: string }) {
  const { containerRef } = useGeoGebra({
    materialId: materialId || "",
  })

  const handleReset = () => {
    // Attempt to reset the GeoGebra construction via the global ggbApplet
    try {
      const ggb = (window as unknown as GGBWindow).ggbApplet as Record<string, unknown> | undefined
      if (ggb && typeof ggb.newConstruction === "function") {
        (ggb.newConstruction as () => void)()
      } else if (containerRef.current) {
        // Fallback: clear the container so useGeoGebra re-injects on next render
        containerRef.current.innerHTML = ""
        window.dispatchEvent(new CustomEvent("ggb-reset"))
      }
    } catch (e) {
      console.error("Failed to reset GeoGebra construction:", e)
    }
  }

  return (
    <div className="border-4 border-black bg-white h-[400px] md:h-[600px] relative overflow-hidden shadow-lg flex flex-col">
      <div className="absolute top-4 left-4 z-10 bg-black text-white px-3 py-1 font-bold text-xs uppercase shadow-[2px_2px_0_0_rgba(0,0,0,1)]">
        Visualisasi GeoGebra
      </div>

      {materialId ? (
        <div className="w-full h-full relative grow [&>div]:h-full [&>div]:w-full">
          <div ref={containerRef} className="w-full h-full [&>div]:h-full [&>div]:w-full" />
          <div className="absolute bottom-4 right-4 z-10 flex gap-2">
            <Button
              variant="secondary"
              size="sm"
              className="font-bold"
              onClick={handleReset}
            >
              Reset Objek
            </Button>
          </div>
        </div>
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center p-4 md:p-6 grow">
          <div className="w-full h-full border-2 border-dashed border-outline flex flex-col items-center justify-center gap-4 bg-background">
            <Grid className="size-16 text-outline" strokeWidth={1} />
            <Text as="p" className="text-lg text-outline font-semibold">
              Interactive Coordinate Plane
            </Text>
            <div className="flex gap-4">
              <Button
                variant="secondary"
                size="md"
                className="font-bold"
              >
                Reset Objek
              </Button>
              <Button
                variant="default"
                size="md"
                className="font-bold"
              >
                Transformasikan
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
