"use client"

import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import { LogOut, ChevronDown } from "lucide-react"
import { Button } from "@/components/retroui/Button"
import { authClient, signOut } from "@/lib/auth-client"

/* Profile dropdown — shows user name/email avatar button, expands to reveal sign-out. */
export function ProfileDropdown() {
  const router = useRouter()
  const { data: session, isPending } = authClient.useSession()
  const [open, setOpen] = useState(false)
  const [imgFailed, setImgFailed] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  // Handle sign-out — clear session then redirect to login
  async function handleSignOut() {
    await signOut()
    router.push("/login")
  }

  // Skeleton while session is loading
  if (isPending) {
    return (
      <div className="h-9 w-24 bg-primary-foreground/20 animate-pulse" />
    )
  }

  // Not authenticated — shouldn't happen in (app) layout but safeguard
  if (!session?.user) return null

  const user = session.user
  const initials = user.name
    ? user.name.split(" ").map((n: string) => n[0]).join("").slice(0, 2).toUpperCase()
    : "??"
  const avatarUrl = user.image || null
  const showAvatar = avatarUrl && !imgFailed

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Trigger button — avatar initials + chevron */}
      <Button
        variant="outline"
        size="sm"
        onClick={() => setOpen((prev) => !prev)}
        className="!rounded-none flex items-center gap-2 border-2 border-black bg-primary-foreground/10 hover:bg-primary-foreground/20"
      >
        {showAvatar ? (
          <img
            src={avatarUrl}
            alt=""
            className="size-7 object-cover !rounded-none border-2 border-black"
            onError={() => setImgFailed(true)}
          />
        ) : (
          <span className="flex items-center justify-center size-7 bg-black text-primary-foreground font-black text-xs !rounded-none">
            {initials}
          </span>
        )}
        <ChevronDown className={`size-4 transition-transform ${open ? "rotate-180" : ""}`} />
      </Button>

      {/* Dropdown panel */}
      {open && (
        <div className="absolute right-0 top-full mt-2 w-64 border-4 border-black bg-card shadow-lg z-50">
          {/* User info header */}
          <div className="px-4 py-3 border-b-4 border-black">
            <p className="text-sm font-black uppercase truncate">{user.name || "Pengguna"}</p>
            <p className="text-xs text-muted-foreground truncate">{user.email}</p>
          </div>

          {/* Menu items */}
          <div className="py-1">
            <Button
              variant="ghost"
              onClick={handleSignOut}
              className="!rounded-none w-full flex items-center gap-3 px-4 py-2.5 text-sm font-bold uppercase text-destructive hover:bg-destructive/10"
            >
              <LogOut className="size-4" />
              Keluar
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
