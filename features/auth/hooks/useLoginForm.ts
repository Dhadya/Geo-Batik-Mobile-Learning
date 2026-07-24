"use client"

import { useEffect, useRef, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { toast } from "sonner"
import { signIn } from "@/lib/auth-client"
import { validateEmail, mapLoginError } from "@/lib/validators"
import { validateRedirect } from "@/lib/validate-redirect"

// OAuth error codes from BetterAuth — exhaustive list
const OAUTH_ERRORS: Record<string, string> = {
  oauth_callback: "Gagal masuk dengan Google. Silakan coba lagi.",
  session_expired: "Sesi Anda telah berakhir. Silakan masuk kembali.",
  access_denied: "Akses ditolak oleh Google. Silakan coba lagi.",
  invalid_grant: "Kode autentikasi tidak valid. Silakan coba lagi.",
  server_error: "Terjadi kesalahan server. Silakan coba lagi nanti.",
  temporarily_unavailable: "Layanan sedang tidak tersedia. Silakan coba lagi nanti.",
  // disableImplicitSignUp error — user not registered
  signup_disabled: "Akun belum terdaftar. Silakan daftar terlebih dahulu.",
}

/* Login form hook — manages form state, validation, and auth API calls. */
export function useLoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  // Sanitized redirect URL after successful login
  const redirectTo = validateRedirect(searchParams.get("redirect"))
  // Pre-fill error from OAuth callback failure
  const authError = searchParams.get("error")
  const oauthSuccess = searchParams.get("registered") === "true"

  // Form fields
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  // Error state — initialized from OAuth error query param
  const [error, setError] = useState(
    authError ? OAUTH_ERRORS[authError] || "Terjadi kesalahan. Silakan coba lagi." : ""
  )
  // Loading states
  const [loading, setLoading] = useState(false)
  const [googleLoading, setGoogleLoading] = useState(false)

  // Show toast if redirected from successful registration
  const oauthHandled = useRef(false)

  useEffect(() => {
    if (oauthHandled.current) return

    if (oauthSuccess) {
      oauthHandled.current = true
      toast.success("Berhasil daftar!", {
        description: "Silakan masuk dengan akun yang sudah dibuat.",
      })
    } else if (authError) {
      oauthHandled.current = true
      const msg = OAUTH_ERRORS[authError]
      if (msg) {
        toast.error(msg)
      }
    }
  }, [authError, oauthSuccess])

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

    // Only check password is not empty — no character validation on login
    if (!password.trim()) {
      setError("Password harus diisi")
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
        setError(mapLoginError(error.message || ""))
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
        errorCallbackURL: "/login",
        requestSignUp: false,  // Don't allow sign-up from login page
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
