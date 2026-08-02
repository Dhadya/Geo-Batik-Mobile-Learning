import { createAuthClient } from "better-auth/react";

/**
 * Client-side base URL for BetterAuth.
 * Prefers NEXT_PUBLIC_BETTER_AUTH_URL; otherwise derives the origin from the
 * current window so the OAuth flow always targets the domain the user is on
 * (works on Vercel even if the env var was not baked in at build time).
 */
function resolveBaseURL(): string {
  const configured = process.env.NEXT_PUBLIC_BETTER_AUTH_URL
  if (configured) return configured
  if (typeof window !== "undefined") return window.location.origin
  return "http://localhost:3000"
}

const baseURL = resolveBaseURL()

export const authClient = createAuthClient({ baseURL });

// Destructure commonly used auth methods for convenience
export const { signIn, signOut, signUp } = authClient;
