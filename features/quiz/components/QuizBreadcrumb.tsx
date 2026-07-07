"use client"

import Link from "next/link"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

/** Breadcrumb navigation for quiz pages. */
export function QuizBreadcrumb({
  slug,
  label,
}: {
  slug: string
  label: string
}) {
  return (
    <Breadcrumb>
      <BreadcrumbList className="text-sm font-bold text-muted-foreground">
        <BreadcrumbItem>
          <BreadcrumbLink render={<Link href="/menu" />}>
            Menu Utama
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink render={<Link href={`/modul/${slug}`} />}>
            {label}
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage className="text-primary">Quiz</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  )
}
