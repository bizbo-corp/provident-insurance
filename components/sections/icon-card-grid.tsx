import Image from "next/image";
import { Section, SectionIntro } from "@/components/sections/section";
import type { IconCard } from "@/content/types";

export function IconCardGrid({
  title,
  intro,
  cards,
}: {
  title: string;
  intro?: string;
  cards: IconCard[];
}) {
  return (
    <Section>
      <SectionIntro title={title} body={intro} />
      <div className="grid grid-cols-1 justify-items-center gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((card) => (
          <div key={card.title} className="w-full max-w-sm rounded-card p-4 text-center shadow-md xl:p-8">
            <Image
              src={card.icon}
              alt={card.alt ?? ""}
              width={64}
              height={64}
              className="mx-auto size-16 object-contain"
            />
            <h4 className="my-4 text-lg font-bold text-primary-dark">{card.title}</h4>
            {card.body?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </div>
        ))}
      </div>
    </Section>
  );
}
