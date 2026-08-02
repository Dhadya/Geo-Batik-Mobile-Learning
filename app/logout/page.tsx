"use client"

import { useEffect } from "react"
import { signOut } from "@/lib/auth-client"
import { Text } from "@/components/retroui/Text"

/** Auto sign-out page — navigates here to force logout even when UI is stuck. */
export default function LogoutPage() {
  useEffect(() => {
    signOut({ fetchOptions: { onSuccess: () => { window.location.href = "/login" } } })
  }, [])

  return (
    <div className="min-h-screen flex items-center justify-center">
      <Text className="text-lg font-bold">Keluar dari sesi...</Text>
    </div>
  )
}
