import { Skeleton } from "@/components/retroui/Skeleton"

export default function RootLoading() {
  return (
    <div className="max-w-384 mx-auto pt-6 md:pt-8 pb-16 md:pb-20 px-4 md:px-12 space-y-4 md:space-y-6">
      <Skeleton className="h-8 md:h-10 w-48 border-2 border-black" />
      <Skeleton className="h-20 md:h-28 w-full border-4 border-black shadow-[4px_4px_0_0_black]" />
      <Skeleton className="h-96 md:h-[450px] w-full border-4 border-black shadow-[4px_4px_0_0_black]" />
    </div>
  )
}
