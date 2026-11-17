import { PACKAGE_NAME } from "@/content/review";
import { cn } from "@/lib/utils";

export function OptionalBadge({ className, compact }: { className?: string; compact?: boolean }) {
  return (
    <span
      title={`Not part of the agreed ${PACKAGE_NAME} package. Provident can choose to include it or leave it out.`}
      className={cn("bz-tag bz-tag--optional shrink-0", className)}
    >
      <span aria-hidden="true">+</span>
      {compact ? "Optional" : "Optional extra"}
    </span>
  );
}

export function InPackageBadge() {
  return <span className="bz-tag">In package</span>;
}

export const LINK = "bz-link";

/** A small line-art tick, drawn rather than taken from an icon set. */
export function Tick({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" className={cn("linework size-4", className)} aria-hidden="true">
      <path d="M3 8.5 6.5 12 13 4.5" />
    </svg>
  );
}

/** Lichen tick in a soft Lichen disc, for "What changes" lists. Drawn, not from an icon set. */
export function DuotoneTick({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" className={cn("size-5", className)} aria-hidden="true">
      <circle cx="10" cy="10" r="10" fill="var(--lichen)" fillOpacity="0.2" />
      <path d="M6 10.4 8.7 13 14 7.2" fill="none" stroke="var(--lichen)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
