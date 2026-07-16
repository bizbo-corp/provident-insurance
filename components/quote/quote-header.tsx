"use client";

import { useEffect, useState } from "react";
import { Logo } from "@/components/logo";
import { QuoteStepper } from "@/components/quote/quote-stepper";
import { cn } from "@/lib/utils";

/**
 * Funnel version of the site header: same grey bar, logo and scroll-away
 * behaviour, minus the nav and buttons. The stepper rides along inside it so
 * progress stays attached to the header while it's stuck to the top.
 */
export function QuoteHeader() {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setHidden(y > lastY && y > 80);
      lastY = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 bg-secondary transition-transform duration-300",
        hidden ? "-translate-y-full" : "translate-y-0"
      )}
    >
      <div className="mx-auto flex h-20 max-w-4xl items-center px-4 sm:px-6 lg:px-8">
        <Logo />
      </div>
      <div className="mx-auto max-w-4xl px-4 pb-4 sm:px-6 lg:px-8">
        <QuoteStepper />
      </div>
    </header>
  );
}
