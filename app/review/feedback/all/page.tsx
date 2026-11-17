import type { Metadata } from "next";
import { getAllFeedback, storeEnabled } from "@/lib/feedback-store";

export const metadata: Metadata = { title: "All feedback | Provident version 2 review" };
export const dynamic = "force-dynamic";

const formatDate = (time: number) =>
  new Intl.DateTimeFormat("en-NZ", { dateStyle: "medium", timeStyle: "short", timeZone: "Pacific/Auckland" }).format(time);

/**
 * Bizbo's view of every reviewer's feedback. The site password lets Provident in,
 * so this page also needs FEEDBACK_ADMIN_KEY, given once in the form below.
 */
export default async function AllFeedbackPage({ searchParams }: { searchParams: Promise<{ key?: string }> }) {
  const { key } = await searchParams;
  const adminKey = process.env.FEEDBACK_ADMIN_KEY;

  if (!storeEnabled) {
    return (
      <section className="space-y-4">
        <h1 className="bz-h2">All feedback</h1>
        <p className="bz-muted">The feedback store isn&apos;t connected here, so feedback is only kept in each reviewer&apos;s browser.</p>
      </section>
    );
  }

  if (!adminKey || key !== adminKey) {
    return (
      <section className="space-y-5">
        <h1 className="bz-h2">All feedback</h1>
        <form className="bz-cell flex max-w-md flex-wrap items-end gap-3 p-4">
          <label className="min-w-[200px] flex-1 text-sm">
            <span className="bz-eyebrow mb-2 block">Bizbo key</span>
            <input name="key" type="password" className="bz-field" autoComplete="off" />
          </label>
          <button type="submit" className="bz-btn bz-btn--primary bz-btn--sm">
            Show feedback
          </button>
        </form>
        {key !== undefined && <p className="bz-warn text-sm">That key didn&apos;t match.</p>}
      </section>
    );
  }

  const reviewers = (await getAllFeedback())
    .map((reviewer) => ({
      ...reviewer,
      items: Object.entries(reviewer.entries)
        .filter(([, entry]) => entry.verdict || entry.note.trim())
        .sort(([a], [b]) => a.localeCompare(b, "en", { numeric: true })),
    }))
    .sort((a, b) => a.reviewer.localeCompare(b.reviewer));

  return (
    <section className="space-y-10">
      <div className="space-y-3">
        <p className="bz-eyebrow">Review / All feedback</p>
        <h1 className="bz-h2">All feedback</h1>
        <p className="bz-muted">
          {reviewers.length} {reviewers.length === 1 ? "reviewer" : "reviewers"}. Reload to see the latest.
        </p>
      </div>
      {reviewers.map((reviewer) => (
        <div key={reviewer.reviewer} className="space-y-3">
          <h2 className="bz-h3">{reviewer.reviewer}</h2>
          {reviewer.items.length === 0 ? (
            <p className="bz-muted text-sm">No feedback yet.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="bz-table w-full text-left text-sm">
                <thead>
                  <tr>
                    <th className="py-2 pr-4">Item</th>
                    <th className="py-2 pr-4">Verdict</th>
                    <th className="py-2 pr-4">Comment</th>
                    <th className="py-2">Updated</th>
                  </tr>
                </thead>
                <tbody>
                  {reviewer.items.map(([id, entry]) => (
                    <tr key={id} className="align-top">
                      <td className="py-3 pr-4 font-semibold">{entry.label}</td>
                      <td className="py-3 pr-4 whitespace-nowrap">
                        {entry.verdict === "approved" ? "Approved" : entry.verdict === "changes" ? "Changes requested" : "Comment"}
                      </td>
                      <td className="py-3 pr-4 whitespace-pre-wrap">{entry.note.trim() || "–"}</td>
                      <td className="bz-muted py-3 whitespace-nowrap">{entry.updatedAt ? formatDate(entry.updatedAt) : "–"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      ))}
    </section>
  );
}
