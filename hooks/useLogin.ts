"use client";

import { useState } from "react";
import { useSignIn } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

/**
 * Hook that owns all sign-in state and Clerk interactions for the login page.
 * Returns form state + submit handlers so the page component stays purely UI.
 */
export function useLogin() {
  const { signIn } = useSignIn();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  /** Sign in with email + password, then finalise the session. */
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const { error: signInError } = await signIn.password({
        identifier: email,
        password,
      });

      if (signInError) {
        setError(signInError.message);
        return;
      }

      if (signIn.status === "complete") {
        const { error: finalizeError } = await signIn.finalize();
        if (finalizeError) {
          setError(finalizeError.message);
          return;
        }
        router.push(
          process.env.NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL || "/menu"
        );
      }
    } catch (err: unknown) {
      setError(
        err instanceof Error ? err.message : "Login gagal. Periksa email dan password."
      );
    } finally {
      setLoading(false);
    }
  }

  /** Sign in via Google OAuth (the redirect flow handles the rest). */
  async function handleGoogleSignIn() {
    setError("");
    try {
      const { error: ssoError } = await signIn.sso({
        strategy: "oauth_google",
        redirectUrl: "/sso-callback",
        redirectCallbackUrl: "/menu",
      });
      if (ssoError) setError(ssoError.message);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Login Google gagal.");
    }
  }

  return {
    email,
    setEmail,
    password,
    setPassword,
    error,
    loading,
    handleSubmit,
    handleGoogleSignIn,
  };
}
