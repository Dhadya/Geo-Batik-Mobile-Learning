import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { appError } from "./errors";

export async function requireAuth() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session?.user?.id) {
    throw appError("UNAUTHORIZED");
  }
  return session.user;
}
