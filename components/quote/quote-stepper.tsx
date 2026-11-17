"use client";

import { QUOTE_GROUPS, type QuoteStep } from "@/lib/quote-flow";
import { useAnswered } from "@/lib/quote-progress";
import { cn } from "@/lib/utils";

/**
 * The "after" progress: three stages sized by how many questions each asks,
 * filling as each question is answered.
 */
export function QuoteStepper({ step, compact = false }: { step: QuoteStep; compact?: boolean }) {
  const reported = useAnswered(step.slug);
  const complete = step.group >= QUOTE_GROUPS.length;
  // Cover starts filled in, so it counts as answered on arrival.
  const answeredHere = step.slug === "cover" ? step.questions : (reported ?? 0);
  const answeredInStage = step.offset + answeredHere;
  const stage = QUOTE_GROUPS[Math.min(step.group, QUOTE_GROUPS.length - 1) as 0 | 1 | 2];

  return (
    <nav aria-label="Quote progress" className={compact ? undefined : "mt-3"}>
      {/* No visible step count: the labelled bar says it. Screen readers still hear it. */}
      <p className="sr-only" aria-live="polite">
        {complete
          ? "Quote complete"
          : `Step ${step.group + 1} of ${QUOTE_GROUPS.length}, ${stage.label}: ${answeredInStage} of ${stage.questions} answered`}
      </p>
      <ol className={cn("flex gap-2", !compact && "mt-4")}>
        {QUOTE_GROUPS.map((group, index) => {
          const fill =
            index < step.group ? 1 : index === step.group ? answeredInStage / group.questions : 0;
          const current = index === step.group;
          return (
            <li
              key={group.label}
              style={{ flexGrow: group.questions, flexBasis: 0 }}
              aria-current={current ? "step" : undefined}
            >
              <div className="h-1.5 overflow-hidden rounded-full bg-lighter-grey">
                <div
                  className="h-full rounded-full bg-quote-ink transition-[width] duration-300 ease-out motion-reduce:transition-none"
                  style={{ width: `${Math.min(1, fill) * 100}%` }}
                />
              </div>
              <span
                className={cn(
                  "mt-2 block text-xs leading-tight sm:text-sm",
                  current ? "font-bold text-quote-ink" : "text-quote-muted"
                )}
              >
                {group.label}
              </span>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
