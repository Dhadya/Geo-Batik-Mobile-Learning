import { Skeleton } from "@/components/retroui/Skeleton"

export default function KuisHasilLoading() {
  return (
    <div className="space-y-4 md:space-y-6">
      {/* Quiz Breadcrumb skeleton */}
      <Skeleton className="h-6 w-48 border-2 border-black" />

      {/* Quiz score summary card skeleton */}
      <Skeleton className="h-64 md:h-80 w-full border-4 border-black shadow-[4px_4px_0_0_black]" />

      {/* Detailed answers & discussion list skeleton */}
      <Skeleton className="h-96 md:h-[500px] w-full border-4 border-black shadow-[4px_4px_0_0_black]" />
    </div>
  )
}
