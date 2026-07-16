"use client";

import { useId } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/**
 * Action button for the quote funnel.
 *
 * `primary` (red) is reserved for the one action that advances the funnel, so
 * only ever show one per screen. `secondary` (black) is for supporting actions
 * like the rego lookup, and `outline` for the quietest ones.
 */
const CTA_VARIANTS = {
  primary: "bg-primary text-primary-foreground hover:bg-brand-dark",
  secondary: "bg-black text-white hover:bg-black/85",
  outline: "border-border bg-white text-foreground hover:bg-muted",
} as const;

export type QuoteCtaVariant = keyof typeof CTA_VARIANTS;

/**
 * Uses `aria-disabled` rather than `disabled` for two reasons: the base button
 * sets `disabled:pointer-events-none`, which would swallow `cursor-not-allowed`,
 * and a truly disabled button is skipped by keyboard/AT users so they never
 * reach the hint explaining why it's inert.
 */
export function QuoteCta({
  variant = "primary",
  inactive = false,
  hint,
  onClick,
  className,
  containerClassName,
  children,
}: {
  variant?: QuoteCtaVariant;
  /** Blocks the action and applies the muted, self-explanatory state. */
  inactive?: boolean;
  /** Shown beside the button while inactive, so the state explains itself. */
  hint?: string;
  onClick?: () => void;
  /** Applied to the button itself. */
  className?: string;
  /** Applied to the wrapper — use to size the CTA within a flex row. */
  containerClassName?: string;
  children: React.ReactNode;
}) {
  const hintId = useId();

  return (
    <div
      className={cn(
        "flex flex-wrap items-center gap-x-4 gap-y-2",
        containerClassName
      )}
    >
      <Button
        type="button"
        aria-disabled={inactive || undefined}
        aria-describedby={inactive && hint ? hintId : undefined}
        onClick={inactive ? undefined : onClick}
        className={cn(
          "h-14 rounded-lg px-10 text-lg font-bold",
          // The inactive treatment is shared by every variant.
          inactive
            ? "cursor-not-allowed border-transparent bg-muted text-muted-foreground hover:bg-muted"
            : CTA_VARIANTS[variant],
          className
        )}
      >
        {children}
      </Button>
      {inactive && hint && (
        <p id={hintId} className="text-sm text-muted-foreground">
          {hint}
        </p>
      )}
    </div>
  );
}
