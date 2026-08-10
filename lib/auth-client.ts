import { createAuthClient } from "better-auth/react";

/**
 * Client-side base URL for BetterAuth.
 * Prefers NEXT_PUBLIC_BETTER_AUTH_URL unless it is a loopback address baked in
 * during a production build; otherwise derives the origin from the current
 * window so the OAuth flow always targets the domain the user is on.
 */
function isLocalURL(url: string): boolean {
  return url.includes("localhost") || url.includes("127.0.0.1");
}

function resolveBaseURL(): string {
  if (typeof window !== "undefined") {
    // In browser, prefer window.location.origin unless NEXT_PUBLIC_BETTER_AUTH_URL is explicitly set to a production domain
    const configured = process.env.NEXT_PUBLIC_BETTER_AUTH_URL?.trim()
    if (configured && !isLocalURL(configured)) return configured
    return window.location.origin
  }
  const configured = process.env.NEXT_PUBLIC_BETTER_AUTH_URL?.trim()
  if (configured && !isLocalURL(configured)) return configured
  return "http://localhost:3000"
}

const baseURL = resolveBaseURL()

export const authClient = createAuthClient({ baseURL });

// Destructure commonly used auth methods for convenience
export const { signIn, signOut, signUp } = authClient;
