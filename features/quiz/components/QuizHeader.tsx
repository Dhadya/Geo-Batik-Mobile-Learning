"use client"

import { Text } from "@/components/retroui/Text"
import { Star } from "lucide-react"

/** Yellow header box — "TANTANGAN TRANSLASI/REFLEKSI" with badge description. */
export function QuizHeader({
  title,
  badge,
}: {
  title: string
  badge: string
}) {
  return (
    <section className="bg-primary-container border-4 border-black p-6 md:p-8 shadow-lg flex flex-col md:flex-row justify-between items-center gap-4 md:gap-6">
      <div className="text-left w-full">
        <Text
          as="h1"
          className="text-3xl md:text-4xl lg:text-5xl font-black uppercase tracking-tight"
        >
          {title}
        </Text>
        <Text as="p" className="text-base md:text-lg mt-2 opacity-80">
          Selesaikan tantangan untuk mendapatkan badge{" "}
          <span className="font-bold underline">&quot;{badge}&quot;</span>.
        </Text>
      </div>
      <div className="w-12 h-12 md:w-16 md:h-16 border-4 border-black bg-white flex items-center justify-center shrink-0 shadow-sm">
        <Star className="size-6 md:size-8 text-primary" />
      </div>
    </section>
  )
}
