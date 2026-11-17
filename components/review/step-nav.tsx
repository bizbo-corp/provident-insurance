import Link from "next/link";
import { neighbours } from "@/content/review";

/** Back and Next at the foot of a review page, following REVIEW_SEQUENCE. */
export function StepNav({ href }: { href: string }) {
  const { previous, next } = neighbours(href);
  return (
    <nav aria-label="Review pages" className="bz-rule-top flex flex-wrap items-center justify-between gap-4 pt-8">
      <Link href={previous.href} aria-label={`Back to ${previous.label}`} className="bz-btn bz-btn--ghost">
        <span className="bz-arrow" aria-hidden="true">←</span>
        Back
      </Link>
      {next && (
        <span className="bz-guides bz-guides--sm inline-flex">
          <Link href={next.href} className="bz-btn bz-btn--primary">
            Next: {next.label}
            <span className="bz-arrow bz-arrow--fwd" aria-hidden="true">→</span>
          </Link>
        </span>
      )}
    </nav>
  );
}
