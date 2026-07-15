import Link from "next/link";
import { Phone } from "lucide-react";
import { Logo } from "@/components/logo";
import { Separator } from "@/components/ui/separator";

const siteLinks = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/products" },
  { label: "Claims", href: "/claims" },
  { label: "About", href: "/about" },
  { label: "Partners", href: "/partners" },
  { label: "Help & Support", href: "/help-support" },
];

const productLinks = [
  { label: "Car Insurance", href: "/products/car-insurance" },
  {
    label: "Mechanical Breakdown Insurance",
    href: "/products/mechanical-breakdown-insurance",
  },
  { label: "CreditCare Insurance", href: "/products/creditcare-insurance" },
  {
    label: "Guaranteed Asset Protection",
    href: "/products/guaranteed-asset-protection",
  },
];

export function SiteFooter() {
  return (
    <footer className="bg-[#3a3b3c] text-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
          <div className="space-y-4">
            <Logo light />
            <a
              href="tel:0800676864"
              className="inline-flex items-center gap-2 text-lg font-medium hover:text-white/80"
            >
              <Phone className="size-4" />
              Need help? Call us on 0800 676 864
            </a>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-2">
            <nav aria-label="Site">
              <ul className="space-y-2">
                {siteLinks.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-sm text-white/80 transition-colors hover:text-white"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <nav aria-label="Products">
              <ul className="space-y-2">
                {productLinks.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-sm text-white/80 transition-colors hover:text-white"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>

        <Separator className="my-8 bg-white/20" />

        <div className="flex flex-col gap-4 text-sm text-white/60 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Provident Insurance Limited</p>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-white">
              Terms of use
            </Link>
            <Link href="#" className="hover:text-white">
              Privacy policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
