"use client"

import { useState } from "react"
import { Input } from "@/components/retroui/Input"
import { Button } from "@/components/retroui/Button"
import { MaterialIcon } from "@/components/common/MaterialIcon"
import type { ReactNode } from "react"

/* Reusable auth form field — label + styled Input with optional trailing icon or password toggle. */
interface AuthFormFieldProps {
  label: string
  type?: string
  placeholder: string
  icon?: ReactNode
  showPasswordToggle?: boolean
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export function AuthFormField({
  label,
  type = "text",
  placeholder,
  icon,
  showPasswordToggle,
  value,
  onChange,
}: AuthFormFieldProps) {
  const [showPassword, setShowPassword] = useState(false)
  const inputType = showPasswordToggle && showPassword ? "text" : type

  return (
    <div className="space-y-2">
      <label className="text-xs font-black uppercase">{label}</label>
      <div className="relative">
        <Input
          type={inputType}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="w-full h-14 bg-white border-4 border-black text-base px-4"
        />
        <div className="absolute inset-y-0 right-0 flex items-center pr-4">
          {showPasswordToggle ? (
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => setShowPassword((prev) => !prev)}
              className="border-0 shadow-none bg-transparent h-full text-muted-foreground hover:text-foreground hover:bg-transparent"
            >
              <MaterialIcon className="size-5" name={showPassword ? "visibility_off" : "visibility"} />
            </Button>
          ) : icon ? (
            <span className="pointer-events-none">{icon}</span>
          ) : null}
        </div>
      </div>
    </div>
  )
}
