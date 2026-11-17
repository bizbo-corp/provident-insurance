"use client";

import { usePathname } from "next/navigation";
import { useState } from "react";
import { useVariants } from "@/components/variants/variant-provider";
import { ALL_FEATURES, FEATURES, type FeatureId } from "@/lib/variants";
import { cn } from "@/lib/utils";

const SEGMENT = "rounded-full px-3 py-1 hover:opacity-100";

/** Review tool only, not part of the site. Sized in px so it ignores the site's rem scale. */
export function VariantToggle() {
  const { enabled, setEnabled } = useVariants();
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // The client review page links to before and after itself.
  if (pathname.startsWith("/review") || pathname.startsWith("/unlock")) return null;

  const isBefore = enabled.length === 0;
  const isAfter = enabled.length === ALL_FEATURES.length;

  const toggle = (id: FeatureId) =>
    setEnabled(enabled.includes(id) ? enabled.filter((item) => item !== id) : [...enabled, id]);

  return (
    <div className="fixed right-4 bottom-[88px] z-70 w-max rounded-2xl bg-[#1d1d1f] p-1.5 text-[13px] leading-[18px] text-white shadow-lg">
      {open && (
        <ul className="mb-1.5 space-y-1 p-2">
          {FEATURES.map((feature) => (
            <li key={feature.id}>
              <label className="flex cursor-pointer items-center gap-2">
                <input
                  type="checkbox"
                  checked={enabled.includes(feature.id)}
                  onChange={() => toggle(feature.id)}
                />
                {feature.label}
              </label>
            </li>
          ))}
        </ul>
      )}
      <div className="flex items-center gap-1">
        <button
          type="button"
          aria-pressed={isBefore}
          className={cn(SEGMENT, isBefore && "bg-[#e09a85] font-semibold text-[#1d1d1f]")}
          onClick={() => setEnabled([])}
        >
          Before
        </button>
        <button
          type="button"
          aria-pressed={isAfter}
          className={cn(SEGMENT, isAfter && "bg-[#98af3a] font-semibold text-[#293021]")}
          onClick={() => setEnabled(ALL_FEATURES)}
        >
          After
        </button>
        <button
          type="button"
          aria-expanded={open}
          aria-label="Choose individual changes"
          className={cn(SEGMENT, !isBefore && !isAfter && "bg-white text-black")}
          onClick={() => setOpen(!open)}
        >
          {open ? "Close" : "Pick"}
        </button>
      </div>
    </div>
  );
}
