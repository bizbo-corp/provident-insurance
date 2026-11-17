import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { InitiativeDetail } from "@/components/review/initiative-detail";
import { initiatives } from "@/content/review";

type Props = { params: Promise<{ id: string }> };

export function generateStaticParams() {
  return initiatives.map((initiative) => ({ id: initiative.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const initiative = initiatives.find((candidate) => candidate.id === id);
  return { title: initiative ? `${initiative.short} ${initiative.title} | Provident version 2 review` : "Not found" };
}

export default async function InitiativePage({ params }: Props) {
  const { id } = await params;
  const index = initiatives.findIndex((initiative) => initiative.id === id);
  if (index === -1) notFound();
  const previous = initiatives[index - 1];
  const next = initiatives[index + 1];

  return (
    <div className="space-y-10">
      <InitiativeDetail initiative={initiatives[index]} />
      <nav aria-label="Initiatives" className="bz-rule-top flex flex-wrap items-center justify-between gap-4 pt-8">
        <Link
          href={previous ? `/review/${previous.id}` : "/review"}
          aria-label={previous ? `Back to ${previous.short} ${previous.title}` : "Back to the overview"}
          className="bz-btn bz-btn--ghost"
        >
          <span className="bz-arrow" aria-hidden="true">←</span>
          Back
        </Link>
        <span className="bz-guides bz-guides--sm inline-flex">
          <Link href={next ? `/review/${next.id}` : "/review/testimonials"} className="bz-btn bz-btn--primary">
            {next ? `Next: ${next.short} ${next.title}` : "Next: Testimonials"}
            <span className="bz-arrow bz-arrow--fwd" aria-hidden="true">→</span>
          </Link>
        </span>
      </nav>
    </div>
  );
}
