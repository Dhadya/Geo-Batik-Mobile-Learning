import { Skeleton } from "@/components/retroui/Skeleton"

export default function ApersepsiLoading() {
  return (
    <div className="max-w-384 mx-auto px-4 md:px-12 py-6 md:py-8 space-y-4 md:space-y-6">
      {/* Breadcrumb skeleton */}
      <Skeleton className="h-6 w-48 border-2 border-black" />

      {/* Header banner skeleton */}
      <Skeleton className="h-16 md:h-20 w-full border-4 border-black shadow-[4px_4px_0_0_black]" />

      {/* Main text & image card skeleton */}
      <Skeleton className="h-96 md:h-[500px] w-full border-4 border-black shadow-lg" />

      {/* CTA button skeleton */}
      <div className="flex justify-center pt-4 md:pt-6">
        <Skeleton className="h-14 md:h-16 w-64 md:w-80 border-4 border-black shadow-lg" />
      </div>
    </div>
  )
}
