"use client";

import { ShotCompare } from "@/components/review/shot-compare";
import type { InitiativePage } from "@/content/review";

/**
 * Every example an initiative has, in one list with a single screen-size switch.
 * Each page gets one pair of links to open it, beside the switch. Where two pages
 * share a caption, the page name goes in front so they can be told apart.
 */
export function PageTabs({ initiativeId, pages }: { initiativeId: string; pages: InitiativePage[] }) {
  const captions = pages.flatMap((page) => page.shots.map((shot) => shot.caption));
  const duplicated = new Set(captions.filter((caption, index) => captions.indexOf(caption) !== index));
  return (
    <div id={`${initiativeId}-pages`} className="scroll-mt-6">
      <ShotCompare
        spacious
        shots={pages.flatMap((page) =>
          page.shots.map((shot) => (duplicated.has(shot.caption) ? { ...shot, caption: `${page.label}: ${shot.caption}` } : shot))
        )}
        toolbar={
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            {pages.map((page) => (
              <div key={page.id} className="flex flex-wrap items-center gap-2">
                {pages.length > 1 && <span className="bz-muted text-sm">{page.label}</span>}
                <a href={`${page.path}?v=before`} target="_blank" rel="noopener noreferrer" className="bz-btn bz-btn--ghost bz-btn--sm">
                  Before<span className="sr-only"> ({page.label}, opens the live version)</span>{" "}
                  <span className="bz-arrow" aria-hidden="true">
                    ↗
                  </span>
                </a>
                <a href={`${page.path}?v=after`} target="_blank" rel="noopener noreferrer" className="bz-btn bz-btn--primary bz-btn--sm">
                  After<span className="sr-only"> ({page.label}, opens version 2)</span>{" "}
                  <span className="bz-arrow" aria-hidden="true">
                    ↗
                  </span>
                </a>
              </div>
            ))}
          </div>
        }
      />
    </div>
  );
}
