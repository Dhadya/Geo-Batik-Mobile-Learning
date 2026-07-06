"use client"

import dynamic from "next/dynamic"

export const Navbar = dynamic(
  () => import("@/components/layout/Navbar").then((mod) => ({ default: mod.Navbar })),
  { ssr: false }
)
