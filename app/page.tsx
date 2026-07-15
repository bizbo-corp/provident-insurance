import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Placeholder } from "@/components/placeholder";

export default function HomePage() {
  return (
    <section className="relative bg-muted">
      <Placeholder
        label="Hero image placeholder"
        className="absolute inset-0 rounded-none border-0"
      />
      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="max-w-xl rounded-3xl bg-primary p-8 text-primary-foreground sm:p-12">
          <h1 className="text-4xl font-bold leading-tight sm:text-5xl">
            Insurance driven by care
          </h1>
          <p className="mt-4 text-lg">
            Fair pricing, no-surprises claims and local support for Kiwi
            drivers and families.
          </p>
          <Button
            asChild
            size="lg"
            className="mt-8 rounded-full bg-white px-8 text-primary hover:bg-white/90"
          >
            <Link href="/products/car-insurance">Explore car insurance</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
