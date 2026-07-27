import { AuthLayout } from "@/components/layout/AuthLayout"
import { RegisterForm } from "@/features/auth/components/RegisterForm"

/* Register page — renders RegisterForm inside AuthLayout */
export default function RegisterPage() {
  return (
    <AuthLayout subtitle="Portal Registrasi Siswa, Daftar Akun GEMATRI">
      <RegisterForm />
    </AuthLayout>
  )
}
