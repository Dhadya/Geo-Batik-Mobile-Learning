"use client"

import { Text } from "@/components/retroui/Text"
import { Button } from "@/components/retroui/Button"
import { Grid } from "lucide-react"
import { useGeoGebra } from "@/features/prasyarat/hooks/useGeoGebra"

/** GeoGebra interactive canvas workspace with placeholder and controls. */
export function InteractiveWorkspace({ materialId }: { materialId?: string }) {
  const { containerRef } = useGeoGebra({
    materialId: materialId || "",
  })

  return (
    <div className="border-4 border-black bg-white h-[300px] md:h-[600px] relative overflow-hidden shadow-lg flex flex-col">{/* Main GeoGebra canvas container */}
      {materialId ? (
        <div className="w-full h-full relative grow [&>div]:h-full [&>div]:w-full">{/* Live canvas via containerRef */}
          <div ref={containerRef} className="w-full h-full [&>div]:h-full [&>div]:w-full" />
        </div>
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center p-3 md:p-6 grow">{/* Placeholder when no materialId */}
          <div className="w-full h-full border-2 border-dashed border-outline flex flex-col items-center justify-center gap-3 md:gap-4 bg-background">
            <Grid className="size-12 md:size-16 text-outline" strokeWidth={1} />
            <Text as="p" className="text-sm md:text-lg text-outline font-semibold">
              Interactive Coordinate Plane
            </Text>
            <div className="flex gap-2 md:gap-4">
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
