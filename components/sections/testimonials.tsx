"use client";

import Image from "next/image";
import { Container } from "@/components/layout/container";
import { ReviewCarousel } from "@/components/sections/review-carousel";
import type { Testimonial } from "@/content/types";

const INSET = "px-[10%] md:px-8";

export function Testimonials({ testimonials }: { testimonials: Testimonial[] }) {
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
        <ReviewCarousel
          testimonials={testimonials}
          dotsClassName="mt-[24px]"
          renderSlide={(testimonial) => (
            <>
              <blockquote className="mx-auto max-w-2xl pt-8 text-2xl">{testimonial.quote}</blockquote>
              <p className="pt-8 text-base font-bold text-primary">
                {testimonial.author} <br /> ({testimonial.date})
              </p>
            </>
          )}
        />
      </Container>
    </div>
  );
}
