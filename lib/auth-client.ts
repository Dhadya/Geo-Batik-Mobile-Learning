import { createAuthClient } from "better-auth/react";

const baseURL =
  typeof window !== "undefined"
    ? window.location.origin
    : (process.env.NEXT_PUBLIC_BETTER_AUTH_URL || "http://localhost:3000")

/** BetterAuth React client — dynamically resolves to the current page origin. */
export const authClient = createAuthClient({ baseURL });

// Destructure commonly used auth methods for convenience
export const { signIn, signOut, signUp } = authClient;
