"use client";

import useEmblaCarousel from "embla-carousel-react";
import { useEffect, useState } from "react";
import type { Testimonial } from "@/content/types";
import { cn } from "@/lib/utils";

/** Swipeable reviews with clickable dots, shared by the reviews section and the hero card. */
export function ReviewCarousel({
  testimonials,
  renderSlide,
  dotsClassName,
}: {
  testimonials: Testimonial[];
  renderSlide: (testimonial: Testimonial) => React.ReactNode;
  dotsClassName?: string;
}) {
  const [emblaRef, embla] = useEmblaCarousel();
  const [selected, setSelected] = useState(0);

  useEffect(() => {
    if (!embla) return;
    const onSelect = () => setSelected(embla.selectedScrollSnap());
    embla.on("select", onSelect);
    return () => {
      embla.off("select", onSelect);
    };
  }, [embla]);

  return (
    <>
      <div ref={emblaRef} className="overflow-hidden">
        <div className="flex">
          {testimonials.map((testimonial) => (
            <div key={testimonial.author} className="min-w-0 flex-[0_0_100%]">
              {renderSlide(testimonial)}
            </div>
          ))}
        </div>
      </div>
      <div className={dotsClassName}>
        {testimonials.map((testimonial, index) => (
          <button
            key={testimonial.author}
            type="button"
            aria-label={`Show review ${index + 1}`}
            aria-current={index === selected}
            className={cn(
              "mx-1 inline-block size-3 rounded-full border border-primary hover:opacity-100",
              index === selected && "bg-primary"
            )}
            onClick={() => embla?.scrollTo(index)}
          />
        ))}
      </div>
    </>
  );
}
