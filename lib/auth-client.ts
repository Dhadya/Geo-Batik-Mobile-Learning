import { createAuthClient } from "better-auth/react";

// BetterAuth React client — defaults to same-origin /api/auth in the browser.
// Avoid an absolute localhost fallback so deployed builds never call local dev.
export const authClient = createAuthClient();

// Destructure commonly used auth methods for convenience
export const { signIn, signOut, signUp } = authClient;
