import type { Metadata } from "next";
import { FeedbackControl } from "@/components/review/feedback";
import { cn } from "@/lib/utils";
import { hasEdits, WordDiff } from "@/components/review/word-diff";
import {
  aboutReviews,
  carReviews,
  claimsReviews,
  googleRating,
  homeReviews,
  mechanicalReviews,
} from "@/content/google-reviews";
import {
  pendingReview,
  REVIEW_DATE,
  reviewCarSharedNote,
  reviewNotes,
  reviewOrder,
  reviewsLeftOut,
} from "@/content/review";
import type { GoogleReview } from "@/content/types";

export const metadata: Metadata = { title: "Testimonials | Provident version 2 review" };

const reviewSets: { id: string; title: string; status: string; reviews: GoogleReview[] }[] = [
  { id: "home", title: "Home page", status: "Live in version 2", reviews: homeReviews },
  { id: "car", title: "Car insurance", status: "Live in version 2", reviews: carReviews },
  { id: "mechanical", title: "Mechanical breakdown insurance", status: "Ready for when this page is rebuilt", reviews: mechanicalReviews },
  { id: "claims", title: "Claims", status: "Ready for when this page is rebuilt", reviews: claimsReviews },
  { id: "about", title: "About / Why Provident", status: "Ready for when this page is rebuilt", reviews: aboutReviews },
];

const firstName = (name: string) => name.split(" ")[0].toLowerCase();

function ReviewItem({ review, index, pageId }: { review: GoogleReview; index: number; pageId: string }) {
  const note = reviewNotes[review.author];
  const edited = note ? hasEdits(note.original, review.quote) : false;
  const shared = pageId === "car" && homeReviews.includes(review);
  return (
    <li className="bz-cell p-5">
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
      <blockquote className="bz-quote mt-3 leading-relaxed">“{review.quote}”</blockquote>
      {note && (
        <p className="mt-3 text-sm leading-relaxed">
          <span className="font-semibold">Why we chose it: </span>
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
    </li>
  );
}

export default function TestimonialsPage() {
  return (
            <section className="space-y-10">
              <div>
                <p className="bz-eyebrow">Review / Testimonials</p>
                <h1 className="bz-h2 mt-3">Testimonials: which reviews, and why</h1>
                <div className="bz-lede mt-4 max-w-3xl space-y-3">
                  <p>
                    All reviews are real Google reviews of Provident Insurance, captured on {REVIEW_DATE}, when Google showed{" "}
                    {googleRating.score} stars from {googleRating.count} reviews. Each page has its own set, chosen to answer the
                    main worry of someone on that page.
                  </p>
                  <p>
                    Names are shown as first name and initial. Where we tidied spelling or punctuation, you can compare the
                    reviewer&apos;s original words with what the site shows. We&apos;d like your approval on these edits, and we&apos;re happy
                    to show any review exactly as written instead.
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
                  <FeedbackControl id={`reviews-${set.id}`} label={`Reviews: ${set.title}`} />
                </div>
              ))}

              <div className="bz-cell bz-cell--warn space-y-3 p-5">
                <p className="bz-eyebrow bz-warn">Waiting on permission</p>
                <h2 className="bz-h3">{pendingReview.who}</h2>
                <blockquote className="bz-quote leading-relaxed">“{pendingReview.original}”</blockquote>
                <p className="text-sm"><span className="font-semibold">Why: </span>{pendingReview.why}</p>
                <p className="text-sm font-semibold">{pendingReview.ask}</p>
                <FeedbackControl id="reviews-glendyr" label="Glendyr's review (permission)" />
              </div>

              <div className="space-y-3">
                <h2 className="bz-h3">Reviews we left out on purpose</h2>
                <ul className="bz-cell bz-divide text-sm">
                  {reviewsLeftOut.map((item) => (
                    <li key={item.who} className="p-4">
                      <span className="font-semibold">{item.who}: </span>
                      {item.why}
                    </li>
                  ))}
                </ul>
                <p className="bz-muted text-sm">
                  We suggest refreshing the selection every three to six months, rotating out anything older than a year first,
                  and keeping a mix that fairly reflects the overall rating, as the Commerce Commission expects of testimonials.
                </p>
              </div>
            </section>
  );
}
