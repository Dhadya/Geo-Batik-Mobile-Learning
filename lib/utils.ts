import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

/* Tailwind class merge utility — combines classes and resolves conflicts.
   Used by all RetroUI components. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
