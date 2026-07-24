/** Check if an error response indicates an unauthenticated session and redirect to login. */
export function handleAuthError(err: unknown): boolean {
  const message = err instanceof Error ? err.message : String(err)
  const isAuthError =
    message.toLowerCase().includes("unauthorized") ||
    message.toLowerCase().includes("401") ||
    message.toLowerCase().includes("unauthenticated")
  if (isAuthError && typeof window !== "undefined") {
    window.location.href = "/login"
    return true
  }
  return false
}
