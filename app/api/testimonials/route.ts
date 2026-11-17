import { NextResponse } from "next/server";
import { getHiddenTestimonials, setTestimonialShown, testimonialStoreEnabled } from "@/lib/testimonial-store";
import { ALL_TESTIMONIAL_IDS } from "@/lib/testimonials";

/** The ids of hidden testimonials. 404 means there's nowhere to save them (production without Redis). */
export async function GET() {
  if (!testimonialStoreEnabled) return NextResponse.json({ enabled: false }, { status: 404 });
  return NextResponse.json({ enabled: true, hidden: await getHiddenTestimonials() });
}

/** Shows or hides one testimonial on the site: { id, shown }. */
export async function PUT(request: Request) {
  if (!testimonialStoreEnabled) return NextResponse.json({ enabled: false }, { status: 404 });
  const body = (await request.json().catch(() => null)) as { id?: string; shown?: boolean } | null;
  if (!body?.id || !ALL_TESTIMONIAL_IDS.has(body.id) || typeof body.shown !== "boolean") {
    return NextResponse.json({ error: "Expected { id, shown }" }, { status: 400 });
  }
  await setTestimonialShown(body.id, body.shown);
  return NextResponse.json({ ok: true, hidden: await getHiddenTestimonials() });
}
