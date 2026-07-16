"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

/**
 * Docked quote prompt. Render it as the last child of a page's content — the
 * sentinel it leaves in the flow marks where that content ends, so the bar can
 * retract before it reaches the footer.
 */
export function StickyQuoteBar() {
  const endRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const endTop = endRef.current?.getBoundingClientRect().top ?? Infinity;
      setVisible(
        // Hold off while the hero's own CTA is still on screen, and stand down
        // once the content runs out so the footer stays clickable.
        window.scrollY > 500 && endTop > window.innerHeight
      );
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <>
      <div ref={endRef} aria-hidden="true" />
      <div className="pointer-events-none fixed inset-x-0 bottom-0 z-40 flex justify-center px-4">
        <div
          inert={!visible}
          className={`pointer-events-auto flex w-full max-w-7xl flex-wrap items-center justify-center gap-x-4 gap-y-3 rounded-t-3xl bg-secondary px-4 py-4 shadow-[0_-4px_24px_rgba(0,0,0,0.10)] transition-transform duration-300 sm:gap-x-6 sm:px-6 sm:py-5 ${
            visible ? "translate-y-0" : "translate-y-full"
          }`}
        >
          <p className="text-xl font-bold sm:text-3xl">Got a minute?</p>
          <Button
            asChild
            size="lg"
            className="rounded-full px-6 text-base sm:px-8"
          >
            <Link href="/quote">Get a quote</Link>
          </Button>
        </div>
      </div>
    </>
  );
}
