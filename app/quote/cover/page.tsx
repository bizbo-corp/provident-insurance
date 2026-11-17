"use client";

import { CheckCircle2, Download } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AddOnCards } from "@/components/quote/add-on-cards";
import { CoverTable } from "@/components/quote/cover-table";
import { CoverTierCards } from "@/components/quote/cover-tier-cards";
import { ExcessPicker } from "@/components/quote/excess-picker";
import {
  HelpLink,
  QUOTE_FIELD,
  QuoteButton,
  QuoteField,
  QuoteNotice,
  QuoteStepActions,
} from "@/components/quote/quote-question";
import { useFeature } from "@/components/variants/variant-provider";
import {
  addOns,
  additionalExcess,
  coverTiers,
  excessOptions,
  quoteDisclaimer,
  quoteDocuments,
  sampleQuote,
  type AddOnId,
  type CoverTierId,
} from "@/content/quote";
import { nextQuoteStep, previousQuoteStep, quoteStepHref } from "@/lib/quote-flow";

function QuoteSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-12">
      <h2 className="text-2xl leading-[1.2] font-bold">{title}</h2>
      {children}
    </section>
  );
}

export default function QuoteCoverPage() {
  const router = useRouter();
  const hierarchy = useFeature("button-hierarchy");
  const [tierId, setTierId] = useState<CoverTierId>("comprehensive");
  const [value, setValue] = useState(sampleQuote.value);
  const [excess, setExcess] = useState(excessOptions[0]);
  const [selectedAddOns, setSelectedAddOns] = useState<AddOnId[]>(["windscreen"]);
  const [email, setEmail] = useState("");

  const tier = coverTiers.find(({ id }) => id === tierId) ?? coverTiers[0];
  const activeAddOns = addOns.filter(
    (addOn) => addOn.tiers.includes(tierId) && selectedAddOns.includes(addOn.id)
  );

  const toggleAddOn = (id: AddOnId) =>
    setSelectedAddOns((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id]
    );

  return (
    <>
      <p className="mt-6 font-bold">Your quote number: {sampleQuote.number}</p>
      <p className="text-xs font-bold text-quote-muted">Valid until {sampleQuote.validUntil}</p>

      <QuoteSection title="Choose your level of cover">
        <CoverTierCards selected={tierId} onSelect={setTierId} />
      </QuoteSection>

      <QuoteSection title="What's covered">
        <CoverTable selected={tierId} />
      </QuoteSection>

      <QuoteSection title="How much do you want to insure your car for?">
        <div className="mt-4 space-y-4">
          <HelpLink />
          <p>
            You should consider choosing an amount that would cover the replacement of your car if it&apos;s written off or stolen. Choose any value between the minimum and maximum we&apos;ve provided.
          </p>
          <p>
            Please enter a value between <strong>{sampleQuote.minValue}</strong> and <strong>{sampleQuote.maxValue}</strong>.
          </p>
          <div className="flex gap-4">
            <input
              aria-label="Agreed value"
              value={value}
              onChange={(event) => setValue(event.target.value)}
              className={QUOTE_FIELD}
            />
            <QuoteButton
              variant={hierarchy ? "dark" : "back"}
              disabled={!hierarchy && value === sampleQuote.value}
              className="h-14 w-28 shrink-0 px-0 sm:w-44"
            >
              Update
            </QuoteButton>
          </div>
        </div>
      </QuoteSection>

      <QuoteSection title="Choose your excess">
        <div className="mt-4 space-y-4">
          <HelpLink />
          <ExcessPicker options={excessOptions} value={excess} onChange={setExcess} />
          <QuoteNotice title={additionalExcess.title}>
            <p>{additionalExcess.intro}</p>
            <ul className="list-disc pl-6">
              {additionalExcess.items.map((item) => <li key={item}>{item}</li>)}
            </ul>
            <p>{additionalExcess.footnote}</p>
          </QuoteNotice>
        </div>
      </QuoteSection>

      <QuoteSection title="Need some extra cover?">
        <p className="mt-6">
          Protect your car even more with these optional add-ons available for the <strong>{tier.name}</strong> cover.
        </p>
        <AddOnCards tier={tierId} selected={selectedAddOns} onToggle={toggleAddOn} />
      </QuoteSection>

      <QuoteSection title="Save the quote for later">
        <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-end">
          <QuoteField
            label="Email"
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="grow"
          />
          <QuoteButton variant="dark" className="h-14 shrink-0 sm:w-56">Send quote</QuoteButton>
        </div>
      </QuoteSection>

      <section className="mt-8">
        <h2 className="text-lg font-bold">Here is what you get with your {tier.name}</h2>
        <ul className="mt-3 space-y-3 pl-3 text-sm">
          {activeAddOns.length > 0 && (
            <li className="flex gap-4">
              <CheckCircle2 className="size-5 shrink-0 text-quote-success" aria-hidden="true" />
              Optional benefits: {activeAddOns.map((addOn) => addOn.summary).join(", ")}
            </li>
          )}
          {quoteDocuments.map((document) => (
            <li key={document.label} className="flex gap-4">
              <Download className="size-5 shrink-0 text-quote-success" aria-hidden="true" />
              <a href={document.href} target="_blank" rel="noopener noreferrer" className="text-quote-accent">
                {document.label}
              </a>
            </li>
          ))}
        </ul>
        <p className="mt-4">{quoteDisclaimer}</p>
      </section>

      <QuoteStepActions
        nextLabel={`Continue with ${tier.name}`}
        onNext={() => router.push(quoteStepHref(nextQuoteStep("cover").slug))}
        onBack={() => router.push(quoteStepHref(previousQuoteStep("cover").slug))}
      />
    </>
  );
}
