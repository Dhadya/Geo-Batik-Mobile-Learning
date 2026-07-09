import { cn } from "@/lib/utils"

/* Material Symbols icon — renders a named icon via Google Material Symbols font.
   Font loaded in app/layout.tsx via Google Fonts <link>. */
interface MaterialIconProps {
  /** Material Symbol name (snake_case), e.g. "arrow_forward", "transform" */
  name: string
  /** Additional CSS classes for sizing/color */
  className?: string
}

export function MaterialIcon({ name, className }: MaterialIconProps) {
  return (
    <span
      className={cn("material-symbols-outlined", className)}
      aria-hidden="true"
    >
      {name}
    </span>
  )
}
