import { QuoteHeader } from "@/components/quote/quote-header";
import { QuoteProgressProvider } from "@/components/quote/quote-progress";

export default function QuoteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // The provider wraps the header too — the stepper lives inside it, and each
    // step's page reports its progress up to it.
    <QuoteProgressProvider>
      <div className="flex min-h-screen flex-col bg-white">
        <QuoteHeader />
        <main className="mx-auto w-full max-w-4xl flex-1 px-4 pb-16 sm:px-6 lg:px-8">
          {children}
        </main>
      </div>
    </QuoteProgressProvider>
  );
}
