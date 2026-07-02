"use client";

import { ArrowRight, Loader2, User } from "lucide-react";
import Link from "next/link";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { AuthFormField } from "@/components/auth/AuthFormField";
import { Button } from "@/components/retroui/Button";
import { useRegister } from "@/hooks/useRegister";

export default function RegisterPage() {
  const {
    fullName,
    setFullName,
    email,
    setEmail,
    password,
    setPassword,
    code,
    setCode,
    error,
    loading,
    verifying,
    handleSubmit,
    handleVerify,
    handleGoogleSignUp,
    goBackToForm,
  } = useRegister();

  /* Verify-code step --------------------------------------------------- */
  if (verifying) {
    return (
      <AuthLayout subtitle="Verifikasi Email — Masukkan Kode OTP">
        <form className="space-y-6" onSubmit={handleVerify}>
          {error && (
            <div className="border-4 border-red-500 bg-red-50 p-3 text-xs font-bold uppercase text-red-700">
              {error}
            </div>
          )}

          <p className="text-sm text-center">
            Kode verifikasi telah dikirim ke <strong>{email}</strong>
          </p>

          <AuthFormField
            label="Kode Verifikasi"
            placeholder="123456"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            required
          />

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
                VERIFIKASI
                <ArrowRight className="size-6" />
              </>
            )}
          </Button>

          <Button
            type="button"
            variant="ghost"
            onClick={goBackToForm}
            className="w-full text-xs font-bold uppercase"
          >
            Kembali ke Formulir
          </Button>
        </form>
      </AuthLayout>
    );
  }

  /* Registration form -------------------------------------------------- */
  return (
    <AuthLayout subtitle="Portal Registrasi Siswa — Daftar Akun GEMATRI">
      <form className="space-y-6" onSubmit={handleSubmit}>
        {error && (
          <div className="border-4 border-red-500 bg-red-50 p-3 text-xs font-bold uppercase text-red-700">
            {error}
          </div>
        )}

        <div id="clerk-captcha" />

        <AuthFormField
          label="Nama Lengkap"
          placeholder="Ahmad Santoso"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
        />

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
              DAFTAR
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
        onClick={handleGoogleSignUp}
        className="w-full !h-14 !text-base font-bold uppercase neubrutal-shadow hover-shift active-shift !rounded-none flex items-center justify-center gap-3 bg-white"
      >
        <img src="/icons/google.svg" alt="Google" className="size-5" />
        Daftar dengan Google
      </Button>

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
  );
}
