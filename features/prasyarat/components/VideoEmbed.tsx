import { MaterialIcon } from "@/components/common/MaterialIcon"

/* Props for the video/embed section. */
interface VideoEmbedProps {
  /** Section label shown in the header bar, e.g. "Video Penjelasan" */
  label: string
  /** GeoGebra embed URL */
  src: string
  /** Alt text for the embed */
  alt?: string
}

/* Video embed section — header bar + iframe embed with NeoBrutalism border. */
export function VideoEmbed({ label, src, alt = "Video embed" }: VideoEmbedProps) {
  return (
    <div className="w-full bg-card border-4 border-black shadow-xl overflow-hidden">
      {/* Header bar */}
      <div className="p-2 md:p-3 bg-primary border-b-4 border-black flex justify-between items-center">
        <span className="font-bold text-primary-foreground uppercase tracking-widest flex items-center gap-2 text-xs md:text-sm">
          <MaterialIcon name="play_circle" className="text-xl md:text-2xl" />
          {label}
        </span>
        <div className="flex gap-1.5 md:gap-2">
          <div className="w-3 h-3 md:w-4 md:h-4 bg-primary-container border-2 border-black" />
          <div className="w-3 h-3 md:w-4 md:h-4 bg-secondary-container border-2 border-black" />
        </div>
      </div>

      {/* Embed area */}
      <div className="aspect-video w-full bg-black relative">
        <iframe
          src={src}
          title={alt}
          className="w-full h-full border-0"
          allowFullScreen
        />
      </div>
    </div>
  )
}
