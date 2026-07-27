"use client";
/* RetroUI - Popover */

import * as React from "react";
import { Popover as BasePopover } from "@base-ui/react/popover";

import { cn } from "@/lib/utils";

const Popover = BasePopover.Root;
const PopoverTrigger = BasePopover.Trigger;

const PopoverContent = ({
  className,
  ref,
  ...props
}: React.ComponentPropsWithRef<typeof BasePopover.Popup>) => (
  <BasePopover.Portal>
    <BasePopover.Positioner sideOffset={8}>
      <BasePopover.Popup
        ref={ref}
        className={cn(
          "z-50 w-[36rem] border-4 border-black bg-white p-4 shadow-[4px_4px_0_0_black] data-[open]:animate-in data-[open]:fade-in-0 data-[open]:zoom-in-95 data-[closed]:animate-out data-[closed]:fade-out-0 data-[closed]:zoom-out-95",
          className,
        )}
        {...props}
      />
    </BasePopover.Positioner>
  </BasePopover.Portal>
);

interface PopoverHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  ref?: React.Ref<HTMLDivElement>
}

const PopoverHeader = ({
  className,
  ref,
  ...props
}: PopoverHeaderProps) => (
  <div ref={ref} className={cn("flex flex-col gap-1.5", className)} {...props} />
);

interface PopoverTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  ref?: React.Ref<HTMLHeadingElement>
}

const PopoverTitle = ({
  className,
  ref,
  ...props
}: PopoverTitleProps) => (
  <h3
    ref={ref}
    className={cn("font-black uppercase text-sm md:text-base leading-none tracking-tight", className)}
    {...props}
  />
);

interface PopoverDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {
  ref?: React.Ref<HTMLParagraphElement>
}

const PopoverDescription = ({
  className,
  ref,
  ...props
}: PopoverDescriptionProps) => (
  <p ref={ref} className={cn("text-xs md:text-sm text-black mt-1.5", className)} {...props} />
);

const PopoverObject = Object.assign(Popover, {
  Trigger: PopoverTrigger,
  Content: PopoverContent,
  Header: PopoverHeader,
  Title: PopoverTitle,
  Description: PopoverDescription,
});

export { PopoverObject as Popover, PopoverTrigger, PopoverContent, PopoverHeader, PopoverTitle, PopoverDescription };
