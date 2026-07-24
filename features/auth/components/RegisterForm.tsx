"use client"

import Image from "next/image"
import Link from "next/link"
import { Loader } from "@/components/retroui/Loader"
import { Button } from "@/components/retroui/Button"
import { MaterialIcon } from "@/components/common/MaterialIcon"
import { AuthFormField } from "./AuthFormField"
import { useRegisterForm } from "../hooks/useRegisterForm"

/* Register form — name/email/password fields + Google OAuth + navigation to login. */
export function RegisterForm() {
  // Form state and handlers from custom hook
  const {
    name,
    setName,
    email,
    setEmail,
    password,
    setPassword,
    error,
    clearError,
    loading,
    googleLoading,
    success,
    handleSubmit,
    handleGoogleSignUp,
  } = useRegisterForm()

  // Disable all buttons during any loading state
  const isDisabled = loading || googleLoading

  // Success state — show checkmark and redirect message
  if (success) {
    return (
      <div className="text-center space-y-4 py-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-secondary border-4 border-black neubrutal-shadow-sm">
          <MaterialIcon className="size-8 text-black" name="check" />
        </div>
        <h2 className="text-xl font-black uppercase">Berhasil Daftar!</h2>
        <p className="text-sm">Anda akan dialihkan ke halaman login...</p>
      </div>
    )
  }

  return (
    <>
      {/* Registration form */}
      <form className="space-y-6" onSubmit={handleSubmit}>
        {/* Full name input */}
        <AuthFormField
          label="Nama Lengkap"
          placeholder="Ahmad Santoso"
          value={name}
          onChange={(e) => { setName(e.target.value); clearError() }}
        />

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
          variant="default"
          size="lg"
          disabled={isDisabled}
          className="w-full h-16 text-xl font-black uppercase neubrutal-shadow hover-shift active-shift flex items-center justify-center gap-3"
        >
          {loading ? (
            <Loader variant="secondary" size="lg" />
          ) : (
            <>
              DAFTAR
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
          onClick={handleGoogleSignUp}
          disabled={isDisabled}
          className="w-full h-14 mt-6 border-4 border-black font-bold uppercase flex items-center justify-center gap-3"
        >
          {googleLoading ? (
            <Loader size="md" />
          ) : (
            <>
              <Image src="/icons/google.svg" alt="" width={20} height={20} />
              DAFTAR DENGAN GOOGLE
            </>
          )}
        </Button>
      </div>

      {/* Footer — link to login page */}
      <div className="mt-10 border-t-4 border-black pt-6 text-center">
        <p className="text-sm mb-4">Sudah punya akun?</p>
        <Link href="/login">
          <Button
            variant="default"
            className="w-full h-12 bg-card border-4 border-black text-xs font-bold uppercase hover:bg-secondary-container transition-all"
          >
            Masuk Sekarang
          </Button>
        </Link>
      </div>
    </>
  )
}
