"use client";

import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight, ExternalLink, Star } from "lucide-react";
import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { Container } from "@/components/layout/container";
import type { GoogleRating, GoogleReview } from "@/content/types";
import { cn } from "@/lib/utils";

/** Anchor for this section, so the hero review card can link down to it. */
export const GOOGLE_REVIEWS_ID = "google-reviews";

/** Reviews longer than this are clamped behind "Read more" so the wording is never cut. */
const LONG_REVIEW_WORDS = 60;
/** Wait this long after someone uses the controls before auto-scroll resumes. */
const RESUME_AFTER_MS = 10_000;

/** Reading time: 4s plus 0.3s a word (about 200 words a minute), kept between 7s and 16s. */
export function readingTime(text: string) {
  const words = text.trim().split(/\s+/).length;
  return Math.min(16_000, Math.max(7_000, 4_000 + words * 300));
}

function wordCount(text: string) {
  return text.trim().split(/\s+/).length;
}

export function GoogleMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <path fill="#FFC107" d="M43.6 20.1H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 13 4 4 13 4 24s9 20 20 20 20-9 20-20c0-1.3-.1-2.6-.4-3.9z" />
      <path fill="#FF3D00" d="m6.3 14.7 6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z" />
      <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-8l-6.5 5C9.5 39.6 16.2 44 24 44z" />
      <path fill="#1976D2" d="M43.6 20.1H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C37 39.2 44 34 44 24c0-1.3-.1-2.6-.4-3.9z" />
    </svg>
  );
}

/** Five stars filled to `score`, so 4.7 shows a 70% fifth star. */
export function Stars({ score, className }: { score: number; className?: string }) {
  return (
    <span role="img" aria-label={`Rated ${score} out of 5`} className={cn("inline-flex gap-1", className)}>
      {[0, 1, 2, 3, 4].map((index) => {
        const fill = Math.max(0, Math.min(1, score - index));
        return (
          <span key={index} className="relative inline-block" aria-hidden="true">
            <Star className="size-[1em] fill-lighter-grey text-lighter-grey" />
            <span className="absolute inset-0 overflow-hidden" style={{ width: `${fill * 100}%` }}>
              <Star className="size-[1em] fill-rating text-rating" />
            </span>
          </span>
        );
      })}
    </span>
  );
}

function RatingSummary({ rating }: { rating: GoogleRating }) {
  return (
    <a
      href={rating.url}
      target="_blank"
      rel="noopener noreferrer"
      className="mx-auto mt-6 inline-flex flex-col items-center gap-2 rounded-card px-6 py-4 no-underline hover:bg-white hover:opacity-100"
    >
      <span className="flex items-center gap-3">
        <span className="text-5xl leading-none font-bold text-dark-grey">{rating.score.toFixed(1)}</span>
        <Stars score={rating.score} className="text-3xl" />
      </span>
      <span className="flex items-center gap-2 text-sm underline underline-offset-4">
        <GoogleMark className="size-5" />
        from over {rating.count.toLocaleString("en-NZ")} Google reviews
        <ExternalLink className="size-4" aria-hidden="true" />
        <span className="sr-only">(opens Google in a new tab)</span>
      </span>
    </a>
  );
}

function ReviewCard({
  review,
  position,
  total,
  expanded,
  onToggle,
}: {
  review: GoogleReview;
  position: number;
  total: number;
  expanded: boolean;
  onToggle: () => void;
}) {
  const long = wordCount(review.quote) > LONG_REVIEW_WORDS;

  return (
    <div
      role="group"
      aria-roledescription="slide"
      aria-label={`Review ${position} of ${total}`}
      className="relative flex flex-col rounded-card bg-white p-5 text-left shadow-md md:p-8"
    >
      <Stars score={5} className="text-xl" />
      <blockquote className="mt-4 flex-1">
        <p className={cn("text-base leading-relaxed md:text-lg", long && !expanded && "line-clamp-5")}>{review.quote}</p>
      </blockquote>
      {long && (
        <button
          type="button"
          aria-expanded={expanded}
          onClick={onToggle}
          className="relative z-10 mt-2 self-start text-sm font-bold text-primary underline underline-offset-4 hover:opacity-100"
        >
          {expanded ? "Show less" : "Read more"}
        </button>
      )}
      <div className="mt-6 flex flex-wrap items-center justify-between gap-x-4 gap-y-2 text-sm">
        <p>
          <span className="font-bold text-dark-grey">{review.author}</span>
          <span className="text-dark-grey/70"> · {review.posted}</span>
        </p>
        {/* The whole card opens the review on Google; Read more sits above this link. */}
        <a
          href={review.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 font-bold text-dark-grey no-underline after:absolute after:inset-0 after:rounded-card hover:underline hover:opacity-100"
        >
          <GoogleMark className="size-4" />
          Read on Google
          <ExternalLink className="size-3.5" aria-hidden="true" />
          <span className="sr-only">(review by {review.author}, opens in a new tab)</span>
        </a>
      </div>
    </div>
  );
}

const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";

function subscribeReducedMotion(onChange: () => void) {
  const query = window.matchMedia(REDUCED_MOTION);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

export function usePrefersReducedMotion() {
  return useSyncExternalStore(
    subscribeReducedMotion,
    () => window.matchMedia(REDUCED_MOTION).matches,
    () => false
  );
}

/**
 * Proposal: Google reviews section with the live rating, edge and arrow
 * navigation, and auto-scroll timed to each review's length.
 */
export function GoogleReviews({
  reviews,
  rating,
  title = "What our customers say",
}: {
  reviews: GoogleReview[];
  rating: GoogleRating;
  title?: string;
}) {
  const reducedMotion = usePrefersReducedMotion();
  const [emblaRef, embla] = useEmblaCarousel({ loop: true, duration: reducedMotion ? 1 : 30 });
  const [selected, setSelected] = useState(0);
  const [expanded, setExpanded] = useState<number | null>(null);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [held, setHeld] = useState(false);
  const [resting, setResting] = useState(false);
  const [onScreen, setOnScreen] = useState(false);
  const [cycle, setCycle] = useState(0);
  const regionRef = useRef<HTMLElement>(null);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [viewportHeight, setViewportHeight] = useState<number>();
  const restTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => {
    if (!embla) return;
    const onSelect = () => {
      setSelected(embla.selectedScrollSnap());
      setExpanded(null);
      setCycle((value) => value + 1);
    };
    embla.on("select", onSelect);
    return () => {
      embla.off("select", onSelect);
    };
  }, [embla]);

  useEffect(() => {
    const node = regionRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => setOnScreen(entry.isIntersecting), {
      threshold: 0.4,
    });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => () => clearTimeout(restTimer.current), []);

  /** Size the carousel to the review on show, so short reviews don't sit in a tall empty box. */
  useEffect(() => {
    const slide = slideRefs.current[selected];
    if (!slide) return;
    const observer = new ResizeObserver(() => setViewportHeight(slide.offsetHeight));
    observer.observe(slide);
    return () => observer.disconnect();
  }, [selected]);

  /** Any deliberate move pauses auto-scroll, then it picks up again after a quiet spell. */
  const rest = useCallback(() => {
    setResting(true);
    clearTimeout(restTimer.current);
    restTimer.current = setTimeout(() => {
      setResting(false);
      setCycle((value) => value + 1);
    }, RESUME_AFTER_MS);
  }, []);

  const go = useCallback(
    (direction: "prev" | "next" | number) => {
      if (!embla) return;
      rest();
      if (direction === "prev") embla.scrollPrev(reducedMotion);
      else if (direction === "next") embla.scrollNext(reducedMotion);
      else embla.scrollTo(direction, reducedMotion);
    },
    [embla, reducedMotion, rest]
  );

  const autoplay = reviews.length > 1 && !reducedMotion;
  const running =
    autoplay && onScreen && !hovered && !focused && !held && !resting && expanded === null;
  const duration = readingTime(reviews[selected]?.quote ?? "");

  /**
   * Auto-advance after enough time to read the review. Pausing (hover, focus, a finger
   * holding the card) keeps the time already spent, so the review doesn't restart its clock.
   */
  const remaining = useRef(duration);
  const timerFor = useRef("");
  useEffect(() => {
    if (!running || !embla) return;
    const slideKey = `${selected}-${cycle}`;
    if (timerFor.current !== slideKey) {
      timerFor.current = slideKey;
      remaining.current = duration;
    }
    const started = Date.now();
    const timer = setTimeout(() => embla.scrollNext(), remaining.current);
    return () => {
      clearTimeout(timer);
      remaining.current = Math.max(0, remaining.current - (Date.now() - started));
    };
  }, [running, embla, selected, cycle, duration]);

  return (
    <section
      id={GOOGLE_REVIEWS_ID}
      ref={regionRef}
      aria-roledescription="carousel"
      aria-label="Customer reviews from Google"
      className="bg-light-grey py-16 text-center md:py-24"
      onKeyDown={(event) => {
        if (event.key === "ArrowLeft") go("prev");
        if (event.key === "ArrowRight") go("next");
      }}
    >
      <Container className="px-3 md:px-8">
        <h2 className="section-heading">{title}</h2>
        <RatingSummary rating={rating} />

        <div
          className="relative mx-auto mt-10 max-w-4xl"
          onPointerEnter={(event) => event.pointerType === "mouse" && setHovered(true)}
          onPointerLeave={() => setHovered(false)}
          onPointerDown={(event) => event.pointerType !== "mouse" && setHeld(true)}
          onPointerUp={(event) => {
            if (event.pointerType === "mouse") return;
            setHeld(false);
            rest();
          }}
          onPointerCancel={() => setHeld(false)}
          onFocus={() => setFocused(true)}
          onBlur={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false);
          }}
        >
          {/* Edge zones: the whole gutter either side of the card moves the carousel. */}
          {reviews.length > 1 && (
            <>
              <button
                type="button"
                aria-label="Previous review"
                onClick={() => go("prev")}
                className="group absolute inset-y-0 left-0 z-20 flex w-9 cursor-pointer items-center justify-start md:w-20"
              >
                <span className="flex size-9 items-center justify-center rounded-full bg-white md:size-11 text-dark-grey shadow-md transition-colors group-hover:bg-primary group-hover:text-white">
                  <ChevronLeft className="size-5 md:size-6" aria-hidden="true" />
                </span>
              </button>
              <button
                type="button"
                aria-label="Next review"
                onClick={() => go("next")}
                className="group absolute inset-y-0 right-0 z-20 flex w-9 cursor-pointer items-center justify-end md:w-20"
              >
                <span className="flex size-9 items-center justify-center rounded-full bg-white md:size-11 text-dark-grey shadow-md transition-colors group-hover:bg-primary group-hover:text-white">
                  <ChevronRight className="size-5 md:size-6" aria-hidden="true" />
                </span>
              </button>
            </>
          )}

          <div
            ref={emblaRef}
            className="mx-9 overflow-hidden transition-[height] duration-300 ease-out motion-reduce:transition-none md:mx-20"
            style={{ height: viewportHeight }}
          >
            <div className="flex items-start" aria-live={running ? "off" : "polite"}>
              {reviews.map((review, index) => (
                <div
                  key={review.url}
                  ref={(node) => {
                    slideRefs.current[index] = node;
                  }}
                  className="min-w-0 flex-[0_0_100%] px-1 py-2"
                  inert={index !== selected}
                >
                  <ReviewCard
                    review={review}
                    position={index + 1}
                    total={reviews.length}
                    expanded={expanded === index}
                    onToggle={() => {
                      rest();
                      setExpanded(expanded === index ? null : index);
                    }}
                  />
                </div>
              ))}
            </div>
          </div>

        </div>

        {reviews.length > 1 && (
          <div className="mt-6 flex items-center justify-center gap-4">
            <div className="flex items-center">
              {reviews.map((review, index) => (
                <button
                  key={review.url}
                  type="button"
                  aria-label={`Go to review ${index + 1}`}
                  aria-current={index === selected}
                  onClick={() => go(index)}
                  className="flex size-8 items-center justify-center hover:opacity-100"
                >
                  <span
                    className={cn(
                      "block size-3 rounded-full border border-primary transition-colors",
                      index === selected && "bg-primary"
                    )}
                  />
                </button>
              ))}
            </div>
          </div>
        )}
      </Container>
    </section>
  );
}
