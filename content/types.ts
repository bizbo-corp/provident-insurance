export type Faq = { question: string; answerHtml: string };

export type NavLink = { label: string; href: string; external?: boolean };
export type NavItem = NavLink & { children?: NavLink[] };

export type IconCard = {
  icon: string;
  alt?: string;
  title: string;
  body?: string[];
};

export type ProductCard = { href: string; image: string; title: string; body: string };

export type Testimonial = { quote: string; author: string; date: string };

/** A real Google review. `posted` is the age Google showed when captured; `url` opens the review on Google. */
export type GoogleReview = { quote: string; author: string; posted: string; url: string };

export type GoogleRating = { score: number; count: number; url: string };

export type CoverCell = { included: boolean; note?: string };

export type CoverComparisonRow =
  | { divider: string }
  | { label: string; info: string; cells: CoverCell[] };

export type Hero = {
  image: string;
  title: string;
  subtitle: string;
  ctaLabel: string;
  ctaHref: string;
};

export type Promo = {
  title: string;
  lead: string;
  leadSuffix: string;
  body: string;
  ctaLabel: string;
  ctaHref: string;
  detailsLabel: string;
  detailsHref: string;
  image: string;
};
