import type { Metadata } from "next";
import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Placeholder } from "@/components/placeholder";
import {
  BadgeDollarSign,
  CalendarCheck,
  CarFront,
  CircleCheck,
  CircleHelp,
  Gift,
  Download,
  FileText,
  HandHeart,
  MapPin,
  PackagePlus,
  Phone,
  Quote,
  Scale,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  Star,
  TrendingUp,
  Users,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Car Insurance | Provident Insurance",
  description:
    "Comprehensive car insurance for Kiwi drivers. Driven by care: fair pricing, no-surprises claims, local support.",
};

const featureCards = [
  {
    icon: ShieldCheck,
    title: "Broad cover for life’s surprises.",
    body: "Protection from theft, weather, accidents, windscreen damage and towing",
  },
  {
    icon: BadgeDollarSign,
    title: "Agreed value for total peace of mind.",
    body: "Know exactly what you’ll receive if your car’s written off - no surprises, just clarity and care",
  },
  {
    icon: SlidersHorizontal,
    title: "Excess flexibility that fits you.",
    body: "Choose an excess that suits your budget - simple, fair and in your control",
  },
  {
    icon: Sparkles,
    title: "Tailor your cover your way.",
    body: "Add optional extras like excess-free glass cover, a temporary rental car, roadside assistance or trailer cover - for that extra layer of care",
  },
];

const benefitGroups = [
  {
    heading: "Damage & loss",
    icon: CarFront,
    items: [
      {
        title: "Damage to your car",
        desc: "Whether it’s your accident or someone else’s mistake, we’ll repair your vehicle or pay you so you can get a replacement.",
      },
      {
        title: "Damage caused by fire",
        desc: "If fire, explosion, or lightning damages your car, we’ll get you back on the road with repairs or a payout so you can replace it.",
      },
      {
        title: "Natural disaster damage",
        desc: "Your vehicle is protected against natural disaster damage throughout your coverage period.",
      },
      {
        title: "Theft of your vehicle",
        desc: "If your car is stolen and can’t be recovered, we’ll provide a payout so you can replace it. If it’s found damaged, we’ll cover the repair costs.",
      },
    ],
  },
  {
    heading: "Damage involving someone else",
    icon: Scale,
    items: [
      {
        title: "Claims that were not your fault",
        desc: "We'll refund your excess when another driver causes an accident, so long as you can prove to our satisfaction that they were completely at fault and provide their details so we can recover our costs.",
      },
      {
        title: "Damage caused by an uninsured third party",
        desc: "If an uninsured driver damages your car, you’re still covered. We’ll take care of repairs or provide a payout so you can replace it.",
      },
      {
        title: "Damage to someone else's property",
        desc: "If you accidentally damage someone else's car or property and you're legally liable, we'll cover costs up to $10 million.",
      },
    ],
  },
  {
    heading: "Additional benefits",
    icon: Gift,
    items: [
      {
        title: "Replacement and additional cars",
        desc: "Buying a replacement car? You're automatically covered for up to 7 days on the same terms, provided the new vehicle isn't already insured with someone else.",
      },
      {
        title: "Excess-free keys & locks",
        desc: "Lost, stolen or damaged keys? We'll replace your keys, locks, and coded systems.",
      },
      {
        title: "Child car seats",
        desc: "Cover for child car seats or restraints is included under accessories.",
      },
      {
        title: "Agreed value",
        desc: "Know exactly what you'll receive if your car is written off - the amount we both agree on when you take out or renew your policy each year. Choose an agreed value that matches what you'd pay to replace your car with the same vehicle. If you make a claim, there may be an excess deduction along with any outstanding premium.",
      },
    ],
  },
  {
    heading: "Because you're with Provident",
    icon: HandHeart,
    items: [
      {
        title: "Valet costs",
        desc: "After a break-in damages your car's interior, we'll take care of professional cleaning costs, with no excess to pay.",
      },
      {
        title: "Towing, storage and transport",
        desc: "After an accident, we'll tow your car to safety, arrange storage, and get you and your passengers home safely.",
      },
      {
        title: "Incorrect refuelling",
        desc: "We'll cover fuel removal costs and any engine damage when you've used diesel instead of petrol (or vice versa).",
      },
    ],
  },
  {
    heading: "Optional extras",
    icon: PackagePlus,
    items: [
      {
        title: "Excess-free glass cover",
        desc: "Add this option and you won't pay an excess for windscreen, window, sunroof, headlight, or taillight accidental damage - just pure convenience when you need it most.",
      },
      {
        title: "Rental cover",
        desc: "Keep moving while your car is being repaired or until we settle your claim. We'll cover the reasonable cost of hiring a replacement vehicle, so you're never left stranded. Some conditions apply, see the policy wording for further details.",
      },
      {
        title: "Roadside assistance",
        desc: "Get back on the road with NZ Roadside Assistance. Breakdown services available 24/7 wherever you are in New Zealand - because help should always be just a phone call away.",
      },
      {
        title: "Trailer cover",
        desc: "Protect your trailer too. We'll cover accidental loss or damage to your domestic trailer.",
      },
    ],
  },
];

const headsUpItems = [
  {
    title: "Business use",
    body: "Work use? No problem. Just select business use cover when setting up your policy to ensure you're protected for work related driving.",
  },
  {
    title: "Modifications",
    body: "Any change to your vehicle that is different from the manufacturer’s original specifications or recommendations and is not an Accessory.",
  },
  {
    title: "Accessories",
    body: "Items you've added to your vehicle that weren't included by the manufacturer as standard equipment, and they don't affect how the car functions or performs. Examples include roof racks, tow bars and child restraints or seats.",
  },
];

const premiumTips = [
  { icon: TrendingUp, title: "Increase your excess" },
  { icon: CalendarCheck, title: "Pay annually and get a 10% discount" },
  { icon: Users, title: "Exclude drivers aged under 25 years old" },
  { icon: BadgeDollarSign, title: "Check the agreed value of your car" },
];

const whyChooseUs = [
  {
    icon: HandHeart,
    title: "Driven by care",
    body: "A local support team that goes the extra mile when you need it most. Know you’re in safe hands.",
  },
  {
    icon: BadgeDollarSign,
    title: "Fair pricing, no surprises",
    body: "Clear cover, straightforward pricing and simple claims.",
  },
  {
    icon: MapPin,
    title: "For Kiwi drivers and families",
    body: "Confidence wherever the road takes you. We're the car insurance specialists - it's what we do. We’ve already helped over 100,000 Kiwi drivers.",
  },
];

const testimonials = [
  {
    quote:
      "Massive thanks to the team at Provident Insurance — honestly such a breeze to deal with. Super helpful, great communication, and really supportive throughout my whole claim.",
    name: "Andy",
    date: "August 2025",
  },
  {
    quote:
      "It was so easy to deal with the claims team. No long phone queues, no trying to get out of the claim. This is why you get insurance, and the way it should work. Nice work.",
    name: "Andrew",
    date: "August 2025",
  },
];

const faqs = [
  {
    question: "What is an excess?",
    answer: (
      <p>
        An excess is the amount you are required to contribute towards the
        claim. If you are found to not be liable for the loss / accident, the
        excess may be waived or reimbursed. Each unrelated claim may have an
        excess applied.
      </p>
    ),
  },
  {
    question: "How do I lodge a Car Insurance claim?",
    answer: (
      <div className="space-y-3">
        <p>
          If you have been involved in an incident (that is not a mechanical
          breakdown), we are here to help! We have partnered with NZ Claims
          Services, who act on our behalf to manage your claim from lodgement
          to completion, getting you back on the road without delay.
        </p>
        <p>
          <strong>Windscreen or glass-only claims:</strong> take your vehicle
          to your preferred glass repairer (if your vehicle is under 3 years
          old, we recommend the original dealer so genuine OEM glass is
          fitted). Ask the repairer to email provident@nzcs.org with your
          registration number and the repair cost — we’ll take care of the
          rest.
        </p>
        <p>
          <strong>All other claims:</strong> complete the claim form with
          clear, detailed information and photos of the driver’s licence from
          the time of the incident (front and back). If you’ve been in an
          accident with a Provident Insurance customer and need assistance,
          call 0800 676 864 (option 2) or email provident@nzcs.org.
        </p>
      </div>
    ),
  },
  {
    question: "How do I update / make a change to my policy?",
    answer: (
      <p>
        Simply contact us at service@providentinsurance.co.nz or call 0800 676
        864 and we can help. Keeping your policy details accurate and up to
        date is very important so we want to hear from you.
      </p>
    ),
  },
  {
    question: "How do I cancel Car Insurance policy?",
    answer: (
      <p>
        If you no longer require your Car Insurance and wish to cancel, we
        require this request in writing to service@providentinsurance.co.nz.
        Note that if you are changing your vehicle, we may be able to update
        your current policy instead — call 0800 676 864 to discuss.
      </p>
    ),
  },
  {
    question: "When and why do Car Insurance premiums change?",
    answer: (
      <p>
        Premiums are calculated using a range of factors — some individual
        (claims history, driver details, where you live) and some general
        (repair costs, inflation). Your premium doesn’t change until renewal
        unless you make a specific change to the policy, such as adding a
        driver under 25 or moving to a new area. Your renewal letter is sent a
        few weeks in advance so you can review the terms and premium.
      </p>
    ),
  },
];

const closedPlans = [
  {
    title: "Standard Policy",
    body: "Everyday comprehensive insurance for cars less than 25 years old, available at our Provident Insurance approved distributors.",
  },
  {
    title: "Luxury Policy",
    body: "Prestige level of comprehensive insurance for NEW cars or USED models less than 10 years old, available exclusively at Provident Insurance approved franchised dealerships.",
  },
];

const sectionSteps = [
  "bg-[#f4f2ec]/15",
  "bg-[#f4f2ec]/50",
  "bg-[#f4f2ec]/15",
  "bg-[#f4f2ec]/50",
  "bg-[#f4f2ec]/15",
];

export default function CarInsurancePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative bg-muted">
        <Placeholder
          label="Hero image placeholder"
          className="absolute inset-0 rounded-none border-0"
        />
        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <div className="max-w-xl rounded-3xl bg-primary p-8 text-primary-foreground sm:p-12">
            <h1 className="text-4xl font-bold leading-tight sm:text-5xl">
              Car insurance for Kiwi drivers
            </h1>
            <p className="mt-4 text-lg">
              Driven by care: fair pricing, no-surprises claims, local support.
            </p>
            <Button
              asChild
              size="lg"
              className="mt-8 rounded-full bg-white px-8 text-primary hover:bg-white/90"
            >
              <Link href="#">Get a car insurance quote</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Comprehensive intro + feature cards */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="max-w-3xl">
          <h2 className="text-3xl font-bold sm:text-4xl">
            Our comprehensive car insurance
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Even the most careful drivers can have a bad day. That’s why our
            car insurance is designed with care - packed with the benefits that
            matter most to Kiwi drivers, so you can get back on the road
            feeling confident and looked after.
          </p>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featureCards.map((f) => (
            <Card key={f.title} className="border-border bg-secondary">
              <CardHeader>
                <f.icon className="size-10 text-primary" aria-hidden="true" />
                <CardTitle className="text-xl leading-snug">
                  {f.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                {f.body}
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Benefits */}
      <section className="bg-secondary">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <h2 className="max-w-2xl text-3xl font-bold sm:text-4xl">
            Our comprehensive cover is packed with benefits
          </h2>

          <div className="mt-12 overflow-hidden rounded-xl bg-card ring-1 ring-[#f4f2ec]">
            <Accordion type="multiple">
              {benefitGroups.map((group, groupIndex) => (
                <div key={group.heading} className={sectionSteps[groupIndex]}>
                  <div className="flex items-center gap-2 py-3 pl-6 pr-6 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    <group.icon
                      className="size-6 shrink-0 text-primary"
                      aria-hidden="true"
                    />
                    {group.heading}
                  </div>
                  {group.items.map((item) => (
                    <AccordionItem
                      key={item.title}
                      value={item.title}
                      className="border-[#f4f2ec] pl-14 pr-6 last:border-b-0"
                    >
                      <AccordionTrigger className="items-center py-5 hover:no-underline **:data-[slot=accordion-trigger-icon]:hidden">
                        <span className="flex flex-1 items-center gap-2 text-base font-bold hover:underline">
                          {item.title}
                          <CircleHelp
                            className="size-5 shrink-0 text-muted-foreground"
                            aria-hidden="true"
                          />
                        </span>
                        <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-green-100">
                          <CircleCheck
                            className="size-6 text-green-600"
                            aria-hidden="true"
                          />
                        </span>
                      </AccordionTrigger>
                      <AccordionContent className="max-w-2xl text-base text-muted-foreground">
                        {item.desc}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </div>
              ))}
            </Accordion>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {[
              "Policy wording document",
              "Benefits, features, exclusions document",
            ].map((doc) => (
              <Card key={doc} className="border-border">
                <CardContent className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <FileText
                      className="size-8 text-primary"
                      aria-hidden="true"
                    />
                    <span className="font-medium">{doc}</span>
                  </div>
                  <Button variant="outline" className="rounded-full" asChild>
                    <Link href="#">
                      <Download aria-hidden="true" />
                      Download
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <p className="mt-8 max-w-3xl text-sm text-muted-foreground">
            This is a summary only. For all of these benefits, please make sure
            you read the policy wording to understand the terms, conditions,
            limits and exclusions that may apply. The provision of cover is
            subject to underwriting criteria.
          </p>

          <Card className="mt-8 border-border">
            <CardHeader>
              <CardTitle className="text-xl">Cooling off period</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground">
              If you’re not completely satisfied with the terms and conditions
              of your policy, you can cancel and receive a full refund by
              notifying us within 14 days of your policy start date (assuming
              you haven't made a claim under the policy during this time).
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Just a heads up */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <h2 className="text-3xl font-bold sm:text-4xl">
              Just a heads up
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Certain modifications, accessories or business use may affect
              your cover, so it’s best to check in with us first.
            </p>
            <Accordion type="single" collapsible className="mt-8">
              {headsUpItems.map((item) => (
                <AccordionItem key={item.title} value={item.title}>
                  <AccordionTrigger className="text-lg font-medium">
                    {item.title}
                  </AccordionTrigger>
                  <AccordionContent className="text-base text-muted-foreground">
                    {item.body}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
          <Placeholder className="h-72 lg:h-96" />
        </div>
      </section>

      {/* Ways to reduce premium */}
      <section className="bg-secondary">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <h2 className="text-3xl font-bold sm:text-4xl">
            Ways to reduce your premium
          </h2>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {premiumTips.map((tip) => (
              <Card key={tip.title} className="border-border">
                <CardContent className="flex flex-col items-start gap-4">
                  <tip.icon
                    className="size-10 text-primary"
                    aria-hidden="true"
                  />
                  <p className="text-lg font-medium leading-snug">
                    {tip.title}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Roadside assistance */}
      <section className="bg-primary text-primary-foreground">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:items-center lg:px-8 lg:py-24">
          <div>
            <h2 className="text-3xl font-bold sm:text-4xl">
              Need a hand on the road?
            </h2>
            <p className="mt-4 text-xl font-medium">
              Call 0800 676 864 - we’re here 24 hours a day, 7 days a week.
            </p>
            <p className="mt-6 text-primary-foreground/90">
              If you’ve got a comprehensive car insurance policy and chosen
              roadside assistance as an additional optional benefit, you’re
              covered for up to six roadside callouts each policy year through
              NZ Roadside Assistance. There’s no excess to pay - just friendly
              help when you need it most.
            </p>
            <p className="mt-4 text-primary-foreground/90">
              Roadside Assistance applies to the car listed in your policy
              schedule, whether you’re behind the wheel or someone you’ve
              authorised is driving.
            </p>
            <Button
              asChild
              size="lg"
              className="mt-8 rounded-full bg-white px-8 text-primary hover:bg-white/90"
            >
              <a href="tel:0800676864">
                <Phone aria-hidden="true" />
                0800 676 864
              </a>
            </Button>
          </div>
          <Placeholder
            label="Roadside image placeholder"
            className="h-72 border-white/40 bg-white/10 text-white/70 lg:h-96"
          />
        </div>
      </section>

      {/* Why choose us */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <h2 className="text-3xl font-bold sm:text-4xl">Why choose us</h2>
        <p className="mt-4 text-lg text-muted-foreground">
          There are many great reasons to choose Provident Insurance, here's
          just a few:
        </p>
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {whyChooseUs.map((reason) => (
            <Card key={reason.title} className="border-border bg-secondary">
              <CardHeader>
                <reason.icon
                  className="size-10 text-primary"
                  aria-hidden="true"
                />
                <CardTitle className="text-xl">{reason.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                {reason.body}
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16">
          <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="text-2xl font-bold">
                What our customers and partners say
              </h3>
              <p className="mt-2 text-muted-foreground">
                Check out some of our Google reviews:
              </p>
            </div>
            <Badge className="rounded-full bg-secondary px-4 py-2 text-sm font-bold text-foreground">
              <span className="mr-2 flex text-primary">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`size-4 ${i < 4 ? "fill-current" : "fill-current opacity-40"}`}
                    aria-hidden="true"
                  />
                ))}
              </span>
              4.5 stars on Google reviews
            </Badge>
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            {testimonials.map((t) => (
              <Card key={t.name} className="border-border">
                <CardContent className="space-y-4">
                  <Quote className="size-8 text-primary" aria-hidden="true" />
                  <p className="text-lg">{t.quote}</p>
                  <p className="font-bold">
                    {t.name}{" "}
                    <span className="font-normal text-muted-foreground">
                      ({t.date})
                    </span>
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="bg-secondary">
        <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <h2 className="text-3xl font-bold sm:text-4xl">
            Frequently Asked Questions
          </h2>
          <Accordion type="single" collapsible className="mt-8">
            {faqs.map((faq) => (
              <AccordionItem key={faq.question} value={faq.question}>
                <AccordionTrigger className="text-left text-lg font-medium">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-base text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Closed plans */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <h2 className="text-3xl font-bold sm:text-4xl">
          Looking for details of our older closed plans?
        </h2>
        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {closedPlans.map((plan) => (
            <Card key={plan.title} className="border-border bg-secondary">
              <CardHeader>
                <CardTitle className="text-xl">{plan.title}</CardTitle>
                <CardDescription className="text-base">
                  {plan.body}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex items-center justify-between gap-4">
                <p className="text-sm text-muted-foreground">
                  *Policies written prior to June 2024
                </p>
                <Button variant="outline" className="rounded-full" asChild>
                  <Link href="#">
                    <Download aria-hidden="true" />
                    Download booklet
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </>
  );
}
