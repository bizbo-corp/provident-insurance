import Link from "next/link";
import { LINK } from "@/components/review/badges";
import { ScoreMeter } from "@/components/review/score-meter";
import { StepArt, type StepArtKind } from "@/components/review/step-art";
import { FIGMA_SITE_URL, initiatives, PACKAGE_NAME } from "@/content/review";

const NEXT_STEPS: { step: string; title: string; text: string; href: string; external?: boolean; art: StepArtKind }[] = [
  {
    step: "01",
    title: "Start reviewing",
    text: "Go through each change, one at a time.",
    href: `/review/${initiatives[0].id}`,
    art: "review",
  },
  {
    step: "02",
    title: "Try the preview",
    text: "Click through the updated site yourself.",
    href: "/?v=after",
    external: true,
    art: "preview",
  },
  {
    step: "03",
    title: "View in Figma",
    text: "See the same changes as designs.",
    href: FIGMA_SITE_URL,
    external: true,
    art: "figma",
  },
];

const score = (value?: number) =>
  value === undefined ? (
    <span className="bz-muted">–</span>
  ) : (
    <span className="inline-flex items-center justify-end gap-3">
      <ScoreMeter value={value} />
      {value.toFixed(1)}
    </span>
  );

export default function ReviewOverviewPage() {
  return (
    <div className="space-y-10">
      <div>
        <p className="bz-eyebrow">Provident Insurance / {PACKAGE_NAME} package</p>
        <h1 className="bz-h1 mt-3">Prioritised initiatives</h1>
        <p className="bz-lede mt-4 max-w-2xl">
          Compare each change before and after, then approve it or ask for changes.
        </p>
      </div>

      <div>
        <div className="bz-panel overflow-x-auto">
          <table className="bz-table w-full text-left text-sm">
            <thead>
              <tr>
                <th className="px-4 py-3 align-top">No.</th>
                <th className="px-4 py-3 align-top">Initiative</th>
                <th className="px-4 py-3 text-right align-top">Impact</th>
                <th className="px-4 py-3 text-right align-top">
                  Effort<span className="bz-hint">lower is easier</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {initiatives.map((initiative) => (
                <tr key={initiative.id}>
                  <td className="bz-mono bz-muted px-4 py-4 align-top">{initiative.short}</td>
                  <td className="px-4 py-4">
                    <Link href={`/review/${initiative.id}`} className={LINK}>{initiative.title}</Link>
                    <span className="bz-muted mt-1 block text-xs">
                      {initiative.pages.map((page) => page.label).join(", ")}
                    </span>
                  </td>
                  <td className="bz-mono px-4 py-4 text-right align-top">{score(initiative.scores?.impact)}</td>
                  <td className="bz-mono px-4 py-4 text-right align-top">{score(initiative.scores?.effort)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="bz-muted mt-3 text-sm">Impact and effort are the ratings from the proposal, out of 5. Higher impact is better; lower effort is easier. Sorted by impact, then effort.</p>
      </div>

      <div>
        <p className="bz-eyebrow mb-4">Read / Try / Compare</p>
        <ul className="grid gap-4 md:grid-cols-3">
          {NEXT_STEPS.map((step) => (
            <li key={step.title}>
              <a
                href={step.href}
                {...(step.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="bz-card bz-card--raised flex h-full flex-col overflow-hidden"
              >
                <StepArt kind={step.art} />
                <span className="bz-figlabel px-5 pt-4">Step {step.step}</span>
                <span className="bz-h3 flex items-center justify-between gap-2 px-5 pt-1">
                  {step.title}
                  <span className={step.external ? "bz-arrow" : "bz-arrow bz-arrow--fwd"} aria-hidden="true">
                    {step.external ? "↗" : "→"}
                  </span>
                </span>
                <span className="bz-muted mt-1 px-5 pb-5 text-sm">{step.text}</span>
                {step.external && <span className="sr-only">(opens in a new tab)</span>}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
