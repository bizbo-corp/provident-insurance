import type { Metadata } from "next";
import { FeedbackControl, FeedbackSummary } from "@/components/review/feedback";

export const metadata: Metadata = { title: "Provident feedback | Provident version 2 review" };

export default function FeedbackPage() {
  return (
            <section className="space-y-5">
              <p className="bz-eyebrow">Review / Feedback</p>
              <h1 className="bz-h2">Provident feedback</h1>
              <p className="bz-lede max-w-2xl">
                Everything you&apos;ve approved or commented on across the review collects here, and it saves as you go. Add any
                general comments below.
              </p>
              <FeedbackControl id="general" label="General comments" />
              <FeedbackSummary />
            </section>
  );
}
