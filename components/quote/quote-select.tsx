"use client";

import { cn } from "@/lib/utils";

export type SelectOption = { value: string; label: string };

/**
 * A native select styled to match the form controls — keeps the platform's own
 * picker and keyboard handling on mobile, which a custom listbox would lose.
 */
export function QuoteSelect({
  id,
  label,
  value,
  onChange,
  placeholder,
  options,
  className,
  hideLabel = false,
}: {
  id: string;
  label: string;
  value: string | null;
  onChange: (value: string | null) => void;
  placeholder?: string;
  options: SelectOption[];
  className?: string;
  hideLabel?: boolean;
}) {
  return (
    <div className={className}>
      <label htmlFor={id} className={hideLabel ? "sr-only" : "mb-1 block text-sm font-bold"}>
        {label}
      </label>
      <div className="relative">
        <select
          id={id}
          value={value ?? ""}
          onChange={(e) => onChange(e.target.value || null)}
          className={cn(
            "h-14 w-full appearance-none rounded-lg border border-black/25 bg-white px-4 pr-10 text-base",
            "outline-none focus-visible:border-quote-ink",
            
          )}
        >
          <option value="" disabled>
            {placeholder ?? ""}
          </option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value} className="text-quote-ink">
              {opt.label}
            </option>
          ))}
        </select>
        <svg
          viewBox="0 0 24 24"
          aria-hidden="true"
          className="pointer-events-none absolute top-1/2 right-3 size-6 -translate-y-1/2 fill-quote-muted"
        >
          <path d="M7 10l5 5 5-5z" />
        </svg>
      </div>
    </div>
  );
}
