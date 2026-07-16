"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { QuoteCta } from "@/components/quote/quote-cta";
import { useReportSectionProgress } from "@/components/quote/quote-progress";
import {
  ChoiceGroup,
  HelpLink,
  Question,
} from "@/components/quote/quote-question";
import { nextQuoteStep, quoteStepHref } from "@/lib/quote-flow";

type Usage = "personal" | "business" | "both" | null;
type YesNo = "yes" | "no" | null;

const SAMPLE_VEHICLE = {
  year: "2019 Toyota",
  model: "Highlander GSU55R GXL Wagon 7st 5dr Spts Auto 8sp 4x4 3.5i",
};

/** NZ plates are 1-6 alphanumeric characters; require 2+ before searching. */
const REGO_PATTERN = /^[A-Z0-9]{2,6}$/;

export default function QuoteCarPage() {
  const router = useRouter();

  const [rego, setRego] = useState("");
  const [vehicle, setVehicle] = useState<typeof SAMPLE_VEHICLE | null>(null);
  const [usage, setUsage] = useState<Usage>(null);
  const [oweMoney, setOweMoney] = useState<YesNo>(null);
  const [modifications, setModifications] = useState<YesNo>(null);

  const regoIsValid = REGO_PATTERN.test(rego);

  const questions = [vehicle, usage, oweMoney, modifications];
  const firstUnanswered = questions.findIndex((v) => v === null);
  const allDone = firstUnanswered === -1;

  // Reveal one question at a time: everything up to and including the first
  // unanswered one. Answers are kept in state, so a question that hides again
  // (e.g. after "Search again") comes back with its answer intact.
  const lastVisible = allDone ? questions.length - 1 : firstUnanswered;
  const isVisible = (index: number) => index <= lastVisible;

  // The rego lookup carries half this step's weight: arriving shows a 25%
  // baseline, finding the car takes it to 50%, and the three follow-up
  // questions share the remaining half.
  const followUps = [usage, oweMoney, modifications];
  const followUpsAnswered = followUps.filter((v) => v !== null).length;
  useReportSectionProgress(
    vehicle === null
      ? 0.25
      : 0.5 + 0.5 * (followUpsAnswered / followUps.length)
  );

  const following = nextQuoteStep("car");

  function handleRegoChange(value: string) {
    setRego(value.toUpperCase());
    // A different plate invalidates the previously matched vehicle.
    setVehicle(null);
  }

  return (
    <>
      <h1 className="mt-8 text-3xl font-bold text-foreground sm:text-4xl">
        Let&rsquo;s get you a car insurance quote
      </h1>

      {/* Divider + generous gap so the eye lands on the input area next. */}
      <hr className="mt-8 border-border" />

      <div className="mt-10">
        <Question
          done={vehicle !== null}
          title="Enter your car registration number"
          isLast={lastVisible === 0}
        >
          <HelpLink />
          <p className="text-lg">
            If you don&rsquo;t know your registration number, you can enter your
            car&rsquo;s details instead.
          </p>

          <div className="max-w-md space-y-4">
            <Label htmlFor="rego" className="sr-only">
              Car registration number
            </Label>
            <div className="relative rounded-md border-2 border-foreground/30 bg-white px-8">
              <span className="absolute left-3 top-3 size-1.5 rounded-full bg-gray-300" />
              <span className="absolute right-3 top-3 size-1.5 rounded-full bg-gray-300" />
              <span className="absolute bottom-3 left-3 size-1.5 rounded-full bg-gray-300" />
              <span className="absolute bottom-3 right-3 size-1.5 rounded-full bg-gray-300" />
              <Input
                id="rego"
                value={rego}
                onChange={(e) => handleRegoChange(e.target.value)}
                placeholder="ABC123"
                maxLength={6}
                autoComplete="off"
                className="h-24 border-0 bg-transparent text-center font-sans !text-5xl font-medium tracking-wider shadow-none placeholder:text-foreground/25 focus-visible:ring-0"
              />
            </div>
            {/* The lookup is a supporting action, so it's black rather than
                red — red stays reserved for Next. Once a car is found this
                drops again to the quieter outline variant. */}
            {vehicle ? (
              <QuoteCta
                variant="outline"
                onClick={() => setVehicle(null)}
                className="w-full"
              >
                Search again
              </QuoteCta>
            ) : (
              <QuoteCta
                variant="secondary"
                inactive={!regoIsValid}
                hint="Enter a registration number to continue"
                onClick={() => setVehicle(SAMPLE_VEHICLE)}
                className="w-full"
              >
                Find my Car
              </QuoteCta>
            )}
          </div>

          {vehicle && (
            <div className="space-y-3 rounded-lg bg-muted p-6" aria-live="polite">
              <p className="text-xl font-bold">{vehicle.year}</p>
              <p className="text-lg">
                <strong>Model:</strong> {vehicle.model}
              </p>
            </div>
          )}

          <p className="text-lg">
            Or{" "}
            <button
              type="button"
              className="underline underline-offset-2 hover:text-primary"
            >
              enter your car&rsquo;s details
            </button>
          </p>
        </Question>

        {isVisible(1) && (
          <Question
            done={usage !== null}
            title="How will you use this car?"
            isLast={lastVisible === 1}
          >
            <ChoiceGroup
              options={[
                { value: "personal", label: "Personal" },
                { value: "business", label: "Business" },
                { value: "both", label: "Both Personal and Business" },
              ]}
              value={usage}
              onChange={setUsage}
            />

            <div className="space-y-4 rounded-lg bg-red-50 p-6 text-[#7a3b35]">
              <p>
                <strong>Personal &amp; Business</strong>: Any use, however the
                following business uses are not covered:
              </p>
              <ul className="list-disc space-y-1 pl-6">
                <li>Taxi, Uber, or similar fare-paying passenger services</li>
                <li>
                  Courier or delivery services (e.g., Uber Eats or similar food
                  delivery service)
                </li>
                <li>Driver education and training</li>
              </ul>
              <p>
                <strong>Business</strong>: If the vehicle is ONLY used for
                business purposes and no private / personal use. e.g. a work pool
                car that is used only during work hours and parked when not in
                use on work premises.
              </p>
              <p>
                <strong>Personal</strong>: Never used in connection with a
                business, profession, or occupation other than driving to and
                from a place of work (commuting) or to partake in volunteer work.
              </p>
            </div>
          </Question>
        )}

        {isVisible(2) && (
          <Question
            done={oweMoney !== null}
            title="Do you owe money on the car you are insuring?"
            isLast={lastVisible === 2}
          >
            <HelpLink />
            <ChoiceGroup
              options={[
                { value: "no", label: "No" },
                { value: "yes", label: "Yes" },
              ]}
              value={oweMoney}
              onChange={setOweMoney}
            />
          </Question>
        )}

        {isVisible(3) && (
          <Question
            done={modifications !== null}
            title="Does the vehicle have any of these non-standard modifications or features, Nitrous oxide system (NOS), Roll cage, Full Racing harness?"
            isLast
          >
            <ChoiceGroup
              options={[
                { value: "no", label: "No" },
                { value: "yes", label: "Yes" },
              ]}
              value={modifications}
              onChange={setModifications}
            />
          </Question>
        )}
      </div>

      <hr className="border-border" />

      {/* Revealed once every question is answered, so it's never a dead grey
          button competing with "Find my Car". This is step one, so there's no
          Back to sit alongside it. */}
      {allDone && (
        <div className="mt-8 animate-in pl-13 fade-in-0 duration-300">
          <QuoteCta
            className="w-full"
            onClick={() => {
              if (following) router.push(quoteStepHref(following.slug));
            }}
          >
            Next
          </QuoteCta>
        </div>
      )}
    </>
  );
}
