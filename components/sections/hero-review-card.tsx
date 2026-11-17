"use client";

import useEmblaCarousel from "embla-carousel-react";
import { ExternalLink } from "lucide-react";
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
 * overall Google rating underneath. Same card language as GoogleReviews, in a
 * compact size: no wider than half the red panel on desktop, like the phone layout.
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
        {/* Same horizontal padding as the red panel above, so the review text lines up with the headline. Vertical padding is half of it. */}
        <div className="px-4 py-2 lg:px-8 lg:py-4">
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
                  <Stars score={5} className="text-base" />
                  <blockquote className="mt-2 line-clamp-3 text-base leading-relaxed text-dark-grey">
                    “{review.quote}”
                  </blockquote>
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
                  <figcaption className="mt-3 flex flex-wrap items-center justify-between gap-x-4 gap-y-1 text-xs">
                    <p>
                      <span className="font-bold text-dark-grey">
                        {review.author}
                      </span>
                      <span className="text-dark-grey/70">
                        {" "}
                        · {review.posted}
                      </span>
                    </p>
                    <a
                      href={review.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="relative z-10 inline-flex items-center gap-1 font-bold text-dark-grey no-underline hover:underline hover:opacity-100"
                    >
                      <GoogleMark className="size-3.5" />
                      Read on Google
                      <ExternalLink className="size-3" aria-hidden="true" />
                      <span className="sr-only">
                        (review by {review.author}, opens in a new tab)
                      </span>
                    </a>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>

          {/* Dots sit inside the card, centred under the review. */}
          {reviews.length > 1 && (
            <div className="mt-5 flex justify-center">
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
                      "block size-2.5 rounded-full border border-dark-grey transition-colors",
                      index === selected && "bg-dark-grey",
                    )}
                  />
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* The overall Google rating sits under the card as a summary, on a white pill so it reads over the photo, left-aligned with the card. */}
      <div className="mt-3 flex">
        <a
          href={rating.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 rounded-full bg-white px-4 py-2 no-underline shadow-md hover:opacity-100"
        >
          <span className="text-xl leading-none font-bold text-dark-grey">
            {rating.score.toFixed(1)}
          </span>
          <span className="flex flex-col gap-0.5">
            <Stars score={rating.score} className="text-sm" />
            <span className="flex items-center gap-1.5 text-[11px] text-dark-grey">
              <GoogleMark className="size-3" />
              <span className="underline underline-offset-4">
                Average from over {rating.count.toLocaleString("en-NZ")} Google
                reviews
              </span>
            </span>
          </span>
          <span className="sr-only">(opens Google in a new tab)</span>
        </a>
      </div>
    </section>
  );
}
