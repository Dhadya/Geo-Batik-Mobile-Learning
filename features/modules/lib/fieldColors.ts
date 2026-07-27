import type { FieldColor } from "./validation"

/** Returns Tailwind classes for input border/bg based on field color and error state. */
export function fieldColorClasses(color?: FieldColor, hasError?: boolean): string {
  if (hasError) return "border-destructive bg-destructive-container"
  if (color === "green") return "border-green-600 bg-green-50"
  if (color === "orange") return "border-orange-400 bg-orange-50"
  if (color === "red") return "border-destructive bg-destructive/10"
  return "border-black"
}
