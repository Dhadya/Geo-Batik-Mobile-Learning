"use client";

import { SignUp } from "@clerk/nextjs";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { clerkElements } from "@/components/auth/clerkAppearance";

export default function RegisterPage() {
  return (
    <AuthLayout subtitle="Portal Registrasi Siswa — Daftar Akun GEMATRI">
      <SignUp
        signInUrl="/login"
        fallbackRedirectUrl={
          process.env.NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL || "/menu"
        }
        appearance={{ elements: clerkElements }}
      />
    </AuthLayout>
  );
}
