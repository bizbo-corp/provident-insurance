import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Placeholder } from "@/components/placeholder";

export function StubPage({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
        <div>
          <h1 className="text-4xl font-bold sm:text-5xl">{title}</h1>
          <p className="mt-4 text-lg text-muted-foreground">{description}</p>
          <Button asChild size="lg" className="mt-8 rounded-full px-8">
            <Link href="/products/car-insurance">View Car Insurance</Link>
          </Button>
        </div>
        <Placeholder className="h-64 lg:h-80" />
      </div>
    </div>
  );
}
