import type { NavItem, NavLink } from "@/content/types";

export const LIVE_ORIGIN = "https://www.providentinsurance.co.nz";
export const LIVE_QUOTE_URL = "https://direct.providentinsurance.co.nz/";
export const DEALER_LOGIN_URL = "https://portal.providentinsurance.co.nz/";
export const PHONE = "0800 676 864";

/** Routes that exist in this rebuild. Everything else links out to the live site. */
const LOCAL_ROUTES = new Set(["/", "/products/car-insurance"]);

/** Local path when we've rebuilt the page, otherwise the same path on live. */
export function siteHref(path: string) {
  return LOCAL_ROUTES.has(path) ? path : `${LIVE_ORIGIN}${path}`;
}

/** Every quote CTA goes through here, so the funnel entry point lives in one place. */
export const QUOTE_HREF = "/quote/car";

const link = (label: string, path: string): NavLink => ({ label, href: siteHref(path) });

export const productLinks: NavLink[] = [
  link("Car Insurance", "/products/car-insurance"),
  link("Mechanical Breakdown Insurance", "/products/mechanical-breakdown-insurance"),
  link("CreditCare Insurance", "/products/credit-contract-indemnity"),
  link("Guaranteed Asset Protection", "/products/guaranteed-asset-protection-gapcover"),
];

const aboutLinks: NavLink[] = [
  link("Why us?", "/about/why-us"),
  link("Our company", "/about/our-company"),
  link("Meet our team", "/about/meet-our-team"),
  link("Training & Support", "/about/training-and-support"),
  link("Professional memberships", "/about/professional-memberships"),
  link("Financial Strength", "/about/our-rating"),
  link("Privacy Statement", "/privacy-statement"),
  link("ESG Mission", "/about/esg-mission"),
  link("Fair Conduct Programme", "/about/fair-conduct-programme"),
];

const helpLinks: NavLink[] = [
  link("Contact", "/help-and-support/contact"),
  link("Complaints", "/help-and-support/complaints"),
  link("Customers Experiencing Vulnerability", "/help-and-support/vulnerable-customer-support"),
];

/** On live, About and Help & Support have no landing page of their own. */
export const NO_LANDING_PAGE = "#";

export const mainNav: NavItem[] = [
  { ...link("Products", "/products"), children: productLinks },
  link("Claims", "/claims"),
  { label: "About", href: NO_LANDING_PAGE, children: aboutLinks },
  link("Partners", "/partners"),
  { label: "Help & Support", href: NO_LANDING_PAGE, children: helpLinks },
];

export const footerNav: NavLink[] = [
  link("Home", "/"),
  link("Products", "/products"),
  link("Claims", "/claims"),
  { label: "About", href: NO_LANDING_PAGE },
  link("Partners", "/partners"),
  { label: "Help & Support", href: NO_LANDING_PAGE },
];

export const legalLinks: NavLink[] = [
  link("Terms of use", "/terms-of-use"),
  link("Privacy policy", "/privacy-statement"),
];
