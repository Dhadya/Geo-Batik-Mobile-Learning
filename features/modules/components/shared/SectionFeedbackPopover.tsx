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
import { MaterialIcon } from "@/components/common/MaterialIcon"

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
    <Popover>
      <PopoverTrigger render={<Button variant="outline" className="w-fit font-bold uppercase text-xs md:text-sm" />}>
        <MaterialIcon className="size-4 mr-1" name="lightbulb" />
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
  )
}
