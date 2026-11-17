import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { StepNav } from "@/components/review/step-nav";
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

  return (
    <div className="space-y-10">
      <InitiativeDetail initiative={initiatives[index]} />
      <StepNav href={`/review/${id}`} />
    </div>
  );
}
