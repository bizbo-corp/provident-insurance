import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { StickyCtaBar } from "@/components/layout/sticky-cta-bar";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="pt-(--nav-height,97px)">
      <SiteHeader />
      <main>{children}</main>
      <SiteFooter />
      <StickyCtaBar />
    </div>
  );
}
