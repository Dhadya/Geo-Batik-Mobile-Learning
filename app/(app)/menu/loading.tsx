import { Skeleton } from "@/components/retroui/Skeleton"

export default function MenuLoading() {
  return (
    <div className="max-w-384 mx-auto px-4 md:px-12 py-4 md:py-6 space-y-6 md:space-y-8">
      {/* Menu Header skeleton */}
      <Skeleton className="h-24 md:h-28 w-full border-4 border-black shadow-[4px_4px_0_0_black]" />

      {/* Module Cards Grid skeleton — 3 cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        <Skeleton className="h-64 md:h-72 w-full border-4 border-black shadow-[4px_4px_0_0_black]" />
        <Skeleton className="h-64 md:h-72 w-full border-4 border-black shadow-[4px_4px_0_0_black]" />
        <Skeleton className="h-64 md:h-72 w-full border-4 border-black shadow-[4px_4px_0_0_black]" />
      </div>

      {/* Lab Batik horizontal card skeleton */}
      <Skeleton className="h-32 md:h-36 w-full border-4 border-black shadow-[4px_4px_0_0_black]" />

      {/* Back link skeleton */}
      <Skeleton className="h-10 w-36 border-4 border-black shadow-[2px_2px_0_0_black]" />
    </div>
  )
}
