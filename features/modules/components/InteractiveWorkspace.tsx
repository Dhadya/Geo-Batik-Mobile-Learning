"use client"

import { Text } from "@/components/retroui/Text"
import { Button } from "@/components/retroui/Button"
import { Grid } from "lucide-react"

/** GeoGebra interactive canvas workspace with placeholder and controls. */
export function InteractiveWorkspace() {
  return (
    <div className="border-4 border-black bg-white h-[400px] md:h-[600px] relative overflow-hidden shadow-lg">
      <div className="absolute inset-0 kawung-pattern pointer-events-none" />
      <div className="absolute top-4 left-4 z-10 bg-black text-white px-3 py-1 font-bold text-xs uppercase">
        Visualisasi GeoGebra
      </div>
      <div className="w-full h-full flex flex-col items-center justify-center p-4 md:p-6">
        <div className="w-full h-full border-2 border-dashed border-outline flex flex-col items-center justify-center gap-4 bg-background">
          <Grid className="size-16 text-outline" strokeWidth={1} />
          <Text as="p" className="text-lg text-outline font-semibold">
            Interactive Coordinate Plane
          </Text>
          <div className="flex gap-4">
            <Button
              variant="secondary"
              size="md"
              className="!rounded-none font-bold"
            >
              Reset Objek
            </Button>
            <Button
              variant="default"
              size="md"
              className="!rounded-none font-bold"
            >
              Transformasikan
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
