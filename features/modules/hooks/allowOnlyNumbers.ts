import type React from "react"

/** Blocks non-numeric keystrokes; allows digits, leading minus, and control keys. */
export const allowOnlyNumbers = (e: React.KeyboardEvent<HTMLInputElement>) => {
  if (e.ctrlKey || e.metaKey) return
  if (["Backspace", "Tab", "Escape", "Enter", "ArrowLeft", "ArrowRight", "Delete"].includes(e.key)) return
  if (e.key === "-" && (e.target as HTMLInputElement).selectionStart === 0) return
  if (!/^\d$/.test(e.key)) e.preventDefault()
}
