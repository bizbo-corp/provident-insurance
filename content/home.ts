import { QUOTE_HREF, productLinks } from "@/content/site";
import type { Hero, ProductCard } from "@/content/types";

export const homeHero: Hero = {
  image: "/images/shutterstock_1410313490-hero.jpg",
  title: "Car insurance for Kiwi drivers.",
  subtitle: "Driven by care:  fair pricing, no-surprises claims, local support.",
  ctaLabel: "Get a car insurance quote",
  ctaHref: QUOTE_HREF,
};

const [car, mbi, credit, gap] = productLinks;

export const homeProducts: ProductCard[] = [
  {
    href: car.href,
    title: car.label,
    image: "/images/shutterstock_2600036369-card.jpg",
    body: "Even the most careful drivers can have a bad day. That’s why our car insurance is designed with care, with three levels of cover to help you find the right fit for you and your car.",
  },
  {
    href: mbi.href,
    title: mbi.label,
    image: "/images/home_mbi-card.jpg",
    body: "Buying a new or used vehicle represents a major investment, so it's wise to protect your vehicle against the sudden or unforeseen happening of mechanical or electrical failure.",
  },
  {
    href: credit.href,
    title: credit.label,
    image: "/images/home_cci-card.jpg",
    body: "Borrowing money (credit) has never been more freely available than it is today. It enables us to make choices, to buy the things we want, when we want, and to enjoy life.",
  },
  {
    href: gap.href,
    title: gap.label,
    image: "/images/home_gap-card.jpg",
    body: "If you borrow money to purchase your vehicle and your vehicle suffers a total write-off, the insurance payout can sometimes fall short of the balance outstanding on your loan.",
  },
];
