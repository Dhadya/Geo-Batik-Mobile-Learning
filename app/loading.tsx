import { Skeleton } from "@/components/retroui/Skeleton"

export default function RootLoading() {
  return (
    <div className="max-w-384 mx-auto px-4 md:px-12 py-6 md:py-8 space-y-4 md:space-y-6 w-full">
      <Skeleton className="h-5 md:h-6 w-32 border-2 border-black" />
      <Skeleton className="h-28 md:h-36 w-full border-4 border-black shadow-lg" />
      <Skeleton className="h-40 md:h-48 w-full border-4 border-black shadow-[4px_4px_0_0_black]" />
      <Skeleton className="h-32 md:h-40 w-full border-4 border-black shadow-[4px_4px_0_0_black]" />
    </div>
  )
}
