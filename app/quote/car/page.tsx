"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useReportAnswers } from "@/lib/quote-progress";
import {
  ChoiceGroup,
  HelpLink,
  Question,
  QUOTE_FIELD,
  QuestionNote,
  QuoteButton,
  QuoteField,
  QuoteStepActions,
} from "@/components/quote/quote-question";
import { useFeature } from "@/components/variants/variant-provider";
import { nextQuoteStep, quoteStep, quoteStepHref } from "@/lib/quote-flow";

type YesNo = "yes" | "no" | null;

const YES_NO: { value: "yes" | "no"; label: string }[] = [
  { value: "no", label: "No" },
  { value: "yes", label: "Yes" },
];

const USAGE = [
  { value: "personal", label: "Personal" },
  { value: "business", label: "Business" },
  { value: "both", label: "Both" },
] as const;

const ANTI_THEFT = [
  { value: "none", label: "None" },
  { value: "alarm", label: "Alarm and/or Immobilizer" },
] as const;

const PARKING = [
  { value: "garage", label: "Garage (fully enclosed)" },
  { value: "off-street", label: "Off Street Parking" },
  { value: "other", label: "Other" },
] as const;

const EMPTY_ADDRESS = { building: "", flat: "", street: "", suburb: "", town: "", postcode: "" };

/** Stands in for the live registration lookup, which we can't call locally. */
const SAMPLE_VEHICLE = {
  year: "2019 Toyota",
  model: "Highlander GSU55R GXL Wagon 7st 5dr Spts Auto 8sp 4x4 3.5i",
};

const REGO_PATTERN = /^[A-Z0-9]{1,6}$/;

function PlateDots() {
  return (
    <>
      <span className="absolute top-2 left-2 size-2 rounded-full bg-black/25" />
      <span className="absolute top-2 right-2 size-2 rounded-full bg-black/25" />
      <span className="absolute bottom-2 left-2 size-2 rounded-full bg-black/25" />
      <span className="absolute right-2 bottom-2 size-2 rounded-full bg-black/25" />
    </>
  );
}

export default function QuoteCarPage() {
  const router = useRouter();
  const hierarchy = useFeature("button-hierarchy");

  const [rego, setRego] = useState("");
  const [vehicle, setVehicle] = useState<typeof SAMPLE_VEHICLE | null>(null);
  const [manual, setManual] = useState(false);
  const [year, setYear] = useState("");
  const [make, setMake] = useState("");
  const [usage, setUsage] = useState<(typeof USAGE)[number]["value"] | null>(null);
  const [owesMoney, setOwesMoney] = useState<YesNo>(null);
  const [modified, setModified] = useState<YesNo>(null);
  const [antiTheft, setAntiTheft] = useState<(typeof ANTI_THEFT)[number]["value"] | null>(null);
  const [extraCover, setExtraCover] = useState<YesNo>(null);
  const [addressSearch, setAddressSearch] = useState("");
  const [address, setAddress] = useState(EMPTY_ADDRESS);
  const [parking, setParking] = useState<(typeof PARKING)[number]["value"] | null>(null);

  const carKnown = vehicle !== null || (manual && year !== "" && make !== "");

  const answers = [
    carKnown,
    usage !== null,
    owesMoney !== null,
    modified !== null,
    antiTheft !== null,
    extraCover !== null,
    addressSearch.trim() !== "" ||
      (address.building !== "" && address.street !== "" && address.town !== "" && address.postcode !== ""),
    parking !== null,
  ];

  useReportAnswers("car", answers.filter(Boolean).length);
  // One question at a time: everything up to and including the first unanswered.
  const firstUnanswered = answers.indexOf(false);
  const allDone = firstUnanswered === -1;
  const lastVisible = allDone ? answers.length - 1 : firstUnanswered;
  const isVisible = (index: number) => index <= lastVisible;
  const isLast = (index: number) => index === lastVisible;

  const addressField = (label: string, key: keyof typeof EMPTY_ADDRESS) => (
    <QuoteField
      label={label}
      value={address[key]}
      onChange={(event) => setAddress({ ...address, [key]: event.target.value })}
    />
  );

  return (
    <>
      <h2 className="mt-[26px] mb-8 text-2xl leading-[1.2] font-bold">
        Let&rsquo;s get you a car insurance quote
      </h2>

      <Question done={answers[0]} title="Enter your car registration number" isLast={isLast(0)}>
        <HelpLink />
        <p>If you don&apos;t know your registration number, just leave it blank for now.</p>

        <div className="relative h-14 w-[310px] max-w-full rounded-lg border border-black/30">
          <PlateDots />
          <input
            aria-label="Registration number"
            value={rego}
            maxLength={6}
            autoComplete="off"
            placeholder="M Y R E G O"
            onChange={(event) => {
              setRego(event.target.value.toUpperCase());
              setVehicle(null);
            }}
            className="size-full bg-transparent text-center text-4xl uppercase outline-none placeholder:text-black/25"
          />
        </div>

        <div>
          {vehicle ? (
            <QuoteButton variant="outline" onClick={() => setVehicle(null)}>
              Search again
            </QuoteButton>
          ) : (
            <QuoteButton
              variant={hierarchy ? "dark-wide" : "outline"}
              disabled={!REGO_PATTERN.test(rego)}
              onClick={() => setVehicle(SAMPLE_VEHICLE)}
            >
              Find my Car
            </QuoteButton>
          )}
        </div>

        {vehicle && (
          <div className={hierarchy ? "space-y-4 rounded-lg bg-light-grey p-4" : "space-y-4"} aria-live="polite">
            <p className="text-lg font-bold">{vehicle.year}</p>
            <p><strong>Model:</strong> {vehicle.model}</p>
          </div>
        )}

        {manual ? (
          <div className="space-y-4">
            <p>Or enter your car&apos;s details:</p>
            <QuoteField label="Year" value={year} onChange={(e) => setYear(e.target.value)} />
            <QuoteField label="Make" value={make} onChange={(e) => setMake(e.target.value)} />
          </div>
        ) : (
          <p>
            Or{" "}
            <button type="button" className="text-quote-muted underline" onClick={() => setManual(true)}>
              enter your car&apos;s details
            </button>
          </p>
        )}
      </Question>

      {isVisible(1) && (
        <Question done={answers[1]} title="How will you use this car?" isLast={isLast(1)}>
          <HelpLink />
          <QuestionNote>
            Note: Provident does not currently cover Uber, ride sharing, delivery service or driving schools on our car insurance.
          </QuestionNote>
          <ChoiceGroup options={[...USAGE]} value={usage} onChange={setUsage} />
        </Question>
      )}

      {isVisible(2) && (
        <Question done={answers[2]} title="Do you owe money on the car you are insuring?" isLast={isLast(2)}>
          <HelpLink />
          <ChoiceGroup options={YES_NO} value={owesMoney} onChange={setOwesMoney} />
        </Question>
      )}

      {isVisible(3) && (
        <Question
          done={answers[3]}
          title="Does the vehicle have any of these non-standard modifications or features, Nitrous oxide system (NOS), Roll cage, Full Racing harness?"
          isLast={isLast(3)}
        >
          <ChoiceGroup options={YES_NO} value={modified} onChange={setModified} />
        </Question>
      )}

      {isVisible(4) && (
        <Question done={answers[4]} title="Does your car have an anti-theft device?" isLast={isLast(4)}>
          <HelpLink />
          <ChoiceGroup options={[...ANTI_THEFT]} value={antiTheft} onChange={setAntiTheft} />
        </Question>
      )}

      {isVisible(5) && (
        <Question
          done={answers[5]}
          title="Does the vehicle have any modifications and or accessories that require additional cover greater than $2000?"
          isLast={isLast(5)}
        >
          <HelpLink />
          <ChoiceGroup options={YES_NO} value={extraCover} onChange={setExtraCover} />
        </Question>
      )}

      {isVisible(6) && (
        <Question done={answers[6]} title="Address where you usually keep your car overnight" isLast={isLast(6)}>
          <HelpLink />
          <label className="block text-sm font-bold">
            Search for address
            <input
              value={addressSearch}
              onChange={(event) => setAddressSearch(event.target.value)}
              className={`mt-1 text-base ${QUOTE_FIELD}`}
            />
          </label>
          <p>Or enter the address manually:</p>
          <div className="grid grid-cols-2 gap-4">
            {addressField("Building number", "building")}
            {addressField("Flat number (optional)", "flat")}
          </div>
          {addressField("Street name", "street")}
          {addressField("Suburb", "suburb")}
          {addressField("Town / City", "town")}
          {addressField("Postcode", "postcode")}
        </Question>
      )}

      {isVisible(7) && (
        <Question done={answers[7]} title="Where is your car parked most of the time?" isLast>
          <HelpLink />
          <ChoiceGroup options={[...PARKING]} value={parking} onChange={setParking} />
        </Question>
      )}

      {allDone && (
        <QuoteStepActions
          nextLabel={quoteStep("car").nextLabel}
          onNext={() => router.push(quoteStepHref(nextQuoteStep("car").slug))}
        />
      )}
    </>
  );
}
