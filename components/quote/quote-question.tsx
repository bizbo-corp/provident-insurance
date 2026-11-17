"use client";

import { CheckCircle2, Info, MinusCircle } from "lucide-react";
import { useFeature } from "@/components/variants/variant-provider";
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

/** Info panel. Soft red on live; the after state makes it neutral so it can't read as an error. */
export function QuoteNotice({ title, children }: { title?: string; children: React.ReactNode }) {
  const neutral = useFeature("neutral-panels");
  return (
    <div
      className={cn(
        "space-y-4 rounded-lg p-4 text-sm",
        neutral ? "bg-light-grey text-quote-ink" : "bg-quote-notice text-quote-notice-ink"
      )}
    >
      {title && <p className={cn("font-bold", !neutral && "text-primary-dark")}>{title}</p>}
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

/** Next and Back at the foot of every step. In version 2 they match the 56px fields and buttons above them. */
export function QuoteStepActions({
  nextLabel,
  onNext,
  onBack,
}: {
  nextLabel?: string;
  onNext?: () => void;
  onBack?: () => void;
}) {
  const hierarchy = useFeature("button-hierarchy");
  const next = nextLabel && onNext && (
    <QuoteButton variant="next" className={cn(hierarchy && "h-auto min-h-14 w-auto flex-1 py-2 leading-tight")} onClick={onNext}>
      {nextLabel}
    </QuoteButton>
  );
  const back = onBack && (
    <QuoteButton variant={hierarchy ? "back-strong" : "back"} className={cn(hierarchy && "h-14")} onClick={onBack}>Back</QuoteButton>
  );

  if (hierarchy) {
    return (
      <div className="sticky bottom-0 z-10 mt-8 flex gap-3 bg-white py-3">
        {back}
        {next}
      </div>
    );
  }
  return <div className="mt-8 space-y-4">{next}{back}</div>;
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
  "dark-wide": "w-[310px] max-w-full bg-quote-ink text-white disabled:bg-black/10",
  "back-strong": "border border-quote-ink px-8 text-quote-ink",
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
