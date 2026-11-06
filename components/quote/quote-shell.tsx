"use client";

import { Car, ShoppingCart, User } from "lucide-react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { quoteStepFromPathname } from "@/lib/quote-flow";

const STEP_ICONS = { car: Car, person: User, cart: ShoppingCart };

/** Black header, unlabelled progress bar and step pill, as on the live quote app. */
export function QuoteShell({ children }: { children: React.ReactNode }) {
  const step = quoteStepFromPathname(usePathname());
  const Icon = STEP_ICONS[step.icon];
  return (
    <div data-surface="quote" className="min-h-screen bg-white text-quote-ink">
      <header className="flex h-[76px] items-center justify-center bg-quote-ink">
        <Image src="/images/quote-header-logo.svg" alt="Provident Insurance" width={278} height={32} priority />
      </header>
      <main className="mx-auto w-full max-w-[784px] px-4 pb-16 sm:px-6">
        {step.slug === "cover" && (
          <div className="mt-4 flex h-[51px] items-center gap-3 rounded-lg border border-quote-accent/40 px-4 text-sm text-quote-accent">
            <Car className="size-5" aria-hidden="true" />
            Your quote is ready to go
          </div>
        )}
        <div className="mt-4 py-2">
          <div className="h-2 overflow-hidden rounded bg-quote-track">
            <div className="h-full rounded bg-quote-accent" style={{ width: `${step.progress}%` }} />
          </div>
        </div>
        <div className="mt-[33px] flex h-8 w-fit items-center gap-2 rounded-2xl bg-quote-accent px-2 text-[13px] font-bold text-white">
          <Icon className="size-6" aria-hidden="true" />
          {step.title}
        </div>
        {children}
      </main>
    </div>
  );
}
