import type { ReactNode } from "react"
import { MaterialIcon } from "@/components/common/MaterialIcon"

/** Parse **bold** markers into <strong> elements */
export function parseBold(text: string): ReactNode[] {
  return text.split(/\*\*(.+?)\*\*/g).map((part, i) =>
    i % 2 === 1 ? <strong key={i} className="font-black">{part}</strong> : part
  )
}

/** Render a paragraph with bold markup support */
export function RichParagraph({ text }: { text: string }) {
  return (
    <p className="text-sm md:text-base leading-relaxed text-foreground text-justify">
      {parseBold(text)}
    </p>
  )
}

/** Three decorative shape stamps at the bottom of the content card */
export function ShapeStamps() {
  return (
    <div className="flex justify-center gap-3 md:gap-4 pt-3 md:pt-4">
      <div className="size-10 md:size-12 border-2 border-black bg-white flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
        <MaterialIcon name="grid_view" className="text-xl md:text-2xl text-secondary" />
      </div>
      <div className="size-10 md:size-12 border-2 border-black bg-white flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
        <MaterialIcon name="change_history" className="text-xl md:text-2xl text-tertiary" />
      </div>
      <div className="size-10 md:size-12 border-2 border-black bg-white flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
        <MaterialIcon name="circle" className="text-xl md:text-2xl text-primary" />
      </div>
    </div>
  )
}
