"use client";

import { CircleCheck, CircleMinus, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

function StepIcon({ done }: { done: boolean }) {
  return done ? (
    <CircleCheck
      className="size-8 shrink-0 fill-green-600 text-white"
      aria-hidden="true"
    />
  ) : (
    <CircleMinus
      className="size-8 shrink-0 fill-gray-500 text-white"
      aria-hidden="true"
    />
  );
}

/** One question in the vertical timeline, with its completion icon and rule. */
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
  return (
    <div className="flex animate-in gap-5 fade-in-0 slide-in-from-top-2 duration-300">
      <div className="flex flex-col items-center">
        <StepIcon done={done} />
        {!isLast && <div className="w-px flex-1 bg-border" />}
      </div>
      <div className={cn("min-w-0 flex-1", isLast ? "pb-8" : "pb-14")}>
        <h2 className="text-xl font-bold leading-snug sm:text-2xl">{title}</h2>
        <div className="mt-4 space-y-4">{children}</div>
      </div>
    </div>
  );
}

export function HelpLink() {
  return (
    <button
      type="button"
      className="inline-flex items-center gap-1.5 text-sm font-medium underline underline-offset-2 hover:text-primary"
    >
      <Info className="size-4" aria-hidden="true" />
      Help
    </button>
  );
}

/** Clarifying note shown under a question title. */
export function QuestionNote({ children }: { children: React.ReactNode }) {
  return <p className="text-base text-muted-foreground">{children}</p>;
}

export function ChoiceGroup<T extends string>({
  options,
  value,
  onChange,
}: {
  options: { value: T; label: string }[];
  value: T | null;
  onChange: (v: T) => void;
}) {
  return (
    <div className="flex flex-wrap gap-3">
      {options.map((opt) => (
        <Button
          key={opt.value}
          type="button"
          variant="outline"
          aria-pressed={value === opt.value}
          onClick={() => onChange(opt.value)}
          className={cn(
            "h-12 rounded-lg px-6 text-base font-bold",
            value === opt.value
              ? "border-foreground/40 bg-gray-200 hover:bg-gray-200"
              : "bg-white"
          )}
        >
          {opt.label}
        </Button>
      ))}
    </div>
  );
}
