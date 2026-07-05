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

/** Apersepsi page header with module badge and title. */
export function ApersepsiHeader({ label, title, icon, bgColor }: ApersepsiHeaderProps) {
  return (
    <header className="space-y-4 md:space-y-6">
      <div className="flex items-center gap-3 md:gap-4">
        <div className={`size-10 md:size-14 ${bgColor} border-4 border-black shadow-md flex items-center justify-center`}>
          <MaterialIcon name={icon} className="!text-2xl md:!text-3xl text-foreground" />
        </div>
        <div className="flex-1">
          <Badge
            variant="surface"
            className="border-4 border-black bg-card shadow-md font-black uppercase text-xs md:text-sm !rounded-none"
          >
            {label}
          </Badge>
          <Text
            as="h1"
            className="!text-3xl md:!text-5xl lg:!text-6xl !font-black uppercase leading-none tracking-tighter mt-2"
          >
            {title}
          </Text>
        </div>
      </div>
    </header>
  )
}
