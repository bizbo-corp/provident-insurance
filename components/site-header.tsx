"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/logo";

const navItems = [
  { label: "Products", href: "/products" },
  { label: "Claims", href: "/claims" },
  { label: "About", href: "/about" },
  { label: "Partners", href: "/partners" },
  { label: "Help & Support", href: "/help-support" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-secondary">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-6 px-4 sm:px-6 lg:px-8">
        <Logo />

        <nav className="hidden items-center gap-8 lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-base font-medium text-foreground transition-colors hover:text-primary"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Button
            asChild
            variant="outline"
            className="hidden rounded-full border-primary px-6 text-foreground hover:bg-primary hover:text-primary-foreground sm:inline-flex"
          >
            <Link href="#">Dealer login</Link>
          </Button>

          <button
            type="button"
            className="inline-flex size-10 items-center justify-center rounded-full text-foreground lg:hidden"
            aria-expanded={open}
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-border bg-secondary px-4 pb-6 pt-2 lg:hidden">
          <ul className="flex flex-col gap-1">
            <li>
              <Link
                href="/"
                className="block rounded-lg px-3 py-2 font-medium hover:bg-background"
                onClick={() => setOpen(false)}
              >
                Home
              </Link>
            </li>
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="block rounded-lg px-3 py-2 font-medium hover:bg-background"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="#"
                className="block rounded-lg px-3 py-2 font-medium hover:bg-background"
                onClick={() => setOpen(false)}
              >
                Dealer login
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
