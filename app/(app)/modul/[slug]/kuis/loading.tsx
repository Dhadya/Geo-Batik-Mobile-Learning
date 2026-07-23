import { Skeleton } from "@/components/retroui/Skeleton"

export default function KuisIntroLoading() {
  return (
    <div className="space-y-4 md:space-y-6">
      {/* Quiz Breadcrumb skeleton */}
      <Skeleton className="h-6 w-48 border-2 border-black" />

      {/* Quiz Header skeleton */}
      <Skeleton className="h-14 md:h-16 w-full border-4 border-black shadow-[4px_4px_0_0_black]" />

      {/* Petunjuk Kuis card skeleton */}
      <Skeleton className="h-56 md:h-64 w-full border-4 border-black shadow-[4px_4px_0_0_black]" />

      {/* Riwayat Percobaan card skeleton */}
      <Skeleton className="h-36 md:h-44 w-full border-4 border-black shadow-[4px_4px_0_0_black]" />

      {/* Start Quiz button skeleton */}
      <div className="flex justify-center pt-4 md:pt-6">
        <Skeleton className="h-12 md:h-14 w-48 md:w-56 border-4 border-black shadow-[4px_4px_0_0_black]" />
      </div>
    </div>
  )
}
