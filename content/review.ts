/**
 * Content for the client review page at /review, organised by the proposal's
 * initiatives. Each initiative matches a feature id in lib/variants.ts, and
 * each shot matches a file in public/review named
 * `<shot>-<d|m>-<before|after>.webp`.
 */
import type { FeatureId } from "@/lib/variants";

/** `optional` marks a shot of an optional extra rather than the core change. */
/** `note` explains what to look for in this pair. */
export type ReviewShot = { id: string; caption: string; note?: string; tall?: boolean; optional?: boolean };

/** One page (or quote step) where an initiative shows up. */
export type InitiativePage = {
  id: string;
  label: string;
  path: string;
  /** What to look for on this page. */
  summary: string;
  shots: ReviewShot[];
};

export type Initiative = {
  id: string;
  feature: FeatureId;
  /** Its place in the review, ordered by impact (high first) then effort (low first), such as "Initiative 01". */
  ref: string;
  /** Short label for navigation: the number alone. */
  short: string;
  /** Ratings from the proposal, where it gives them. */
  scores?: { impact: number; effort: number };
  title: string;
  /** The proposal's own recommendation, quoted so the client can match it. */
  proposal?: string;
  /** The proposal's wireframe for this initiative, in public/review. */
  wireframe?: { src: string; alt: string };
  problem: string;
  /** A `{ text, optional }` item is an extra beyond what the proposal describes. */
  change: (string | { text: string; optional: true })[];
  /** Questions or approvals needed from Provident. */
  asks?: string[];
  pages: InitiativePage[];
};

export const FIGMA_SITE_URL = "https://www.figma.com/design/BeVuiNJCqEuzWBXuyMLcJi";
export const FIGMA_LIBRARY_URL = "https://www.figma.com/design/XPjkbiazUJDWvh4LRYR7cC";
export const REVIEW_DATE = "16 November 2026";
export const PACKAGE_NAME = "Conversion core";
export const PACKAGE_SUMMARY = {
  name: PACKAGE_NAME,
  scope: "Medium · Initiatives 1 to 5",
  description: "Brand colour vs errors, social proof, button hierarchy, the quote header and progress bar, and the car insurance benefits table.",
  price: "$2,850 + GST",
};

export const initiatives: Initiative[] = [
  {
    id: "benefits-table",
    feature: "benefits-table",
    ref: "Initiative 01",
    short: "01",
    scores: { impact: 4.3, effort: 4.0 },
    title: "Car insurance benefits table",
    wireframe: { src: "/review/wireframe-benefits-table.webp", alt: "Proposal wireframe: a benefits comparison table with grouped rows, ticks and crosses per plan, and the comprehensive column highlighted" },
    proposal:
      "Make the page more scannable and easier to understand. Every tick sits in a single column down the right-hand side. Sections are chunked into meaningful categories, each with an icon. Structure only: no copy changes and no re-approval of wording.",
    problem:
      "The live table lists 19 benefits in one long run with only two small dividers. It's hard to see which benefits belong together, and on a phone the ticks fall onto separate lines from the benefit names, which makes the table very long.",
    change: [
      "Benefits are grouped under five headings with icons: Damage & loss, Damage involving someone else, Additional benefits, Because you're with Provident, and Optional extras.",
      "Ticked cells are shaded pink, so it's clear at a glance what each cover includes.",
      "Clearer column headings and group headings make the groups easy to tell apart.",
      "Within each group, benefits shared by other covers sit at the bottom, so matching ticks line up.",
      "On phones each benefit and its ticks fit on one line, making the table shorter.",
      "Policy documents sit inside the table under each cover, as simple links.",
      "Apart from the categorisation and ordering changes, no copy or headings have been changed.",
    ],
    asks: ["Are you happy with the five group headings and which benefits sit under each?"],
    pages: [
      {
        id: "car",
        label: "Car insurance",
        path: "/products/car-insurance",
        summary: "The 'Compare your cover options' section.",
        shots: [{ id: "car-table", caption: "Compare your cover options", tall: true }],
      },
    ],
  },
  {
    id: "social-proof",
    feature: "social-proof",
    ref: "Initiative 02",
    short: "02",
    scores: { impact: 4.2, effort: 2.0 },
    title: "Social proof on product and home pages",
    wireframe: { src: "/review/wireframe-social-proof.webp", alt: "Proposal wireframe: a review card with star rating below the hero quote box" },
    proposal:
      "Add trust signals (customer reviews with star rating) to the Car Insurance and Home page, below the CTA box.",
    problem:
      "Provident's Google rating is strong, but on the live pages visitors only meet reviews after several screens of scrolling. The first screen asks for a quote without giving a reason to trust the company. Further down, the testimonials are two short quotes with first names only (Andy and Andrew, August 2025), the same on every page and impossible to check.",
    change: [
      "A review card sits under the hero call to action, showing reviews chosen for that page.",
      "Clicking a review takes you to the full Google reviews section further down the page.",
      "The Google rating, 4.7 stars from over 687 reviews, sits below the card and links to Google.",
      "The testimonials further down each page become a Google reviews section, with real reviews chosen for that page and a link to each on Google.",
      "Reviewers can browse the reviews section with arrows or by swiping, and long reviews open with Read more.",
    ],
    asks: [
      "The rating and review count are a snapshot from 16 November 2026. Refresh them every three months.",
      "Please approve the reviews chosen for each page and any tidied wording, on the Testimonials page.",
    ],
    pages: [
      {
        id: "home",
        label: "Home page",
        path: "/",
        summary: "Leads with the review that best sums up being looked after, from the first call to a hassle-free claim.",
        shots: [
          { id: "home-hero", caption: "Hero, first screen" },
          { id: "home-reviews", caption: "Customer reviews section, replacing the testimonials", optional: true },
        ],
      },
      {
        id: "car",
        label: "Car insurance",
        path: "/products/car-insurance",
        summary: "Leads with a review about price and value, since car insurance shoppers compare on price.",
        shots: [
          { id: "car-hero", caption: "Hero, first screen" },
          { id: "car-reviews", caption: "Customer reviews section, replacing the testimonials", optional: true },
        ],
      },
    ],
  },
  {
    id: "progress",
    feature: "progress-steps",
    ref: "Initiative 03",
    short: "03",
    scores: { impact: 3.6, effort: 3.0 },
    title: "Quote header and progress bar",
    wireframe: { src: "/review/wireframe-progress-bar.webp", alt: "Proposal wireframe: the unlabelled progress bar before, and labelled steps (Step 1 of 4: Car, Driver, Cover, Payment) after" },
    proposal:
      "Redesign the progress indicator so overall journey length and current position are explicit (labelled steps, step count or percentage).",
    problem:
      "The live quote shows an unlabelled red bar and a small step badge. People can't tell how many steps are left or what comes next, which is a common reason for leaving a form part way through.",
    change: [
      "The header shows three labelled stages: Car, Driver and Cover Options. The quote is complete after Cover Options, so payment isn't a step.",
      "Each stage is sized by its number of questions, so Car, the longest, takes the most room.",
      "The bar fills as each question is answered.",
      "On desktop, once the header scrolls away, a slim copy of the progress bar stays at the top.",
      "The header changes from black to Provident's light grey, to match the main website.",
      "The 'Your quote is ready to go' banner is removed, so there's less competing for attention.",
    ],
    pages: [
      {
        id: "car-step",
        label: "Your car step",
        path: "/quote/car",
        summary: "The first step, with Car highlighted and filling as each question is answered.",
        shots: [{ id: "quote-header", caption: "Header and progress" }],
      },
      {
        id: "quote-step",
        label: "Quote step",
        path: "/quote/cover",
        summary: "The last step, with Car and Driver complete, and no banner between the progress header and the quote.",
        shots: [{ id: "quote-cover-top", caption: "Header and progress" }],
      },
    ],
  },
  {
    id: "brand-colour",
    feature: "neutral-panels",
    ref: "Initiative 04",
    short: "04",
    scores: { impact: 3.2, effort: 1.0 },
    title: "Distinguish brand colour from errors and warnings",
    wireframe: { src: "/review/wireframe-brand-colour.webp", alt: "Proposal wireframe: a red warning panel before, and a neutral panel after" },
    proposal:
      "Reserve the brand red for identity and primary CTAs; move warning and exclusion callouts to a neutral treatment.",
    problem:
      "Information panels in the quote use pink backgrounds and red text, the same colours people associate with errors. 'Your quote is ready to go' and the additional excess note both read as warnings, though neither is a problem.",
    change: [
      "Information panels are now white with a grey outline. Red is kept for actions and real errors.",
      "The 'Your quote is ready to go' banner is removed, as part of Initiative 03.",
      "The red step badge is removed, since the new progress header shows where you are.",
    ],
    pages: [
      {
        id: "quote-step",
        label: "Quote step",
        path: "/quote/cover",
        summary: "The top of the quote step, and the additional excess notice under the excess picker.",
        shots: [
          { id: "quote-cover-top", caption: "Top of the quote step" },
          { id: "quote-notice", caption: "Additional excess notice" },
        ],
      },
    ],
  },
  {
    id: "button-hierarchy",
    feature: "button-hierarchy",
    ref: "Initiative 05",
    short: "05",
    scores: { impact: 3.2, effort: 1.5 },
    title: "Button hierarchy",
    wireframe: { src: "/review/wireframe-button-hierarchy.webp", alt: "Proposal wireframe: outline Find my car and Update buttons before, solid dark buttons after" },
    proposal:
      "Introduce a clear secondary button style so important actions (e.g. Find my car, Update excess) visually outrank elements of less importance. Maintain the primary red as the main CTA on each page.",
    problem:
      "Several buttons on live look disabled when they aren't, and Back is a full-width button with the same weight as Next. 'Find my Car' is a pale outline even when it's ready to press, and 'Update' looks greyed out.",
    change: [
      "'Find my Car' is a solid dark button once a plate is entered.",
      "The found vehicle appears in a tinted panel, so it's clear the lookup worked.",
      "'Update' on the car value is a solid dark button rather than a washed-out one.",
      "Back is a smaller outlined button beside Next, so red stays the one main action.",
      { text: "Back and Next stay at the bottom of the screen, so the next step is always in reach.", optional: true },
      "Long button labels wrap onto two lines on small phones rather than being cut off.",
    ],
    pages: [
      {
        id: "car-step",
        label: "Your car step",
        path: "/quote/car",
        summary: "Find my Car with a plate entered, and the vehicle it finds.",
        shots: [
          {
            id: "quote-find-car",
            caption: "Find my Car, with a plate entered",
            note: "On live, Find my Car is a pale outline and looks disabled. In version 2 it's a solid dark button, ready to press.",
          },
          { id: "quote-vehicle", caption: "Vehicle found" },
        ],
      },
      {
        id: "quote-step",
        label: "Quote step",
        path: "/quote/cover",
        summary: "The car value Update button, and Back and Next at the foot of the step.",
        shots: [
          {
            id: "quote-update",
            caption: "Car value Update button",
            note: "On live, Update is washed out until the value changes, so it reads as switched off. In version 2 it's a solid dark secondary button.",
          },
          {
            id: "quote-actions",
            caption: "Back and Next",
            note: "On live, Back is a full-width button under Next with the same weight. In version 2 Back is a smaller outlined button beside Next, so red stays the one main action.",
          },
        ],
      },
    ],
  },
];

/* ------------------------------------------------------------------ */
/* Testimonials                                                         */
/* ------------------------------------------------------------------ */

export type ReviewNote = {
  /** Text exactly as posted on Google, for comparison with what the site shows. */
  original: string;
  /** Name as it appears on Google. */
  googleName: string;
  why: string;
  flags?: string[];
};

/** Keyed by the author name the site shows (content/google-reviews.ts). */
export const reviewNotes: Record<string, ReviewNote> = {
  Dhanukaweerapura: {
    googleName: "d h a n u k a w e e r a p u r a",
    original:
      "Thank you Provident Insurance! From the first call I felt well looked after. The staff are so friendly and explain everything clearly. It’s nice to deal with a NZ insurer that actually cares and picks up the phone responded fast and covered everything without hassle. Saved me a lot of money and stress. Would definitely recommend!",
    why: "The best single review for the home page. It covers every brand promise in one go: looked after from the first call, friendly people, clear explanations, a New Zealand insurer that picks up the phone, a hassle-free claim and money saved. Provident's own reply ties it to 'Driven by Care'.",
  },
  "Zarina M.": {
    googleName: "Zarina Mahomed",
    original:
      "I've been with Provident Insurance for more than 20 years and receive top notch service. The staff are knowledgeable, helpful, patient and supportive when it comes to making a claim. I will continue to insure all my new vehicles with Provident Insurance.",
    why: "Twenty years of loyalty is the strongest trust signal in the whole set, and 'I will continue to insure all my new vehicles' is a reason to choose Provident, not just a happy claim.",
  },
  "Maringi M.": {
    googleName: "Maringi Morunga",
    original:
      "10 out of 10 service team. Customer service was amazing and patient. Made it feel like I was talking to a friend who understood my situation.",
    why: "Short, warm and human. 'Talking to a friend who understood my situation' is the emotional side of the care message, and it reads in a few seconds.",
  },
  "Liz K.": {
    googleName: "Liz Kerapa",
    original:
      "Fast, friendly and efficient support on my claim. Follow up with my mechanic and Provident Insurance was seamless and stress free for all of us involved. Thanks Provident!",
    why: "The newest of the strong reviews, short enough for a carousel, and it shows Provident working directly with the customer's mechanic.",
  },
  "Connor B.": {
    googleName: "Connor Brady",
    original:
      "We had an excellent experience with Provident. Simple things like answering the phone and talking straightaway to a real person in NZ who knows about your claim was invaluable. My vehicle had to have a significant amount work done under the warranty we purchased with it. There was no argument they just talked to our garage and gave the OK quickly. I would highly recommend them.",
    why: "'A real person in NZ who knows about your claim' is the clearest statement of what sets Provident apart from big call-centre insurers.",
  },
  "Cathy W.": {
    googleName: "Cathy White",
    original:
      "Competitive rates - best one we could find, and excellent service. Provident made it so easy and turn-around was so quick.",
    why: "The only recent review that says Provident beat the alternatives on price ('best one we could find') while also praising service. It leads the car insurance page because shoppers there compare on price.",
  },
  "Tui D.": {
    googleName: "Tui D",
    original:
      "Buying Provident Insurance was fast and easy. I feel they provide great value for money for car insurance and highly recommend them.",
    why: "About buying rather than claiming, so it supports the 'get a quote' step, and it names car insurance specifically.",
  },
  "Allan M.": {
    googleName: "Allan Morgan",
    original:
      "Provident Insurance were very quick in approving my claim and arranging the repairs. Their selection of the Panel Beater’s was first class.",
    why: "Speaks to the accident claim journey (approval plus panel beater), the car insurance version of the mechanic story.",
  },
  "Sharyn G.": {
    googleName: "Sharyn Gosnell",
    original:
      "Super easy. I was really impressed by the speed and efficiency of putting the claim for a cracked windscreen. No stress and helpful customer service",
    why: "Windscreen claims are the most common small claim (Google groups nine 'windscreen claim' reviews). It supports the excess-free glass cover option.",
  },
  "Andrew F.": {
    googleName: "Andrewmarine Fletcher",
    original:
      "My experience with Provident insurance was excellent.I took out mechanical insurance when I purchased a 2nd hand car through a dealer.when a transmission issue came up a simple phone call had me reassured that everything would be taken care of,and it was.From excellent customer service advise and communication it was a good experience. Thanks Provident,highly reccomend.",
    why: "The ideal mechanical breakdown story: bought second hand through a dealer, transmission failed, one phone call, 'taken care of, and it was'. It mirrors how most customers buy this cover.",
  },
  "Deidre R.": {
    googleName: "Deidre Rutherford",
    original:
      "I cannot thank Provident enough, another claim on my mechanical insurance handled with efficiency, speed and hassle free. I have been using Provident for over 10 years and each time I have been thoroughly impressed with the service. Great work Team.",
    why: "Repeat claims over ten years show the cover keeps paying out, not just once.",
  },
  "Shayne A.": {
    googleName: "Shayne Archer",
    original:
      "Provident have been amazing. The process for my claims with the workshop and the dealer was as smooth as you could ask for. If you are buying a used car, their mechanical breakdown insurance is a no brainer. the coverage is generous and excess manageable.",
    why: "Practically a headline for the page: 'If you are buying a used car, their mechanical breakdown insurance is a no-brainer.' It also speaks to coverage and excess, the two things buyers compare.",
    flags: ["Posted a year ago, so it should be the first to rotate out when a newer equivalent appears."],
  },
  "Nick A.": {
    googleName: "Nick Alcock",
    original:
      "This is my 3rd claim with this car, and every time has been quickly approved and paid. It is organised directly by my mechanic and i don't have to lift a finger. Highly recommend",
    why: "'Don't have to lift a finger' sells the mechanic-led claim process, and three approved claims on one car is strong proof.",
  },
  "Tanya J.": {
    googleName: "Tanya jenkins",
    original:
      "Wow, that was just so easy to make a claim. Super helpful staff when I phoned them. Had everything sorted in 48 hours. Many thanks. Highly recommend anyone buying a car to get this insurance!",
    why: "Ends with a direct recommendation to car buyers, the exact audience for this cover. 'Sorted in 48 hours' is a speed claim from a customer rather than from Provident.",
  },
  "Jase T.": {
    googleName: "Jase Te Patu",
    original:
      "Huge shoutout to Provident Insurance for being there when I needed them most. Within an hour of my car breaking down, they had everything under control - tow truck, repair shop, and eventually a loan car when repairs took longer than expected. Facing a $3,000 repair bill is a nightmare, but Provident handled it all without question. Their staff are super kind and professional. If you're looking for insurance that actually delivers on its promises, this is it!",
    why: "The most vivid breakdown story: within an hour, tow truck, repairer and loan car, and a $3,000 bill handled.",
    flags: [
      "Only use this where towing and a loan car are part of the cover being sold, otherwise it implies benefits the reader may not get (Fair Trading Act).",
    ],
  },
  "Vanessa P.": {
    googleName: "vanessa parker",
    original: "Provident insurance is amazing. Within the hour of the claim it had been approved! Thank you!",
    why: "The fastest, punchiest claims proof in the set. Very short, so it suits a highlight.",
  },
  "Yasmin H.": {
    googleName: "Yasmin Howell",
    original:
      "Antonio was a pleasure to speak to on the phone, reassured me that the process for a claim on my mechanical insurance was as simple as was mentioned and he was right - smooth, successful, experience!",
    why: "Names a real staff member, which makes 'real people answer the phone' believable.",
    flags: ["Please confirm Antonio is still on the team before this goes live."],
  },
  "Brenden F.": {
    googleName: "brenden fouse",
    original:
      "I’ve been using Provident for the last seven years. Both for mechanical cover on my own vehicle and through my business. Their professionalism and genuine care set them apart. The team goes beyond just looking out for you as a business They truly support you on a personal level as well. Their service has always been outstanding, and I highly recommend Provident to anyone looking for reliable and customer-focused protection!",
    why: "Covers both personal and business customers and uses the word 'care', which matches 'Driven by Care'.",
  },
};

/** Why each page's list is ordered the way it is. */
export const reviewOrder: Record<string, string> = {
  home: "Being looked after first, then proof that claims are easy.",
  car: "Price and buying first, since car insurance shoppers compare on price, then accident and windscreen claims, then general service.",
  mechanical: "Second-hand car buyers worried about a big repair bill: dealer purchase, breakdown, and claims handled through the mechanic.",
  claims: "Speed and simplicity of claiming, then being treated as a person.",
  about: "What sets Provident apart: real people in New Zealand, genuine care and long-term loyalty.",
};

export const reviewCarSharedNote =
  "Also used on the home page. Here it rounds out the carousel with general service proof.";

/**
 * Reading order for Back and Next: the initiatives, with the testimonials
 * straight after Social proof (they belong to it), then Provident feedback.
 */
export const REVIEW_SEQUENCE: { href: string; label: string }[] = [
  ...initiatives.flatMap((initiative) => {
    const step = { href: `/review/${initiative.id}`, label: `${initiative.short} ${initiative.title}` };
    return initiative.id === "social-proof" ? [step, { href: "/review/testimonials", label: "Testimonial review" }] : [step];
  }),
  { href: "/review/feedback", label: "Provident feedback" },
];

export function neighbours(href: string) {
  const index = REVIEW_SEQUENCE.findIndex((step) => step.href === href);
  return {
    previous: index > 0 ? REVIEW_SEQUENCE[index - 1] : { href: "/review", label: "the overview" },
    next: index >= 0 ? REVIEW_SEQUENCE[index + 1] : undefined,
  };
}
