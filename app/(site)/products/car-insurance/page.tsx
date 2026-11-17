import type { Metadata } from "next";
import { CoverComparison } from "@/components/sections/cover-comparison";
import { ClosedPlans } from "@/components/sections/closed-plans";
import { FaqSection } from "@/components/sections/faq-section";
import { HelpStrip } from "@/components/sections/help-strip";
import { Hero } from "@/components/sections/hero";
import { IconCardGrid } from "@/components/sections/icon-card-grid";
import { PromoBanner, PromoStrip } from "@/components/sections/promo-banner";
import { GoogleReviews } from "@/components/sections/google-reviews";
import { Testimonials } from "@/components/sections/testimonials";
import { Feature } from "@/components/variants/variant-provider";
import { TwoColumnBlock } from "@/components/sections/two-column-block";
import {
  carHero,
  closedPlans,
  coverLevels,
  coverLevelsIntro,
  reducePremium,
  roadside,
} from "@/content/car-insurance";
import { googleRating } from "@/content/google-reviews";
import { visibleTestimonials } from "@/lib/testimonial-store";
import { carInsuranceFaqs } from "@/content/faqs";
import {
  carPromo,
  promoStrip,
  testimonials,
  whyChooseUs,
  whyChooseUsIntro,
} from "@/content/shared";

export const metadata: Metadata = {
  title: "Car Insurance Quote | Provident Insurance",
  description:
    "Comprehensive Car Insurance in NZ, with fair pricing, no-surprises claims and local support. Get a quote online in around two minutes.",
};

export default async function CarInsurancePage() {
  // Testimonials unticked on /review/testimonials are left out straight away.
  const reviews = await visibleTestimonials("car");
  return (
    <>
      <PromoStrip {...promoStrip} />
      <Hero hero={carHero} reviews={reviews} rating={googleRating} />
      <PromoBanner promo={carPromo} />
      <IconCardGrid title={coverLevelsIntro.title} intro={coverLevelsIntro.body} cards={coverLevels} />
      <CoverComparison />
      <IconCardGrid title={reducePremium.title} cards={reducePremium.cards} />
      <TwoColumnBlock {...roadside} />
      <IconCardGrid title="Why choose us" intro={whyChooseUsIntro} cards={whyChooseUs.slice(0, 3)} />
      <Feature id="google-reviews" before={<Testimonials testimonials={testimonials} />}>
        {reviews.length > 0 && <GoogleReviews reviews={reviews} rating={googleRating} />}
      </Feature>
      <FaqSection faqs={carInsuranceFaqs} />
      <ClosedPlans {...closedPlans} />
      <HelpStrip />
    </>
  );
}
