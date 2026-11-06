import Link from "next/link";
import type { NavLink as NavLinkData } from "@/content/types";

/** Internal links use next/link; links to pages we haven't rebuilt stay plain anchors. */
export function NavLink({
  link,
  ...props
}: { link: NavLinkData } & Omit<React.ComponentProps<"a">, "href">) {
  return link.href.startsWith("/") ? (
    <Link href={link.href} {...props}>
      {link.label}
    </Link>
  ) : (
    <a href={link.href} {...props}>
      {link.label}
    </a>
  );
}
