import type { NextRequest } from "next/server"

/**
 * Logs a structured request line: method, path, HTTP status, and duration in
 * milliseconds. Bodies are never logged — student answers are PII-adjacent.
 */
function logRequest(request: NextRequest, status: number, durationMs: number): void {
  console.log(
    JSON.stringify({
      level: "info",
      method: request.method,
      path: request.nextUrl.pathname,
      status,
      duration_ms: Math.round(durationMs),
    }),
  )
}

/**
 * Wraps a route handler with structured request logging.
 * Measures duration, logs method/path/status on completion, and rethrows
 * uncaught errors after logging a 500 line so Next.js still renders the error.
 *
 * @param handler - The route handler to wrap.
 * @returns A wrapped handler with identical signature.
 */
export function withRequestLog<C>(
  handler: (request: NextRequest, context: C) => Promise<Response>,
): (request: NextRequest, context: C) => Promise<Response> {
  return async (request, context) => {
    const start = Date.now()
    try {
      const response = await handler(request, context)
      logRequest(request, response.status, Date.now() - start)
      return response
    } catch (e) {
      logRequest(request, 500, Date.now() - start)
      throw e
    }
  }
}
