import { FaqSection } from "@/components/sections/faq-section";
import { HelpStrip } from "@/components/sections/help-strip";
import { Hero } from "@/components/sections/hero";
import { IconCardGrid } from "@/components/sections/icon-card-grid";
import { ProductCards } from "@/components/sections/product-cards";
import { PromoBanner } from "@/components/sections/promo-banner";
import { Testimonials } from "@/components/sections/testimonials";
import { homeFaqs } from "@/content/faqs";
import { homeHero, homeProducts } from "@/content/home";
import { homePromo, testimonials, whyChooseUs, whyChooseUsIntro } from "@/content/shared";

export default function HomePage() {
  return (
    <>
      <Hero hero={homeHero} />
      <PromoBanner promo={homePromo} />
      <ProductCards title="How we can help." products={homeProducts} />
      <IconCardGrid title="Why choose us" intro={whyChooseUsIntro} cards={whyChooseUs} />
      <Testimonials testimonials={testimonials} />
      <HelpStrip />
      <FaqSection faqs={homeFaqs} />
    </>
  );
}
