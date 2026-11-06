import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/layout/reveal";
import { cn } from "@/lib/utils";

/** The live `.section` rhythm: vertical margin, a container, and the fade-in. */
export function Section({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section className={cn("my-12 md:my-24", className)}>
      <Container>
        <Reveal>{children}</Reveal>
      </Container>
    </section>
  );
}

/** Centred section intro used above card grids and tables. */
export function SectionIntro({ title, body }: { title: string; body?: string }) {
  return (
    <div className="mb-16 flex flex-col text-center">
      <h2 className="section-heading mb-8">{title}</h2>
      {body && <p>{body}</p>}
    </div>
  );
}
