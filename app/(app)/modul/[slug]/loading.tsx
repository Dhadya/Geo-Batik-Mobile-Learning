import { Skeleton } from "@/components/retroui/Skeleton"

export default function ModulTabLoading() {
  return (
    <div className="space-y-3 md:space-y-6">
      {/* Breadcrumb */}
      <Skeleton className="h-5 md:h-6 w-48 border-2 border-black" />

      {/* Title banner — two-part: title left, badge right */}
      <div className="border-4 border-black shadow-[4px_4px_0_0_black] p-3 md:p-4 flex flex-col sm:flex-row items-center justify-between gap-2">
        <Skeleton className="h-6 md:h-7 w-32 md:w-40 border-2 border-black" />
        <Skeleton className="h-6 md:h-7 w-28 md:w-32 border-2 border-black" />
      </div>

      {/* Tab navigation bar */}
      <div className="flex gap-2 md:gap-4">
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-10 md:h-12 flex-1 border-4 border-black shadow-[4px_4px_0_0_black]" />
        ))}
      </div>

      {/* 2-Column workspace grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 md:gap-6 items-start">
        {/* Left column — interactive workspace + conclusion (8/12) */}
        <div className="lg:col-span-8 flex flex-col gap-3 md:gap-6">
          <Skeleton className="h-[300px] md:h-[600px] w-full border-4 border-black shadow-[4px_4px_0_0_black]" />
          <Skeleton className="h-24 md:h-32 w-full border-4 border-black shadow-[4px_4px_0_0_black]" />
        </div>

        {/* Right column — observation panel (4/12, sticky) */}
        <div className="lg:col-span-4 lg:sticky lg:top-24 lg:self-start">
          <Skeleton className="h-[400px] md:h-[500px] w-full border-4 border-black shadow-[4px_4px_0_0_black]" />
        </div>
      </div>

      {/* Assessment section */}
      <Skeleton className="h-64 md:h-80 w-full border-4 border-black shadow-[4px_4px_0_0_black]" />

      {/* Navigation buttons */}
      <div className="flex justify-center gap-3 md:gap-4 pt-3 md:pt-4">
        <Skeleton className="h-12 md:h-14 w-32 md:w-40 border-4 border-black shadow-[4px_4px_0_0_black]" />
        <Skeleton className="h-12 md:h-14 w-32 md:w-40 border-4 border-black shadow-[4px_4px_0_0_black]" />
      </div>
    </div>
  )
}
