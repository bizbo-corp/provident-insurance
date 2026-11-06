import Image from "next/image";
import { Section } from "@/components/sections/section";

export function TwoColumnBlock({
  title,
  lead,
  body,
  image,
}: {
  title: string;
  lead: string;
  body: string[];
  image: string;
}) {
  return (
    <Section className="py-24">
      <div className="grid grid-cols-1 place-items-center gap-8 lg:grid-cols-2">
        <div className="order-last lg:order-1 lg:pr-8">
          <h3 className="mb-4 text-2xl font-bold md:text-4xl">{title}</h3>
          <p><strong>{lead}</strong></p>
          {body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        </div>
        <div className="order-first w-full lg:order-2">
          <Image src={image} alt="" width={1440} height={1080} className="w-full" />
        </div>
      </div>
    </Section>
  );
}
