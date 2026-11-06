import type { Metadata } from "next";
import { Container } from "@/components/layout/container";
import { ChoiceGroupPreview } from "@/components/quote/choice-group-preview";
import { QuoteButton, QuoteNotice } from "@/components/quote/quote-question";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = { title: "Design system | Provident Insurance" };

const SWATCHES = [
  ["primary", "bg-primary"],
  ["primary-dark", "bg-primary-dark"],
  ["dark-grey", "bg-dark-grey"],
  ["light-grey", "bg-light-grey"],
  ["lighter-grey", "bg-lighter-grey"],
  ["quote-ink", "bg-quote-ink"],
  ["quote-accent", "bg-quote-accent"],
  ["quote-muted", "bg-quote-muted"],
  ["quote-track", "bg-quote-track"],
] as const;

function Group({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="my-12">
      <h2 className="section-heading mb-8">{title}</h2>
      {children}
    </section>
  );
}

/** A living reference for the tokens and primitives, and the starting point for Figma. */
export default function DesignSystemPage() {
  return (
    <Container className="py-12">
      <h1 className="text-2xl font-bold md:text-5xl">Design system</h1>
      <p className="mt-4">Rules are in docs/design-system.md. Full sections can be seen on the pages themselves.</p>

      <Group title="Colour">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
          {SWATCHES.map(([name, className]) => (
            <div key={name}>
              <div className={`h-20 rounded-lg border border-lighter-grey ${className}`} />
              <p className="mt-2 text-sm">{name}</p>
            </div>
          ))}
        </div>
      </Group>

      <Group title="Type">
        <p className="text-2xl font-bold md:text-5xl">Hero heading</p>
        <p className="section-heading mt-4">Section heading</p>
        <p className="mt-4 text-lg font-bold text-primary-dark">Card title</p>
        <p className="mt-4">Body text</p>
        <p className="mt-4 text-sm">Small text</p>
      </Group>

      <Group title="Marketing buttons">
        <div className="flex flex-wrap items-center gap-4 bg-light-grey p-8">
          <Button>Primary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="white">White</Button>
          <Button size="small">Small</Button>
        </div>
      </Group>

      <Group title="Quote controls">
        <div data-testid="quote-controls" className="space-y-4">
          <QuoteButton variant="outline">Find my Car</QuoteButton>
          <div><QuoteButton variant="outline" disabled>Disabled</QuoteButton></div>
          <QuoteButton variant="next">Next: Insured Type</QuoteButton>
          <ChoiceGroupPreview />
          <QuoteNotice><p>Information panel</p></QuoteNotice>
        </div>
      </Group>
    </Container>
  );
}
