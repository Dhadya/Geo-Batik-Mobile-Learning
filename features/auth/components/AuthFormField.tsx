"use client"

import { useState } from "react"
import { type LucideIcon, Eye, EyeOff } from "lucide-react"
import { Input } from "@/components/retroui/Input"
import { Button } from "@/components/retroui/Button"

/* Reusable auth form field — label + styled Input with optional trailing icon or password toggle. */
interface AuthFormFieldProps {
  label: string
  type?: string
  placeholder: string
  icon?: LucideIcon
  showPasswordToggle?: boolean
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export function AuthFormField({
  label,
  type = "text",
  placeholder,
  icon: Icon,
  showPasswordToggle,
  value,
  onChange,
}: AuthFormFieldProps) {
  // Toggle state for password visibility
  const [showPassword, setShowPassword] = useState(false)
  // Switch to text type when password is visible
  const inputType = showPasswordToggle && showPassword ? "text" : type

  return (
    /* Field wrapper with spacing */
    <div className="space-y-2">
      {/* Field label */}
      <label className="text-xs font-bold uppercase">{label}</label>
      {/* Input container — relative for icon positioning */}
      <div className="relative">
        {/* Styled input with NeoBrutalism border */}
        <Input
          type={inputType}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="w-full h-14 bg-white border-4 border-black !rounded-none text-base px-4"
        />
        {/* Right-side icon container — password toggle or static icon */}
        <div className="absolute inset-y-0 right-0 flex items-center pr-4">
          {showPasswordToggle ? (
            /* Password toggle button — transparent background */
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => setShowPassword((prev) => !prev)}
              className="!rounded-none !border-0 !shadow-none !bg-transparent h-full text-muted-foreground hover:text-foreground hover:!bg-transparent"
            >
              {showPassword ? <Eye className="size-5" /> : <EyeOff className="size-5" />}
            </Button>
          ) : Icon ? (
            /* Static icon — non-interactive */
            <Icon className="size-5 text-muted-foreground pointer-events-none" />
          ) : null}
        </div>
      </div>
    </div>
  )
}
