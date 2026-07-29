import type { FieldColor } from "./validation"

/**
 * Returns Tailwind classes for input border/bg based on AI-derived field color.
 * Color is determined solely by the section AI score tier (green/orange/red),
 * not by local error presence — the AI score is the source of truth.
 */
export function fieldColorClasses(color?: FieldColor): string {
  if (color === "green") return "border-green-600 bg-green-50"
  if (color === "orange") return "border-orange-400 bg-orange-50"
  if (color === "red") return "border-destructive bg-destructive/10"
  return "border-black"
}
