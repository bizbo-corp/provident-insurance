import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import { BizboLogo } from "@/components/review/bizbo-logo";
import { FeedbackProvider, ReviewerBar } from "@/components/review/feedback";
import { ReviewNav } from "@/components/review/review-nav";
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
      <div data-surface="review" data-brand="bizbo" className={`${geist.variable} ${geistMono.variable}`}>
        <header className="bz-header">
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
        {/* Full width: the contents nav is pinned to the left edge, the page fills the rest. */}
        <div className="lg:grid lg:grid-cols-[280px_minmax(0,1fr)]">
          <aside className="bz-sidebar border-b border-[var(--hairline)] px-3 py-6 lg:border-r lg:border-b-0">
            <div className="lg:sticky lg:top-0 lg:max-h-screen lg:overflow-auto lg:py-2">
              <ReviewNav />
            </div>
          </aside>
          <main className="min-w-0 px-5 py-10 md:px-10 xl:px-14">
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
