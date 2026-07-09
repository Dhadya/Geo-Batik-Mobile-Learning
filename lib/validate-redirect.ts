// Max redirect URL length to prevent abuse
const MAX_REDIRECT_LENGTH = 2048

// Validate redirect URL — must be internal path, no protocol, no double slashes
export function validateRedirect(url: string | null): string {
  if (!url) return "/menu"

  // Decode URI components to prevent encoded attacks
  const decoded = decodeURIComponent(url)

  // Must start with /
  if (!decoded.startsWith("/")) return "/menu"

  // Must not contain protocol (http://, https://, //)
  if (/^https?:\/\//.test(decoded) || decoded.startsWith("//")) return "/menu"

  // Must not contain path traversal
  if (decoded.includes("..")) return "/menu"

  // Must not exceed max length
  if (decoded.length > MAX_REDIRECT_LENGTH) return "/menu"

  // Must not contain spaces or special characters that could indicate injection
  if (/\s/.test(decoded) || /[<>"'`]/.test(decoded)) return "/menu"

  return decoded
}
