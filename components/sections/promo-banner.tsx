import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/layout/reveal";
import { Button } from "@/components/ui/button";
import type { Promo } from "@/content/types";

export function PromoBanner({ promo }: { promo: Promo }) {
  return (
    <div className="bg-primary-dark py-14 text-white">
      <Container>
        <Reveal className="mx-auto grid max-w-3xl grid-cols-1 items-center gap-8 lg:grid-cols-[1fr_290px] lg:gap-24">
          <div>
            <h2 className="section-heading mb-8">{promo.title}</h2>
            <p>
              <strong>{promo.lead}</strong> {promo.leadSuffix}
            </p>
            <p>{promo.body}</p>
            <Button asChild variant="white" className="mt-8">
              <Link href={promo.ctaHref}>{promo.ctaLabel}</Link>
            </Button>
            <a href={promo.detailsHref} className="mt-8 block text-sm opacity-90">
              {promo.detailsLabel}
            </a>
          </div>
          <div>
            <Image src={promo.image} alt="" width={570} height={375} className="h-auto w-full" />
          </div>
        </Reveal>
      </Container>
    </div>
  );
}

export function PromoStrip({ text, linkLabel, href }: { text: string; linkLabel: string; href: string }) {
  return (
    <div className="bg-primary-dark px-4 py-3 text-center text-sm font-bold text-white">
      {text} <a href={href} target="_blank" rel="noopener noreferrer">{linkLabel}</a>
    </div>
  );
}
