import type { Metadata } from "next";
import localFont from "next/font/local";
import { cookies, headers } from "next/headers";
import { VariantProvider } from "@/components/variants/variant-provider";
import { VariantToggle } from "@/components/variants/variant-toggle";
import { parseVariant, VARIANT_COOKIE, VARIANT_HEADER } from "@/lib/variants";
import "./globals.css";

const ubuntu = localFont({
  variable: "--font-ubuntu",
  display: "swap",
  src: [
    { path: "../public/fonts/Ubuntu-Regular.woff2", weight: "400", style: "normal" },
    { path: "../public/fonts/Ubuntu-Italic.woff2", weight: "400", style: "italic" },
    { path: "../public/fonts/Ubuntu-Bold.woff2", weight: "700", style: "normal" },
  ],
});

export const metadata: Metadata = {
  title: "Car Insurance NZ | Get a Quote Online | Provident Insurance",
  description:
    "Get affordable car insurance in NZ, with no-surprises claims and local trusted support when you need it. Get a quote online in around two minutes.",
  // Local UX baseline only: never let a preview of this get indexed.
  robots: { index: false, follow: false },
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const value =
    (await headers()).get(VARIANT_HEADER) ?? (await cookies()).get(VARIANT_COOKIE)?.value;

  return (
    <html lang="en" className={ubuntu.variable}>
      <body>
        <VariantProvider initial={parseVariant(value)}>
          {children}
          <VariantToggle />
        </VariantProvider>
      </body>
    </html>
  );
}
