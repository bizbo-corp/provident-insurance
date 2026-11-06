import { cn } from "@/lib/utils";

/** The live seven-stop excess slider, built as a radio group. */
export function ExcessPicker({
  options,
  value,
  onChange,
}: {
  options: string[];
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div role="radiogroup" aria-label="Voluntary Excess Amount" className="relative flex justify-between px-3">
      <div className="absolute inset-x-6 top-3 h-px bg-black/15" aria-hidden="true" />
      {options.map((option) => {
        const selected = option === value;
        return (
          <button
            key={option}
            type="button"
            role="radio"
            aria-checked={selected}
            className="relative flex w-8 flex-col items-center gap-2 text-sm whitespace-nowrap hover:opacity-100"
            onClick={() => onChange(option)}
          >
            <span
              className={cn(
                "flex size-6 items-center justify-center rounded-full",
                selected ? "bg-primary" : "border border-black/20 bg-quote-selected"
              )}
            >
              <span className={cn("size-2 rounded-full", selected ? "bg-white" : "bg-quote-muted")} />
            </span>
            {option}
          </button>
        );
      })}
    </div>
  );
}
