"use client"

import { MaterialIcon } from "@/components/common/MaterialIcon"
import { Badge } from "@/components/retroui/Badge"
import { Text } from "@/components/retroui/Text"

interface ApersepsiHeaderProps {
  label: string
  title: string
  icon: string
  bgColor: string
}

/** Apersepsi page header with module badge, title, and icon. */
export function ApersepsiHeader({ label, title, icon, bgColor }: ApersepsiHeaderProps) {
  return (
    <div className={`relative border-4 border-black p-6 md:p-8 shadow-lg transition-all hover:translate-x-1 hover:translate-y-1 hover:shadow-md kawung-pattern ${bgColor}`}>
      {/* Icon badge — top-right corner */}
      <div className="absolute top-3 right-3 md:top-4 md:right-4 size-10 md:size-12 border-4 border-black flex items-center justify-center bg-card shadow-md">
        <MaterialIcon name={icon} className="text-2xl md:text-3xl text-foreground" />
      </div>

      <Badge
        variant="surface"
        className="border-4 border-black bg-card shadow-md font-black uppercase text-xs md:text-sm mb-4 md:mb-6"
      >
        {label}
      </Badge>
      <Text
        as="h1"
        className="text-4xl md:text-5xl lg:text-6xl font-black uppercase leading-none tracking-tighter"
      >
        APERSEPSI {title}
      </Text>
    </div>
  )
}
