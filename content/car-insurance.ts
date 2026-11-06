import { LIVE_ORIGIN, QUOTE_HREF } from "@/content/site";
import type { Hero, IconCard } from "@/content/types";

const doc = (path: string) => `${LIVE_ORIGIN}/assets/documents/${path}`;

export const carHero: Hero = {
  image: "/images/shutterstock_2600036369-hero.jpg",
  title: "Car insurance for Kiwi drivers",
  subtitle: "Driven by care:  fair pricing, no-surprises claims, local support.",
  ctaLabel: "Get a car insurance quote",
  ctaHref: QUOTE_HREF,
};

export const coverLevelsIntro = {
  title: "Choose the car insurance that’s right for you",
  body: "Even the most careful drivers can have a bad day. That’s why our car insurance is designed with care, with three levels of cover to help you find the right fit for you and your car.",
};

export const coverLevels: IconCard[] = [
  {
    icon: "/images/comprehensive-benefit-card-icon.png",
    title: "Comprehensive",
    body: [
      "Our highest level of car insurance cover, protecting your car against accidental damage, theft and fire, as well as damage you cause to someone else’s vehicle or property.",
      "With a range of additional benefits included, you can drive knowing you’re well covered if something goes wrong.",
    ],
  },
  {
    icon: "/images/third-party-fire-and-theft-benefit-card-icon.png",
    title: "Third Party, Fire & Theft",
    body: [
      "Cover for damage you cause to someone else’s vehicle or property, with added protection if your own car is stolen or damaged by fire.",
      "A good option if you want more protection for your car than Third Party Only, without Comprehensive cover.",
    ],
  },
  {
    icon: "/images/third-party-only-benefit-card-icon.png",
    title: "Third Party Only",
    body: [
      "Our most affordable level of car insurance, covering damage you cause to someone else’s vehicle or property.",
      "It doesn’t cover accidental damage to your own car, but gives you important protection against the potentially high cost of damaging someone else’s property.",
    ],
  },
];

export const coverComparison = {
  title: "Compare your cover options",
  columns: [
    { name: "Comprehensive", badge: "(most popular)" },
    { name: "Third Party, Fire & Theft" },
    { name: "Third Party Only" },
  ],
  documents: [
    {
      label: "Policy wording document",
      hrefs: [
        doc("booklets/[piclmvi0826]-pi-carminder-mvi-booklet---10_26.pdf"),
        doc("booklets/[pitpft0826]_pi_third_party_fire_theft_final.pdf"),
        doc("booklets/[pitp0826]_pi_third_party_final---10_26.pdf"),
      ],
    },
    {
      label: "Benefits, features, exclusions document",
      hrefs: [
        doc("key-benefits-exclusions/key-benefits-and-exclusions---carminder-10_26.pdf"),
        doc("key-benefits-exclusions/key-benefits-and-exclusions---third-party-fire-&-theft---10_26.pdf"),
        doc("key-benefits-exclusions/key-benefits-and-exclusions---third-party-insurance---10_26.pdf"),
      ],
    },
  ],
  summary: "This is a summary only. For all of these benefits, please make sure you read the policy wording to understand the terms, conditions, limits and exclusions that may apply. The provision of cover is subject to underwriting criteria.",
  coolingOff: {
    title: "Cooling off period",
    body: "If you’re not completely satisfied with the terms and conditions of your policy, you can cancel and receive a full refund by notifying us within 21 days of your policy start date (assuming you haven't made a claim under the policy during this time).",
  },
  headsUp: {
    title: "Just a heads up",
    body: "Certain modifications, accessories or business use may affect your cover, so it’s best to check in with us first.",
    rows: [
      ["Business use", "Work use? No problem. Just select business use cover when setting up your policy to ensure you're protected for work related driving."],
      ["Modifications", "Any change to your vehicle that is different from the manufacturer’s original specifications or recommendations and is not an Accessory."],
      ["Accessories", "Items you've added to your vehicle that weren't included by the manufacturer as standard equipment, and they don't affect how the car functions or performs. Examples include roof racks, tow bars and child restraints or seats."],
    ],
  },
};

export const reducePremium: { title: string; cards: IconCard[] } = {
  title: "Ways to reduce your premium",
  cards: [
    { icon: "/images/reduce_excess.svg", alt: "increase excess option icon", title: "Increase your excess" },
    { icon: "/images/pay_anually.svg", alt: "annual payment discount icon", title: "Pay annually and save 9%" },
    { icon: "/images/exclude_drivers.svg", alt: "under 25 driver exclusion icon", title: "Exclude drivers aged under 25 years old" },
    {
      icon: "/images/reduce_agreed_value.svg",
      alt: "car value icon",
      title: "Check the agreed value of your car",
      body: ["(For Comprehensive and Third Party, Fire & Theft cover policies.)"],
    },
  ],
};

export const roadside = {
  title: "Need a hand on the road?",
  lead: "Call 0800 676 864 - we’re here 24 hours a day, 7 days a week.",
  body: [
    "If you’ve got a comprehensive car insurance policy and chosen roadside assistance as an additional optional benefit, you’re covered for up to six roadside callouts each policy year through NZ Roadside Assistance. There’s no excess to pay - just friendly help when you need it most.",
    "Roadside Assistance applies to the car listed in your policy schedule, whether you’re behind the wheel or someone you’ve authorised is driving.",
  ],
  image: "/images/shutterstock_2160264329-four_by_three.jpg",
};

export const closedPlans = {
  title: "Looking for details of our older closed plans?",
  note: "*Policies written prior to June 2024",
  plans: [
    {
      title: "Standard Policy",
      body: "Everyday comprehensive insurance for cars less than 25 years old, available at our Provident Insurance approved distributors.",
      href: `${LIVE_ORIGIN}/assets/documents/web_provmvi06_19.pdf`,
    },
    {
      title: "Luxury Policy",
      body: "Prestige level of comprehensive insurance for NEW cars or USED models less than 10 years old, available exclusively at Provident Insurance approved franchised dealerships.",
      href: `${LIVE_ORIGIN}/assets/documents/webPROVLUXMVI06_19.pdf`,
    },
  ],
};
