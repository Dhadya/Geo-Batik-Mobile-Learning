import { Skeleton } from "@/components/retroui/Skeleton"

export default function KuisSoalLoading() {
  return (
    <div className="max-w-384 mx-auto space-y-4 md:space-y-6">
      <Skeleton className="h-5 md:h-6 w-48 border-2 border-black" />
      <Skeleton className="h-75 md:h-100 w-full border-4 border-black shadow-4 shadow-black" />
      <div className="flex justify-center">
        <Skeleton className="h-12 md:h-14 w-32 md:w-40 border-4 border-black shadow-[4px_4px_0_0_black]" />
      </div>
    </div>
  )
}
