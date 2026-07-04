"use client"

import { User, ArrowRight, Loader2 } from "lucide-react"
import { Button } from "@/components/retroui/Button"
import { Checkbox } from "@/components/retroui/Checkbox"
import Link from "next/link"
import { AuthFormField } from "./AuthFormField"
import { useLoginForm } from "../hooks/useLoginForm"

/* Login form — email/password fields + Google OAuth + navigation to register. */
export function LoginForm() {
  // Form state and handlers from custom hook
  const {
    email,
    setEmail,
    password,
    setPassword,
    error,
    clearError,
    loading,
    googleLoading,
    handleSubmit,
    handleGoogleSignIn,
  } = useLoginForm()

  // Disable all buttons during any loading state
  const isDisabled = loading || googleLoading

  return (
    <>
      {/* Email/password login form */}
      <form className="space-y-6" onSubmit={handleSubmit}>
        {/* Email input — type="text" to avoid native browser validation */}
        <AuthFormField
          label="Email"
          type="text"
          placeholder="nama@gmail.com"
          icon={User}
          value={email}
          onChange={(e) => { setEmail(e.target.value); clearError() }}
        />

        {/* Password input with show/hide toggle */}
        <AuthFormField
          label="Password"
          type="password"
          placeholder="••••••••"
          showPasswordToggle
          value={password}
          onChange={(e) => { setPassword(e.target.value); clearError() }}
        />

        {/* Error message display — bordered box */}
        {error && (
          <div className="border-4 border-destructive bg-destructive/10 px-4 py-3">
            <p className="text-xs font-bold uppercase text-destructive">{error}</p>
          </div>
        )}

        {/* Remember me checkbox + forgot password link */}
        <div className="flex items-center justify-between pt-2">
          <label className="flex items-center gap-3 cursor-pointer">
            <Checkbox variant="outline" className="border-4 border-black !rounded-none size-6" />
            <span className="text-xs font-bold uppercase">Ingat Saya</span>
          </label>
          <Link href="#" className="text-xs font-bold uppercase text-primary-dark underline">
            Lupa?
          </Link>
        </div>

        {/* Submit button — full width with NeoBrutalism shadow */}
        <Button
          type="submit"
          variant="default"
          size="lg"
          disabled={isDisabled}
          className="w-full !h-16 !text-xl font-black uppercase neubrutal-shadow hover-shift active-shift !rounded-none flex items-center justify-center gap-3"
        >
          {loading ? (
            <Loader2 className="size-6 animate-spin" />
          ) : (
            <>
              MASUK
              <ArrowRight className="size-6" />
            </>
          )}
        </Button>
      </form>

      {/* Divider — "ATAU" separator */}
      <div className="mt-6">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t-4 border-black" />
          </div>
          <div className="relative flex justify-center text-xs">
            <span className="bg-card px-4 font-bold uppercase">ATAU</span>
          </div>
        </div>

        {/* Google OAuth button */}
        <Button
          type="button"
          variant="outline"
          onClick={handleGoogleSignIn}
          disabled={isDisabled}
          className="w-full !h-14 mt-6 border-4 border-black !rounded-none font-bold uppercase flex items-center justify-center gap-3"
        >
          {googleLoading ? (
            <Loader2 className="size-5 animate-spin" />
          ) : (
            <>
              <img src="/icons/google.svg" alt="" className="size-5" />
              MASUK DENGAN GOOGLE
            </>
          )}
        </Button>
      </div>

      {/* Footer — link to register page */}
      <div className="mt-10 border-t-4 border-black pt-6 text-center">
        <p className="text-sm mb-4">Belum punya akun akademik?</p>
        <Link href="/register">
          <Button
            variant="default"
            className="w-full !h-12 bg-white border-4 border-black !rounded-none text-xs font-bold uppercase hover:bg-secondary-container transition-all"
          >
            Daftar Baru
          </Button>
        </Link>
      </div>
    </>
  )
}
