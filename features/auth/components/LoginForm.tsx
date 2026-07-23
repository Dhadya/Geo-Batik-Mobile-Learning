"use client"

import Image from "next/image"
import Link from "next/link"
import { Loader } from "@/components/retroui/Loader"
import { Button } from "@/components/retroui/Button"
import { MaterialIcon } from "@/components/common/MaterialIcon"
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
          icon={<MaterialIcon className="size-5 text-muted-foreground" name="person" />}
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

        {/* Submit button — full width with NeoBrutalism shadow */}
        <Button
          type="submit"
          variant="outline"
          size="lg"
          disabled={isDisabled}
          className="w-full h-16 text-xl font-black uppercase flex items-center justify-center gap-3 bg-card text-black"
        >
          {loading ? (
            <Loader variant="secondary" size="lg" />
          ) : (
            <>
              MASUK
              <MaterialIcon className="size-6" name="arrow_forward" />
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
          className="w-full h-14 mt-6 border-4 border-black font-bold uppercase flex items-center justify-center gap-3"
        >
          {googleLoading ? (
            <Loader size="md" />
          ) : (
            <>
              <Image src="/icons/google.svg" alt="" width={20} height={20} />
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
            variant="outline"
            className="w-full h-12 bg-card text-black border-4 border-black text-xs font-bold uppercase transition-all"
          >
            Daftar Baru
          </Button>
        </Link>
      </div>
    </>
  )
}
