import Image from "next/image";
import Link from "next/link";
import { NavLink } from "@/components/layout/nav-link";
import { footerNav, legalLinks, productLinks } from "@/content/site";
import type { NavLink as NavLinkData } from "@/content/types";

function FooterMenu({ links }: { links: NavLinkData[] }) {
  return (
    <div className="hidden md:flex">
      <ul>
        {links.map((link) => (
          <li key={link.label}>
            <NavLink link={link} className="no-underline hover:underline" />
          </li>
        ))}
      </ul>
    </div>
  );
}

export function SiteFooter() {
  return (
    <footer data-site-footer className="bg-dark-grey p-8 text-sm text-white">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
        <div className="flex justify-center md:justify-start">
          <Link href="/">
            <Image
              src="/images/footer-logo.svg"
              alt="Provident Insurance"
              width={307}
              height={215}
              className="h-[128px] w-auto"
            />
          </Link>
        </div>
        <FooterMenu links={footerNav} />
        <FooterMenu links={productLinks} />
        <div className="text-center md:text-right">
          <div>&copy; 2026 Provident Insurance Limited</div>
          <div className="space-x-2">
            {legalLinks.map((link) => (
              <NavLink key={link.label} link={link} />
            ))}
          </div>
          <p className="mt-2 text-sm opacity-25">
            Site by <a href="https://de-construct.co" target="_blank">de-construct</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
