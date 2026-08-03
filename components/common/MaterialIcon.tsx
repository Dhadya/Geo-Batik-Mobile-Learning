"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

/* Material Symbols icon — renders a named icon via Google Material Symbols font.
   Font loaded in app/layout.tsx via Google Fonts <link>.
   Uses document.fonts.ready to hide the raw icon name until the font is loaded. */
interface MaterialIconProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Material Symbol name (snake_case), e.g. "arrow_forward", "transform" */
  name: string
}

export function MaterialIcon({ name, className, ...props }: MaterialIconProps) {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    document.fonts.ready.then(() => setReady(true))
  }, [])

  return (
    <span
      className={cn("material-symbols-outlined", !ready && "invisible", className)}
      aria-hidden="true"
      {...props}
    >
      {name}
    </span>
  )
}
