"use client";

/**
 * Accordion — shadcn/ui (new-york style) with Spectrum UI's filled variant.
 *
 * Props beyond the shadcn baseline:
 *  - `variant="filled"` drops the borders and uses soft panels for each item.
 *  - `indicator="plus"` morphs a plus into a minus while the item is open.
 *    `indicator="chevron"` keeps the default rotating chevron.
 */

import * as React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronDownIcon, MinusIcon, PlusIcon } from "lucide-react";

import { cn } from "@/lib/utils";

type AccordionVariant = "default" | "filled";
type AccordionIndicator = "chevron" | "plus";

const AccordionVariantContext =
  React.createContext<AccordionVariant>("default");
const AccordionIndicatorContext =
  React.createContext<AccordionIndicator>("chevron");

function Accordion({
  variant = "default",
  indicator = "chevron",
  className,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Root> & {
  variant?: AccordionVariant;
  indicator?: AccordionIndicator;
}) {
  return (
    <AccordionVariantContext.Provider value={variant}>
      <AccordionIndicatorContext.Provider value={indicator}>
        <AccordionPrimitive.Root
          data-slot="accordion"
          data-variant={variant}
          className={cn("flex w-full flex-col gap-2", className)}
          {...props}
        />
      </AccordionIndicatorContext.Provider>
    </AccordionVariantContext.Provider>
  );
}

function AccordionItem({
  className,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Item>) {
  const variant = React.useContext(AccordionVariantContext);

  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      data-variant={variant}
      className={cn(
        "group/accordion-item",
        variant === "filled"
          ? "rounded-[20px] border-0 bg-[color-mix(in_srgb,var(--fg)_5%,transparent)] px-5"
          : "border-b border-[var(--border)] last:border-b-0",
        className,
      )}
      {...props}
    />
  );
}

function AccordionTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Trigger>) {
  const indicator = React.useContext(AccordionIndicatorContext);

  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn(
          "flex flex-1 items-center justify-between gap-4 py-4 text-left text-[17px] font-semibold leading-snug text-[var(--fg)]",
          "transition-colors outline-none",
          "focus-visible:ring-2 focus-visible:ring-[var(--fg)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)]",
          "disabled:pointer-events-none disabled:opacity-50",
          className,
        )}
        {...props}
      >
        {children}
        <span
          aria-hidden="true"
          className="relative flex size-6 shrink-0 items-center justify-center"
        >
          {indicator === "plus" ? (
            <>
              <PlusIcon
                className={cn(
                  "size-4 transition-transform duration-200",
                  "group-data-[state=open]/accordion-item:rotate-90 group-data-[state=open]/accordion-item:opacity-0",
                )}
              />
              <MinusIcon
                className={cn(
                  "absolute size-4 opacity-0 transition-opacity duration-200",
                  "group-data-[state=open]/accordion-item:opacity-100",
                )}
              />
            </>
          ) : (
            <ChevronDownIcon
              className={cn(
                "size-4 transition-transform duration-200",
                "group-data-[state=open]/accordion-item:rotate-180",
              )}
            />
          )}
        </span>
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}

function AccordionContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Content>) {
  return (
    <AccordionPrimitive.Content
      data-slot="accordion-content"
      className="overflow-hidden data-[state=closed]:animate-[accordion-up_200ms_ease-out] data-[state=open]:animate-[accordion-down_200ms_ease-out]"
      {...props}
    >
      <div
        className={cn(
          "pb-4 text-[15px] leading-relaxed text-[color-mix(in_srgb,var(--fg)_60%,transparent)]",
          className,
        )}
      >
        {children}
      </div>
    </AccordionPrimitive.Content>
  );
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
