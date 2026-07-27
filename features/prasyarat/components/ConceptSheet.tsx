"use client"

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/retroui/Sheet"
import type { PrerequisiteConcept } from "../data"

interface ConceptSheetProps {
  concept: PrerequisiteConcept | null
  open: boolean
  onClose: () => void
}

/** Bottom sheet showing concept details — icon, title, description. */
export function ConceptSheet({ concept, open, onClose }: ConceptSheetProps) {
  if (!concept) return null

  return (
    <Sheet open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <SheetContent side="bottom" showCloseButton={false} hideOverlay className="border-t-4 border-black mx-auto inset-x-0">
        <SheetHeader className="items-center gap-2 p-6 md:p-8">
          <div className="text-center space-y-1">
            <SheetTitle className="text-xl md:text-2xl font-black uppercase">
              {concept.title}
            </SheetTitle>
            <SheetDescription className="max-w-5xl text-base md:text-lg leading-relaxed whitespace-pre-line text-foreground">
              {concept.description}
            </SheetDescription>
          </div>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  )
}
