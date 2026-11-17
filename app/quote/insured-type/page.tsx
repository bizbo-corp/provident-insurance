"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useReportAnswers } from "@/lib/quote-progress";
import {
  ChoiceGroup,
  HelpLink,
  Question,
  QuoteStepActions,
} from "@/components/quote/quote-question";
import { nextQuoteStep, previousQuoteStep, quoteStep, quoteStepHref } from "@/lib/quote-flow";

const OPTIONS = [
  { value: "individual", label: "Individual" },
  { value: "company", label: "Company" },
] as const;

export default function QuoteInsuredTypePage() {
  const router = useRouter();
  const [insured, setInsured] = useState<(typeof OPTIONS)[number]["value"] | null>(null);

  useReportAnswers("insured-type", insured === null ? 0 : 1);
  return (
    <div className="mt-[26px]">
      <Question
        done={insured !== null}
        title="Is the vehicle being insured under a company or an individual (main driver name)?"
        isLast
      >
        <HelpLink />
        <ChoiceGroup options={[...OPTIONS]} value={insured} onChange={setInsured} />
      </Question>
      <QuoteStepActions
        nextLabel={insured ? quoteStep("insured-type").nextLabel : undefined}
        onNext={() => router.push(quoteStepHref(nextQuoteStep("insured-type").slug))}
        onBack={() => router.push(quoteStepHref(previousQuoteStep("insured-type").slug))}
      />
    </div>
  );
}
