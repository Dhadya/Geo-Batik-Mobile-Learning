"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Button } from "@/components/retroui/Button"
import { ProfileDropdown } from "@/components/layout/ProfileDropdown"
import { MaterialIcon } from "@/components/common/MaterialIcon"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/retroui/NavigationMenu"

/** Desktop nav dropdown using RetroUI NavigationMenu. */
function NavDropdownItem({
  label,
  isActive,
  apersepsiHref,
  modulHref,
  kuisHref,
  onSelect,
}: {
  label: string
  isActive: boolean
  apersepsiHref: string
  modulHref: string
  kuisHref: string
  onSelect: () => void
}) {
  return (
    <NavigationMenuItem>
      <NavigationMenuTrigger
        className={`font-black uppercase text-base h-auto px-0 py-0 bg-transparent hover:bg-transparent focus:bg-transparent data-open:bg-transparent data-popup-open:bg-transparent text-primary-foreground ${isActive ? "underline underline-offset-4 decoration-4" : ""
          }`}
      >
        {label}
      </NavigationMenuTrigger>
      <NavigationMenuContent
        className="border-4 border-black bg-card shadow-lg p-0 w-48"
      >
        <NavigationMenuLink
          render={<Link href={apersepsiHref} onClick={onSelect} />}
          className="block px-4 py-3 text-sm font-black uppercase border-b-2 border-black hover:bg-secondary-container focus:bg-secondary-container data-active:bg-secondary-container"
        >
          Apersepsi
        </NavigationMenuLink>
        <NavigationMenuLink
          render={<Link href={modulHref} onClick={onSelect} />}
          className="block px-4 py-3 text-sm font-black uppercase border-b-2 border-black hover:bg-secondary-container focus:bg-secondary-container data-active:bg-secondary-container"
        >
          Modul
        </NavigationMenuLink>
        <NavigationMenuLink
          render={<Link href={kuisHref} onClick={onSelect} />}
          className="block px-4 py-3 text-sm font-black uppercase hover:bg-secondary-container focus:bg-secondary-container data-active:bg-secondary-container"
        >
          Kuis
        </NavigationMenuLink>
      </NavigationMenuContent>
    </NavigationMenuItem>
  )
}

/** Mobile nav dropdown for Translasi/Refleksi. */
function MobileNavDropdown({
  label,
  apersepsiHref,
  modulHref,
  kuisHref,
  onClosePanel,
}: {
  label: string
  apersepsiHref: string
  modulHref: string
  kuisHref: string
  onClosePanel: () => void
}) {
  const [open, setOpen] = useState(false)

  return (
    <div>
      <Button
        variant="outline"
        size="sm"
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center justify-between w-full px-4 py-2.5 font-black uppercase text-sm border-2 border-black bg-surface-container hover:bg-secondary-container"
      >
        {label}
        <Image
          src="/icons/chevron-down.svg"
          alt=""
          width={14}
          height={14}
          className={`transition-transform ${open ? "rotate-180" : ""}`}
        />
      </Button>
      {open && (
        <div className="ml-4 border-l-4 border-black">
          <Link
            href={apersepsiHref}
            onClick={() => { setOpen(false); onClosePanel() }}
            className="block px-4 py-2 text-xs font-bold uppercase hover:bg-secondary-container transition-colors"
          >
            Apersepsi
          </Link>
          <Link
            href={modulHref}
            onClick={() => { setOpen(false); onClosePanel() }}
            className="block px-4 py-2 text-xs font-bold uppercase hover:bg-secondary-container transition-colors border-t-2 border-black"
          >
            Modul
          </Link>
          <Link
            href={kuisHref}
            onClick={() => { setOpen(false); onClosePanel() }}
            className="block px-4 py-2 text-xs font-bold uppercase hover:bg-secondary-container transition-colors border-t-2 border-black"
          >
            Kuis
          </Link>
        </div>
      )}
    </div>
  )
}

export function Navbar() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [navKey, setNavKey] = useState(0)
  const lastScrollY = useRef(0)

  const isMenuActive = pathname === "/menu"
  const isTranslasiActive = pathname.startsWith("/apersepsi/translasi") || pathname.startsWith("/modul/translasi")
  const isRefleksiActive = pathname.startsWith("/apersepsi/refleksi") || pathname.startsWith("/modul/refleksi")
  const isLabActive = pathname === "/lab"

  const closeDesktopDropdown = () => setNavKey((k) => k + 1)
  const closeMobilePanel = () => setMobileOpen(false)

  // Close dropdowns on scroll to prevent positioner drift
  useEffect(() => {
    function handleScroll() {
      const currentScrollY = window.scrollY
      if (Math.abs(currentScrollY - lastScrollY.current) > 5) {
        setMobileOpen(false)
        setNavKey((k) => k + 1)
        lastScrollY.current = currentScrollY
      }
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header className="border-b-4 border-black bg-primary text-primary-foreground sticky top-0 z-40">
      <div className="max-w-384 mx-auto px-4 lg:px-12">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Left — Logo + Brand */}
          <Link href="/" className="flex items-center gap-3 shrink-0">
            {/* Placeholder logo */}
            <div className="size-10 lg:size-14 bg-accent border-4 border-black flex items-center justify-center shadow-md">
              <span className="font-black text-lg lg:text-2xl text-black">G</span>
            </div>
            <span className="font-black text-xl lg:text-3xl uppercase tracking-tight">
              GEMATRI
            </span>
          </Link>

          {/* Center — Desktop nav */}
          <NavigationMenu key={navKey} className="hidden lg:flex">
            <NavigationMenuList className="gap-8">
              <NavigationMenuItem>
                <NavigationMenuLink
                  render={<Link href="/menu" onClick={closeDesktopDropdown} />}
                  className={`font-black uppercase text-base h-auto px-0 py-0 bg-transparent hover:bg-transparent focus:bg-transparent data-active:bg-transparent text-primary-foreground ${isMenuActive ? "underline underline-offset-4 decoration-4" : ""
                    }`}
                >
                  Menu
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavDropdownItem
                label="Translasi"
                isActive={isTranslasiActive}
                apersepsiHref="/apersepsi/translasi"
                modulHref="/modul/translasi"
                kuisHref="/modul/translasi/kuis"
                onSelect={closeDesktopDropdown}
              />

              <NavDropdownItem
                label="Refleksi"
                isActive={isRefleksiActive}
                apersepsiHref="/apersepsi/refleksi"
                modulHref="/modul/refleksi"
                kuisHref="/modul/refleksi/kuis"
                onSelect={closeDesktopDropdown}
              />

              <NavigationMenuItem>
                <NavigationMenuLink
                  render={<Link href="/lab" onClick={closeDesktopDropdown} />}
                  className={`font-black uppercase text-base h-auto px-0 py-0 bg-transparent hover:bg-transparent focus:bg-transparent data-active:bg-transparent text-primary-foreground ${isLabActive ? "underline underline-offset-4 decoration-4" : ""
                    }`}
                >
                  Lab
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          {/* Right — Profile + Hamburger */}
          <div className="flex items-center gap-3">
            <div className="hidden lg:block">
              <ProfileDropdown />
            </div>

            {/* Hamburger button — mobile only */}
            <Button
              variant="outline"
              size="icon"
              onClick={() => setMobileOpen((prev) => !prev)}
              className="lg:hidden border-2 border-black bg-primary-foreground/10 hover:bg-primary-foreground/20"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <MaterialIcon className="size-6" name="close" /> : <MaterialIcon className="size-6" name="menu" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu panel */}
      {mobileOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 z-50 border-t-4 border-black bg-primary">
          <div className="max-w-384 mx-auto px-4 py-4 space-y-3">
            <Link
              href="/menu"
              onClick={() => setMobileOpen(false)}
              className="block px-4 py-2.5 font-black uppercase text-sm border-2 border-black bg-surface-container hover:bg-secondary-container transition-colors"
            >
              Menu
            </Link>

            <MobileNavDropdown
              label="Translasi"
              apersepsiHref="/apersepsi/translasi"
              modulHref="/modul/translasi"
              kuisHref="/modul/translasi/kuis"
              onClosePanel={closeMobilePanel}
            />

            <MobileNavDropdown
              label="Refleksi"
              apersepsiHref="/apersepsi/refleksi"
              modulHref="/modul/refleksi"
              kuisHref="/modul/refleksi/kuis"
              onClosePanel={closeMobilePanel}
            />

            <Link
              href="/lab"
              onClick={() => setMobileOpen(false)}
              className="block px-4 py-2.5 font-black uppercase text-sm border-2 border-black bg-surface-container hover:bg-secondary-container transition-colors"
            >
              Lab
            </Link>

            {/* Profile section in mobile */}
            <div className="pt-3 border-t-2 border-black/20 w-full">
              <ProfileDropdown />
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
