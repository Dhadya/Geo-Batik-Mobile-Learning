import { Skeleton } from "@/components/retroui/Skeleton"

export default function ModulTabLoading() {
  return (
    <div className="space-y-3 md:space-y-6">
      {/* Breadcrumb skeleton */}
      <Skeleton className="h-6 w-48 border-2 border-black" />

      {/* Title banner skeleton */}
      <Skeleton className="h-14 md:h-16 w-full border-4 border-black shadow-[4px_4px_0_0_black]" />

      {/* Tab navigation skeleton */}
      <Skeleton className="h-12 md:h-14 w-full border-4 border-black shadow-[4px_4px_0_0_black]" />

      {/* 2-Column workspace grid skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 md:gap-6 items-start">
        {/* Left column — Interactive workspace + conclusion */}
        <div className="lg:col-span-8 flex flex-col gap-3 md:gap-6">
          <Skeleton className="h-96 md:h-[480px] w-full border-4 border-black shadow-[4px_4px_0_0_black]" />
          <Skeleton className="h-24 md:h-32 w-full border-4 border-black shadow-[4px_4px_0_0_black]" />
        </div>
        {/* Right column — Observation panel */}
        <div className="lg:col-span-4">
          <Skeleton className="h-[480px] md:h-[600px] w-full border-4 border-black shadow-[4px_4px_0_0_black]" />
        </div>
      </div>

      {/* Assessment section skeleton */}
      <Skeleton className="h-64 md:h-80 w-full border-4 border-black shadow-[4px_4px_0_0_black]" />

      {/* Navigation buttons skeleton */}
      <div className="flex justify-center gap-3 md:gap-4 pt-3 md:pt-4">
        <Skeleton className="h-12 md:h-14 w-36 md:w-48 border-4 border-black shadow-[4px_4px_0_0_black]" />
        <Skeleton className="h-12 md:h-14 w-36 md:w-48 border-4 border-black shadow-[4px_4px_0_0_black]" />
      </div>
    </div>
  )
}
