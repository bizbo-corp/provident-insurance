/**
 * The quote steps, in live order. Names and "next" labels come from the live
 * app, and `progress` is how full its bar is on that step.
 */
export const QUOTE_STEPS = [
  { slug: "car", title: "Your Car", icon: "car", progress: 15, nextLabel: "Next: Insured Type" },
  { slug: "insured-type", title: "Insured Type", icon: "person", progress: 29, nextLabel: "Next: Driver Details" },
  { slug: "details", title: "The Driver", icon: "person", progress: 43, nextLabel: "Next: The Price" },
  { slug: "cover", title: "Quote", icon: "cart", progress: 58, nextLabel: "" },
  { slug: "contact", title: "Contact Details", icon: "person", progress: 72, nextLabel: "" },
] as const;

export type QuoteStep = (typeof QUOTE_STEPS)[number];
export type QuoteStepSlug = QuoteStep["slug"];

export function quoteStepHref(slug: QuoteStepSlug) {
  return `/quote/${slug}` as const;
}

function stepIndex(slug: QuoteStepSlug) {
  return QUOTE_STEPS.findIndex((step) => step.slug === slug);
}

export function quoteStep(slug: QuoteStepSlug): QuoteStep {
  return QUOTE_STEPS[stepIndex(slug)];
}

export function quoteStepFromPathname(pathname: string): QuoteStep {
  const slug = pathname.split("/").filter(Boolean)[1];
  return QUOTE_STEPS.find((step) => step.slug === slug) ?? QUOTE_STEPS[0];
}

export function nextQuoteStep(slug: QuoteStepSlug): QuoteStep {
  return QUOTE_STEPS[stepIndex(slug) + 1];
}

export function previousQuoteStep(slug: QuoteStepSlug): QuoteStep {
  return QUOTE_STEPS[stepIndex(slug) - 1];
}
