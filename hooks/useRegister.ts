"use client";

import { useState } from "react";
import { useSignUp } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

/**
 * Hook that owns all sign-up / email-verification state and Clerk interactions
 * for the register page. Returns form state + submit handlers so the page
 * component stays purely UI.
 */
export function useRegister() {
  const { signUp } = useSignUp();
  const router = useRouter();

  /* ---- form fields ---- */
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");

  /* ---- lifecycle ---- */
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [verifying, setVerifying] = useState(false);

  /**
   * Step 1 — Create the user via email + password, then trigger the email
   * verification code. Transitions to the verify-ui on success.
   */
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const { error: passwordError } = await signUp.password({
        emailAddress: email,
        password,
        firstName: fullName.split(" ")[0] || fullName,
        lastName: fullName.split(" ").slice(1).join(" ") || undefined,
      });

      if (passwordError) {
        setError(passwordError.message);
        return;
      }

      const { error: sendCodeError } =
        await signUp.verifications.sendEmailCode();
      if (sendCodeError) {
        setError(sendCodeError.message);
        return;
      }

      setVerifying(true);
    } catch (err: unknown) {
      setError(
        err instanceof Error ? err.message : "Registrasi gagal. Coba lagi."
      );
    } finally {
      setLoading(false);
    }
  }

  /**
   * Step 2 — Verify the 6-digit code sent to the user's email, then
   * finalise the session and redirect.
   */
  async function handleVerify(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const { error: verifyError } =
        await signUp.verifications.verifyEmailCode({ code });

      if (verifyError) {
        setError(verifyError.message);
        return;
      }

      if (signUp.status === "complete") {
        const { error: finalizeError } = await signUp.finalize();
        if (finalizeError) {
          setError(finalizeError.message);
          return;
        }
        router.push(
          process.env.NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL || "/menu"
        );
      }
    } catch (err: unknown) {
      setError(
        err instanceof Error ? err.message : "Verifikasi gagal. Kode salah."
      );
    } finally {
      setLoading(false);
    }
  }

  /** Sign up via Google OAuth (the redirect flow handles the rest). */
  async function handleGoogleSignUp() {
    setError("");
    try {
      const { error: ssoError } = await signUp.sso({
        strategy: "oauth_google",
        redirectUrl: "/sso-callback",
        redirectCallbackUrl: "/menu",
      });
      if (ssoError) setError(ssoError.message);
    } catch (err: unknown) {
      setError(
        err instanceof Error ? err.message : "Daftar dengan Google gagal."
      );
    }
  }

  /** Go back to the registration form from the verify step. */
  function goBackToForm() {
    setVerifying(false);
    setCode("");
    setError("");
  }

  return {
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
  };
}
