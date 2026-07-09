/* Kawung motif stamp — 4 circles in a diamond, rotated 45deg.
   Used as the branding logo on the landing page. */
export function KawungStamp({ className = "" }: { className?: string }) {
  return (
    <div className={`bg-primary border-[4px] border-black p-8 neubrutal-shadow relative ${className}`}>
      <div className="kawung-stamp">
        <div className="kawung-circle c1 bg-primary-dark" />
        <div className="kawung-circle c2 bg-secondary" />
        <div className="kawung-circle c3 bg-tertiary" />
        <div className="kawung-circle c4 bg-accent" />
      </div>
      <div className="absolute -bottom-6 -right-6 bg-black text-white px-4 py-2 text-xs font-bold uppercase rotate-6 border-2 border-white">
        GEMATRI
      </div>
    </div>
  )
}
