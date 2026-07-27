"use client"

import { Accordion as AccordionPrimitive } from "@base-ui/react/accordion"
import { ChevronDownIcon } from "lucide-react"

import { cn } from "@/lib/utils"

// Smooth, premium easing for the open/close — fast out of the gate, gentle
// settle. Shared by the panel height and the chevron so they move in lockstep.
const EASE = "ease-[cubic-bezier(0.32,0.72,0,1)]"

function Accordion({ className, ...props }: AccordionPrimitive.Root.Props) {
  return (
    <AccordionPrimitive.Root
      data-slot="accordion"
      className={cn("flex w-full flex-col gap-3", className)}
      {...props}
    />
  )
}

function AccordionItem({ className, ...props }: AccordionPrimitive.Item.Props) {
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      className={cn(
        "overflow-hidden border-2 border-black bg-card text-foreground shadow-sm transition-shadow duration-200 hover:shadow data-[open]:shadow",
        className
      )}
      {...props}
    />
  )
}

function AccordionTrigger({
  className,
  children,
  ...props
}: AccordionPrimitive.Trigger.Props) {
  return (
    <AccordionPrimitive.Header data-slot="accordion-header" className="flex">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn(
          "flex flex-1 cursor-pointer items-center justify-between gap-4 px-3 py-2 text-left font-bold text-xs transition-colors hover:bg-primary hover:text-primary-foreground data-[open]:bg-primary data-[open]:text-primary-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary md:text-sm",
          className
        )}
        {...props}
      >
        {children}
        <ChevronDownIcon
          aria-hidden
          data-slot="accordion-trigger-icon"
          className={cn(
            "h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-300 [[data-state=open]>&]:rotate-180",
            EASE
          )}
        />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  )
}

function AccordionContent({
  className,
  children,
  ...props
}: AccordionPrimitive.Panel.Props) {
  return (
    <AccordionPrimitive.Panel
      data-slot="accordion-content"
      // Base UI publishes the measured panel height as `--accordion-panel-height`
      // and flags the entering/leaving frames with `data-starting-style` /
      // `data-ending-style`. Transitioning `height` between that var and 0 gives a
      // real slide open/close.
      className={cn(
        "group/panel h-[var(--accordion-panel-height)] overflow-hidden bg-card font-body text-sm text-muted-foreground",
        "transition-[height] duration-300",
        EASE,
        "data-[starting-style]:h-0 data-[ending-style]:h-0"
      )}
      {...props}
    >
      <div
        className={cn(
          "px-3 pb-3 transition-[opacity,transform] duration-300 ease-out",
          // Fade + nudge the content as the panel opens/closes, synced to the slide.
          "group-data-[starting-style]/panel:-translate-y-1 group-data-[starting-style]/panel:opacity-0",
          "group-data-[ending-style]/panel:-translate-y-1 group-data-[ending-style]/panel:opacity-0",
          className
        )}
      >
        {children}
      </div>
    </AccordionPrimitive.Panel>
  )
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
