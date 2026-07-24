"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { signUp, signIn } from "@/lib/auth-client"

// Name validation — checks empty and minimum length
function validateName(name: string): string | null {
  if (!name.trim()) return "Nama wajib diisi"
  if (name.trim().length < 2) return "Nama minimal 2 karakter"
  return null
}

// Email validation — checks empty and format
function validateEmail(email: string): string | null {
  if (!email.trim()) return "Email wajib diisi"
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) return "Format email tidak valid (misal: nama@email.com)"
  return null
}

// Password validation — checks empty, length, and character variety
function validatePassword(password: string): string | null {
  if (!password) return "Password wajib diisi"
  if (password.length < 8) return "Password minimal 8 karakter"
  if (!/[A-Z]/.test(password)) return "Password harus mengandung huruf besar (A-Z)"
  if (!/[a-z]/.test(password)) return "Password harus mengandung huruf kecil (a-z)"
  if (!/[0-9]/.test(password)) return "Password harus mengandung angka (0-9)"
  if (!/[!@#$%^&*]/.test(password)) return "Password harus mengandung simbol (!@#$%^&*)"
  return null
}

// Maps BetterAuth error messages to user-friendly Indonesian text
function mapAuthError(message: string): string {
  const lower = message.toLowerCase()
  if (lower.includes("already") || lower.includes("exists") || lower.includes("unique")) {
    return "Email sudah terdaftar. Silakan gunakan email lain atau masuk."
  }
  if (lower.includes("password")) {
    return "Password terlalu lemah. Gunakan kombinasi huruf besar, huruf kecil, angka, dan simbol."
  }
  if (lower.includes("email")) {
    return "Format email tidak valid (misal: nama@email.com)"
  }
  return "Gagal mendaftar. Silakan coba lagi."
}

/* Register form hook — manages form state, validation, and auth API calls. */
export function useRegisterForm() {
  const router = useRouter()

  // Form fields
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  // Error and loading states
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [googleLoading, setGoogleLoading] = useState(false)
  // Success state — triggers redirect to login after 2s
  const [success, setSuccess] = useState(false)

  // Clear error message on user input
  function clearError() {
    setError("")
  }

  // Handle registration form submission
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError("")

    // Validate all fields before API call
    const nameError = validateName(name)
    if (nameError) {
      setError(nameError)
      return
    }

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
      const { error } = await signUp.email({
        name: name.trim(),
        email: email.trim(),
        password,
        callbackURL: "/prasyarat",
      })

      if (error) {
        setError(mapAuthError(error.message || ""))
      } else {
        setSuccess(true)
        // Redirect to login after showing success state
        setTimeout(() => {
          router.push("/login")
        }, 2000)
      }
    } catch {
      setError("Terjadi kesalahan jaringan. Periksa koneksi internet Anda.")
    } finally {
      setLoading(false)
    }
  }

  // Handle Google OAuth sign-up — redirects to Google
  async function handleGoogleSignUp() {
    setGoogleLoading(true)
    setError("")

    try {
      await signIn.social({
        provider: "google",
        callbackURL: "/prasyarat",
        errorCallbackURL: "/register",
        newUserCallbackURL: "/prasyarat",
        requestSignUp: true,
      })
    } catch {
      setError("Gagal menghubungi Google. Silakan coba lagi.")
      setGoogleLoading(false)
    }
  }

  return {
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
  }
}
