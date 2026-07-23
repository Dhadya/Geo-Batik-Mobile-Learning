import { Skeleton } from "@/components/retroui/Skeleton"

export default function PrasyaratLoading() {
  return (
    <div className="max-w-384 mx-auto px-4 md:px-12 py-4 md:py-6 space-y-6 md:space-y-8">
      {/* Header skeleton */}
      <div className="space-y-3 md:space-y-4">
        <Skeleton className="h-8 w-40 border-4 border-black shadow-md" />
        <Skeleton className="h-10 md:h-14 w-3/4 max-w-2xl border-4 border-black" />
        <Skeleton className="h-6 w-full max-w-xl border-2 border-black" />
      </div>

      {/* Video embed skeleton */}
      <div className="w-full max-w-5xl mx-auto">
        <Skeleton className="h-64 md:h-[450px] w-full border-4 border-black shadow-[4px_4px_0_0_black]" />
      </div>

      {/* GeoGebra canvas skeleton */}
      <Skeleton className="h-96 md:h-[500px] w-full border-4 border-black shadow-[4px_4px_0_0_black]" />

      {/* Concept cards section skeleton */}
      <div className="space-y-4 md:space-y-6">
        <div className="flex items-center gap-3 md:gap-4">
          <Skeleton className="size-10 md:size-14 border-4 border-black shadow-md" />
          <Skeleton className="h-8 w-48 border-4 border-black" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          <Skeleton className="h-40 md:h-48 w-full border-4 border-black shadow-[4px_4px_0_0_black]" />
          <Skeleton className="h-40 md:h-48 w-full border-4 border-black shadow-[4px_4px_0_0_black]" />
        </div>
      </div>

      {/* CTA section skeleton */}
      <div className="py-4 md:py-6 flex justify-center">
        <Skeleton className="h-14 md:h-16 w-64 md:w-80 border-4 border-black shadow-lg" />
      </div>
    </div>
  )
}
