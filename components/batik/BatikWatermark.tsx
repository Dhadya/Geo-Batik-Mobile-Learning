/* Subtle full-screen decorative watermark — grid of kawung-like
   circle patterns at 5% opacity. Rendered server-side (no JS needed). */
export function BatikWatermark({ className = "" }: { className?: string }) {
  return (
    <div className={`fixed inset-0 z-0 batik-watermark ${className}`}>
      <div className="grid grid-cols-4 md:grid-cols-8 gap-12 p-8">
        {Array.from({ length: 64 }).map((_, i) => (
          <div
            key={i}
            className="w-24 h-24 border-4 border-black rotate-45 flex items-center justify-center"
          >
            <div className="w-12 h-12 border-2 border-black rounded-full" />
          </div>
        ))}
      </div>
    </div>
  )
}
