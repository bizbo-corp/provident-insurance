"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { QUOTE_HREF } from "@/content/site";
import { cn } from "@/lib/utils";

/** Slides up once the page has scrolled, and tucks away again over the footer. */
export function StickyCtaBar() {
  const [atTop, setAtTop] = useState(true);
  const [footerVisible, setFooterVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setAtTop(window.scrollY <= 0);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const footer = document.querySelector("[data-site-footer]");
    const observer = new IntersectionObserver(([entry]) => setFooterVisible(entry.isIntersecting));
    if (footer) observer.observe(footer);

    return () => {
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, []);

  const visible = !atTop && !footerVisible;

  return (
    <div
      className={cn(
        "fixed inset-x-0 bottom-0 z-50 bg-light-grey p-4 text-dark-grey shadow-bar-up transition-transform duration-450 ease-bar",
        visible ? "translate-y-0" : "translate-y-full"
      )}
    >
      <Container>
        <div className="flex items-center justify-center space-x-4">
          <p className="inline-block text-2xl font-bold">Got a minute?</p>
          <Button asChild>
            <Link href={QUOTE_HREF}>Get a quote</Link>
          </Button>
        </div>
      </Container>
    </div>
  );
}
