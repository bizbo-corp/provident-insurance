import { NextResponse } from "next/server";
import { getFeedback, saveFeedback, storeEnabled, type FeedbackEntry } from "@/lib/feedback-store";

/** A reviewer's saved feedback. 404 means the store is off, so the page keeps feedback in the browser. */
export async function GET(request: Request) {
  if (!storeEnabled) return NextResponse.json({ enabled: false }, { status: 404 });
  const reviewer = new URL(request.url).searchParams.get("reviewer")?.trim();
  if (!reviewer) return NextResponse.json({ error: "Missing reviewer" }, { status: 400 });
  return NextResponse.json({ enabled: true, entries: await getFeedback(reviewer) });
}

/** Saves one or more entries for a reviewer: { reviewer, entries: { [id]: entry } }. */
export async function PUT(request: Request) {
  if (!storeEnabled) return NextResponse.json({ enabled: false }, { status: 404 });
  const body = (await request.json().catch(() => null)) as { reviewer?: string; entries?: Record<string, FeedbackEntry> } | null;
  const reviewer = body?.reviewer?.trim();
  if (!reviewer || !body?.entries || typeof body.entries !== "object") {
    return NextResponse.json({ error: "Expected { reviewer, entries }" }, { status: 400 });
  }
  const entries: Record<string, FeedbackEntry> = {};
  for (const [id, entry] of Object.entries(body.entries).slice(0, 100)) {
    entries[id] = {
      label: String(entry?.label ?? id).slice(0, 200),
      verdict: entry?.verdict === "approved" || entry?.verdict === "changes" ? entry.verdict : null,
      note: String(entry?.note ?? "").slice(0, 5000),
      updatedAt: Number(entry?.updatedAt) || Date.now(),
    };
  }
  await saveFeedback(reviewer, entries);
  return NextResponse.json({ ok: true });
}
