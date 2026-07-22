"use client"

import { QueryClient } from "@tanstack/react-query"

let queryClient: QueryClient | undefined

/** Creates or returns a shared QueryClient singleton. */
export function getQueryClient(): QueryClient {
  if (!queryClient) {
    queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          staleTime: 30 * 1000,
          retry: 1,
          refetchOnWindowFocus: false,
        },
        mutations: {
          retry: 0,
        },
      },
    })
  }
  return queryClient
}
