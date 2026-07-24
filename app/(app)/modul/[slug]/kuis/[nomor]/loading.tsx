import { Skeleton } from "@/components/retroui/Skeleton"

export default function KuisSoalLoading() {
  return (
    <div className="max-w-384 mx-auto space-y-4 md:space-y-6">
      {/* Breadcrumb */}
      <Skeleton className="h-5 md:h-6 w-48 border-2 border-black" />

      {/* Main question box — bg-surface-container-high outer */}
      <div className="bg-surface-container-high border-4 border-black shadow-[4px_4px_0_0_black]">
        {/* NumberIndicator — horizontal row of numbered buttons */}
        <div className="flex gap-2 p-3 md:p-4 overflow-x-auto">
          {[1, 2, 3, 4, 5].map((i) => (
            <Skeleton key={i} className="size-10 md:size-12 shrink-0 border-4 border-black shadow-[2px_2px_0_0_black]" />
          ))}
        </div>

        {/* Question card with arrow navigation */}
        <div className="flex flex-col md:flex-row items-stretch">
          {/* Left arrow (desktop) */}
          <div className="hidden md:flex items-center justify-center mx-3 md:mx-4">
            <Skeleton className="size-10 md:size-12 border-4 border-black shadow-[2px_2px_0_0_black]" />
          </div>

          {/* Question card */}
          <div className="grow p-3 md:p-4">
            <div className="border-4 border-black shadow-[4px_4px_0_0_black] p-4 md:p-6 space-y-4 md:space-y-6">
              <Skeleton className="h-4 md:h-5 w-full border-2 border-black" />
              <Skeleton className="h-4 md:h-5 w-3/4 border-2 border-black" />
              <div className="space-y-3">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="border-4 border-black p-3 md:p-4 flex items-center gap-3">
                    <Skeleton className="size-5 md:size-6 shrink-0 border-2 border-black" />
                    <Skeleton className="h-4 md:h-5 flex-1 border-2 border-black" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right arrow (desktop) */}
          <div className="hidden md:flex items-center justify-center mx-3 md:mx-4">
            <Skeleton className="size-10 md:size-12 border-4 border-black shadow-[2px_2px_0_0_black]" />
          </div>
        </div>

        {/* Mobile arrows */}
        <div className="flex md:hidden justify-between items-center mx-3 md:mx-4 p-4">
          <Skeleton className="size-10 border-4 border-black shadow-[2px_2px_0_0_black]" />
          <Skeleton className="size-10 border-4 border-black shadow-[2px_2px_0_0_black]" />
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex flex-wrap justify-center gap-3 md:gap-4 pt-4 md:pt-6">
        <Skeleton className="h-12 md:h-14 w-32 md:w-40 border-4 border-black shadow-[4px_4px_0_0_black]" />
        <Skeleton className="h-12 md:h-14 w-32 md:w-40 border-4 border-black shadow-[4px_4px_0_0_black]" />
      </div>
    </div>
  )
}
