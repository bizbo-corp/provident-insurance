import { QUOTE_GROUPS, type QuoteStep } from "@/lib/quote-flow";
import { cn } from "@/lib/utils";

/** The "after" progress: journey length and current position are both explicit. */
export function QuoteStepper({ step }: { step: QuoteStep }) {
  return (
    <nav aria-label="Quote progress" className="mt-3">
      <p className="text-sm font-bold text-dark-grey">
        Step {step.group + 1} of {QUOTE_GROUPS.length}
        <span className="font-normal sm:hidden">: {step.title}</span>
      </p>
      <ol className="mt-2 flex gap-2">
        {QUOTE_GROUPS.map((label, index) => {
          const fill = index < step.group ? 1 : index === step.group ? step.groupFill : 0;
          const current = index === step.group;
          return (
            <li key={label} className="flex-1" aria-current={current ? "step" : undefined}>
              <div className="h-1.5 overflow-hidden rounded-full bg-lighter-grey">
                <div className="h-full rounded-full bg-quote-ink" style={{ width: `${fill * 100}%` }} />
              </div>
              <span
                className={cn(
                  "mt-2 hidden text-sm sm:block",
                  current ? "font-bold text-quote-ink" : "text-quote-muted"
                )}
              >
                {label}
              </span>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
