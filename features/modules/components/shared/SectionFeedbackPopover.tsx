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
  isChecked: boolean
  showCobaLagi: boolean
}

/** Floating popover button that shows AI feedback after checking answers. */
export function SectionFeedbackPopover({
  aiFeedback,
  isChecked,
  showCobaLagi,
}: SectionFeedbackPopoverProps) {
  if (!isChecked || !aiFeedback) return null

  const label = showCobaLagi ? "Lihat Hint" : "Lihat Pembahasan"
  const title = showCobaLagi ? "Hint" : "Pembahasan"

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
