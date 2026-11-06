import type { Metadata } from "next";
import localFont from "next/font/local";
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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={ubuntu.variable}>
      <body>{children}</body>
    </html>
  );
}
