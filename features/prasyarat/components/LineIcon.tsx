import { cn } from "@/lib/utils"

interface LineIconProps {
  variant: "garis" | "ruas_garis"
  className?: string
}

/**
 * Custom SVG icon for geometry line concepts.
 * - `garis`: diagonal line with arrowheads on both ends (infinite line)
 * - `ruas_garis`: diagonal line with filled circle endpoints (line segment)
 */
export function LineIcon({ variant, className }: LineIconProps) {
  if (variant === "garis") {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        className={cn("size-[1em]", className)}
        aria-hidden="true"
      >
        {/* Diagonal line from bottom-left to top-right */}
        <line x1="4" y1="20" x2="20" y2="4" />
        {/* Arrowhead at top-right end */}
        <polyline points="13,4 20,4 20,11" />
        {/* Arrowhead at bottom-left end */}
        <polyline points="11,20 4,20 4,13" />
      </svg>
    )
  }

  // ruas_garis: line segment with filled dots at both ends
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("size-[1em]", className)}
      aria-hidden="true"
    >
      {/* Diagonal line */}
      <line x1="5" y1="19" x2="19" y2="5" stroke="currentColor" strokeWidth={2} fill="none" />
      {/* Dot at bottom-left */}
      <circle cx="5" cy="19" r="2" />
      {/* Dot at top-right */}
      <circle cx="19" cy="5" r="2" />
    </svg>
  )
}
