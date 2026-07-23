import { Skeleton } from "@/components/retroui/Skeleton"

export default function KuisSoalLoading() {
  return (
    <div className="space-y-4 md:space-y-6">
      {/* Quiz Breadcrumb skeleton */}
      <Skeleton className="h-6 w-48 border-2 border-black" />

      {/* Main question box container */}
      <div className="border-4 border-black shadow-[4px_4px_0_0_black] bg-white space-y-4 p-3 md:p-4">
        {/* Soal number indicator pagination bar skeleton */}
        <Skeleton className="h-12 w-full border-2 border-black" />

        {/* Question card & choices skeleton */}
        <Skeleton className="h-80 md:h-96 w-full border-4 border-black shadow-[4px_4px_0_0_black]" />
      </div>

      {/* Navigation action buttons skeleton */}
      <div className="flex justify-center gap-3 md:gap-4 pt-4 md:pt-6">
        <Skeleton className="h-12 md:h-14 w-40 md:w-48 border-4 border-black shadow-[4px_4px_0_0_black]" />
      </div>
    </div>
  )
}
