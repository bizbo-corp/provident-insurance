import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { BizboLogo } from "@/components/review/bizbo-logo";
import { safeNext } from "@/lib/site-access";
import "../review/bizbo.css";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono" });

export const metadata: Metadata = { title: "Enter password | Provident conversion optimisation" };

/** Password-only sign-in for the client preview, in Bizbo's design system like the review. No username. */
export default async function UnlockPage({ searchParams }: { searchParams: Promise<{ next?: string; error?: string }> }) {
  const { next, error } = await searchParams;
  return (
    <div
      data-surface="review"
      data-brand="bizbo"
      className={`${geist.variable} ${geistMono.variable} flex min-h-screen items-center justify-center px-5 py-10`}
    >
      <main className="w-full max-w-md">
        <BizboLogo className="mb-8 h-[30px] w-auto" />
        <form method="post" action="/api/unlock" className="bz-cell p-8">
          <p className="bz-eyebrow">Provident Insurance / Conversion Optimisation</p>
          <h1 className="bz-h3 mt-3">Enter the password</h1>
          <p className="bz-muted mt-3 text-sm">Use the password Bizbo sent you to open the review.</p>
          <input type="hidden" name="next" value={safeNext(next)} />
          <label className="mt-6 block text-sm" htmlFor="password">
            <span className="bz-eyebrow mb-2 block">Password</span>
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            autoFocus
            autoComplete="current-password"
            aria-invalid={error ? true : undefined}
            aria-describedby={error ? "password-error" : undefined}
            className="bz-field"
          />
          {error && (
            <p id="password-error" className="bz-warn mt-2 text-sm">
              That password didn&apos;t match. Please try again.
            </p>
          )}
          <span className="bz-guides bz-guides--sm mt-6 inline-flex">
            <button type="submit" className="bz-btn bz-btn--primary">
              Open the review
            </button>
          </span>
        </form>
      </main>
    </div>
  );
}
