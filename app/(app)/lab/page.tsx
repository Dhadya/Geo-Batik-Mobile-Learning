"use client"

import { useState } from "react"
import {
  MotifPanel,
  TransformPanel,
  CanvasWorkspace,
  TargetPanel,
  BottomBar,
  motifs,
  mockHistory,
} from "@/features/lab"

export default function LabBatikPage() {
  const [selectedMotif, setSelectedMotif] = useState("kawung")
  const [history] = useState(mockHistory)

  return (
    <div className="h-[calc(100vh-5rem)] flex flex-col">
      <div className="flex-1 flex flex-col xl:flex-row overflow-hidden p-4 md:p-6 gap-4 md:gap-6">
        {/* Left Panel: Motif & Transformasi */}
        <section className="w-full xl:w-[22%] flex flex-col gap-4 md:gap-6 overflow-y-auto">
          <MotifPanel
            motifs={motifs}
            selectedMotif={selectedMotif}
            onSelect={setSelectedMotif}
          />
          <TransformPanel />
        </section>

        {/* Center Panel: Canvas */}
        <section className="w-full xl:w-[56%] flex flex-col">
          <CanvasWorkspace selectedMotif={selectedMotif} />
        </section>

        {/* Right Panel: Target & History */}
        <section className="w-full xl:w-[22%] flex flex-col gap-4 md:gap-6">
          <TargetPanel history={history} />
        </section>
      </div>

      {/* Bottom Bar */}
      <BottomBar />
    </div>
  )
}
