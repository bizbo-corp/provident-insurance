/**
 * The quote steps, in live order. Names and "next" labels come from the live
 * app, and `progress` is how full the live (before) bar is on that step.
 */
/**
 * The "after" progress: three stages, sized by how many questions each asks,
 * so Car (the longest) takes the most room. The quote is complete after Cover,
 * so contact details and payment aren't a stage.
 */
export const QUOTE_GROUPS = [
  { label: "Car", questions: 8 },
  { label: "Driver", questions: 7 },
  { label: "Cover Options", questions: 4 },
] as const;

/**
 * `group` is the stage (3 means past the quote), `offset` the questions in that
 * stage on earlier screens, and `questions` how many this screen asks.
 * The cover choices start filled in, so that stage is complete on arrival.
 */
export const QUOTE_STEPS = [
  { slug: "car", title: "Your Car", icon: "car", group: 0, offset: 0, questions: 8, progress: 15, nextLabel: "Next: Insured Type" },
  { slug: "insured-type", title: "Insured Type", icon: "person", group: 1, offset: 0, questions: 1, progress: 29, nextLabel: "Next: Driver Details" },
  { slug: "details", title: "The Driver", icon: "person", group: 1, offset: 1, questions: 6, progress: 43, nextLabel: "Next: The Price" },
  { slug: "cover", title: "Quote", icon: "cart", group: 2, offset: 0, questions: 4, progress: 58, nextLabel: "" },
  { slug: "contact", title: "Contact Details", icon: "person", group: 3, offset: 0, questions: 0, progress: 72, nextLabel: "" },
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
