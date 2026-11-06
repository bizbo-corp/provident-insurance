import { LIVE_QUOTE_URL } from "@/content/site";

/** Marks where the rebuild stops, so nobody mistakes a gap for the live journey. */
export default function QuoteNotCapturedPage() {
  return (
    <div className="mt-[26px] space-y-4">
      <h2 className="text-2xl leading-[1.2] font-bold">This step hasn&rsquo;t been rebuilt yet</h2>
      <p>
        Contact details, driver history and checkout on the{" "}
        <a href={LIVE_QUOTE_URL}>live quote journey</a> still need capturing.
      </p>
    </div>
  );
}
