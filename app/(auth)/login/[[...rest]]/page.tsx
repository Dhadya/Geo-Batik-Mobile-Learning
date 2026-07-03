"use client";

import { SignIn } from "@clerk/nextjs";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { clerkElements } from "@/components/auth/clerkAppearance";

export default function LoginPage() {
  return (
    <AuthLayout subtitle="Portal Login Siswa — Masuk ke Akun GEMATRI">
      <SignIn
        withSignUp={false}
        signUpUrl="/register"
        fallbackRedirectUrl={
          process.env.NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL || "/menu"
        }
        appearance={{ elements: clerkElements }}
      />
    </AuthLayout>
  );
}
