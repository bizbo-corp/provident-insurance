"use client";

import useEmblaCarousel from "embla-carousel-react";
import { useEffect, useRef, useState } from "react";
import {
  GOOGLE_REVIEWS_ID,
  GoogleMark,
  readingTime,
  Stars,
  usePrefersReducedMotion,
} from "@/components/sections/google-reviews";
import { googleRating, homeReviews } from "@/content/google-reviews";
import type { GoogleRating, GoogleReview } from "@/content/types";
import { useFeature } from "@/components/variants/variant-provider";
import { cn } from "@/lib/utils";

/**
 * Proposal item 2: the page's reviews, moved up beneath the hero CTA, with the
 * overall Google rating combined into the foot of the same card. Same card language
 * as GoogleReviews, in a compact size: no wider than half the red panel on desktop.
 */
const easeInOutCubic = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2;

/**
 * Glide down to the full Google reviews section with an ease-in-out curve, then move focus there.
 * With reduced motion it jumps straight there.
 */
function scrollToReviews(reducedMotion: boolean) {
  const target = document.getElementById(GOOGLE_REVIEWS_ID);
  if (!target) return;
  const start = window.scrollY;
  const end = target.getBoundingClientRect().top + start;
  const finish = () => {
    history.replaceState(null, "", `#${GOOGLE_REVIEWS_ID}`);
    if (!target.hasAttribute("tabindex")) target.setAttribute("tabindex", "-1");
    target.focus({ preventScroll: true });
  };
  if (reducedMotion) {
    window.scrollTo(0, end);
    finish();
    return;
  }
  // Longer trips take a little longer, between 600 and 1000ms.
  const duration = Math.min(1000, Math.max(600, Math.abs(end - start) / 3));
  const began = performance.now();
  const step = (now: number) => {
    const progress = Math.min(1, (now - began) / duration);
    window.scrollTo(0, start + (end - start) * easeInOutCubic(progress));
    if (progress < 1) requestAnimationFrame(step);
    else finish();
  };
  requestAnimationFrame(step);
}

/** The quote, clamped to three lines. The overall star rating sits at the foot of the card instead. Shared with the review site's preview. */
export function HeroReviewQuote({ review }: { review: GoogleReview }) {
  return (
    <blockquote className="line-clamp-3 text-base leading-relaxed text-dark-grey lg:text-lg">
      “{review.quote}”
    </blockquote>
  );
}

const UNITS: Record<string, string> = { day: "d", week: "w", month: "mo", year: "y" };

/** "3 months ago" becomes "3mo ago" and "a year ago" becomes "1y ago", so the footer fits on one line. */
export function shortPosted(posted: string) {
  const match = posted.match(/^(a|an|\d+) (day|week|month|year)s? ago$/);
  if (!match) return posted;
  const count = /^\d+$/.test(match[1]) ? match[1] : "1";
  return `${count}${UNITS[match[2]]} ago`;
}

/** Reviewer, when it was posted, and the link out to Google, kept to one line. Shared with the review site's preview. */
export function HeroReviewFooter({ review }: { review: GoogleReview }) {
  return (
    <figcaption className="mt-3 flex items-center gap-4 text-xs whitespace-nowrap">
      {/* Only the name gives way if space runs out. */}
      <p className="flex min-w-0 items-center">
        <span className="truncate font-bold text-dark-grey">{review.author}</span>
        <span className="shrink-0 text-dark-grey/70">
          &nbsp;· <span aria-hidden="true">{shortPosted(review.posted)}</span>
          <span className="sr-only">{review.posted}</span>
        </span>
      </p>
      <a
        href={review.url}
        target="_blank"
        rel="noopener noreferrer"
        className="relative z-10 inline-flex shrink-0 items-center gap-1 font-bold text-dark-grey no-underline hover:underline hover:opacity-100"
      >
        <GoogleMark className="size-3.5" />
        Read on Google
        <span className="sr-only">(review by {review.author}, opens in a new tab)</span>
      </a>
    </figcaption>
  );
}

export function HeroReviewCard({
  reviews = homeReviews,
  rating = googleRating,
}: {
  reviews?: GoogleReview[];
  rating?: GoogleRating;
}) {
  const reducedMotion = usePrefersReducedMotion();
  const [emblaRef, embla] = useEmblaCarousel({
    loop: true,
    duration: reducedMotion ? 1 : 30,
  });
  const [selected, setSelected] = useState(0);
  const [paused, setPaused] = useState(false);
  const slideRefs = useRef<(HTMLElement | null)[]>([]);
  const [height, setHeight] = useState<number>();
  // The card body jumps to the full reviews section when that section is on the page.
  const linksDown = useFeature("google-reviews");

  /** Fit the card to the review on show, so short reviews don't leave a gap. */
  useEffect(() => {
    const slide = slideRefs.current[selected];
    if (!slide) return;
    const observer = new ResizeObserver(() => setHeight(slide.offsetHeight));
    observer.observe(slide);
    return () => observer.disconnect();
  }, [selected]);

  useEffect(() => {
    if (!embla) return;
    const onSelect = () => setSelected(embla.selectedScrollSnap());
    embla.on("select", onSelect);
    return () => {
      embla.off("select", onSelect);
    };
  }, [embla]);

  // Auto-advance, timed to how long the review on show takes to read.
  useEffect(() => {
    if (!embla || paused || reducedMotion || reviews.length < 2) return;
    const timer = setTimeout(
      () => embla.scrollNext(),
      readingTime(reviews[selected].quote),
    );
    return () => clearTimeout(timer);
  }, [embla, paused, reducedMotion, reviews, selected]);

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Customer reviews from Google"
      className="mx-4 my-4 lg:mx-0 lg:my-0 lg:w-[384px]"
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget))
          setPaused(false);
      }}
    >
      <div className="overflow-hidden rounded-card bg-white shadow-md">
        {/* Same horizontal padding as the red panel above, so the review text lines up with the headline. */}
        <div className="px-4 pt-4 pb-3 lg:px-8 lg:pt-5">
          <div
            ref={emblaRef}
            className="overflow-hidden transition-[height] duration-300 ease-out motion-reduce:transition-none"
            style={{ height }}
          >
            <div className="flex items-start">
              {reviews.map((review, index) => (
                <figure
                  key={review.url}
                  ref={(node) => {
                    slideRefs.current[index] = node;
                  }}
                  role="group"
                  aria-roledescription="slide"
                  aria-label={`Review ${index + 1} of ${reviews.length}`}
                  className="relative min-w-0 flex-[0_0_100%] pr-1"
                  inert={index !== selected}
                >
                  <HeroReviewQuote review={review} />
                  {/* The whole card opens the full review further down; only "Read on Google" leaves the site. */}
                  {linksDown && (
                    <a
                      href={`#${GOOGLE_REVIEWS_ID}`}
                      tabIndex={index === selected ? 0 : -1}
                      onClick={(event) => {
                        event.preventDefault();
                        scrollToReviews(reducedMotion);
                      }}
                      className="absolute inset-0 rounded-card hover:opacity-100"
                    >
                      <span className="sr-only">
                        Read the full review by {review.author} further down the
                        page
                      </span>
                    </a>
                  )}
                  <HeroReviewFooter review={review} />
                </figure>
              ))}
            </div>
          </div>
        </div>

        {/* The overall Google rating, combined into the card under a hairline. */}
        <a
          href={rating.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 border-t border-lighter-grey px-4 py-3 no-underline hover:opacity-100 lg:px-8"
        >
          <span className="text-2xl leading-none font-bold text-dark-grey">
            {rating.score.toFixed(1)}
          </span>
          <span className="flex flex-col gap-1">
            <Stars score={rating.score} className="text-base" />
            <span className="flex items-center gap-1.5 text-xs text-dark-grey">
              <GoogleMark className="size-3.5" />
              <span className="underline underline-offset-4">
                Average from over {rating.count.toLocaleString("en-NZ")} Google
                reviews
              </span>
            </span>
          </span>
          <span className="sr-only">(opens Google in a new tab)</span>
        </a>
      </div>

      {/* Dots sit under the card: the current review in red, the rest white. On phones the card sits on white, so the white dots get a grey ring. */}
      {reviews.length > 1 && (
        <div className="mt-2 flex justify-center">
          {reviews.map((review, index) => (
            <button
              key={review.url}
              type="button"
              aria-label={`Go to review ${index + 1}`}
              aria-current={index === selected}
              onClick={() => embla?.scrollTo(index, reducedMotion)}
              className="flex size-7 items-center justify-center hover:opacity-100"
            >
              <span
                className={cn(
                  "block size-2.5 rounded-full shadow-sm transition-colors",
                  index === selected ? "bg-primary" : "bg-white ring-1 ring-dark-grey/40 lg:ring-0",
                )}
              />
            </button>
          ))}
        </div>
      )}
    </section>
  );
}
