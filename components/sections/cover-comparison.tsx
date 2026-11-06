"use client";

import Image from "next/image";
import { useState } from "react";
import { Section, SectionIntro } from "@/components/sections/section";
import { Button } from "@/components/ui/button";
import { coverComparison as data } from "@/content/car-insurance";
import { coverComparisonRows } from "@/content/cover-comparison-rows";
import type { CoverCell, CoverComparisonRow } from "@/content/types";

function CellIcon({ cell }: { cell: CoverCell }) {
  return (
    <div className="flex basis-1/3 flex-col items-center justify-center gap-1 text-center md:flex-1 md:basis-0">
      <Image
        src={`/images/benefit-${cell.included ? "included" : "excluded"}.svg`}
        alt={cell.included ? "Included" : "Not included"}
        width={24}
        height={24}
        className="size-4 md:size-6"
      />
      {cell.note && <span className="block text-xs leading-tight">{cell.note}</span>}
    </div>
  );
}

function BenefitRow({ row }: { row: Extract<CoverComparisonRow, { label: string }> }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex flex-wrap border-b border-lighter-grey p-2 hover:bg-white md:p-4">
      <div className="mt-4 mb-2 basis-full border-b border-lighter-grey pb-2 font-bold md:m-0 md:flex-1 md:basis-0 md:border-b-0 md:pb-0">
        <span>
          {row.label}
          <button
            type="button"
            aria-expanded={open}
            aria-label="Additional information"
            className="ml-1 inline-block align-baseline"
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
        {open && <p className="mt-2 text-sm font-normal">{row.info}</p>}
      </div>
      {row.cells.map((cell, index) => <CellIcon key={index} cell={cell} />)}
    </div>
  );
}

function DocumentRow({ label, hrefs }: { label: string; hrefs: string[] }) {
  return (
    <div className="flex flex-wrap items-center border-t border-lighter-grey p-2 first-of-type:border-t-2 md:px-4">
      <div className="mb-2 basis-full md:mb-0 md:flex-1 md:basis-0">{label}</div>
      {hrefs.map((href) => (
        <div key={href} className="flex-1 text-center">
          <Button asChild size="small">
            <a href={href} target="_blank" rel="noopener noreferrer">Download</a>
          </Button>
        </div>
      ))}
    </div>
  );
}

export function CoverComparison() {
  return (
    <Section className="bg-light-grey py-24">
      <SectionIntro title={data.title} />

      <div className="flex bg-lighter-grey py-4">
        <div className="hidden md:block md:flex-1" />
        {data.columns.map((column) => (
          <div key={column.name} className="flex-1 text-center">
            <div className="font-bold">{column.name}</div>
            {column.badge && <div className="mt-1 block text-xs font-normal text-primary">{column.badge}</div>}
          </div>
        ))}
      </div>

      {coverComparisonRows.map((row) =>
        "divider" in row ? (
          <div key={row.divider} className="flex items-center bg-lighter-grey p-2 text-left md:px-4">
            <span className="text-xs uppercase">{row.divider}</span>
          </div>
        ) : (
          <BenefitRow key={row.label} row={row} />
        )
      )}

      <div>
        {data.documents.map((document) => <DocumentRow key={document.label} {...document} />)}
      </div>

      <div className="mt-8 text-sm font-normal">
        <p>{data.summary}</p>
        <h4 className="mt-4 text-sm font-bold md:text-sm">{data.coolingOff.title}</h4>
        <p>{data.coolingOff.body}</p>
      </div>

      <div className="mt-8 border-t border-lighter-grey pt-8 text-sm">
        <svg className="-mt-1 mr-2 inline-block size-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
          <path d="M12 8V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <circle cx="12" cy="16" r="1" fill="currentColor" />
        </svg>
        <h4 className="inline-block font-bold">{data.headsUp.title}</h4>
        <p>{data.headsUp.body}</p>
        <table className="mt-4 w-full">
          <tbody>
            {data.headsUp.rows.map(([term, description]) => (
              <tr key={term}>
                <td className="border border-lighter-grey p-2 font-bold">{term}</td>
                <td className="border border-lighter-grey p-2">{description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Section>
  );
}
