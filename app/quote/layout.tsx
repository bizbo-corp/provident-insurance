import { QuoteShell } from "@/components/quote/quote-shell";

export default function QuoteLayout({ children }: { children: React.ReactNode }) {
  return <QuoteShell>{children}</QuoteShell>;
}
