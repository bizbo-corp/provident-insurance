import type { Metadata } from "next";
import { FeedbackControl } from "@/components/review/feedback";
import { StepNav } from "@/components/review/step-nav";
import { cn } from "@/lib/utils";
import { hasEdits, WordDiff } from "@/components/review/word-diff";
import { TestimonialPick } from "@/components/review/testimonial-pick";
import { TestimonialPreview } from "@/components/review/testimonial-preview";
import { SectionReviewPreview } from "@/components/review/section-review-preview";
import { carHero } from "@/content/car-insurance";
import { homeHero } from "@/content/home";
import { googleRating, homeReviews } from "@/content/google-reviews";
import { TESTIMONIAL_PAGES, testimonialId, type TestimonialPage } from "@/lib/testimonials";
import {
  REVIEW_DATE,
  reviewCarSharedNote,
  reviewNotes,
  reviewOrder,
} from "@/content/review";
import type { GoogleReview } from "@/content/types";

export const metadata: Metadata = { title: "Testimonial review | Provident version 2 review" };

const reviewSets: { id: TestimonialPage; title: string; pageName: string; status: string; image: string; reviews: GoogleReview[] }[] = [
  { id: "home", title: "Home page", pageName: "home page", status: "Live in version 2", image: homeHero.image, reviews: TESTIMONIAL_PAGES.home },
  { id: "car", title: "Car insurance", pageName: "car insurance page", status: "Live in version 2", image: carHero.image, reviews: TESTIMONIAL_PAGES.car },
];

/** Matches LONG_REVIEW_WORDS in the site's Google reviews section. */
const LONG_WORDS = 60;

const firstName = (name: string) => name.split(" ")[0].toLowerCase();
const slug = (text: string) => text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

function ReviewItem({ review, index, pageId }: { review: GoogleReview; index: number; pageId: TestimonialPage }) {
  const note = reviewNotes[review.author];
  const edited = note ? hasEdits(note.original, review.quote) : false;
  const long = review.quote.trim().split(/\s+/).length > LONG_WORDS;
  const shared = pageId === "car" && homeReviews.includes(review);
  const set = reviewSets.find((item) => item.id === pageId)!;
  return (
    <TestimonialPick id={testimonialId(pageId, review)} page={set.pageName}>
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <p className="font-semibold">
          <span className="bz-mono bz-muted mr-3 text-xs">{String(index + 1).padStart(2, "0")}</span>
          {review.author}
          <span className="bz-muted font-normal"> / {review.posted}</span>
          {note && firstName(note.googleName) !== firstName(review.author) && (
            <span className="bz-muted text-sm font-normal"> (on Google as “{note.googleName}”)</span>
          )}
        </p>
        <a href={review.url} target="_blank" rel="noopener noreferrer" className="bz-btn bz-btn--quiet bz-btn--sm">
          View on Google <span className="bz-arrow" aria-hidden="true">↗</span>
        </a>
      </div>
      <div className="mt-4 grid gap-5 xl:grid-cols-2 xl:items-start">
        <div>
          <p className="bz-eyebrow">Hero card, under the headline: cut to three lines</p>
          <p className="bz-muted mt-1 text-xs">The quote stops after three lines with an ellipsis.</p>
          <div className="mt-2">
            <TestimonialPreview review={review} index={index} total={set.reviews.length} image={set.image} />
          </div>
        </div>
        <div>
          <p className="bz-eyebrow">Reviews section, further down the page: full wording</p>
          <p className="bz-muted mt-1 text-xs">
            {long
              ? `This review is over ${LONG_WORDS} words, so on the site it starts folded to five lines behind “Read more”. It is shown open here.`
              : "Short enough to show in full on the site."}
          </p>
          <div className="mt-2">
            <SectionReviewPreview review={review} index={index} total={set.reviews.length} />
          </div>
        </div>
      </div>
      {note && (
        <p className="mt-3 text-sm leading-relaxed">
          <span className="font-semibold">Chosen because: </span>
          {shared ? reviewCarSharedNote : note.why}
        </p>
      )}
      {note && edited && (
        <details className="bz-cell bz-cell--stone mt-3 p-3 text-sm">
          <summary className="cursor-pointer font-semibold">Wording tidied: compare with the original</summary>
          <div className="mt-3">
            <WordDiff original={note.original} shown={review.quote} />
            <p className="bz-muted mt-2 text-xs">
              <del className="bz-del">Struck through</del> is the reviewer&apos;s original, <ins className="bz-ins">highlighted</ins> is what the site shows.
            </p>
          </div>
        </details>
      )}
      {note?.flags && !shared && (
        <ul className="mt-3 space-y-1 text-sm">
          {note.flags.map((flag) => (
            <li key={flag} className="bz-cell bz-cell--warn flex gap-3 p-3">
              <span className="bz-mono bz-warn shrink-0" aria-hidden="true">!</span>
              {flag}
            </li>
          ))}
        </ul>
      )}
      <FeedbackControl
        embedded
        id={`review-${pageId}-${slug(review.author)}`}
        label={`Testimonial: ${review.author} (${set.title})`}
        placeholder="Suggest a change to the wording, or add a comment"
      />
    </TestimonialPick>
  );
}

export default function TestimonialsPage() {
  return (
            <section className="space-y-10">
              <div>
                <p className="bz-eyebrow">Review / Testimonial review</p>
                <h1 className="bz-h2 mt-3">Testimonial review: which reviews, and why</h1>
                <div className="bz-lede mt-4 max-w-3xl space-y-3">
                  <p>
                    All reviews are real Google reviews of Provident Insurance, captured on {REVIEW_DATE}, when Google showed{" "}
                    {googleRating.score} stars from {googleRating.count} reviews. Each page has its own set, chosen to answer the
                    main worry of someone on that page.
                  </p>
                  <p>
                    Names are shown as first name and initial. Where spelling or punctuation was tidied, you can compare the
                    reviewer&apos;s original words with what the site shows. Please approve each review or request changes, and
                    suggest any wording you&apos;d prefer in its comments. Untick a review to hide it from the site straight away, and tick it to bring it back.
                  </p>
                </div>
              </div>

              <p className="bz-cell bz-cell--dashed max-w-3xl p-4 text-sm leading-relaxed">
                These reviews feed the rating card under the hero and the Google reviews section further down each page, both
                part of Initiative 02.
              </p>

              {reviewSets.map((set) => (
                <div key={set.id} className="space-y-4">
                  <div className="flex flex-wrap items-baseline gap-3">
                    <h2 className="bz-h3">{set.title}</h2>
                    <span className="bz-tag">
                      <span className={cn("bz-pip", set.status.startsWith("Live") && "bz-pip--live")} aria-hidden="true" />
                      {set.status}
                    </span>
                  </div>
                  <p className="bz-muted text-sm"><span className="font-semibold">Order: </span>{reviewOrder[set.id]}</p>
                  <ol className="space-y-3">
                    {set.reviews.map((review, index) => (
                      <ReviewItem key={review.author} review={review} index={index} pageId={set.id} />
                    ))}
                  </ol>
                </div>
              ))}

              <StepNav href="/review/testimonials" />
            </section>
  );
}
