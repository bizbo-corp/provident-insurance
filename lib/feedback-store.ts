/**
 * Review feedback, saved in Upstash Redis (added through the Vercel Marketplace).
 * Talks to Upstash's REST API with fetch, so there's no extra package.
 *
 * Keys:
 *   review:reviewers         hash  reviewer key -> display name
 *   review:feedback:<key>    hash  item id -> JSON entry
 *
 * With no Redis variables set (local development), the store reports itself as
 * off and the review pages keep feedback in the browser only.
 */

export type Verdict = "approved" | "changes" | null;
export type FeedbackEntry = { label: string; verdict: Verdict; note: string; updatedAt: number };
export type ReviewerFeedback = { reviewer: string; entries: Record<string, FeedbackEntry> };

const url = process.env.KV_REST_API_URL ?? process.env.UPSTASH_REDIS_REST_URL;
const token = process.env.KV_REST_API_TOKEN ?? process.env.UPSTASH_REDIS_REST_TOKEN;

export const storeEnabled = Boolean(url && token);

const REVIEWERS = "review:reviewers";
const feedbackKey = (reviewerKey: string) => `review:feedback:${reviewerKey}`;

/** "Aaron Smith " and "aaron smith" are the same reviewer. */
export function reviewerKey(name: string) {
  return name.trim().toLowerCase().replace(/\s+/g, " ").slice(0, 60);
}

async function redis<T>(...command: (string | number)[]): Promise<T> {
  if (!url || !token) throw new Error("Feedback store is not configured");
  const response = await fetch(url, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
    body: JSON.stringify(command),
    cache: "no-store",
  });
  const body = (await response.json()) as { result?: T; error?: string };
  if (!response.ok || body.error) throw new Error(body.error ?? `Redis error ${response.status}`);
  return body.result as T;
}

/** HGETALL comes back as a flat [field, value, field, value] list. */
function pairs(flat: string[] | null) {
  const out: Record<string, string> = {};
  for (let index = 0; flat && index < flat.length; index += 2) out[flat[index]] = flat[index + 1];
  return out;
}

function parseEntries(flat: string[] | null) {
  const entries: Record<string, FeedbackEntry> = {};
  for (const [id, json] of Object.entries(pairs(flat))) {
    try {
      entries[id] = JSON.parse(json);
    } catch {}
  }
  return entries;
}

export async function getFeedback(name: string) {
  return parseEntries(await redis<string[]>("HGETALL", feedbackKey(reviewerKey(name))));
}

export async function saveFeedback(name: string, entries: Record<string, FeedbackEntry>) {
  const key = reviewerKey(name);
  const fields = Object.entries(entries).flatMap(([id, entry]) => [id.slice(0, 120), JSON.stringify(entry)]);
  await redis("HSET", REVIEWERS, key, name.trim().slice(0, 60));
  if (fields.length) await redis("HSET", feedbackKey(key), ...fields);
}

export async function getAllFeedback(): Promise<ReviewerFeedback[]> {
  const reviewers = pairs(await redis<string[]>("HGETALL", REVIEWERS));
  return Promise.all(
    Object.entries(reviewers).map(async ([key, reviewer]) => ({
      reviewer,
      entries: parseEntries(await redis<string[]>("HGETALL", feedbackKey(key))),
    }))
  );
}
