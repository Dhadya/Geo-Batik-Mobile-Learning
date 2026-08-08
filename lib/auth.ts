import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";
import { getDb } from "@/lib/db";
import { user, session, account, verification } from "@/drizzle/schema";

const isLocalURL = (url: string) =>
  url.includes("localhost") || url.includes("127.0.0.1");

/**
 * Resolves the absolute base URL used to build OAuth redirect URIs.
 * Priority: explicit BETTER_AUTH_URL (when not a loopback address) → Vercel
 * production URL → Vercel deployment URL → localhost fallback for dev.
 */
function getAuthBaseURL() {
  const configuredURL = process.env.BETTER_AUTH_URL?.trim();

  if (configuredURL && !isLocalURL(configuredURL)) {
    return configuredURL;
  }

  if (process.env.VERCEL === "1") {
    const productionURL = process.env.VERCEL_PROJECT_PRODUCTION_URL;
    if (productionURL) {
      return `https://${productionURL}`;
    }
    if (process.env.VERCEL_URL) {
      return `https://${process.env.VERCEL_URL}`;
    }
  }

  if (configuredURL) {
    return configuredURL;
  }

  return "http://localhost:3000";
}

const authBaseURL = getAuthBaseURL();

if (process.env.VERCEL === "1") {
  console.info(
    "[auth] baseURL resolved to:",
    authBaseURL,
    "| BETTER_AUTH_URL:",
    process.env.BETTER_AUTH_URL ?? "(not set)",
    "| VERCEL_PROJECT_PRODUCTION_URL:",
    process.env.VERCEL_PROJECT_PRODUCTION_URL ?? "(not set)",
  );
  if (isLocalURL(authBaseURL)) {
    console.warn(
      "[auth] baseURL is localhost on Vercel — Google OAuth redirect_uri will be http://localhost:3000 and fail. " +
        "Fix the BETTER_AUTH_URL value in the Production environment of your Vercel project."
    );
  }
}
const trustedOrigins = Array.from(
  new Set(
    [
      authBaseURL,
      process.env.NEXT_PUBLIC_BETTER_AUTH_URL,
    ].filter(Boolean)
  )
) as string[];

let _auth: ReturnType<typeof betterAuth>;

function createAuthInstance(): ReturnType<typeof betterAuth> {
  if (!_auth) {
    _auth = betterAuth({
      baseURL: authBaseURL,
      trustedOrigins,
      database: drizzleAdapter(getDb(), {
        provider: "pg",
        schema: { user, session, account, verification },
      }),
      emailAndPassword: { enabled: true, requireEmailVerification: false },
      socialProviders: {
        google: {
          clientId: process.env.GOOGLE_CLIENT_ID!,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
          accountLinking: { enabled: true },
        },
      },
      plugins: [nextCookies()],
      session: {
        expiresIn: 60 * 60 * 24 * 7,
        updateAge: 60 * 60 * 24,
        cookieCache: { enabled: true, maxAge: 5 * 60 },
      },
      onAPIError: { errorURL: "/login" },
      advanced: { cookiePrefix: "better-auth", generateId: () => crypto.randomUUID() },
    }) as unknown as ReturnType<typeof betterAuth>;
  }
  return _auth;
}

export const auth = new Proxy<ReturnType<typeof betterAuth>>(
  {} as ReturnType<typeof betterAuth>,
  {
    get(_, prop: string | symbol) {
      const instance = createAuthInstance();
      const value = instance[prop as keyof ReturnType<typeof betterAuth>];
      return typeof value === "function" ? value.bind(instance) : value;
    },
    has(_, prop: string | symbol) {
      return prop in createAuthInstance();
    },
  },
);

export type Session = typeof auth.$Infer.Session;
