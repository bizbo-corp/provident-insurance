import { redirect } from "next/navigation";
import { QUOTE_STEPS, quoteStepHref } from "@/lib/quote-flow";

export default function QuotePage() {
  redirect(quoteStepHref(QUOTE_STEPS[0].slug));
}
