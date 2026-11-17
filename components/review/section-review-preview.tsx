"use client";

import { useState } from "react";
import { ReviewCard } from "@/components/sections/google-reviews";
import type { GoogleReview } from "@/content/types";

/**
 * How one testimonial looks in the Google reviews section further down the page, using
 * the site's own card on the section's light grey. Starts open so the full wording shows;
 * "Show less" folds it to five lines, as long reviews start on the site.
 */
export function SectionReviewPreview({
  review,
  index,
  total,
}: {
  review: GoogleReview;
  index: number;
  total: number;
}) {
  const [expanded, setExpanded] = useState(true);
  return (
    <div className="bz-preview relative overflow-hidden rounded-[12px] bg-light-grey px-4 py-6 font-sans sm:px-8 xl:px-4">
      <div className="mx-auto max-w-2xl">
        <ReviewCard
          review={review}
          position={index + 1}
          total={total}
          expanded={expanded}
          onToggle={() => setExpanded((value) => !value)}
        />
      </div>
      <span className="bz-preview__hidden">Hidden from the site</span>
    </div>
  );
}
