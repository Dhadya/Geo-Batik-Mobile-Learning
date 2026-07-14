/* RetroUI - Multi-line text input */
import { cn } from "@/lib/utils";

export function Textarea({
  placeholder = "Enter text...",
  className = "",
  ...props
}) {
  return (
    <textarea
      placeholder={placeholder}
      rows={4}
      className={cn(
        "px-2 py-2 w-full border-2 text-xs md:text-sm rounded shadow-md transition focus:outline-hidden focus:shadow-xs placeholder:text-muted-foreground",
        className
      )}
      {...props}
    />
  );
}
