"use client";

import Image from "next/image";
import Link from "next/link";
import { HeroReviewCard } from "@/components/sections/hero-review-card";
import { Button } from "@/components/ui/button";
import { Feature, useFeature } from "@/components/variants/variant-provider";
import type { GoogleRating, GoogleReview, Hero as HeroData } from "@/content/types";
import { cn } from "@/lib/utils";

export function Hero({
  hero,
  reviews,
  rating,
}: {
  hero: HeroData;
  /** The page's Google reviews for the "after" review card under the hero. */
  reviews?: GoogleReview[];
  rating?: GoogleRating;
}) {
  const socialProof = useFeature("social-proof");
  return (
    <div className="relative">
      <Image
        src={hero.image}
        alt=""
        width={1440}
        height={680}
        priority
        // The review card makes the overlay taller, so give the image room for it.
        className={cn("w-full", socialProof && "object-cover lg:min-h-[760px]")}
      />
      <div className="relative w-full lg:absolute lg:inset-0 lg:z-20 lg:flex lg:items-center">
        <div className="mx-0 lg:container lg:mx-auto lg:p-8">
          <div className={cn("mb-4 w-auto rounded-br-hero bg-primary p-8 lg:max-w-xl", socialProof && "lg:mb-8")}>
            <h1 className="text-2xl font-bold text-white md:text-5xl">{hero.title}</h1>
            <div className="mt-4 whitespace-pre-wrap text-white">{hero.subtitle}</div>
            <div className="mt-8">
              <Button asChild variant="white" size="wide" className="sm:mr-2">
                <Link href={hero.ctaHref}>{hero.ctaLabel}</Link>
              </Button>
            </div>
          </div>
          <Feature id="social-proof">
            <HeroReviewCard reviews={reviews} rating={rating} />
          </Feature>
        </div>
      </div>
    </div>
  );
}
