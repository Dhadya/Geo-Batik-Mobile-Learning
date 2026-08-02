import type { FieldColor } from "./validation"

/**
 * Returns Tailwind classes for input border/bg based on per-field color.
 * Each input field gets its own individual color based on whether that
 * specific input is correct (green) or wrong (red).
 */
export function fieldColorClasses(color?: FieldColor): string {
  if (color === "green") return "border-green-600 bg-green-50"
  if (color === "orange") return "border-orange-400 bg-orange-50"
  if (color === "red") return "border-destructive bg-destructive/10"
  return "border-black"
}
