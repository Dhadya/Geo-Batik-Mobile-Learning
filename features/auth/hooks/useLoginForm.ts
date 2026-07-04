"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { signIn } from "@/lib/auth-client"

// Email validation — checks empty and format
function validateEmail(email: string): string | null {
  if (!email.trim()) return "Email wajib diisi"
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) return "Format email tidak valid (misal: nama@email.com)"
  return null
}

// Password validation — checks empty and minimum length
function validatePassword(password: string): string | null {
  if (!password) return "Password wajib diisi"
  if (password.length < 8) return "Password minimal 8 karakter"
  return null
}

// Maps BetterAuth error messages to user-friendly Indonesian text
function mapAuthError(message: string): string {
  const lower = message.toLowerCase()
  if (lower.includes("invalid") || lower.includes("credentials") || lower.includes("password")) {
    return "Email atau password salah"
  }
  if (lower.includes("not found") || lower.includes("user")) {
    return "Akun tidak ditemukan. Silakan daftar terlebih dahulu."
  }
  if (lower.includes("too many") || lower.includes("rate")) {
    return "Terlalu banyak percobaan. Coba lagi dalam beberapa menit."
  }
  return message || "Gagal masuk. Silakan coba lagi."
}

/* Login form hook — manages form state, validation, and auth API calls. */
export function useLoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  // Redirect URL after successful login (default: /menu)
  const redirectTo = searchParams.get("redirect") || "/menu"
  // Pre-fill error from OAuth callback failure
  const authError = searchParams.get("error")

  // Form fields
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  // Error state — initialized from OAuth error query param
  const [error, setError] = useState(
    authError === "oauth_callback"
      ? "Gagal masuk dengan Google. Silakan coba lagi."
      : authError === "session_expired"
        ? "Sesi Anda telah berakhir. Silakan masuk kembali."
        : ""
  )
  // Loading states — separate for email and Google sign-in
  const [loading, setLoading] = useState(false)
  const [googleLoading, setGoogleLoading] = useState(false)

  // Clear error message on user input
  function clearError() {
    setError("")
  }

  // Handle email/password form submission
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError("")

    // Validate fields before API call
    const emailError = validateEmail(email)
    if (emailError) {
      setError(emailError)
      return
    }

    const passwordError = validatePassword(password)
    if (passwordError) {
      setError(passwordError)
      return
    }

    setLoading(true)

    try {
      const { error } = await signIn.email({
        email: email.trim(),
        password,
        callbackURL: redirectTo,
      })

      if (error) {
        setError(mapAuthError(error.message || ""))
      } else {
        router.push(redirectTo)
      }
    } catch {
      setError("Terjadi kesalahan jaringan. Periksa koneksi internet Anda.")
    } finally {
      setLoading(false)
    }
  }

  // Handle Google OAuth sign-in — redirects to Google
  async function handleGoogleSignIn() {
    setGoogleLoading(true)
    setError("")

    try {
      await signIn.social({
        provider: "google",
        callbackURL: redirectTo,
      })
    } catch {
      setError("Gagal menghubungi Google. Silakan coba lagi.")
      setGoogleLoading(false)
    }
  }

  return {
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
  }
}
