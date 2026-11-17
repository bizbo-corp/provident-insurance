"use client";

import { CarFront, Download, FileText, Gift, HandHeart, PackagePlus, Scale } from "lucide-react";
import { CoverBenefitLabel, CoverCellMark, type BenefitRowData } from "@/components/sections/cover-benefit";
import { coverCategories, coverComparison } from "@/content/car-insurance";
import { coverComparisonRows } from "@/content/cover-comparison-rows";
import { cn } from "@/lib/utils";

const CATEGORY_ICONS = {
  car: CarFront,
  scale: Scale,
  gift: Gift,
  heart: HandHeart,
  package: PackagePlus,
};

const benefitRows = coverComparisonRows.filter((row): row is BenefitRowData => "label" in row);

const findRow = (label: string) => {
  const row = benefitRows.find((candidate) => candidate.label === label);
  if (!row) throw new Error(`No comparison row called "${label}"`);
  return row;
};

/** Label on the left, every tick in columns on the right, on the same line. */
// On phones the Comprehensive column is a little wider so its name fits on one line. Between large phones
// and small tablets the cover columns stay narrow, so the benefit names keep most of the width.
const ROW_GRID =
  "grid grid-cols-[minmax(0,1fr)_5.75rem_3.75rem_3.75rem] sm:grid-cols-[minmax(0,1fr)_repeat(3,6.5rem)] md:grid-cols-[minmax(0,1fr)_repeat(3,7.5rem)] lg:grid-cols-[minmax(0,1fr)_repeat(3,10rem)] xl:grid-cols-[minmax(0,1fr)_repeat(3,12rem)]";

/** Ticked cells share a faint brand pink. Headings stay neutral. */
const HIGHLIGHT = "bg-[#fdf1f0]";
/** A thin rule between the three cover columns, so each reads as its own column. */
const COLUMN_RULE = "border-l border-lighter-grey/60";

/** Empty cells under each cover in a grey heading strip, keeping the column rules unbroken. */
function HeadingCells() {
  return coverComparison.columns.map((column, index) => (
    <div key={column.name} className={cn(index > 0 && COLUMN_RULE)} />
  ));
}

export function CoverComparisonGrouped() {
  return (
    // On phones the table runs edge to edge, giving the benefit names about 60px more room.
    <div className="-mx-8 overflow-hidden border-y border-lighter-grey bg-white md:mx-0 md:rounded-xl md:border-x">
      <div className={cn(ROW_GRID, "border-b border-lighter-grey bg-white")}>
        <div />
        {coverComparison.columns.map((column, index) => (
          <div
            key={column.name}
            className={cn(
              "flex flex-col justify-center px-1 py-4 text-center md:px-2",
              index > 0 && COLUMN_RULE,
              // The most popular cover gets a soft brand tint and a red cap, so it stands out as the pick.
              index === 0 && "border-t-4 border-primary bg-quote-notice"
            )}
          >
            <div className="text-[11px] leading-tight font-bold [overflow-wrap:anywhere] sm:text-xs md:text-sm lg:text-base">{column.name}</div>
            {column.badge && (
              <div className="mt-1 block text-[11px] leading-tight text-dark-grey/70 md:text-xs">{column.badge}</div>
            )}
          </div>
        ))}
      </div>

      {coverCategories.map((category, categoryIndex) => {
        const Icon = CATEGORY_ICONS[category.icon];
        return (
          <div key={category.heading} className={cn("bg-white", categoryIndex > 0 && "border-t border-lighter-grey")}>
            {/* Each category opens with a strip in the category tint (lighter than the page, darker than a row), so groups stand apart. */}
            <div className={cn(ROW_GRID, "bg-category-tint")}>
              <h3 className="flex items-center gap-2 px-4 py-3 text-xs leading-tight uppercase">
                <Icon className="size-5 shrink-0 text-primary" aria-hidden="true" />
                {category.heading}
              </h3>
              <HeadingCells />
            </div>
            {category.rows.map((label) => {
              const row = findRow(label);
              return (
                <div key={label} className={cn(ROW_GRID, "border-t border-lighter-grey/60")}>
                  <div className="self-center py-3 pr-2 pl-4 text-sm font-bold md:py-4 md:pl-6 md:text-base lg:pl-12">
                    <CoverBenefitLabel row={row} enhanced />
                  </div>
                  {row.cells.map((cell, index) => (
                    <div
                      key={index}
                      className={cn(
                        "flex flex-col items-center justify-center gap-1 px-1 py-2 text-center",
                        index > 0 && COLUMN_RULE,
                        // Every ticked cell shares the pink, so what each cover includes reads at a glance.
                        cell.included && HIGHLIGHT
                      )}
                    >
                      {/* On phones every note wraps at the same width, so "Optional extra" breaks onto two lines in every column. */}
                      <CoverCellMark cell={cell} enhanced noteClassName="mx-auto max-w-[4.75em] sm:max-w-none sm:whitespace-nowrap" />
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        );
      })}

      {/* Policy documents sit inside the table, so each download lines up under its cover. */}
      <div className="border-t border-lighter-grey bg-white">
        <div className={cn(ROW_GRID, "bg-category-tint")}>
          <h3 className="flex items-center gap-2 px-4 py-3 text-xs leading-tight uppercase">
            <FileText className="size-5 shrink-0 text-primary" aria-hidden="true" />
            Policy documents
          </h3>
          <HeadingCells />
        </div>
        {coverComparison.documents.map((document) => (
          <div key={document.label} className={cn(ROW_GRID, "border-t border-lighter-grey/60")}>
            <div className="self-center py-3 pr-2 pl-4 text-sm font-bold md:py-4 md:pl-6 md:text-base lg:pl-12">{document.label}</div>
            {document.hrefs.map((href, index) => (
              <div key={href} className={cn("flex items-center justify-center px-1", index > 0 && COLUMN_RULE)}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[11px] font-bold text-dark-grey underline underline-offset-4 hover:text-primary hover:opacity-100 md:text-sm"
                >
                  <Download className="hidden size-4 md:block" aria-hidden="true" />
                  PDF
                  <span className="sr-only">
                    : {document.label}, {coverComparison.columns[index]?.name} (opens in a new tab)
                  </span>
                </a>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
