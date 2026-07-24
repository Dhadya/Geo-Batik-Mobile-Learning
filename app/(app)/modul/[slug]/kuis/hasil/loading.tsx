import { Skeleton } from "@/components/retroui/Skeleton"

export default function KuisHasilLoading() {
  return (
    <div className="space-y-4 md:space-y-6">
      <Skeleton className="h-5 md:h-6 w-48 border-2 border-black" />
      <Skeleton className="bg-primary h-28 md:h-36 w-full border-4 border-black shadow-lg" />
      <Skeleton className="h-14 md:h-16 w-full border-4 border-black shadow-[4px_4px_0_0_black]" />
      <Skeleton className="h-40 md:h-48 w-full border-4 border-black shadow-[4px_4px_0_0_black]" />
      <Skeleton className="h-32 md:h-40 w-full border-4 border-black shadow-[4px_4px_0_0_black]" />
      <div className="flex justify-center gap-3 md:gap-4">
        <Skeleton className="h-12 md:h-14 w-32 md:w-40 border-4 border-black shadow-[4px_4px_0_0_black]" />
        <Skeleton className="h-12 md:h-14 w-32 md:w-40 border-4 border-black shadow-[4px_4px_0_0_black]" />
      </div>
    </div>
  )
}
