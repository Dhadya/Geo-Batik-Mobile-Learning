"use client";

import { ArrowRight, Loader2, User } from "lucide-react";
import Link from "next/link";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { AuthFormField } from "@/components/auth/AuthFormField";
import { Button } from "@/components/retroui/Button";
import { Checkbox } from "@/components/retroui/Checkbox";
import { useLogin } from "@/hooks/useLogin";

export default function LoginPage() {
  const {
    email,
    setEmail,
    password,
    setPassword,
    error,
    loading,
    handleSubmit,
    handleGoogleSignIn,
  } = useLogin();

  return (
    <AuthLayout subtitle="Portal Login Siswa — Masuk ke Akun GEMATRI">
      <form className="space-y-6" onSubmit={handleSubmit}>
        {error && (
          <div className="border-4 border-red-500 bg-red-50 p-3 text-xs font-bold uppercase text-red-700">
            {error}
          </div>
        )}

        <AuthFormField
          label="Email"
          type="email"
          placeholder="siswa@email.com"
          icon={User}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <AuthFormField
          label="Password"
          type="password"
          placeholder="••••••••"
          showPasswordToggle
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <div className="flex items-center justify-between pt-2">
          <label className="flex items-center gap-3 cursor-pointer">
            <Checkbox
              variant="outline"
              className="border-4 border-black !rounded-none size-6"
            />
            <span className="text-xs font-bold uppercase">Ingat Saya</span>
          </label>
          <Link
            href="#"
            className="text-xs font-bold uppercase text-primary-dark underline"
          >
            Lupa?
          </Link>
        </div>

        <Button
          type="submit"
          variant="default"
          size="lg"
          disabled={loading}
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

      <div className="mt-6 flex items-center gap-4">
        <div className="flex-1 h-1 bg-black" />
        <span className="text-xs font-bold uppercase">ATAU</span>
        <div className="flex-1 h-1 bg-black" />
      </div>

      <Button
        type="button"
        variant="outline"
        size="lg"
        onClick={handleGoogleSignIn}
        className="w-full !h-14 !text-base font-bold uppercase neubrutal-shadow hover-shift active-shift !rounded-none flex items-center justify-center gap-3 bg-white"
      >
        <img src="/icons/google.svg" alt="Google" className="size-5" />
        Masuk dengan Google
      </Button>

      <div className="mt-10 border-t-4 border-black pt-6 text-center">
        <p className="text-sm mb-4">Belum punya akun?</p>
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
  );
}
