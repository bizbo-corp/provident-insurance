import { DuotoneTick, OptionalBadge } from "@/components/review/badges";
import { LightboxImage } from "@/components/review/lightbox";
import { FeedbackControl } from "@/components/review/feedback";
import { ScoreMeter } from "@/components/review/score-meter";
import { PageTabs } from "@/components/review/page-by-page-tabs";
import { type Initiative } from "@/content/review";
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

      {(initiative.proposal || initiative.wireframe) && (
        <div className={cn("bz-cell grid", initiative.wireframe && "md:grid-cols-[1fr_minmax(0,22rem)]")}>
          {initiative.proposal && (
            <div className="p-5 md:p-6">
              <h2 className="bz-eyebrow">From the proposal</h2>
              <blockquote className="bz-quote mt-3 leading-relaxed">“{initiative.proposal}”</blockquote>
            </div>
          )}
          {initiative.wireframe && (
            <figure className="border-t border-[var(--hairline)] p-5 md:border-t-0 md:border-l md:p-6">
              <LightboxImage
                src={initiative.wireframe.src}
                alt={initiative.wireframe.alt}
                caption="Wireframe from the proposal"
                thumbClassName="max-h-64 object-contain object-top"
              />
              <figcaption className="bz-muted mt-2 text-xs">Wireframe from the proposal</figcaption>
            </figure>
          )}
        </div>
      )}

      {/* One box: the problem on the left, what changed on the right, split by a hairline. */}
      <div className="bz-cell grid md:grid-cols-[1fr_1.4fr]">
        <div className="p-5 md:p-6">
          <h2 className="bz-eyebrow bz-warn">The problem</h2>
          <p className="mt-3 leading-relaxed">{initiative.problem}</p>
        </div>
        <div className="border-t border-[var(--hairline)] p-5 md:border-t-0 md:border-l md:p-6">
          <h2 className="bz-eyebrow">What changed</h2>
          <ul className="mt-3 space-y-3 leading-relaxed">
            {initiative.change.map((item) => {
              const text = typeof item === "string" ? item : item.text;
              return (
                <li key={text} className="flex gap-3">
                  <DuotoneTick className="mt-0.5 shrink-0" />
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
        <h2 className="bz-eyebrow mb-4">Where it changes</h2>
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
