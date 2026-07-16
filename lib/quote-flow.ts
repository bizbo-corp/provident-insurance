/**
 * Single source of truth for the quote wizard. Both the router (one route per
 * slug) and the stepper read from this array, so reordering or inserting a step
 * here updates navigation and the progress display together.
 */
export const QUOTE_STEPS = [
  { slug: "car", label: "Car", title: "Your Car" },
  { slug: "details", label: "Driver", title: "The Driver" },
  { slug: "cover", label: "Cover", title: "Your Cover" },
  { slug: "payment", label: "Payment", title: "Payment" },
] as const;

export type QuoteStep = (typeof QUOTE_STEPS)[number];
export type QuoteStepSlug = QuoteStep["slug"];

export const QUOTE_STEP_COUNT = QUOTE_STEPS.length;

export function quoteStepHref(slug: QuoteStepSlug) {
  return `/quote/${slug}` as const;
}

/**
 * Maps a pathname like `/quote/car` onto its index in QUOTE_STEPS.
 * Returns -1 when the path isn't a step route.
 */
export function quoteStepIndexFromPathname(pathname: string) {
  const slug = pathname.split("/").filter(Boolean)[1];
  return QUOTE_STEPS.findIndex((step) => step.slug === slug);
}

export function nextQuoteStep(slug: QuoteStepSlug): QuoteStep | undefined {
  const index = QUOTE_STEPS.findIndex((step) => step.slug === slug);
  return index === -1 ? undefined : QUOTE_STEPS[index + 1];
}

export function previousQuoteStep(slug: QuoteStepSlug): QuoteStep | undefined {
  const index = QUOTE_STEPS.findIndex((step) => step.slug === slug);
  return index <= 0 ? undefined : QUOTE_STEPS[index - 1];
}
