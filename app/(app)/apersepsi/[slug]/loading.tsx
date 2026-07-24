import { Skeleton } from "@/components/retroui/Skeleton"

export default function ApersepsiLoading() {
  return (
    <div className="max-w-384 mx-auto px-4 md:px-12 py-6 md:py-8 space-y-4 md:space-y-6">
      {/* Breadcrumb */}
      <Skeleton className="h-5 md:h-6 w-48 border-2 border-black" />

      {/* ApersepsiHeader — colored banner with icon badge */}
      <div className="relative border-4 border-black shadow-[4px_4px_0_0_black] p-6 md:p-8">
        <Skeleton className="absolute top-3 right-3 md:top-4 md:right-4 size-10 md:size-12 border-4 border-black shadow-md" />
        <Skeleton className="h-7 md:h-8 w-24 border-4 border-black shadow-md mb-3" />
        <Skeleton className="h-9 md:h-12 w-3/4 border-2 border-black" />
      </div>

      {/* Content card — paragraphs + image + more paragraphs */}
      <div className="border-4 border-black bg-white shadow-[4px_4px_0_0_black] p-6 md:p-8 space-y-4 md:space-y-6">
        <div className="space-y-2">
          <Skeleton className="h-4 md:h-5 w-full border-2 border-black" />
          <Skeleton className="h-4 md:h-5 w-full border-2 border-black" />
          <Skeleton className="h-4 md:h-5 w-3/4 border-2 border-black" />
        </div>

        <Skeleton className="max-w-md md:max-w-lg mx-auto aspect-[3/2] w-full border-4 border-black" />

        <div className="space-y-2">
          <Skeleton className="h-4 md:h-5 w-full border-2 border-black" />
          <Skeleton className="h-4 md:h-5 w-5/6 border-2 border-black" />
          <Skeleton className="h-4 md:h-5 w-full border-2 border-black" />
        </div>
      </div>

      {/* CTA button */}
      <div className="flex flex-col items-center gap-4 md:gap-6 pt-4 md:pt-6">
        <Skeleton className="h-12 md:h-14 w-64 md:w-72 border-4 border-black shadow-[4px_4px_0_0_black]" />
      </div>
    </div>
  )
}
