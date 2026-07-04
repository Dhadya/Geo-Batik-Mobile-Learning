import { createAuthClient } from "better-auth/client";

// BetterAuth client — configured with app base URL for browser-side auth calls
export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_BETTER_AUTH_URL || "http://localhost:3000",
});

// Destructure commonly used auth methods for convenience
export const { signIn, signOut, signUp } = authClient;
