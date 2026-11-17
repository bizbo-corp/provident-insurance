/**
 * Content for the client review page at /review, organised by the proposal's
 * initiatives. Each initiative matches a feature id in lib/variants.ts, and
 * each shot matches a file in public/review named
 * `<shot>-<d|m>-<before|after>.webp`.
 */
import type { FeatureId } from "@/lib/variants";

/** `optional` marks a shot of an optional extra rather than the core change. */
export type ReviewShot = { id: string; caption: string; tall?: boolean; optional?: boolean };

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
  problem: string;
  /** A `{ text, optional }` item is an extra beyond what the proposal describes. */
  change: (string | { text: string; optional: true })[];
  /** Questions or approvals we need from Provident. */
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
  description: "Brand colour vs errors, social proof, button hierarchy, progress bar clarity and the car insurance benefits table.",
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
    proposal:
      "Make the page more scannable and easier to understand. Every tick sits in a single column down the right-hand side. Sections are chunked into meaningful categories, each with an icon. Structure only: no copy changes and no re-approval of wording.",
    problem:
      "The live table lists 19 benefits in one long run with only two small dividers. It's hard to see which benefits belong together, and on a phone the ticks fall onto separate lines from the benefit names, which makes the table very long.",
    change: [
      "Benefits are grouped under five headings with icons: Damage & loss, Damage involving someone else, Additional benefits, Because you're with Provident, and Optional extras.",
      "Every ticked cell is shaded a faint Provident pink, so what each cover includes reads at a glance. Headings stay neutral, and thin rules separate the three cover columns.",
      "The column headings sit on a clean white bar with wider columns, and each group opens with a heading strip in a tint between the page and the rows, so the groups are easy to tell apart from each other and from the page.",
      "Within each group, rows that other covers also include move to the bottom, so matching ticks sit together. Damage to your car stays first in Damage & loss; towing ends Because you're with Provident; glass cover and roadside assistance end Optional extras.",
      "Ticks and crosses use one consistent icon set. 'Optional extra' notes sit under the tick and wrap the same way in every column.",
      "On phones the table runs edge to edge with each benefit and its three ticks on one line, which shortens the table by about a sixth. On large phones and small tablets the cover columns stay narrow so benefit names fit on one or two lines.",
      "The policy documents move inside the table as a final group, so each PDF link lines up under its cover. The red Download buttons become simple links.",
      "Benefit wording, the information pop-ups and the document files are unchanged.",
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
    proposal:
      "Add trust signals (customer reviews with star rating) to the Car Insurance and Home page, below the CTA box.",
    problem:
      "Provident's Google rating is strong, but on the live pages visitors only meet reviews after several screens of scrolling. The first screen asks for a quote without giving a reason to trust the company. Further down, the testimonials are two short quotes with first names only (Andy and Andrew, August 2025), the same on every page and impossible to check.",
    change: [
      "A compact review card now sits directly under the hero call to action, with the same side padding as the red panel so the review lines up with the headline. It cycles through reviews chosen for that page, cut to three lines, with position dots centred inside the card.",
      "Clicking a review glides down to the full Google reviews section further down the page (it jumps straight there for anyone who prefers reduced motion). Only 'Read on Google' leaves the site. The overall rating, 4.7 stars from over 687 Google reviews, sits just below the card and links to the Google profile.",
      "The hero image is a little taller on desktop so the card has room. On mobile the card sits under the red panel.",
      {
        text: "The testimonials further down each page are replaced with a Google reviews section: real reviews chosen for that page, with the reviewer's first name and initial, how long ago they posted and a link to the original on Google.",
        optional: true,
      },
      {
        text: "The reviews section has arrow buttons, a position indicator and swipe on touch screens. Each review stays on screen for a time based on its length and pauses on hover, focus or touch, with a pause button and reduced-motion support (WCAG 2.2.2). Long reviews use Read more rather than being cut.",
        optional: true,
      },
    ],
    asks: [
      "The rating and review count are a snapshot from 16 November 2026. We suggest refreshing them every three months.",
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
    title: "Progress bar clarity",
    proposal:
      "Redesign the progress indicator so overall journey length and current position are explicit (labelled steps, step count or percentage).",
    problem:
      "The live quote shows an unlabelled red bar and a small step badge. People can't tell how many steps are left or what comes next, which is a common reason for leaving a form part way through.",
    change: [
      "A header shows 'Step 1 of 4' and four labelled stages: Car, Driver, Cover and Payment. The current stage is in bold and finished stages are filled.",
      "The five screens of the journey are grouped into those four stages, so the journey feels shorter.",
      "On phones the labels are replaced by the current step name next to the step count.",
      "The header moves from black to Provident's light grey with the dark logo, so it feels part of the same brand as the marketing site.",
      "The 'Your quote is ready to go' banner under the header is removed. It told people nothing the page doesn't already show, so the progress header and the quote itself have less competing for attention.",
    ],
    pages: [
      {
        id: "car-step",
        label: "Your car step",
        path: "/quote/car",
        summary: "The first step: Step 1 of 4, with Car highlighted.",
        shots: [{ id: "quote-header", caption: "Header and progress" }],
      },
      {
        id: "quote-step",
        label: "Quote step",
        path: "/quote/cover",
        summary: "Part way through: Step 3 of 4, with Car and Driver complete, and no banner between the progress header and the quote.",
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
    proposal:
      "Reserve the brand red for identity and primary CTAs; move warning and exclusion callouts to a neutral treatment.",
    problem:
      "Information panels in the quote use pink backgrounds and red text, the same colours people associate with errors. 'Your quote is ready to go' and the additional excess note both read as warnings, though neither is a problem.",
    change: [
      "Information panels are now white with a grey outline and dark text. Red is kept for actions and real errors.",
      "The 'Your quote is ready to go' banner is removed altogether, as part of the progress header clarity work in Initiative 03.",
      "The red step badge under the progress bar is removed, since the new progress header already says where you are.",
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
    proposal:
      "Introduce a clear secondary button style so important actions (e.g. Find my car, Update excess) visually outrank elements of less importance. Maintain the primary red as the main CTA on each page.",
    problem:
      "Several buttons on live look disabled when they aren't, and Back is a full-width button with the same weight as Next. 'Find my Car' is a pale outline even when it's ready to press, and 'Update' looks greyed out.",
    change: [
      "'Find my Car' is a solid dark secondary button once a plate is entered, and only looks disabled when it really is.",
      "The found vehicle appears in a tinted panel so it's clear the lookup worked.",
      "'Update' on the car value is a solid dark secondary button rather than a washed-out one.",
      "Back and Next sit side by side, with Back as a smaller outlined button and Next filling the rest of the row, so red stays the one main action.",
      { text: "The Back and Next pair sticks to the bottom of the screen, so the next step is always in reach without scrolling.", optional: true },
      "Long button labels such as 'Continue with Comprehensive' wrap onto two lines on small phones rather than being cut off.",
    ],
    pages: [
      {
        id: "car-step",
        label: "Your car step",
        path: "/quote/car",
        summary: "Find my Car with a plate entered, and the vehicle it finds.",
        shots: [
          { id: "quote-find-car", caption: "Find my Car, with a plate entered" },
          { id: "quote-vehicle", caption: "Vehicle found" },
        ],
      },
      {
        id: "quote-step",
        label: "Quote step",
        path: "/quote/cover",
        summary: "The car value Update button, and Back and Next at the foot of the step.",
        shots: [
          { id: "quote-update", caption: "Car value Update button" },
          { id: "quote-actions", caption: "Back and Next" },
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
    flags: [
      "The name is shown as one word because Google shows it spaced out. We suggest 'Dhanuka W.' to match the other reviewers, if you're comfortable with that.",
    ],
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
  "Caryl P.": {
    googleName: "Caryl Rosette Pasion",
    original:
      "Very smooth transaction! No stress at all. Highly recommended. I just called them, they lodged it and they did everything after that. I just brought my car to the shop and took it when the job is done. No sweat.",
    why: "Plain-language proof that claiming is easy: one call and Provident does the rest. It answers 'how simple is it?' on the home page.",
    flags: ["The last sentence was reworded for grammar more than the others. Please check you're comfortable with it, or we'll restore the original."],
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
  "Debbie E.": {
    googleName: "Debbie Eaton",
    original:
      "I am totally impressed with Provident's mechanical warranty and customer service. They have delivered exactly what I believed I had paid for when I purchased my warranty. My recent experience could not have been less stress free. I informed my mechanic I have a Provident mechanical warranty and paid my excess. The mechanic and Provident did the rest. Straight forward and trustworthy. Thank you.",
    why: "'Delivered exactly what I believed I had paid for' answers the biggest fear about any insurer: will they actually pay?",
    flags: [
      "Debbie wrote 'could not have been less stress free', which literally means the opposite of what she meant. The site shows 'more stress-free'. Please approve this change, or we'll show her original words.",
    ],
  },
  "Keiti H.": {
    googleName: "Keiti Hughes",
    original:
      "I'd share my experience with family and friends. Darren and the team, made me feel like a person, explained proceedings easy to understand!. Well done Provident keep up the good work.",
    why: "'Made me feel like a person' is the looked-after angle for the claims page, where people arrive stressed.",
    flags: ["Please confirm Darren is still on the team."],
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

/** Reviews considered and deliberately left out. */
export const reviewsLeftOut = [
  { who: "Lucky cat Y and Lucia Sola", why: "Excellent but very long. They would need trimming, which counts as editing." },
  { who: "Sussan Goldie", why: "Says Provident paid for everything, fluids included. Another recent reviewer says some parts weren't covered, so featuring it could imply cover that isn't guaranteed." },
  { who: "Reviews naming a dealer or garage", why: "They promote or criticise third parties (for example Enterprise Motor Group, Kawan Collision, Rototuna Service Centre, Archibald Motors)." },
  { who: "Reviews with mixed points", why: "Carly, Colleen Jones and Custom Property Renovations raise complaints about the excess." },
  { who: "Reviews that misspell the brand", why: "Lisa Slaughter ('Prividents') and Bianca Johns ('Providence')." },
  { who: "Payment protection reviews about illness", why: "Several name serious illnesses. We've left these out to protect the reviewers' health information." },
];

/** Waiting on Provident. Glendyr's review isn't on the site yet. */
export const pendingReview = {
  who: "Glendyr Andrews (CreditCare)",
  original:
    "So very stressful time for us, as for medical reasons I had to stop working. We were able to pay all our bills but the care Darren & Shaun went out of their way to help guide us through this difficult times. I would like them to be recognised for their outstanding care, support & understanding. My motto:- Together Everyone Achieves More. Your team is amazing. Thanks for the help we were given",
  why: "Shows CreditCare doing its job at a hard time, and names two staff members for their care.",
  ask: "It mentions a health situation, so we'd like Provident to ask Glendyr's permission before we feature it on the CreditCare page.",
};
