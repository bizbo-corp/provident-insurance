import { carReviews, homeReviews } from "@/content/google-reviews";
import type { GoogleReview } from "@/content/types";

/** The site pages whose testimonials can be switched on and off from the review site. */
export const TESTIMONIAL_PAGES = { home: homeReviews, car: carReviews } as const;
export type TestimonialPage = keyof typeof TESTIMONIAL_PAGES;

/** "home:zarina-m", one id per testimonial per page. */
export function testimonialId(page: TestimonialPage, review: GoogleReview) {
  const slug = review.author.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  return `${page}:${slug}`;
}

export const ALL_TESTIMONIAL_IDS = new Set(
  (Object.keys(TESTIMONIAL_PAGES) as TestimonialPage[]).flatMap((page) =>
    TESTIMONIAL_PAGES[page].map((review) => testimonialId(page, review))
  )
);
