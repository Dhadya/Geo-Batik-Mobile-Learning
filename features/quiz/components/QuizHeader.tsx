"use client"

import { Text } from "@/components/retroui/Text"

/** Yellow header box — "TANTANGAN TRANSLASI/REFLEKSI" with badge description. */
export function QuizHeader({
  title,
  badge,
}: {
  title: string
  badge: string
}) {
  return (
    <div className="bg-primary border-4 border-black p-6 md:p-8 shadow-lg relative overflow-hidden">
      <Text
        as="h1"
        className="!text-4xl md:!text-5xl lg:!text-6xl !font-black uppercase leading-none tracking-tighter text-primary-foreground"
      >
        {title}
      </Text>
      <Text as="p" className="text-base md:text-lg mt-2 opacity-80 text-primary-foreground">
        Selesaikan tantangan untuk mendapatkan badge &quot;{badge}&quot;.
      </Text>
    </div>
  )
}
