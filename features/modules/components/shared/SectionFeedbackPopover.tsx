"use client"

import { useMemo } from "react"
import { Button } from "@/components/retroui/Button"
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/retroui/Popover"

interface SectionFeedbackPopoverProps {
  aiFeedback: string
  isLocked: boolean
}

/** Floating popover button that shows AI feedback after checking answers. */
export function SectionFeedbackPopover({
  aiFeedback,
  isLocked,
}: SectionFeedbackPopoverProps) {
  // When form is locked (attempt exhausted or correct), show final explanation.
  // When still editable (percobaan 2), show hint so the student can refer to it.
  const label = isLocked ? "Lihat Pembahasan" : "Lihat Hint"
  const title = isLocked ? "Pembahasan" : "Hint"

  const lines = useMemo(() => {
    if (!aiFeedback) return null
    const raw = aiFeedback.trim()
    if (!raw) return null
    const parts = raw.split("•").filter(Boolean)
    if (parts.length <= 1) {
      return <p className="text-black text-xs md:text-sm">{raw}</p>
    }
    return (
      <ul className="space-y-2 list-none">
        {parts.map((part, i) => {
          const trimmed = part.trim().replace(/\n/g, " ").replace(/\s+/g, " ")
          if (!trimmed) return null
          return (
            <li key={i} className="flex items-start gap-2 text-black text-xs md:text-sm leading-relaxed">
              <span className="shrink-0 mt-0.5">{"\u2022"}</span>
              <span>{trimmed}</span>
            </li>
          )
        })}
      </ul>
    )
  }, [aiFeedback])

  if (!lines) return null

  return (
    <div className="flex justify-center">
      <Popover>
        <PopoverTrigger render={<Button className="font-bold uppercase text-xs md:text-sm" />}>
          {label}
        </PopoverTrigger>
        <PopoverContent>
          <PopoverHeader>
            <PopoverTitle>{title}</PopoverTitle>
            <PopoverDescription>
              {lines}
            </PopoverDescription>
          </PopoverHeader>
        </PopoverContent>
      </Popover>
    </div>
  )
}
