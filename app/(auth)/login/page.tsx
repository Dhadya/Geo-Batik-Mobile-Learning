import { Suspense } from "react"
import { Loader2 } from "lucide-react"
import { AuthLayout } from "@/components/layout/AuthLayout"
import { LoginForm } from "@/features/auth/components/LoginForm"

/* Login page — renders LoginForm inside AuthLayout with Suspense for useSearchParams */
export default function LoginPage() {
  return (
    <AuthLayout subtitle="Portal Login Siswa — Masuk ke Akun GEMATRI">
      {/* Suspense boundary required for useSearchParams in LoginForm */}
      <Suspense fallback={
        <div className="flex items-center justify-center py-16">
          <Loader2 className="size-8 animate-spin" />
        </div>
      }>
        <LoginForm />
      </Suspense>
    </AuthLayout>
  )
}
