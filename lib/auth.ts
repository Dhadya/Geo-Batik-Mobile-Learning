import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";
import { getDb } from "@/lib/db";
import { user, session, account, verification } from "@/drizzle/schema";

function getAuthBaseURL() {
  const configuredURL = process.env.BETTER_AUTH_URL;
  const isLocalURL =
    configuredURL?.startsWith("http://localhost") ||
    configuredURL?.startsWith("https://localhost") ||
    configuredURL?.startsWith("http://127.0.0.1") ||
    configuredURL?.startsWith("https://127.0.0.1");

  if (configuredURL && !(process.env.VERCEL_URL && isLocalURL)) {
    return configuredURL;
  }

  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }

  return "http://localhost:3000";
}

const authBaseURL = getAuthBaseURL();
const trustedOrigins = Array.from(
  new Set(
    [
      authBaseURL,
      process.env.NEXT_PUBLIC_BETTER_AUTH_URL,
      process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : undefined,
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
          disableImplicitSignUp: true,
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
