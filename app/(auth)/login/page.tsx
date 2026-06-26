"use client"

import { User, ArrowRight } from "lucide-react"
import { Button } from "@/components/retroui/Button"
import { Checkbox } from "@/components/retroui/Checkbox"
import Link from "next/link"
import { AuthLayout } from "@/components/auth/AuthLayout"
import { AuthFormField } from "@/components/auth/AuthFormField"

/* Login page — /login route within (auth) group. Form fields, "Ingat Saya", "Lupa?" link. */
export default function LoginPage() {
  return (
    <AuthLayout subtitle="Portal Login Siswa — Masuk ke Akun GEMATRI">
      <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
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

        <div className="flex items-center justify-between pt-2">
          <label className="flex items-center gap-3 cursor-pointer">
            <Checkbox variant="outline" className="border-4 border-black !rounded-none size-6" />
            <span className="text-xs font-bold uppercase">Ingat Saya</span>
          </label>
          <Link href="#" className="text-xs font-bold uppercase text-primary-dark underline">
            Lupa?
          </Link>
        </div>

        <Button
          type="submit"
          variant="default"
          size="lg"
          className="w-full !h-16 !text-xl font-black uppercase neubrutal-shadow hover-shift active-shift !rounded-none flex items-center justify-center gap-3"
        >
          MASUK
          <ArrowRight className="size-6" />
        </Button>
      </form>

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
    </AuthLayout>
  )
}
