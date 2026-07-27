"use client"

import Link from "next/link"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/retroui/Breadcrumb"

/** Breadcrumb navigation — bigger, bold, primary-dark for active page. */
export function QuizBreadcrumb({
  slug,
  label,
  path = "kuis",
  activeItem,
}: {
  slug: string
  label: string
  path?: "apersepsi" | "modul" | "kuis"
  activeItem?: string
}) {
  return (
    <Breadcrumb>
      <BreadcrumbList className="text-sm md:text-base font-semibold text-black/70 gap-1 md:gap-2">
        <BreadcrumbItem>
          <BreadcrumbLink render={<Link href="/menu" />}>
            Menu
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink
            render={
              <Link href={path === "apersepsi" ? "#" : `/apersepsi/${slug}`}>
                {label}
              </Link>
            }
          >
            {label}
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        {path === "apersepsi" ? (
          <BreadcrumbItem>
            <BreadcrumbPage className="text-black font-bold">
              Apersepsi
            </BreadcrumbPage>
          </BreadcrumbItem>
        ) : path === "modul" ? (
          <>
            <BreadcrumbItem>
              <BreadcrumbLink render={<Link href={`/apersepsi/${slug}`} />}>
                Apersepsi
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className="text-black font-bold">
                Modul
              </BreadcrumbPage>
            </BreadcrumbItem>
          </>
        ) : (
          <>
            <BreadcrumbItem>
              <BreadcrumbLink render={<Link href={`/apersepsi/${slug}`} />}>
                Apersepsi
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink render={<Link href={`/modul/${slug}`} />}>
                Modul
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            {activeItem ? (
              <>
                <BreadcrumbItem>
                  <BreadcrumbLink render={<Link href={`/modul/${slug}/kuis`} />}>
                    Kuis
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage className="text-black font-bold">
                    {activeItem}
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </>
            ) : (
              <BreadcrumbItem>
                <BreadcrumbPage className="text-black font-bold">
                  Kuis
                </BreadcrumbPage>
              </BreadcrumbItem>
            )}
          </>
        )}
      </BreadcrumbList>
    </Breadcrumb>
  )
}
