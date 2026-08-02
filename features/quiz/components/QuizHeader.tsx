"use client"

import type { ReactNode } from "react"
import { Text } from "@/components/retroui/Text"

/** Quiz header box — module-colored with title and optional icon. */
export function QuizHeader({
  title,
  icon,
  bgColor = "bg-primary",
  description,
}: {
  title: string
  icon?: ReactNode
  bgColor?: string
  description?: string
}) {
  return (
    <div className={`${bgColor} border-4 border-black p-6 md:p-8 shadow-lg relative overflow-hidden`}>
      {icon && (
        <div className="absolute top-3 right-3 md:top-4 md:right-4 size-10 md:size-14 border-4 border-black flex items-center justify-center bg-card shadow-md">
          {icon}
        </div>
      )}
      <div className={icon ? "pr-14 md:pr-20" : ""}>
        <Text
          as="h1"
          className="text-3xl md:text-4xl font-black uppercase leading-none tracking-tighter text-primary-foreground"
        >
          {title}
        </Text>
         <Text as="p" className="text-base md:text-lg mt-2 opacity-80 text-primary-foreground">
          {description ?? "Jawab semua soal dengan benar untuk menguji pemahamanmu."}
        </Text>
      </div>
    </div>
  )
}
