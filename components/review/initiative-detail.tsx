import { OptionalBadge, Tick } from "@/components/review/badges";
import { FeedbackControl } from "@/components/review/feedback";
import { ScoreMeter } from "@/components/review/score-meter";
import { PageTabs } from "@/components/review/page-by-page-tabs";
import { PACKAGE_NAME, type Initiative } from "@/content/review";
import { cn } from "@/lib/utils";

const SCORE_LABELS = [
  { key: "impact", label: "Impact" },
  { key: "effort", label: "Effort" },
] as const;

/** The proposal's ratings for an initiative, as given in the proposal. */
export function Scores({ scores, className }: { scores: NonNullable<Initiative["scores"]>; className?: string }) {
  return (
    <dl className={cn("bz-panel grid grid-cols-2", className)}>
      {SCORE_LABELS.map(({ key, label }, index) => (
        <div key={key} className={cn("bz-stat px-4 py-3", index > 0 && "border-l border-[var(--hairline)]")}>
          <dt>{label}</dt>
          <dd>{scores[key].toFixed(1)}</dd>
          <ScoreMeter value={scores[key]} className="mt-2" />
          {key === "effort" && <span className="bz-hint mt-1">lower is easier</span>}
        </div>
      ))}
    </dl>
  );
}

export const hasOptionalParts = (initiative: Initiative) =>
  initiative.change.some((item) => typeof item !== "string");

export function InitiativeDetail({ initiative }: { initiative: Initiative }) {
  return (
    <article className="space-y-8">
      <header>
        <p className="bz-eyebrow">{initiative.ref}</p>
        <h1 className="bz-h2 mt-3">{initiative.title}</h1>
        <p className="bz-muted mt-3 text-sm">
          Appears on: {initiative.pages.map((page) => page.label).join(", ")}
        </p>
        {initiative.scores && <Scores scores={initiative.scores} className="mt-6 max-w-sm" />}
      </header>

      {initiative.proposal && (
        <blockquote className="bz-quote max-w-3xl leading-relaxed">
          <span className="bz-eyebrow mb-1 block">From the proposal</span>“{initiative.proposal}”
        </blockquote>
      )}
      {hasOptionalParts(initiative) && (
        <p className="bz-cell bz-cell--dashed flex flex-wrap items-center gap-3 p-4 text-sm leading-relaxed">
          <OptionalBadge />
          <span className="bz-muted">{`Anything marked like this goes beyond the agreed ${PACKAGE_NAME} package. We've included it for you to consider: approve it to keep it, or ask us to leave it out.`}</span>
        </p>
      )}

      <div className="grid items-stretch gap-4 md:grid-cols-[1fr_1.4fr]">
        <div className="bz-cell h-full p-5">
          <h2 className="bz-eyebrow bz-warn">The problem</h2>
          <p className="mt-3 leading-relaxed">{initiative.problem}</p>
        </div>
        <div className="bz-cell h-full p-5">
          <h2 className="bz-eyebrow">What changed</h2>
          <ul className="mt-3 space-y-3 leading-relaxed">
            {initiative.change.map((item) => {
              const text = typeof item === "string" ? item : item.text;
              return (
                <li key={text} className="flex gap-3">
                  <Tick className="mt-1 shrink-0" />
                  <span>
                    {text}
                    {typeof item !== "string" && <OptionalBadge className="ml-2 align-middle" />}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      <section className="bz-guides bz-panel bz-panel--raised p-5 md:p-6">
        <h2 className="bz-eyebrow mb-4">Page by page</h2>
        <PageTabs initiativeId={initiative.id} pages={initiative.pages} />
      </section>

      {initiative.asks && (
        <div className="bz-cell bz-cell--note p-5 text-sm">
          <h2 className="bz-eyebrow bz-note-label">
            <span className="bz-note-mark" aria-hidden="true">i</span>
            Needs your input
          </h2>
          <ul className="mt-3 space-y-2 leading-relaxed">{initiative.asks.map((ask) => <li key={ask}>{ask}</li>)}</ul>
        </div>
      )}

      <FeedbackControl id={`initiative-${initiative.id}`} label={`${initiative.ref}: ${initiative.title}`} />
    </article>
  );
}
