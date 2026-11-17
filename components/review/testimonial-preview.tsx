import Image from "next/image";
import { HeroReviewFooter, HeroReviewQuote } from "@/components/sections/hero-review-card";
import type { GoogleReview } from "@/content/types";
import { cn } from "@/lib/utils";

/**
 * How one testimonial looks in the review card under the hero, on that page's hero
 * photo. Uses the site's own card parts, so the preview stays in Provident's design
 * system and always matches what ships. Static: the dots only show its place in the set.
 */
export function TestimonialPreview({
  review,
  index,
  total,
  image,
}: {
  review: GoogleReview;
  index: number;
  total: number;
  image: string;
}) {
  return (
    <div className="bz-preview relative overflow-hidden rounded-[12px] font-sans">
      <Image src={image} alt="" fill sizes="(min-width: 1024px) 720px, 100vw" className="object-cover object-[70%_center]" />
      <div className="relative p-4 sm:p-6">
        <div className="max-w-[384px] overflow-hidden rounded-card bg-white text-left shadow-md">
          <div className="px-4 py-2 lg:px-8 lg:py-4">
            <figure className="relative">
              <HeroReviewQuote review={review} />
              <HeroReviewFooter review={review} />
            </figure>
            {total > 1 && (
              <div className="mt-5 flex justify-center" aria-hidden="true">
                {Array.from({ length: total }, (_, dot) => (
                  <span key={dot} className="flex size-7 items-center justify-center">
                    <span
                      className={cn(
                        "block size-2.5 rounded-full border border-dark-grey",
                        dot === index && "bg-dark-grey"
                      )}
                    />
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <span className="bz-preview__hidden">Hidden from the site</span>
    </div>
  );
}
