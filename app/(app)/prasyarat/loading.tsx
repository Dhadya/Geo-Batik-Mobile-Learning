import { Skeleton } from "@/components/retroui/Skeleton"

export default function PrasyaratLoading() {
  return (
    <div className="max-w-384 mx-auto px-4 md:px-12 py-4 md:py-6 space-y-6 md:space-y-8">
      {/* Header — badge + title + description */}
      <div className="space-y-3 md:space-y-4">
        <Skeleton className="h-7 md:h-8 w-36 md:w-40 border-4 border-black shadow-md" />
        <Skeleton className="h-9 md:h-12 w-3/4 border-2 border-black" />
        <Skeleton className="h-5 md:h-6 w-full max-w-xl border-2 border-black" />
      </div>

      {/* Video embed — header bar + 16:9 area */}
      <div className="w-full max-w-5xl mx-auto border-4 border-black shadow-[4px_4px_0_0_black]">
        <div className="bg-primary border-b-4 border-black p-2 md:p-3 flex items-center gap-2">
          <Skeleton className="size-6 border-2 border-black bg-white/20" />
          <Skeleton className="h-4 w-28 border-2 border-black bg-white/20" />
        </div>
        <Skeleton className="aspect-video w-full border-0" />
      </div>

      {/* Interactive canvas section — header + grid (3/4 canvas + 1/4 controls) */}
      <div className="space-y-4 md:space-y-6">
        <div className="flex items-center gap-3 md:gap-4">
          <Skeleton className="size-10 md:size-14 border-4 border-black shadow-md" />
          <Skeleton className="h-6 md:h-8 w-44 md:w-52 border-2 border-black" />
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 md:gap-8">
          <Skeleton className="aspect-[3/2] xl:col-span-3 w-full border-4 border-black shadow-[4px_4px_0_0_black]" />
          <div className="xl:col-span-1 space-y-4 border-4 border-black shadow-[4px_4px_0_0_black] p-4 md:p-6">
            <Skeleton className="h-6 w-36 border-2 border-black" />
            <Skeleton className="h-4 w-full border-2 border-black" />
            <Skeleton className="h-4 w-3/4 border-2 border-black" />
            <div className="grid grid-cols-2 xl:grid-cols-1 gap-2">
              <Skeleton className="h-10 w-full border-2 border-black" />
              <Skeleton className="h-10 w-full border-2 border-black" />
              <Skeleton className="h-10 w-full border-2 border-black" />
            </div>
          </div>
        </div>
      </div>

      {/* Konsep Dasar section — header + 2-col concept cards */}
      <div className="space-y-4 md:space-y-6">
        <div className="flex items-center gap-3 md:gap-4">
          <Skeleton className="size-10 md:size-14 border-4 border-black shadow-md" />
          <Skeleton className="h-6 md:h-8 w-36 md:w-40 border-2 border-black" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex items-start gap-3 md:gap-4 border-4 border-black bg-white shadow-[4px_4px_0_0_black] p-4 md:p-6">
              <Skeleton className="size-9 md:size-12 shrink-0 border-4 border-black" />
              <div className="space-y-2 flex-1">
                <Skeleton className="h-5 w-3/4 border-2 border-black" />
                <Skeleton className="h-3 md:h-4 w-full border-2 border-black" />
                <Skeleton className="h-3 md:h-4 w-2/3 border-2 border-black" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA button */}
      <div className="py-4 md:py-6 flex justify-center">
        <Skeleton className="h-12 md:h-14 w-56 md:w-64 border-4 border-black shadow-[4px_4px_0_0_black]" />
      </div>
    </div>
  )
}
