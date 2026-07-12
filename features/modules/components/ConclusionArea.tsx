"use client"

import { Text } from "@/components/retroui/Text"
import { Input } from "@/components/retroui/Input"
import { Lightbulb } from "lucide-react"


interface ConclusionAreaProps {
  formula: {
    prefix: string
    suffix: string
    placeholders: [string, string]
  }
}

/** Conclusion section where students write the general transformation formula. */
export function ConclusionArea({ formula }: ConclusionAreaProps) {
  return (
    <section className="border-4 border-black bg-white shadow-lg p-4 md:p-6">
      <div className="flex flex-col md:flex-row items-start gap-4 md:gap-6">
        <div className="w-12 h-12 md:w-16 md:h-16 border-4 border-black bg-white flex items-center justify-center shrink-0">
          <Lightbulb className="size-6 md:size-8" />
        </div>
        <div className="grow">
          <Text
            as="h2"
            className="text-xl md:text-2xl font-black uppercase mb-4"
          >
            Penyimpulan
          </Text>
          <Text as="p" className="text-base md:text-lg mb-6 font-medium">
            Berdasarkan hasil pengamatan di atas, apa rumus umum transformasi
            geometri yang diamati?
          </Text>
          <div className="flex flex-wrap items-center gap-2 md:gap-4">
            <span className="text-xl md:text-2xl font-bold">
              {formula.prefix}
            </span>
            <Input
              type="text"
              placeholder={formula.placeholders[0]}
              className="border-4 border-black w-24 md:w-32 text-center text-lg md:text-xl font-bold p-2 md:p-3"
            />
            <span className="text-xl md:text-2xl font-bold">,</span>
            <Input
              type="text"
              placeholder={formula.placeholders[1]}
              className="border-4 border-black w-24 md:w-32 text-center text-lg md:text-xl font-bold p-2 md:p-3"
            />
            <span className="text-xl md:text-2xl font-bold">
              {formula.suffix}
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
