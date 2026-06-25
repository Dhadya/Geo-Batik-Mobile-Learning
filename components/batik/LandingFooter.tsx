/* Landing page footer — shows module name + version status.
   Fixed to bottom, semi-transparent, no pointer events. */
export function LandingFooter({ className = "" }: { className?: string }) {
  return (
    <footer className={`fixed bottom-8 w-full flex justify-between px-6 md:px-12 pointer-events-none opacity-60 ${className}`}>
      <div className="text-xs font-bold uppercase flex flex-col gap-1">
        <span className="bg-black text-white px-2 w-fit">MODULE 01</span>
        <span className="text-foreground">TRANSFORMASI GEOMETRI</span>
      </div>
      <div className="text-xs font-bold uppercase flex flex-col items-end gap-1 text-right">
        <span className="text-foreground">v2.4.0</span>
        <span className="bg-secondary-container border-2 border-black px-2 text-foreground">SIAP BELAJAR</span>
      </div>
    </footer>
  )
}
