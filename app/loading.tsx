import { Skeleton } from "@/components/retroui/Skeleton"

export default function LoadingPage() {
  return (
    <div className="max-w-384 mx-auto pt-6 md:pt-8 pb-16 md:pb-20 px-4 md:px-12 space-y-4 md:space-y-6">
      <Skeleton className="h-8 md:h-10 w-48" />
      <Skeleton className="h-12 md:h-16 w-full border-4 border-black" />
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 md:gap-6">
        <div className="lg:col-span-8 space-y-3 md:space-y-6">
          <Skeleton className="h-96 w-full border-4 border-black" />
          <Skeleton className="h-32 w-full border-4 border-black" />
        </div>
        <div className="lg:col-span-4">
          <Skeleton className="h-64 w-full border-4 border-black" />
        </div>
      </div>
    </div>
  )
}
