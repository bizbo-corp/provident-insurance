import { promises as fs } from "fs";
import path from "path";
import { connection } from "next/server";
import { redis, storeEnabled } from "@/lib/feedback-store";
import { TESTIMONIAL_PAGES, testimonialId, type TestimonialPage } from "@/lib/testimonials";

/**
 * Which testimonials are hidden on the site. Everything shows unless it has
 * been unticked on /review/testimonials.
 *
 * On Vercel this is the same Upstash Redis as the review feedback
 * (key review:testimonials:hidden, a set of ids like "home:zarina-m").
 * Without the Redis variables (npm run dev on your own machine) it's kept in
 * .next/review-testimonials-hidden.json instead, so the ticks still work locally.
 */
const HIDDEN = "review:testimonials:hidden";
const LOCAL_FILE = path.join(process.cwd(), ".next", "review-testimonials-hidden.json");

/** Ticks can be saved: Redis on Vercel, or the local file in development. */
export const testimonialStoreEnabled = storeEnabled || process.env.NODE_ENV !== "production";

async function readLocal(): Promise<string[]> {
  try {
    const parsed = JSON.parse(await fs.readFile(LOCAL_FILE, "utf8"));
    return Array.isArray(parsed) ? parsed.filter((id) => typeof id === "string") : [];
  } catch {
    return [];
  }
}

export async function getHiddenTestimonials(): Promise<string[]> {
  try {
    if (storeEnabled) return (await redis<string[]>("SMEMBERS", HIDDEN)) ?? [];
    if (testimonialStoreEnabled) return await readLocal();
  } catch {}
  return [];
}

export async function setTestimonialShown(id: string, shown: boolean) {
  if (storeEnabled) {
    await redis(shown ? "SREM" : "SADD", HIDDEN, id);
    return;
  }
  const hidden = new Set(await readLocal());
  if (shown) hidden.delete(id);
  else hidden.add(id);
  await fs.mkdir(path.dirname(LOCAL_FILE), { recursive: true });
  await fs.writeFile(LOCAL_FILE, JSON.stringify([...hidden], null, 2));
}

/** The page's testimonials, less any hidden ones. Read fresh on every request so changes show straight away. */
export async function visibleTestimonials(page: TestimonialPage) {
  await connection();
  const hidden = new Set(await getHiddenTestimonials());
  return TESTIMONIAL_PAGES[page].filter((review) => !hidden.has(testimonialId(page, review)));
}
