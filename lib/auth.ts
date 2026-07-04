import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";
import { db } from "@/lib/db";
import { user, session, account, verification } from "@/drizzle/schema";

// BetterAuth server config — Drizzle adapter with Postgres and schema mapping
export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    // Map BetterAuth models to our Drizzle table exports
    schema: {
      user,
      session,
      account,
      verification,
    },
  }),
  // Email/password authentication enabled, no email verification required
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false,
  },
  // Google OAuth provider config
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      // Block implicit sign-up — allow sign-up from register page via requestSignUp flag
      disableImplicitSignUp: true,
    },
  },
  // Next.js integration — handles cookies and session refresh for App Router
  plugins: [nextCookies()],
  // Session config — 7-day expiry, daily refresh, 5-min cookie cache
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days
    updateAge: 60 * 60 * 24, // Refresh every 24 hours
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60, // Cache for 5 minutes
    },
  },
  // Redirect OAuth errors to login page by default (register pages override)
  onAPIError: {
    errorURL: "/login",
  },
  // Cookie security — httpOnly, secure in prod, sameSite lax
  advanced: {
    cookiePrefix: "better-auth",
    generateId: () => crypto.randomUUID(),
  },
});

// Inferred session type for use across the app
export type Session = typeof auth.$Infer.Session;
