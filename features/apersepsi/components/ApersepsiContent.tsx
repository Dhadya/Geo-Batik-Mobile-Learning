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
    <p className="text-base md:text-lg leading-relaxed text-foreground text-justify">
      {parseBold(text)}
    </p>
  )
}
