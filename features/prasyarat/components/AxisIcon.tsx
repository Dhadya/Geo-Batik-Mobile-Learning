import { cn } from "@/lib/utils"

interface AxisIconProps {
  axis: "horizontal" | "vertical"
  className?: string
}

/** Custom SVG bidirectional arrow for sumbu x/y — single connected line with arrowheads on both ends. */
export function AxisIcon({ axis, className }: AxisIconProps) {
  if (axis === "horizontal") {
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
        <line x1="3" y1="12" x2="21" y2="12" />
        <polyline points="7,8 3,12 7,16" />
        <polyline points="17,8 21,12 17,16" />
      </svg>
    )
  }

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
      <line x1="12" y1="3" x2="12" y2="21" />
      <polyline points="8,7 12,3 16,7" />
      <polyline points="8,17 12,21 16,17" />
    </svg>
  )
}
