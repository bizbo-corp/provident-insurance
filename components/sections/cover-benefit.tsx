"use client";

import Image from "next/image";
import { useId, useState } from "react";
import { cn } from "@/lib/utils";
import type { CoverCell, CoverComparisonRow } from "@/content/types";

export type BenefitRowData = Extract<CoverComparisonRow, { label: string }>;

/** Tick or cross with any note beneath it. */
export function CoverCellMark({
  cell,
  noteClassName,
}: {
  cell: CoverCell;
  noteClassName?: string;
}) {
  return (
    <>
      <Image
        src={`/images/benefit-${cell.included ? "included" : "excluded"}.svg`}
        alt={cell.included ? "Included" : "Not included"}
        width={24}
        height={24}
        className="size-4 md:size-6"
      />
      {cell.note && (
        <span className={cn("block text-xs leading-tight", noteClassName)}>
          {cell.note}
        </span>
      )}
    </>
  );
}

const lastSpace = (label: string) => label.lastIndexOf(" ");
const labelStart = (label: string) => label.slice(0, lastSpace(label) + 1);
const labelEnd = (label: string) => label.slice(lastSpace(label) + 1);

/** Benefit name with its question mark toggle and explanation. */
export function CoverBenefitLabel({
  row,
  enhanced = false,
}: {
  row: BenefitRowData;
  /**
   * After state only: a 24px tap target, and the explanation slides open
   * instead of appearing instantly as it does on live.
   */
  enhanced?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const infoId = useId();
  return (
    <>
      <span>
        {enhanced ? labelStart(row.label) : row.label}
        {/* After state: the last word and the ? stay together, so the icon never wraps onto a line on its own. */}
        <span className={enhanced ? "whitespace-nowrap" : undefined}>
          {enhanced && labelEnd(row.label)}
          <button
            type="button"
            aria-expanded={open}
            aria-controls={enhanced ? infoId : undefined}
            aria-label="Additional information"
            className={
              enhanced
                ? "-my-1 ml-0 inline-block p-1 align-baseline"
                : "ml-1 inline-block align-baseline"
            }
            onClick={() => setOpen(!open)}
          >
            <Image
              src="/images/noun-question-1355723.svg"
              alt=""
              width={16}
              height={16}
              className="-mt-1 inline-block size-4"
            />
          </button>
        </span>
      </span>
      {enhanced ? (
        // Animating grid rows from 0fr to 1fr gives a smooth height change without measuring.
        <div
          id={infoId}
          inert={!open}
          className={cn(
            "grid transition-[grid-template-rows,opacity] duration-300 ease-out motion-reduce:transition-none",
            open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
          )}
        >
          <div className="overflow-hidden">
            <p className="mt-2 text-sm font-normal">{row.info}</p>
          </div>
        </div>
      ) : (
        open && <p className="mt-2 text-sm font-normal">{row.info}</p>
      )}
    </>
  );
}
