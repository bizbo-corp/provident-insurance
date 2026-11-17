import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import { BizboLogo } from "@/components/review/bizbo-logo";
import { FeedbackProvider, ReviewerBar } from "@/components/review/feedback";
import { ReviewNav } from "@/components/review/review-nav";
import { ScrollReset } from "@/components/review/scroll-reset";
import { REVIEW_DATE } from "@/content/review";
import "./bizbo.css";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono" });

export const metadata: Metadata = {
  title: "Version 2 review | Provident Insurance website",
  robots: { index: false, follow: false },
};

/**
 * Client review pages. This is Bizbo's document to Provident, so the chrome
 * uses the Bizbo design system (app/review/bizbo.css). Screenshots and previews
 * of the site keep Provident's own design system.
 */
export default function ReviewLayout({ children }: { children: React.ReactNode }) {
  return (
    <FeedbackProvider>
      <div
        data-surface="review"
        data-brand="bizbo"
        className={`${geist.variable} ${geistMono.variable} lg:flex lg:h-dvh lg:flex-col lg:overflow-hidden`}
      >
        <header className="bz-header lg:shrink-0">
          <div className="flex flex-wrap items-end justify-between gap-4 px-5 py-6 md:px-8">
            <Link href="/review">
              <span className="bz-eyebrow block">Provident Insurance / Conversion Optimisation</span>
              <span className="bz-h3 mt-2 block">Review of the proposed changes</span>
            </Link>
            <div className="bz-wordmark flex flex-col items-start gap-2 sm:items-end sm:text-right">
              <BizboLogo className="h-[30px] w-auto" />
              <span className="bz-muted">Prepared {REVIEW_DATE}</span>
            </div>
          </div>
        </header>
        {/*
          On wide screens the page is a fixed frame: the contents sidebar runs the full height with
          feedback pinned at its foot, and only the page content scrolls. Both panes are positioned,
          so absolutely placed children (such as screen-reader labels) stay inside them instead of
          stretching the window past the frame.
        */}
        <div className="lg:grid lg:min-h-0 lg:flex-1 lg:grid-cols-[280px_minmax(0,1fr)]">
          <aside className="bz-sidebar relative border-b border-[var(--hairline)] px-3 py-6 lg:overflow-y-auto lg:border-r lg:border-b-0 lg:py-8">
            <ReviewNav />
          </aside>
          <main id="review-main" className="relative min-w-0 px-5 py-10 md:px-10 lg:overflow-y-auto xl:px-14">
            <ScrollReset targetId="review-main" />
            <div className="mx-auto max-w-[1080px]">
              <ReviewerBar />
              {children}
            </div>
          </main>
        </div>
      </div>
    </FeedbackProvider>
  );
}
