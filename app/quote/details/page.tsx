"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { QuoteCta } from "@/components/quote/quote-cta";
import { useReportSectionProgress } from "@/components/quote/quote-progress";
import {
  ChoiceGroup,
  HelpLink,
  Question,
  QuestionNote,
} from "@/components/quote/quote-question";
import { QuoteSelect, type SelectOption } from "@/components/quote/quote-select";
import {
  nextQuoteStep,
  previousQuoteStep,
  quoteStepHref,
} from "@/lib/quote-flow";

type Gender = "female" | "male" | "prefer-not-to-say" | null;
type YesNo = "yes" | "no" | null;
type DateParts = { day: string | null; month: string | null; year: string | null };

const EMPTY_DATE: DateParts = { day: null, month: null, year: null };

const MAIN_DRIVER_NOTE =
  "“Main Driver” means the driver who will use the vehicle most of the time.";

const LICENCE_OPTIONS: SelectOption[] = [
  { value: "nz-full", label: "NZ Full (Green)" },
  { value: "nz-restricted", label: "NZ Restricted (Orange)" },
  { value: "nz-learner", label: "NZ Learner (Red)" },
  { value: "overseas", label: "Overseas licence" },
  { value: "international", label: "International licence" },
];

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
].map((label, index) => ({ value: String(index + 1), label }));

const DAYS: SelectOption[] = Array.from({ length: 31 }, (_, i) => ({
  value: String(i + 1),
  label: String(i + 1),
}));

// Evaluated once per render pass on both server and client. Year is stable
// enough not to cause a hydration mismatch outside a new-year boundary.
const CURRENT_YEAR = new Date().getFullYear();

/** Drivers are 16 at the earliest; 100 years back covers the rest. */
const BIRTH_YEARS: SelectOption[] = Array.from({ length: 85 }, (_, i) => {
  const year = CURRENT_YEAR - 16 - i;
  return { value: String(year), label: String(year) };
});

const POLICY_YEARS: SelectOption[] = [CURRENT_YEAR, CURRENT_YEAR + 1].map(
  (year) => ({ value: String(year), label: String(year) })
);

const isDateComplete = (d: DateParts) =>
  d.day !== null && d.month !== null && d.year !== null;

function DateFields({
  idPrefix,
  value,
  onChange,
  years,
}: {
  idPrefix: string;
  value: DateParts;
  onChange: (value: DateParts) => void;
  years: SelectOption[];
}) {
  return (
    <div className="grid max-w-2xl gap-4 sm:grid-cols-[1fr_2fr_1.5fr]">
      <QuoteSelect
        id={`${idPrefix}-day`}
        label="Day"
        placeholder="Day"
        options={DAYS}
        value={value.day}
        onChange={(day) => onChange({ ...value, day })}
      />
      <QuoteSelect
        id={`${idPrefix}-month`}
        label="Month"
        placeholder="Month"
        options={MONTHS}
        value={value.month}
        onChange={(month) => onChange({ ...value, month })}
      />
      <QuoteSelect
        id={`${idPrefix}-year`}
        label="Year"
        placeholder="Year"
        options={years}
        value={value.year}
        onChange={(year) => onChange({ ...value, year })}
      />
    </div>
  );
}

export default function QuoteDriverPage() {
  const router = useRouter();

  const [gender, setGender] = useState<Gender>(null);
  const [birthDate, setBirthDate] = useState<DateParts>(EMPTY_DATE);
  const [licence, setLicence] = useState<string | null>(null);
  const [excludeUnder25, setExcludeUnder25] = useState<YesNo>(null);
  const [atFaultLoss, setAtFaultLoss] = useState<YesNo>(null);
  const [policyStart, setPolicyStart] = useState<DateParts>(EMPTY_DATE);

  const answers = [
    gender !== null,
    isDateComplete(birthDate),
    licence !== null,
    excludeUnder25 !== null,
    atFaultLoss !== null,
    isDateComplete(policyStart),
  ];

  const firstUnanswered = answers.findIndex((done) => !done);
  const allDone = firstUnanswered === -1;

  // Same progressive reveal as the car step: show everything up to and
  // including the first unanswered question.
  const lastVisible = allDone ? answers.length - 1 : firstUnanswered;
  const isVisible = (index: number) => index <= lastVisible;

  useReportSectionProgress(
    answers.filter(Boolean).length / answers.length
  );

  const following = nextQuoteStep("details");
  const preceding = previousQuoteStep("details");

  return (
    <>
      <h1 className="mt-8 text-3xl font-bold text-foreground sm:text-4xl">
        Tell us about the driver
      </h1>

      <hr className="mt-8 border-border" />

      <div className="mt-10">
        <Question
          done={answers[0]}
          title="What is the main driver's gender?"
          isLast={lastVisible === 0}
        >
          <QuestionNote>Note: {MAIN_DRIVER_NOTE}</QuestionNote>
          <ChoiceGroup
            options={[
              { value: "female", label: "Female" },
              { value: "male", label: "Male" },
              { value: "prefer-not-to-say", label: "Prefer not to say" },
            ]}
            value={gender}
            onChange={setGender}
          />
        </Question>

        {isVisible(1) && (
          <Question
            done={answers[1]}
            title="What is the main driver's date of birth?"
            isLast={lastVisible === 1}
          >
            <QuestionNote>Note: {MAIN_DRIVER_NOTE}</QuestionNote>
            <DateFields
              idPrefix="dob"
              value={birthDate}
              onChange={setBirthDate}
              years={BIRTH_YEARS}
            />
          </Question>
        )}

        {isVisible(2) && (
          <Question
            done={answers[2]}
            title="What licence does the main driver hold?"
            isLast={lastVisible === 2}
          >
            <QuestionNote>Note: {MAIN_DRIVER_NOTE}</QuestionNote>
            <QuoteSelect
              id="licence"
              label="Licence type"
              placeholder="Select a licence"
              options={LICENCE_OPTIONS}
              value={licence}
              onChange={setLicence}
              className="max-w-2xl"
            />
          </Question>
        )}

        {isVisible(3) && (
          <Question
            done={answers[3]}
            title="Would you like to exclude drivers under 25 years old?"
            isLast={lastVisible === 3}
          >
            <HelpLink />
            <ChoiceGroup
              options={[
                { value: "no", label: "No" },
                { value: "yes", label: "Yes" },
              ]}
              value={excludeUnder25}
              onChange={setExcludeUnder25}
            />
          </Question>
        )}

        {isVisible(4) && (
          <Question
            done={answers[4]}
            title="In the last three years, has any regular driver of this vehicle suffered loss or damage to a vehicle where they were at fault?"
            isLast={lastVisible === 4}
          >
            <HelpLink />
            <QuestionNote>
              Note: &ldquo;Regular&rdquo; means drivers who will use the vehicle
              at least once a month.
            </QuestionNote>
            <ChoiceGroup
              options={[
                { value: "no", label: "No" },
                { value: "yes", label: "Yes" },
              ]}
              value={atFaultLoss}
              onChange={setAtFaultLoss}
            />
          </Question>
        )}

        {isVisible(5) && (
          <Question done={answers[5]} title="What is the policy start date?" isLast>
            <HelpLink />
            <DateFields
              idPrefix="policy-start"
              value={policyStart}
              onChange={setPolicyStart}
              years={POLICY_YEARS}
            />
          </Question>
        )}
      </div>

      <hr className="border-border" />

      <div className="mt-8 flex items-center gap-4 pl-13">
        <Button
          type="button"
          variant="ghost"
          onClick={() => {
            if (preceding) router.push(quoteStepHref(preceding.slug));
          }}
          className="h-14 shrink-0 rounded-lg px-5 text-base font-bold"
        >
          <ChevronLeft className="size-5" aria-hidden="true" />
          Back
        </Button>
        {allDone && (
          <QuoteCta
            containerClassName="flex-1 animate-in fade-in-0 duration-300"
            className="w-full"
            onClick={() => {
              if (following) router.push(quoteStepHref(following.slug));
            }}
          >
            Next
          </QuoteCta>
        )}
      </div>
    </>
  );
}
