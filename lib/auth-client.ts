import { createAuthClient } from "better-auth/react";

/**
 * Client-side base URL for BetterAuth.
 * NEXT_PUBLIC_BETTER_AUTH_URL must be set to the production URL on Vercel
 * (e.g. https://gematri.vercel.app) so Google OAuth redirects to the
 * correct domain instead of localhost.
 */
const baseURL =
  process.env.NEXT_PUBLIC_BETTER_AUTH_URL || "http://localhost:3000"

export const authClient = createAuthClient({ baseURL });

// Destructure commonly used auth methods for convenience
export const { signIn, signOut, signUp } = authClient;
