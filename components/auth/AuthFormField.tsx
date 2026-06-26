"use client"

import { useState } from "react"
import { type LucideIcon, Eye, EyeOff } from "lucide-react"
import { Input } from "@/components/retroui/Input"

/* Reusable auth form field — label + styled Input with optional trailing icon or password toggle. */
interface AuthFormFieldProps {
  label: string
  type?: string
  placeholder: string
  icon?: LucideIcon
  showPasswordToggle?: boolean
}

export function AuthFormField({
  label,
  type = "text",
  placeholder,
  icon: Icon,
  showPasswordToggle,
}: AuthFormFieldProps) {
  const [showPassword, setShowPassword] = useState(false)
  const inputType = showPasswordToggle && showPassword ? "text" : type

  return (
    <div className="space-y-2">
      <label className="text-xs font-bold uppercase">{label}</label>
      <div className="relative">
        <Input
          type={inputType}
          placeholder={placeholder}
          className="w-full h-14 bg-white border-4 border-black !rounded-none text-base px-4"
        />
        {Icon && (
          <div className="absolute top-0 right-0 h-full flex items-center pr-4 pointer-events-none">
            <Icon className="size-5 text-muted-foreground" />
          </div>
        )}
        {showPasswordToggle && (
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute top-0 right-0 h-full flex items-center pr-4 hover:text-foreground transition-colors"
          >
            {showPassword ? (
              <Eye className="size-5 text-muted-foreground" />
            ) : (
              <EyeOff className="size-5 text-muted-foreground" />
            )}
          </button>
        )}
      </div>
    </div>
  )
}
