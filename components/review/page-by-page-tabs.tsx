"use client";

import { useEffect, useState } from "react";
import { ShotCompare } from "@/components/review/shot-compare";
import type { InitiativePage } from "@/content/review";

/**
 * One tab per page an initiative touches. A link to `#<initiative>-<page>`
 * (as in the side navigation) opens that tab and scrolls to it.
 */
export function PageTabs({ initiativeId, pages }: { initiativeId: string; pages: InitiativePage[] }) {
  const [active, setActive] = useState(pages[0].id);
  const anchor = (pageId: string) => `${initiativeId}-${pageId}`;

  useEffect(() => {
    const fromHash = () => {
      const match = pages.find((page) => `#${anchor(page.id)}` === window.location.hash);
      if (!match) return;
      setActive(match.id);
      document.getElementById(`${initiativeId}-pages`)?.scrollIntoView();
    };
    fromHash();
    window.addEventListener("hashchange", fromHash);
    return () => window.removeEventListener("hashchange", fromHash);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initiativeId, pages]);

  const page = pages.find((candidate) => candidate.id === active) ?? pages[0];

  return (
    <div id={`${initiativeId}-pages`} className="scroll-mt-6">
      <div role="tablist" aria-label="Pages" className="bz-tabs flex flex-wrap gap-1">
        {pages.map((candidate) => {
          const selected = candidate.id === page.id;
          return (
            <button
              key={candidate.id}
              id={`${anchor(candidate.id)}-tab`}
              type="button"
              role="tab"
              aria-selected={selected}
              aria-controls={`${anchor(candidate.id)}-panel`}
              onClick={() => {
                setActive(candidate.id);
                history.replaceState(null, "", `#${anchor(candidate.id)}`);
              }}
              className="bz-tab"
            >
              {candidate.label}
            </button>
          );
        })}
      </div>

      <div
        id={`${anchor(page.id)}-panel`}
        role="tabpanel"
        aria-labelledby={`${anchor(page.id)}-tab`}
        className="space-y-6 pt-6"
      >
        <div className="flex flex-wrap items-start justify-between gap-4">
          <p className="bz-lede max-w-xl">{page.summary}</p>
          <div className="flex flex-wrap gap-2">
            <a href={`${page.path}?v=before`} target="_blank" rel="noopener noreferrer" className="bz-btn bz-btn--ghost bz-btn--sm">
              Open before <span className="bz-arrow" aria-hidden="true">↗</span>
            </a>
            <a href={`${page.path}?v=after`} target="_blank" rel="noopener noreferrer" className="bz-btn bz-btn--ghost bz-btn--sm">
              Open after <span className="bz-arrow" aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
        <ShotCompare key={page.id} shots={page.shots} />
      </div>
    </div>
  );
}
