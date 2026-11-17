"use client";

import { Car, ShoppingCart, User } from "lucide-react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { QuoteStepper } from "@/components/quote/quote-stepper";
import { useFeature } from "@/components/variants/variant-provider";
import { quoteStepFromPathname } from "@/lib/quote-flow";
import { cn } from "@/lib/utils";

const STEP_ICONS = { car: Car, person: User, cart: ShoppingCart };

/** Black header, unlabelled progress bar and step pill, as on the live quote app. */
export function QuoteShell({ children }: { children: React.ReactNode }) {
  const step = quoteStepFromPathname(usePathname());
  const Icon = STEP_ICONS[step.icon];
  const labelledSteps = useFeature("progress-steps");
  const neutral = useFeature("neutral-panels");
  return (
    <div data-surface="quote" className="min-h-screen bg-white text-quote-ink">
      {labelledSteps ? (
        <header className="bg-light-grey pt-5 pb-4">
          <div className="mx-auto w-full max-w-[784px] px-4 sm:px-6">
            {/* Same logo as the marketing site header. The SVG has padding, so it sits slightly into the header's spacing. */}
            <Image
              src="/images/header-logo.svg"
              alt="Provident Insurance"
              width={375}
              height={143}
              priority
              className="-my-3 -ml-[18px] block h-[72px] w-auto"
            />
            <QuoteStepper step={step} />
          </div>
        </header>
      ) : (
        <header className="flex h-[76px] items-center justify-center bg-quote-ink">
          <Image src="/images/quote-header-logo.svg" alt="Provident Insurance" width={278} height={32} priority />
        </header>
      )}
      <main className="mx-auto w-full max-w-[784px] px-4 pb-16 sm:px-6">
        {step.slug === "cover" && !labelledSteps && (
          <div
            className={cn(
              "mt-4 flex h-[51px] items-center gap-3 rounded-lg border px-4 text-sm",
              neutral ? "border-black/15 text-quote-ink" : "border-quote-accent/40 text-quote-accent"
            )}
          >
            <Car className="size-5" aria-hidden="true" />
            Your quote is ready to go
          </div>
        )}
        {!labelledSteps && (
          <div className="mt-4 py-2">
          <div className="h-2 overflow-hidden rounded bg-quote-track">
            <div className="h-full rounded bg-quote-accent" style={{ width: `${step.progress}%` }} />
          </div>
        </div>
        )}
        {!labelledSteps && !neutral && (
        <div className="mt-[33px] flex h-8 w-fit items-center gap-2 rounded-2xl bg-quote-accent px-2 text-[13px] font-bold text-white">
          <Icon className="size-6" aria-hidden="true" />
          {step.title}
        </div>
        )}
        {children}
      </main>
    </div>
  );
}
