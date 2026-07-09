import { createAuthClient } from "better-auth/react";

// BetterAuth React client — provides hooks like useSession() plus all auth methods
export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_BETTER_AUTH_URL || "http://localhost:3000",
});

// Destructure commonly used auth methods for convenience
export const { signIn, signOut, signUp } = authClient;
