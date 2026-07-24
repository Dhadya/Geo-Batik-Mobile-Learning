import { Skeleton } from "@/components/retroui/Skeleton"

export default function KuisIntroLoading() {
  return (
    <div className="relative space-y-4 md:space-y-6">
      {/* Breadcrumb */}
      <Skeleton className="h-5 md:h-6 w-48 border-2 border-black" />

      {/* QuizHeader — colored banner with icon badge */}
      <div className="bg-primary border-4 border-black p-6 md:p-8 shadow-lg relative overflow-hidden">
        <Skeleton className="absolute top-3 right-3 md:top-4 md:right-4 size-10 md:size-14 border-4 border-black shadow-md" />
        <Skeleton className="h-8 md:h-10 w-48 md:w-56 border-2 border-black" />
        <Skeleton className="h-4 md:h-5 w-64 md:w-80 mt-2 border-2 border-black" />
      </div>

      {/* Petunjuk Kuis card — heading + text lines */}
      <section className="border-4 border-black bg-white shadow-[4px_4px_0_0_black] p-6 md:p-8 space-y-4">
        <Skeleton className="h-6 md:h-7 w-36 md:w-40 border-2 border-black" />
        <div className="space-y-2">
          <Skeleton className="h-4 md:h-5 w-full border-2 border-black" />
          <Skeleton className="h-4 md:h-5 w-full border-2 border-black" />
          <Skeleton className="h-4 md:h-5 w-5/6 border-2 border-black" />
          <Skeleton className="h-4 md:h-5 w-full border-2 border-black" />
          <Skeleton className="h-4 md:h-5 w-4/5 border-2 border-black" />
        </div>
      </section>

      {/* Mulai Kuis button */}
      <div className="flex justify-center pt-4 md:pt-6">
        <Skeleton className="h-14 md:h-16 w-48 md:w-56 border-4 border-black shadow-[4px_4px_0_0_black]" />
      </div>
    </div>
  )
}
