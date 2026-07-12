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

  return (
    <div className="border-4 border-black bg-white h-[400px] md:h-[600px] relative overflow-hidden shadow-lg flex flex-col">
      {materialId ? (
        <div className="w-full h-full relative grow [&>div]:h-full [&>div]:w-full">
          <div ref={containerRef} className="w-full h-full [&>div]:h-full [&>div]:w-full" />
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
