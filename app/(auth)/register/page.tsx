"use client"

import { User, ArrowRight } from "lucide-react"
import { Button } from "@/components/retroui/Button"
import Link from "next/link"
import { AuthLayout } from "@/components/auth/AuthLayout"
import { AuthFormField } from "@/components/auth/AuthFormField"

/* Register page — /register route within (auth) group. Name, username, password fields. */
export default function RegisterPage() {
  return (
    <AuthLayout subtitle="Portal Registrasi Siswa — Daftar Akun GEMATRI">
      <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
        <AuthFormField
          label="Nama Lengkap"
          placeholder="Ahmad Santoso"
        />

        <AuthFormField
          label="Username"
          placeholder="Siswa_Ahmad_24"
          icon={User}
        />

        <AuthFormField
          label="Password"
          type="password"
          placeholder="••••••••"
          showPasswordToggle
        />

        <Button
          type="submit"
          variant="default"
          size="lg"
          className="w-full !h-16 !text-xl font-black uppercase neubrutal-shadow hover-shift active-shift !rounded-none flex items-center justify-center gap-3"
        >
          DAFTAR
          <ArrowRight className="size-6" />
        </Button>
      </form>

      <div className="mt-10 border-t-4 border-black pt-6 text-center">
        <p className="text-sm mb-4">Sudah punya akun?</p>
        <Link href="/login">
          <Button
            variant="default"
            className="w-full !h-12 bg-white border-4 border-black !rounded-none text-xs font-bold uppercase hover:bg-secondary-container transition-all"
          >
            Masuk Sekarang
          </Button>
        </Link>
      </div>
    </AuthLayout>
  )
}
