import type { GoogleRating, GoogleReview } from "@/content/types";

/**
 * Real Google reviews of Provident Insurance Corporation Limited, captured
 * 16 November 2026. Typos are tidied with the meaning unchanged. "posted" is
 * the age Google showed on that date, so refresh this file every few months.
 * Picks and reasoning: /mnt/project-files/provident-reviews/google-review-picks.md
 */

const PLACE = "0x0:0xbd24bcde1f90e1c2";
const reviewUrl = (id: string) =>
  `https://www.google.com/maps/reviews/data=!4m6!14m5!1m4!2m3!1s${id}!2m1!1s${PLACE}`;

export const googleRating: GoogleRating = {
  score: 4.7,
  count: 687,
  url: "https://maps.google.com/?cid=13629226034528313794",
};

const reviews = {
  dhanuka: {
    quote:
      "Thank you Provident Insurance! From the first call I felt well looked after. The staff are so friendly and explain everything clearly. It’s nice to deal with a NZ insurer that actually cares and picks up the phone. They responded fast and covered everything without hassle. Saved me a lot of money and stress. Would definitely recommend!",
    author: "Dhanukaweerapura",
    posted: "3 months ago",
    url: reviewUrl("Ci9DQUlRQUNvZENodHljRjlvT25WdmRIUnJja3hNUzBkek5XUnVRM2ROU1RSNFpsRRAB"),
  },
  zarina: {
    quote:
      "I’ve been with Provident Insurance for more than 20 years and receive top-notch service. The staff are knowledgeable, helpful, patient and supportive when it comes to making a claim. I will continue to insure all my new vehicles with Provident Insurance.",
    author: "Zarina M.",
    posted: "3 months ago",
    url: reviewUrl("Ci9DQUlRQUNvZENodHljRjlvT21aNU5GSTFPREJ3V1dWMVdqTXdPV1JoZFhwTlZWRRAB"),
  },
  maringi: {
    quote:
      "10 out of 10 service team. Customer service was amazing and patient. Made it feel like I was talking to a friend who understood my situation.",
    author: "Maringi M.",
    posted: "5 months ago",
    url: reviewUrl("Ci9DQUlRQUNvZENodHljRjlvT25KS2VVNTRjVWhYTlZGQlRFMXNUM0phVFZaS1MyYxAB"),
  },
  liz: {
    quote:
      "Fast, friendly and efficient support on my claim. Follow-up with my mechanic and Provident Insurance was seamless and stress-free for all of us involved. Thanks Provident!",
    author: "Liz K.",
    posted: "3 weeks ago",
    url: reviewUrl("Ci9DQUlRQUNvZENodHljRjlvT2sxWldsRk1UMmh6VFUxdGNHTk9lVGRSVXpFM1JtYxAB"),
  },
  connor: {
    quote:
      "We had an excellent experience with Provident. Simple things like answering the phone and talking straight away to a real person in NZ who knows about your claim was invaluable. My vehicle had to have a significant amount of work done under the warranty we purchased with it. There was no argument; they just talked to our garage and gave the OK quickly. I would highly recommend them.",
    author: "Connor B.",
    posted: "a year ago",
    url: reviewUrl("Ci9DQUlRQUNvZENodHljRjlvT2tOSE4zRXRZbEphYVVGQlVESXRTbEJuVkhac2FtYxAB"),
  },
  andrew: {
    quote:
      "My experience with Provident Insurance was excellent. I took out mechanical insurance when I purchased a 2nd hand car through a dealer. When a transmission issue came up, a simple phone call had me reassured that everything would be taken care of, and it was. From excellent customer service, advice and communication, it was a good experience. Thanks Provident, highly recommend.",
    author: "Andrew F.",
    posted: "a month ago",
    url: reviewUrl("Ci9DQUlRQUNvZENodHljRjlvT2poRlFuWndZM05uY2pJeFptSlNhMEV3TlRSU2VHYxAB"),
  },
  deidre: {
    quote:
      "I cannot thank Provident enough, another claim on my mechanical insurance handled with efficiency and speed, and hassle-free. I have been using Provident for over 10 years and each time I have been thoroughly impressed with the service. Great work, team.",
    author: "Deidre R.",
    posted: "4 months ago",
    url: reviewUrl("Ci9DQUlRQUNvZENodHljRjlvT2treFVIUmlOa3B6VXkxaFpuQldTa3MwWXpGRmEzYxAB"),
  },
  shayne: {
    quote:
      "Provident have been amazing. The process for my claims with the workshop and the dealer was as smooth as you could ask for. If you are buying a used car, their mechanical breakdown insurance is a no-brainer. The coverage is generous and the excess manageable.",
    author: "Shayne A.",
    posted: "a year ago",
    url: reviewUrl("Ci9DQUlRQUNvZENodHljRjlvT2pScGEyRTNjQzFFVmxZeU0zcEpZMXAzUTBWUFRuYxAB"),
  },
  nick: {
    quote:
      "This is my 3rd claim with this car, and every time has been quickly approved and paid. It is organised directly by my mechanic and I don’t have to lift a finger. Highly recommend.",
    author: "Nick A.",
    posted: "11 months ago",
    url: reviewUrl("Ci9DQUlRQUNvZENodHljRjlvT25ZdGFFVmZZMU5yY2xSR05IZGtka2cwUlVsM1pWRRAB"),
  },
  jase: {
    quote:
      "Huge shoutout to Provident Insurance for being there when I needed them most. Within an hour of my car breaking down, they had everything under control: tow truck, repair shop, and eventually a loan car when repairs took longer than expected. Facing a $3,000 repair bill is a nightmare, but Provident handled it all without question. Their staff are super kind and professional. If you’re looking for insurance that actually delivers on its promises, this is it!",
    author: "Jase T.",
    posted: "6 months ago",
    url: reviewUrl("Ci9DQUlRQUNvZENodHljRjlvT25SWlJYRjFlVjlsWldJMmVrOHdVbEJPVWxOc1VWRRAB"),
  },
  tanya: {
    quote:
      "Wow, that was just so easy to make a claim. Super helpful staff when I phoned them. Had everything sorted in 48 hours. Many thanks. Highly recommend anyone buying a car to get this insurance!",
    author: "Tanya J.",
    posted: "7 months ago",
    url: reviewUrl("Ci9DQUlRQUNvZENodHljRjlvT20xR01VMHhlbEZJZFRaMGQxRnNRakp0U0dwaVQzYxAB"),
  },
  cathy: {
    quote:
      "Competitive rates, the best one we could find, and excellent service. Provident made it so easy and the turnaround was so quick.",
    author: "Cathy W.",
    posted: "3 months ago",
    url: reviewUrl("Ci9DQUlRQUNvZENodHljRjlvT2xjNFpVZGhlSEU0TWxSQ2JHaFdWbUphUldzMmJsRRAB"),
  },
  tui: {
    quote:
      "Buying Provident Insurance was fast and easy. I feel they provide great value for money for car insurance and highly recommend them.",
    author: "Tui D.",
    posted: "6 months ago",
    url: reviewUrl("Ci9DQUlRQUNvZENodHljRjlvT2toS2QzTmxUMlpaYldKVE5VWk5OSFp6UTBsaFdGRRAB"),
  },
  allan: {
    quote:
      "Provident Insurance were very quick in approving my claim and arranging the repairs. Their selection of panel beaters was first class.",
    author: "Allan M.",
    posted: "4 months ago",
    url: reviewUrl("Ci9DQUlRQUNvZENodHljRjlvT2twbU56ZFNSVkJqV0RCTGRreDBWMGRJY1VoWWRFRRAB"),
  },
  sharyn: {
    quote:
      "Super easy. I was really impressed by the speed and efficiency of putting in the claim for a cracked windscreen. No stress and helpful customer service.",
    author: "Sharyn G.",
    posted: "5 months ago",
    url: reviewUrl("Ci9DQUlRQUNvZENodHljRjlvT21kQ2IyNDRRMEozUldKVE9FWXRkMG96TVVkYWFYYxAB"),
  },
  vanessa: {
    quote: "Provident Insurance is amazing. Within the hour of the claim, it had been approved! Thank you!",
    author: "Vanessa P.",
    posted: "3 months ago",
    url: reviewUrl("Ci9DQUlRQUNvZENodHljRjlvT2tRMlEzcHFZVzVoU3pGRmVYRnVWazlzTlhST1dXYxAB"),
  },
  yasmin: {
    quote:
      "Antonio was a pleasure to speak to on the phone and reassured me that the process for a claim on my mechanical insurance was as simple as was mentioned, and he was right: a smooth, successful experience!",
    author: "Yasmin H.",
    posted: "3 months ago",
    url: reviewUrl("Ci9DQUlRQUNvZENodHljRjlvT21GV1dqZEpXWGRUTUcxS1EyWklSVWxFU1dwd2JuYxAB"),
  },
  brenden: {
    quote:
      "I’ve been using Provident for the last seven years, both for mechanical cover on my own vehicle and through my business. Their professionalism and genuine care set them apart. The team goes beyond just looking out for you as a business. They truly support you on a personal level as well. Their service has always been outstanding, and I highly recommend Provident to anyone looking for reliable and customer-focused protection!",
    author: "Brenden F.",
    posted: "a year ago",
    url: reviewUrl("ChZDSUhNMG9nS0VJQ0FnTUNndG9QbmF3EAE"),
  },
} satisfies Record<string, GoogleReview>;

/** Being looked after first, then claims proof. */
export const homeReviews: GoogleReview[] = [
  reviews.dhanuka,
  reviews.zarina,
  reviews.maringi,
  reviews.liz,
  reviews.connor,
];

/** Price and buying first, then accident and windscreen claims. */
export const carReviews: GoogleReview[] = [
  reviews.cathy,
  reviews.allan,
  reviews.tui,
  reviews.sharyn,
  reviews.dhanuka,
  reviews.maringi,
];

/** For a mechanical breakdown page. Only use Jase T. where towing and a loan car are part of the cover. */
export const mechanicalReviews: GoogleReview[] = [
  reviews.andrew,
  reviews.shayne,
  reviews.deidre,
  reviews.nick,
  reviews.tanya,
  reviews.jase,
];

/** For a claims page. */
export const claimsReviews: GoogleReview[] = [
  reviews.vanessa,
  reviews.yasmin,
  reviews.liz,
];

/** For an About or Why Provident page. */
export const aboutReviews: GoogleReview[] = [reviews.connor, reviews.brenden, reviews.zarina];
