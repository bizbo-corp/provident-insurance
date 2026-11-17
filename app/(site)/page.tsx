import { FaqSection } from "@/components/sections/faq-section";
import { HelpStrip } from "@/components/sections/help-strip";
import { Hero } from "@/components/sections/hero";
import { IconCardGrid } from "@/components/sections/icon-card-grid";
import { ProductCards } from "@/components/sections/product-cards";
import { PromoBanner } from "@/components/sections/promo-banner";
import { GoogleReviews } from "@/components/sections/google-reviews";
import { Testimonials } from "@/components/sections/testimonials";
import { Feature } from "@/components/variants/variant-provider";
import { homeReviews, googleRating } from "@/content/google-reviews";
import { homeFaqs } from "@/content/faqs";
import { homeHero, homeProducts } from "@/content/home";
import { homePromo, testimonials, whyChooseUs, whyChooseUsIntro } from "@/content/shared";

export default function HomePage() {
  return (
    <>
      <Hero hero={homeHero} reviews={homeReviews} rating={googleRating} />
      <PromoBanner promo={homePromo} />
      <ProductCards title="How we can help." products={homeProducts} />
      <IconCardGrid title="Why choose us" intro={whyChooseUsIntro} cards={whyChooseUs} />
      <Feature id="google-reviews" before={<Testimonials testimonials={testimonials} />}>
        <GoogleReviews reviews={homeReviews} rating={googleRating} />
      </Feature>
      <HelpStrip />
      <FaqSection faqs={homeFaqs} />
    </>
  );
}
