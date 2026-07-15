import { cn } from "@/lib/utils"

/* Material Symbols icon — renders a named icon via Google Material Symbols font.
   Font loaded in app/layout.tsx via Google Fonts <link>. */
interface MaterialIconProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Material Symbol name (snake_case), e.g. "arrow_forward", "transform" */
  name: string
}

export function MaterialIcon({ name, className, ...props }: MaterialIconProps) {
  return (
    <span
      className={cn("material-symbols-outlined", className)}
      aria-hidden="true"
      {...props}
    >
      {name}
    </span>
  )
}
