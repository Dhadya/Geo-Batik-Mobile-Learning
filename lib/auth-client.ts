import { createAuthClient } from "better-auth/react";

const baseURL =
  process.env.NEXT_PUBLIC_BETTER_AUTH_URL || "http://localhost:3000"

/** BetterAuth React client — always uses NEXT_PUBLIC_BETTER_AUTH_URL so OAuth callback goes to production URL. */
export const authClient = createAuthClient({ baseURL });

// Destructure commonly used auth methods for convenience
export const { signIn, signOut, signUp } = authClient;
