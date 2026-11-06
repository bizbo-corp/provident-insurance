"use client";

import { CheckCircle2, Info, MinusCircle } from "lucide-react";
import { cn } from "@/lib/utils";

/** One question on the vertical timeline: status icon, connecting rule, content. */
export function Question({
  done,
  title,
  isLast = false,
  children,
}: {
  done: boolean;
  title: string;
  isLast?: boolean;
  children: React.ReactNode;
}) {
  const Icon = done ? CheckCircle2 : MinusCircle;
  return (
    <div className="flex gap-8">
      <div className="flex w-6 flex-col items-center pt-[3px]">
        <Icon
          aria-hidden="true"
          className={cn(
            "size-6 shrink-0 text-white",
            done ? "fill-quote-success" : "fill-quote-muted"
          )}
        />
        {!isLast && <div className="mt-1 w-px flex-1 bg-quote-track" />}
      </div>
      <div className="min-w-0 flex-1 pr-2 pb-16">
        <h2 className="pr-2 text-2xl leading-[1.2] font-bold">{title}</h2>
        <div className="mt-4 space-y-4">{children}</div>
      </div>
    </div>
  );
}

export function HelpLink({ label = "Help" }: { label?: string }) {
  return (
    <button
      type="button"
      className="inline-flex h-5 items-center text-base leading-5 font-bold text-quote-muted underline"
    >
      <Info className="mr-1 size-4" aria-hidden="true" />
      {label}
    </button>
  );
}

export function QuestionNote({ children }: { children: React.ReactNode }) {
  return <p>{children}</p>;
}

/** Soft red info panel. Proposal item 1 targets this treatment, so it's kept as is here. */
export function QuoteNotice({ children }: { children: React.ReactNode }) {
  return (
    <div className="space-y-4 rounded-lg bg-quote-notice p-4 text-sm text-quote-notice-ink">
      {children}
    </div>
  );
}

export function ChoiceGroup<T extends string>({
  options,
  value,
  onChange,
}: {
  options: { value: T; label: string }[];
  value: T | null;
  onChange: (value: T) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((option) => (
        <QuoteButton
          key={option.value}
          variant="choice"
          aria-pressed={value === option.value}
          className={cn(value === option.value && "border-black/50 bg-quote-selected text-quote-ink")}
          onClick={() => onChange(option.value)}
        >
          {option.label}
        </QuoteButton>
      ))}
    </div>
  );
}

/** The full-width Next and Back pair at the foot of every step. */
export function QuoteStepActions({
  nextLabel,
  onNext,
  onBack,
}: {
  nextLabel?: string;
  onNext?: () => void;
  onBack?: () => void;
}) {
  return (
    <div className="mt-8 space-y-4">
      {nextLabel && onNext && (
        <QuoteButton variant="next" onClick={onNext}>{nextLabel}</QuoteButton>
      )}
      {onBack && <QuoteButton variant="back" onClick={onBack}>Back</QuoteButton>}
    </div>
  );
}

/** Shared text field: 56px tall, 8px corners. */
export const QUOTE_FIELD =
  "h-14 w-full rounded-lg border border-black/25 bg-white px-4 font-normal outline-none focus:border-quote-ink";

export function QuoteField({
  label,
  className,
  ...props
}: { label: string } & React.ComponentProps<"input">) {
  return (
    <label className={cn("block text-sm font-bold", className)}>
      {label}
      <input className={cn(QUOTE_FIELD, "mt-1 text-base")} {...props} />
    </label>
  );
}

const BUTTON_VARIANTS = {
  outline: "w-[310px] max-w-full border border-black/30 text-quote-muted",
  choice: "border border-black/30 text-quote-muted",
  next: "w-full bg-quote-accent text-white",
  back: "w-full border border-black/30 text-quote-muted",
  select: "w-full border border-quote-accent text-quote-accent",
  selected: "w-full bg-quote-accent text-white",
  dark: "bg-quote-ink px-10 text-white",
} as const;

/** The live app's flat 40px button. `disabled` matches its washed-out state. */
export function QuoteButton({
  variant,
  className,
  ...props
}: React.ComponentProps<"button"> & { variant: keyof typeof BUTTON_VARIANTS }) {
  return (
    <button
      type="button"
      className={cn(
        "h-10 rounded-lg px-4 font-bold",
        "disabled:cursor-default disabled:border-black/12 disabled:text-black/26 disabled:hover:opacity-100",
        BUTTON_VARIANTS[variant],
        className
      )}
      {...props}
    />
  );
}
