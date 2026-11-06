# Provident design system

This repo is a local baseline of providentinsurance.co.nz for UX work. These rules keep it faithful to live and easy to change. They are also the source for the future Figma file.

## Golden rules

1. **Match live first.** A baseline page should look like live, flaws included. UX changes happen after, on top of this baseline.
2. **One source for each thing.** Colours and sizes live in `app/globals.css`, words and links in `content/`, markup in `components/`. Pages only compose sections.
3. **No raw values in components.** Use a token. If one is missing, add it to `globals.css` and to the table below. The exception is measured one-offs in the quote shell, such as its 76px header.
4. **Don't change a shared component for one page.** Add a prop or variant.
5. **Reach for what exists.** Check the [component inventory](#components) and `/design-system` first.
6. **Live copy stays verbatim**, including its typos and em dashes. Our own docs and any new copy use British English with no em dashes.

## Two surfaces

Live is two products with separate themes, so tokens are kept apart.

| | Marketing site | Quote app |
| --- | --- | --- |
| Live stack | Laravel, Tailwind 3 | Next.js, MUI |
| Root font size | 16px, 18px from `md` | 16px |
| Primary | `primary` #ED1C24 | `quote-accent` #ED505F |
| Text | `dark-grey` #4A4B4C | `quote-ink` #131214 |
| Shape | Pills, 25px cards | 8px buttons and fields |

`data-surface="quote"` on the quote shell switches off the marketing type scale. Don't mix tokens across surfaces.

## Tokens

| Token | Value | Use |
| --- | --- | --- |
| `primary` | #ED1C24 | CTAs, hero panel, help strip |
| `primary-dark` | #BB000E | Promo banner, icon card titles |
| `dark-grey` | #4A4B4C | Body text, footer, submenus |
| `light-grey` | #F4F2EC | Header, tinted sections |
| `lighter-grey` | #DDD9D7 | Table headers and rules |
| `quote-muted` | #6E7375 | Quote secondary text and icons |
| `quote-track` | #E8EBEB | Progress track, table header tint |
| `quote-info` | #3B7DDD | Optional add-on tick (estimated from a screenshot) |
| `quote-selected` | #DCDDDF | Selected choice, excess stops (estimated from a screenshot) |
| `quote-success` | #2A9D68 | Completed question tick (estimated from a screenshot) |
| `quote-notice`, `quote-notice-ink` | #FDF1EF, #5F2120 | Quote info panels (estimated from a screenshot) |
| `rounded-card` | 25px | Cards |
| `rounded-br-hero` | 4rem | Hero panel corner |
| `shadow-bar-down`, `shadow-bar-up` | | Header and sticky bar |

**Type:** Ubuntu regular, italic and bold only, self-hosted from `public/fonts`. Avoid `font-medium` and `font-semibold`, as those weights don't exist.

**Breakpoints:** Tailwind defaults, set in px because the root font size changes at `md`.

**The rem quirk:** live sets `font-size: 1.125rem` on both `html` and `body`, so from `md` up 1rem is 18px and body text is 20.25px. All rem spacing scales with it. This is deliberately reproduced in `globals.css`.

**Spacing:** sections use `<Section>` for `my-12 md:my-24`, and content sits in `<Container>`.

## Components

| Layer | Where | Rule |
| --- | --- | --- |
| Primitives | `components/ui` | shadcn, restyled to live |
| Layout | `components/layout` | Site chrome and helpers |
| Sections | `components/sections` | Full-width blocks, data passed as props |
| Quote | `components/quote` | Quote surface only |

Primitives: `Button` (`primary`, `outline`, `white`; `default`, `wide`, `small`) and `Accordion`.

Layout: `Container`, `Reveal`, `NavLink`, `RichText`, `SiteHeader`, `SiteFooter`, `StickyCtaBar`.

Sections: `Hero`, `PromoBanner`, `PromoStrip`, `ProductCards`, `IconCardGrid`, `CoverComparison`, `TwoColumnBlock`, `Testimonials`, `HelpStrip`, `FaqSection`, `ClosedPlans`, `Section`, `SectionIntro`.

Quote: `QuoteShell`, `Question`, `HelpLink`, `QuoteNotice`, `ChoiceGroup`, `QuoteButton`, `QuoteField`, `QuoteSelect`, `QuoteStepActions`, `CoverTierCards`, `CoverTable`, `ExcessPicker`, `AddOnCards`.

## Links

- Use `siteHref()` for site paths. It stays local for rebuilt pages and goes to live for the rest. Rebuilding a page means adding it to `LOCAL_ROUTES`.
- Every quote CTA uses `QUOTE_HREF`.
- PDFs link to live rather than being copied here.

## Adding a page

1. Add copy to `content/`.
2. Compose existing sections in `app/(site)/`.
3. Add the route to `LOCAL_ROUTES`.
4. Compare with live at 375, 768, 1024 and 1440px wide.

## Known differences from live

- Quote CTAs stay in this rebuild rather than opening the live quote app in a new tab.
- Google Tag Manager is left out, and pages are set to `noindex`.
- The broken blank images on the live "closed plans" cards are left out.
- Quote steps were matched to screenshots from the live journey, so spacing there is close rather than measured.
- The rego lookup uses a sample car, address search doesn't look anything up, and Help and More details links do nothing.
- The Quote step uses sample prices, and they don't change with your selections.
- The Company path, the youngest driver age range, and add-ons for lower cover levels are assumptions.
- Contact details, driver history and checkout are not rebuilt.
