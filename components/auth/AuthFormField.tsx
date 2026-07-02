"use client"

import { useState } from "react"
import { type LucideIcon, Eye, EyeOff } from "lucide-react"
import { Input } from "@/components/retroui/Input"
import { Button } from "@/components/retroui/Button"

interface AuthFormFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
  icon?: LucideIcon
  showPasswordToggle?: boolean
}

export function AuthFormField({
  label,
  type = "text",
  placeholder,
  icon: Icon,
  showPasswordToggle,
  ...props
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
          {...props}
        />
        <div className="absolute inset-y-0 right-0 flex items-center pr-4">
          {showPasswordToggle ? (
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => setShowPassword((prev) => !prev)}
              className="!rounded-none !border-0 !shadow-none h-full text-muted-foreground hover:text-foreground"
            >
              {showPassword ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
            </Button>
          ) : Icon ? (
            <Icon className="size-5 text-muted-foreground pointer-events-none" />
          ) : null}
        </div>
      </div>
    </div>
  )
}
