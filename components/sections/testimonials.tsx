"use client";

import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Container } from "@/components/layout/container";
import type { Testimonial } from "@/content/types";
import { cn } from "@/lib/utils";

const INSET = "px-[10%] md:px-8";

export function Testimonials({ testimonials }: { testimonials: Testimonial[] }) {
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
    <div className="bg-light-grey py-24 text-center">
      <Container className={INSET}>
        <div className="mt-8 flex flex-col items-center justify-center">
          <h3 className="font-bold">What our customers and partners say</h3>
          <p className="text-sm italic">Check out some of our Google reviews:</p>
        </div>
        <div className="mt-8 flex justify-center">
          <Image
            src="/images/rating-435814.svg"
            alt="RATING 4.5 STARS ON GOOGLE REVIEWS"
            width={1000}
            height={392}
            className="h-auto w-1/6"
          />
        </div>
      </Container>
      <Container className={INSET}>
        <div ref={emblaRef} className="overflow-hidden">
          <div className="flex">
            {testimonials.map((testimonial) => (
              <div key={testimonial.author} className="min-w-0 flex-[0_0_100%]">
                <blockquote className="mx-auto max-w-2xl pt-8 text-2xl">{testimonial.quote}</blockquote>
                <p className="pt-8 text-base font-bold text-primary">
                  {testimonial.author} <br /> ({testimonial.date})
                </p>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-[24px]">
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
      </Container>
    </div>
  );
}
