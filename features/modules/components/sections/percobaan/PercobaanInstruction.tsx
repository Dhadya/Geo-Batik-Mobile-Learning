"use client"

import { Text } from "@/components/retroui/Text"

interface PercobaanInstructionProps {
  instruction: string
  instructionMatrix?: string
}

/** Renders the instruction text with an optional inline matrix. */
export function PercobaanInstruction({ instruction, instructionMatrix }: PercobaanInstructionProps) {
  return (
    <Text as="p" className="text-xs md:text-sm text-black font-semibold leading-relaxed">
      {instruction}
      {instructionMatrix && (() => {
        const [top, bottom] = instructionMatrix.split(",")
        return (
          <>
            <span className="inline-flex items-center gap-0.5 mx-1 align-middle">
              <span className="text-xl md:text-2xl font-light select-none inline-block scale-y-[1.5] origin-center">(</span>
              <span className="flex flex-col items-center gap-0.5 text-xs md:text-sm font-black text-black">
                <span className="text-center leading-none select-none">{top}</span>
                <span className="text-center leading-none select-none">{bottom}</span>
              </span>
              <span className="text-xl md:text-2xl font-light select-none inline-block scale-y-[1.5] origin-center">)</span>
            </span>
            <span>. Ikuti langkah-langkah berikut untuk menentukan bayangan garis k:</span>
          </>
        )
      })()}
    </Text>
  )
}
