import { QUOTE_HREF, siteHref } from "@/content/site";
import type { IconCard, Promo, Testimonial } from "@/content/types";

const img = (name: string) => `/images/${name}`;

export const whyChooseUsIntro =
  "There are many great reasons to choose Provident Insurance, here's just a few:";

/** Shared by the homepage (all four) and the car page (first three). */
export const whyChooseUs: IconCard[] = [
  {
    icon: img("driven_by_care.svg"),
    alt: "car insurance customer care icon",
    title: "Driven by care",
    body: ["A local support team that goes the extra mile when you need it most. Know you’re in safe hands."],
  },
  {
    icon: img("fair_pricing.svg"),
    alt: "best value car insurance rates",
    title: "Fair pricing, no surprises",
    body: ["Clear cover, straightforward pricing and simple claims."],
  },
  {
    icon: img("kiwi_drivers_and_families.svg"),
    alt: "provident kiwi insurance icon",
    title: "For Kiwi drivers and families",
    body: ["Confidence wherever the road takes you. We're the car insurance specialists - it's what we do. We’ve already helped more than 250,000 Kiwi drivers over the years."],
  },
  {
    icon: img("icnz-logo-benefit-card-icon.jpg"),
    title: "Member of the Fair Insurance Code",
    body: ["This provides you with assurance that we have high standards of service to our customers."],
  },
];

export const testimonials: Testimonial[] = [
  {
    quote: "Massive thanks to the team at Provident Insurance — honestly such a breeze to deal with. Super helpful, great communication, and really supportive throughout my whole claim. Made the process easy and stress-free. Cheers guys, really appreciate it!",
    author: "Andy",
    date: "August 2025",
  },
  {
    quote: "It was so easy to deal with the claims team. No long phone queues, no trying to get out of the claim. This is why you get insurance, and the way it should work. Nice work.",
    author: "Andrew",
    date: "August 2025",
  },
];

const PROMO_PATH = "/250-prezzy-card-promotion";

const promoBase = {
  title: "Fancy $250?",
  leadSuffix: "are up for grabs.",
  ctaLabel: "Get a quote",
  ctaHref: QUOTE_HREF,
  detailsLabel: "See full offer details",
  detailsHref: siteHref(PROMO_PATH),
  image: img("prezzy_card.png"),
};

/** The two pages word this differently on live, so both variants are kept as is. */
export const homePromo: Promo = {
  ...promoBase,
  lead: "10 x $250 Virtual Prezzy® Cards",
  body: "Purchase a new car insurance policy by 31 December 2026 and you'll automatically be in the draw.",
};

export const carPromo: Promo = {
  ...promoBase,
  lead: "10 × $250 Virtual Prezzy® Cards",
  body: "Purchase a new car insurance policy by 31 December 2026 and you’ll automatically be in the draw.",
};

export const promoStrip = {
  text: "Be in to WIN a $250 Prezzy® Card with any new car insurance policy.",
  linkLabel: "Learn More",
  href: siteHref(PROMO_PATH),
};
