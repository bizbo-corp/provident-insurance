"use client";

import { usePathname } from "next/navigation";
import {
  QUOTE_STEPS,
  QUOTE_STEP_COUNT,
  quoteStepIndexFromPathname,
} from "@/lib/quote-flow";
import { useSectionProgress } from "@/components/quote/quote-progress";
import { cn } from "@/lib/utils";

export function QuoteStepper() {
  const pathname = usePathname();
  const activeIndex = quoteStepIndexFromPathname(pathname);
  const sectionProgress = useSectionProgress();

  // Not on a step route (e.g. the /quote redirect) — nothing meaningful to show.
  if (activeIndex === -1) return null;

  const activeStep = QUOTE_STEPS[activeIndex];

  return (
    <nav aria-label="Quote progress">
      <p className="text-sm font-bold text-muted-foreground">
        Step {activeIndex + 1} of {QUOTE_STEP_COUNT}
        {/* Per-step labels are hidden on small screens, so name the current
            step here instead of dropping it entirely. */}
        <span className="font-normal text-foreground sm:hidden">
          : {activeStep.title}
        </span>
      </p>

      <ol className="mt-2 flex items-start gap-2">
        {QUOTE_STEPS.map((step, index) => {
          const isComplete = index < activeIndex;
          const isCurrent = index === activeIndex;
          const fill = isComplete ? 1 : isCurrent ? sectionProgress : 0;

          return (
            <li
              key={step.slug}
              className="flex flex-1 flex-col gap-2"
              aria-current={isCurrent ? "step" : undefined}
            >
              {/* Track is bg-border, not bg-muted: muted matches the header's
                  secondary background and would render the track invisible. */}
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-border">
                <div
                  className={cn(
                    "h-full rounded-full transition-all duration-300",
                    isComplete ? "bg-foreground/40" : "bg-foreground"
                  )}
                  style={{ width: `${fill * 100}%` }}
                />
              </div>

              <span className="sr-only">
                {step.label}{" "}
                {isComplete
                  ? "(completed)"
                  : isCurrent
                    ? `(current step, ${Math.round(sectionProgress * 100)}% complete)`
                    : "(not started)"}
              </span>

              <span
                aria-hidden="true"
                className={cn(
                  "hidden truncate text-sm sm:block",
                  isCurrent
                    ? "font-bold text-foreground"
                    : "font-medium text-muted-foreground"
                )}
              >
                {step.label}
              </span>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
