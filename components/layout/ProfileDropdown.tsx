"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { LogOut, ChevronDown } from "lucide-react"
import { Button } from "@/components/retroui/Button"
import { authClient, signOut } from "@/lib/auth-client"
import { getQueryClient } from "@/lib/query/client"
import { useAnswerStore } from "@/features/modules/store/answerStore"
import { useTabProgressStore } from "@/features/modules/store/tabProgressStore"
import { useObservationStore } from "@/features/modules/store/observationStore"
import { useQuizStore } from "@/features/quiz"

/* Profile dropdown — shows user name/email avatar button, expands to reveal sign-out. */
export function ProfileDropdown() {
  const { data: session, isPending } = authClient.useSession()
  const [open, setOpen] = useState(false)
  const [imgFailed, setImgFailed] = useState(false)
  const [isSigningOut, setIsSigningOut] = useState(false)
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

  // Handle sign-out — clear all client state then redirect to /logout page for full cookie cleanup
  async function handleSignOut() {
    if (isSigningOut) return
    setIsSigningOut(true)
    try {
      getQueryClient().clear()
      useAnswerStore.getState().resetAll()
      useQuizStore.getState().resetAnswers()
      useTabProgressStore.getState().resetAll()
      useObservationStore.getState().resetAll()
      await signOut({
        fetchOptions: {
          onSuccess: () => {
            window.location.href = "/login"
          },
          onError: () => {
            window.location.href = "/logout"
          },
        },
      })
    } catch (e) {
      console.error("[ProfileDropdown] signOut error", e)
      window.location.href = "/logout"
    }
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
    <div className="relative w-full lg:w-auto" ref={dropdownRef}>
      {/* Trigger button — avatar initials + chevron */}
      <Button
        variant="outline"
        size="sm"
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center justify-between lg:justify-center gap-2 border-2 border-black bg-primary-foreground/10 hover:bg-primary-foreground/20 w-full lg:w-auto px-4 py-2.5 lg:py-1.5"
      >
        <span className="flex items-center gap-2">
          {showAvatar ? (
            <Image
              src={avatarUrl}
              alt=""
              width={28}
              height={28}
              className="size-7 object-cover border-2 border-black"
              onError={() => setImgFailed(true)}
            />
          ) : (
            <span className="flex items-center justify-center size-7 bg-secondary text-secondary-foreground font-black text-xs border-2 border-black">
              {initials}
            </span>
          )}
          <span className="lg:hidden font-black text-sm uppercase text-black">
            {user.name || "Profil"}
          </span>
        </span>
        <ChevronDown className={`size-4 transition-transform ${open ? "rotate-180" : ""}`} />
      </Button>

      {/* Dropdown panel */}
      {open && (
        <div className="absolute left-0 right-0 lg:left-auto lg:right-0 top-full mt-2 w-full lg:w-64 border-4 border-black bg-card shadow-lg z-[10001]">
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
              disabled={isSigningOut}
              className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-bold uppercase text-destructive hover:bg-destructive/10 disabled:opacity-50"
            >
              <LogOut className="size-4" />
              {isSigningOut ? "Keluar..." : "Keluar"}
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
