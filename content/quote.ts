import { LIVE_ORIGIN } from "@/content/site";

export type CoverTierId = "comprehensive" | "third-party-fire-theft" | "third-party";
export type AddOnId = "windscreen" | "loan-car" | "roadside" | "trailer";
export type CoverStatus = "included" | "optional" | "none";

/** Sample figures from a live quote. Real prices come from the insurer's rating engine. */
export const sampleQuote = {
  number: "QP00000000.0",
  validUntil: "7th December 2026",
  minValue: "$16,625",
  maxValue: "$46,550",
  value: "$33,250",
};

export const coverTiers: {
  id: CoverTierId;
  name: string;
  shortName: string;
  popular?: boolean;
  tagline: string;
  dollars: string;
  cents: string;
  annual: string;
  instalments: string;
  description: string;
  benefits: string[];
  footnote?: string;
}[] = [
  {
    id: "comprehensive",
    name: "Comprehensive",
    shortName: "Comprehensive",
    popular: true,
    tagline: "Our broadest level of cover",
    dollars: "$2,367",
    cents: ".64",
    annual: "$2,367.64/yr",
    instalments: "or $236.54 per month · $104.08 per fortnight",
    description: "Covers accidental loss or damage to your car as well as damage you cause to someone else's car or property. Our broadest level of car insurance.",
    benefits: [
      "Accidental damage to your car and others",
      "Cover for a replacement or additional car",
      "Optional benefits: Glass cover, and more",
    ],
  },
  {
    id: "third-party-fire-theft",
    name: "Third Party, Fire & Theft",
    shortName: "TP, Fire & Theft",
    tagline: "Liability + fire and theft cover",
    dollars: "$1,076",
    cents: ".14",
    annual: "$1,076.14/yr",
    instalments: "or $107.51 per month · $47.30 per fortnight",
    description: "Covers damage you cause to other people's vehicles and fire and theft to your vehicle",
    benefits: [
      "Accidental damage to others",
      "Uninsured driver protection",
      "Optional benefits: Glass cover",
    ],
  },
  {
    id: "third-party",
    name: "Third Party",
    shortName: "Third Party",
    tagline: "Essential liability cover",
    dollars: "$281",
    cents: ".37",
    annual: "$281.37/yr",
    instalments: "or $28.11 per month · $12.36 per fortnight",
    description: "Covers damage you cause to other people's vehicles only. There is no cover for your vehicle.",
    benefits: ["Accidental damage to others"],
    footnote: "Please note, agreed value does not apply to Third Party cover.",
  },
];

/** One status per tier, in `coverTiers` order. */
export const coverMatrix: { label: string; statuses: [CoverStatus, CoverStatus, CoverStatus] }[] = [
  { label: "Damage to your vehicle", statuses: ["included", "none", "none"] },
  { label: "Fire damage to your vehicle", statuses: ["included", "included", "none"] },
  { label: "Theft of your vehicle", statuses: ["included", "included", "none"] },
  { label: "Damage to someone else's property or vehicle", statuses: ["included", "included", "included"] },
  { label: "Optional Roadside Assistance", statuses: ["optional", "optional", "optional"] },
  { label: "Optional Windscreen Cover", statuses: ["optional", "optional", "none"] },
  { label: "Optional Trailer Cover", statuses: ["optional", "none", "none"] },
  { label: "Optional Loan Car", statuses: ["optional", "none", "none"] },
];

export const excessOptions = ["$500", "$700", "$950", "$1,200", "$1,450", "$1,700", "$2,200"];

export const additionalExcess = {
  title: "Additional Excess",
  intro: "Please note in the event of a claim being made the following additional excesses will apply for drivers:",
  items: [
    "NZ Restricted Licence: $250",
    "Holding NZ Learner Licence: $500",
    "NZ Supervised Licence: $500",
    "Non-Approved Licence:* $2,000",
    "Drivers Aged 21-24: $200",
  ],
  footnote: "*Licences not issued by New Zealand, Australia, South Africa, UK or Ireland.",
};

export const addOns: {
  id: AddOnId;
  name: string;
  summary: string;
  price: string;
  tiers: CoverTierId[];
}[] = [
  {
    id: "windscreen",
    name: "Excess free windscreen and window claims",
    summary: "excess free windscreen and window claims",
    price: "$59.80",
    tiers: ["comprehensive", "third-party-fire-theft"],
  },
  { id: "loan-car", name: "Loan Car", summary: "loan car", price: "$70.00", tiers: ["comprehensive"] },
  {
    id: "roadside",
    name: "Roadside Assistance",
    summary: "roadside assistance",
    price: "$46.00",
    tiers: ["comprehensive", "third-party-fire-theft", "third-party"],
  },
  { id: "trailer", name: "Trailer Cover", summary: "trailer cover", price: "$95.00", tiers: ["comprehensive"] },
];

export const quoteDocuments = [
  { label: "Download Policy Wording", href: `${LIVE_ORIGIN}/assets/documents/booklets/[piclmvi0826]-pi-carminder-mvi-booklet---10_26.pdf` },
  { label: "Key Benefits and Exclusions", href: `${LIVE_ORIGIN}/assets/documents/key-benefits-exclusions/key-benefits-and-exclusions---carminder-10_26.pdf` },
];

export const quoteDisclaimer =
  "Excesses, cover limits, terms, conditions, and exclusions may apply. For full details please read your schedule and policy wording together as they form your insurance agreement";
