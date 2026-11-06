import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/layout/reveal";
import { Button } from "@/components/ui/button";

type Plan = { title: string; body: string; href: string };

export function ClosedPlans({ title, note, plans }: { title: string; note: string; plans: Plan[] }) {
  return (
    <Container className="my-12 md:my-24">
      <Reveal>
        <h2 className="section-heading pb-0 sm:pb-8">{title}</h2>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
          {plans.map((plan) => (
            <div key={plan.title} className="py-8">
              <h2 className="pb-4 text-lg font-bold md:text-2xl">{plan.title}</h2>
              <p>{plan.body}</p>
              <p><span className="text-sm">{note}</span></p>
              <Button asChild className="mt-4">
                <a href={plan.href} target="_blank">Download booklet</a>
              </Button>
            </div>
          ))}
        </div>
      </Reveal>
    </Container>
  );
}
