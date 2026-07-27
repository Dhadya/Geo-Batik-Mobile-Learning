"use client"

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
  if (!aiFeedback) return null

  // When form is locked (attempt exhausted or correct), show final explanation.
  // When still editable (percobaan 2), show hint so the student can refer to it.
  const label = isLocked ? "Lihat Pembahasan" : "Lihat Hint"
  const title = isLocked ? "Pembahasan" : "Hint"

  return (
    <div className="flex justify-center">
      <Popover>
        <PopoverTrigger render={<Button className="font-bold uppercase text-xs md:text-sm" />}>
          {label}
        </PopoverTrigger>
        <PopoverContent>
          <PopoverHeader>
            <PopoverTitle>{title}</PopoverTitle>
            <PopoverDescription className="whitespace-pre-wrap text-black">
              {aiFeedback}
            </PopoverDescription>
          </PopoverHeader>
        </PopoverContent>
      </Popover>
    </div>
  )
}
