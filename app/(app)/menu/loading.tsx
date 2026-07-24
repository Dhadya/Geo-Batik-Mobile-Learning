import { Skeleton } from "@/components/retroui/Skeleton"

export default function MenuLoading() {
  return (
    <div className="max-w-384 mx-auto px-4 md:px-12 py-4 md:py-6 space-y-6 md:space-y-8">
      {/* MenuHeader — text block */}
      <div className="space-y-3 md:space-y-4">
        <Skeleton className="h-9 md:h-12 w-48 md:w-56 border-2 border-black" />
        <Skeleton className="h-5 md:h-6 w-full max-w-sm border-2 border-black" />
      </div>

      {/* ModuleGrid — 2-col grid of tall bento cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
        <Skeleton className="min-h-[450px] md:min-h-[550px] w-full border-4 border-black shadow-[4px_4px_0_0_black]" />
        <Skeleton className="min-h-[450px] md:min-h-[550px] w-full border-4 border-black shadow-[4px_4px_0_0_black]" />
      </div>

      {/* LabCard — horizontal card with icon + text + trailing icon */}
      <div className="flex items-center justify-between border-4 border-black bg-white shadow-[4px_4px_0_0_black] p-4 md:p-8">
        <div className="flex items-center gap-4 md:gap-6">
          <Skeleton className="size-12 md:size-16 border-4 border-black shadow-md" />
          <div className="space-y-2">
            <Skeleton className="h-6 md:h-8 w-32 md:w-40 border-2 border-black" />
            <Skeleton className="h-4 md:h-5 w-48 md:w-64 border-2 border-black" />
          </div>
        </div>
        <Skeleton className="size-12 md:size-16 border-2 border-black" />
      </div>

      {/* BackLink — centered pill */}
      <div className="flex justify-center pb-8 md:pb-12">
        <Skeleton className="h-10 md:h-12 w-48 md:w-56 border-4 border-black shadow-[4px_4px_0_0_black]" />
      </div>
    </div>
  )
}
