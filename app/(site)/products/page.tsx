import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Placeholder } from "@/components/placeholder";

const products = [
  {
    title: "Car Insurance",
    href: "/products/car-insurance",
    description:
      "Comprehensive cover for Kiwi drivers with agreed value, flexible excess and optional extras.",
  },
  {
    title: "Mechanical Breakdown Insurance",
    href: "/products/mechanical-breakdown-insurance",
    description:
      "Protection against unexpected repair bills when your vehicle breaks down.",
  },
  {
    title: "CreditCare Insurance",
    href: "/products/creditcare-insurance",
    description:
      "Help meeting your loan repayments if the unexpected happens.",
  },
  {
    title: "Guaranteed Asset Protection",
    href: "/products/guaranteed-asset-protection",
    description:
      "Covers the gap between your car insurance payout and your outstanding loan balance.",
  },
];

export default function ProductsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <h1 className="text-4xl font-bold sm:text-5xl">Products</h1>
      <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
        Insurance designed with care for Kiwi drivers and families.
      </p>
      <div className="mt-12 grid gap-6 sm:grid-cols-2">
        {products.map((product) => (
          <Card key={product.href} className="border-border bg-secondary">
            <CardHeader>
              <Placeholder className="mb-4 h-40" />
              <CardTitle className="text-2xl">{product.title}</CardTitle>
              <CardDescription className="text-base">
                {product.description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild className="rounded-full px-6">
                <Link href={product.href}>
                  Learn more
                  <ArrowRight aria-hidden="true" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
