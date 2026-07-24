import { Skeleton } from "@/components/retroui/Skeleton"

export default function KuisHasilLoading() {
  return (
    <div className="space-y-4 md:space-y-6">
      {/* Breadcrumb */}
      <Skeleton className="h-5 md:h-6 w-48 border-2 border-black" />

      {/* QuizHeader — colored banner */}
      <div className="relative border-4 border-black shadow-[4px_4px_0_0_black] p-6 md:p-8">
        <Skeleton className="absolute top-3 right-3 md:top-4 md:right-4 size-10 md:size-14 border-4 border-black shadow-md" />
        <Skeleton className="h-8 md:h-10 w-48 md:w-56 border-2 border-black" />
        <Skeleton className="h-4 md:h-5 w-40 md:w-48 mt-2 border-2 border-black" />
      </div>

      {/* Attempt info banner */}
      <div className="border-4 border-black bg-white shadow-[4px_4px_0_0_black] p-3 md:p-4 text-center">
        <Skeleton className="h-5 md:h-6 w-48 md:w-56 mx-auto border-2 border-black" />
      </div>

      {/* Score summary card */}
      <div className="border-4 border-black bg-white shadow-[4px_4px_0_0_black] p-6 md:p-8 space-y-4">
        <div className="flex items-center justify-center gap-4">
          <Skeleton className="h-16 md:h-20 w-24 md:w-32 border-2 border-black" />
          <Skeleton className="h-6 md:h-8 w-16 md:w-20 border-2 border-black" />
        </div>
        <Skeleton className="h-5 md:h-6 w-36 md:w-40 mx-auto border-2 border-black" />
        <div className="flex justify-center gap-3">
          <Skeleton className="h-10 md:h-12 w-32 md:w-40 border-4 border-black shadow-[4px_4px_0_0_black]" />
          <Skeleton className="h-10 md:h-12 w-32 md:w-40 border-4 border-black shadow-[4px_4px_0_0_black]" />
        </div>
      </div>

      {/* Per-tab breakdown */}
      <div className="border-4 border-black bg-white shadow-[4px_4px_0_0_black] p-4 md:p-6 space-y-3">
        <Skeleton className="h-6 md:h-7 w-36 md:w-40 border-2 border-black" />
        <div className="space-y-2">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center justify-between border-4 border-black p-2 md:p-3">
              <Skeleton className="h-4 md:h-5 w-24 md:w-32 border-2 border-black" />
              <Skeleton className="h-4 md:h-5 w-16 md:w-20 border-2 border-black" />
            </div>
          ))}
        </div>
      </div>

      {/* Pembahasan / explanation area */}
      <div className="border-4 border-black bg-white shadow-[4px_4px_0_0_black] p-4 md:p-6 space-y-4">
        <Skeleton className="h-6 md:h-7 w-40 md:w-48 border-2 border-black" />
        {[1, 2].map((i) => (
          <div key={i} className="space-y-2 border-4 border-black p-3 md:p-4">
            <Skeleton className="h-4 md:h-5 w-full border-2 border-black" />
            <Skeleton className="h-4 md:h-5 w-3/4 border-2 border-black" />
          </div>
        ))}
      </div>
    </div>
  )
}
