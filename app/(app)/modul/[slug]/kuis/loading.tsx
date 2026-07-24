import { Skeleton } from "@/components/retroui/Skeleton"

export default function KuisIntroLoading() {
  return (
    <div className="space-y-4 md:space-y-6">
      {/* Breadcrumb */}
      <Skeleton className="h-5 md:h-6 w-48 border-2 border-black" />

      {/* QuizHeader — colored banner with icon badge */}
      <div className="relative border-4 border-black shadow-[4px_4px_0_0_black] p-6 md:p-8">
        <Skeleton className="absolute top-3 right-3 md:top-4 md:right-4 size-10 md:size-14 border-4 border-black shadow-md" />
        <Skeleton className="h-8 md:h-10 w-48 md:w-56 border-2 border-black" />
        <Skeleton className="h-4 md:h-5 w-64 md:w-80 mt-2 border-2 border-black" />
      </div>

      {/* Petunjuk Kuis card — heading + 5 bullet lines */}
      <div className="border-4 border-black bg-white shadow-[4px_4px_0_0_black] p-6 md:p-8 space-y-4">
        <Skeleton className="h-6 md:h-7 w-36 md:w-40 border-2 border-black" />
        <div className="space-y-3">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="flex items-start gap-2">
              <Skeleton className="size-2 mt-1.5 shrink-0 rounded-full border border-black" />
              <Skeleton className="h-4 md:h-5 w-full border-2 border-black" />
            </div>
          ))}
        </div>
      </div>

      {/* Riwayat Percobaan card */}
      <div className="border-4 border-black bg-white shadow-[4px_4px_0_0_black] p-4 md:p-6 space-y-3">
        <Skeleton className="h-5 md:h-6 w-44 md:w-52 border-2 border-black" />
        <div className="space-y-2">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center justify-between border-4 border-black p-2 md:p-3">
              <div className="flex items-center gap-3">
                <Skeleton className="size-3 md:size-4 rounded-full border-2 border-black" />
                <Skeleton className="h-4 w-28 md:w-32 border-2 border-black" />
                <Skeleton className="h-4 w-12 md:w-16 border-2 border-black" />
              </div>
              <Skeleton className="h-7 md:h-8 w-24 md:w-28 border-2 border-black" />
            </div>
          ))}
        </div>
      </div>

      {/* Mulai Kuis button */}
      <div className="flex justify-center pt-4 md:pt-6">
        <Skeleton className="h-14 md:h-16 w-48 md:w-56 border-4 border-black shadow-[4px_4px_0_0_black]" />
      </div>
    </div>
  )
}
