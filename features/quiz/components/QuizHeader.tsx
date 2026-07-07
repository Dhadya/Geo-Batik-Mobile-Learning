"use client"

import type { ReactNode } from "react"
import { Text } from "@/components/retroui/Text"

/** Yellow header box — "TANTANGAN TRANSLASI/REFLEKSI" with badge description. */
export function QuizHeader({
  title,
  badge,
  icon,
}: {
  title: string
  badge: string
  icon?: ReactNode
}) {
  return (
    <div className="bg-primary border-4 border-black p-6 md:p-8 shadow-lg relative overflow-hidden">
      {icon && (
        <div className="absolute top-3 right-3 md:top-4 md:right-4 size-10 md:size-14 border-4 border-black flex items-center justify-center bg-card shadow-md">
          {icon}
        </div>
      )}
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
