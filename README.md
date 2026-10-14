# ManaGEM website

Marketing site for ManaGEM, the job-management product built and supported by GEMIS.

## Run it

The site is static. Open `index.html` directly, or serve the folder:

```
python3 -m http.server 8080
```

No build step. Everything is local, including the fonts.

## Layout

| Path | What it is |
| --- | --- |
| `index.html` | The site, one page with anchored sections |
| `assets/css/site.css` | Design tokens and all styles |
| `assets/js/site.js` | Header state, mobile menu, scroll reveal, walkthrough and trade tabs, plan comparison, sticky bar, larger-teams form |
| `assets/fonts/` | Self-hosted latin subsets of Outfit (variable) and IBM Plex Mono, SIL Open Font License |
| `docs/homepage-audit-2026-10.md` | The October 2026 audit: what was verified against the product build, what was removed, and what still needs confirming |
| `assets/brand/` | Logo files supplied by the brand, plus trimmed `logo.png`, `logo-reversed.png`, `mark.png` |
| `assets/mockups/` | WebP screenshots of the real ManaGEM product, used as the site's mockups |
| `reference/design/` | The approved layout references: the original two pages, and `reference-03-hero.jpeg` for the hero |
| `reference/product/` | The self-contained ManaGEM product build the mockups were captured from |
| `reference/ManaGEM-website-V1_1.html` | The V1 content draft this site's copy is based on |
| `.claude/skills/ui-ux-pro-max/` | UI/UX guidance skill used during the build |

## Design system

Taken from the brand files and the product itself, not invented for the site.

- **Colour.** Navy ink `#0F172A` and `#0B1222` for dark bands, GEM teal `#00BFA6` for the primary action and highlights, product sky-blue `#0EA5E9` for focus and links, slate neutrals for text and lines.
- **Type.** Outfit for everything, IBM Plex Mono for figures and references, matching the product.
- **Shape.** Pill buttons, 16 to 32 px radii, soft layered shadows on product cards, thin 1 px dividers in the feature bento.
- **Motion.** Entrance rise on the hero, reveal on scroll, 160 to 600 ms easings. Everything respects `prefers-reduced-motion`.
- **Restraint.** No background video, no floating cards, no counters. The product screens are the visuals.

## Page order

1. Hero, following `reference/design/reference-03-hero.jpeg`: left-aligned copy over a black-to-teal-to-white gradient with drifting light rays and blooms, a trade pill, a white call to action and an arrow link, and the dashboard standing on the white bloom with its lower part faded out
2. Features: three outcomes with product crops
3. Verified facts strip: one record per job, Sage sync, the 14-day trial, built by GEMIS
4. Why it matters: three problem categories with illustrative figures, labelled as such
5. Product walkthrough, on a dark band with the hero's sky: six tabs, enquiry to payment, each with its own copy and real screen
6. For your trade: five trade tabs with outcomes, modules and a product crop, plus the accountants card
7. Pricing: four plan cards, "everything on every plan", an expandable comparison
8. What you can count on: data export, POPIA, monthly billing, support
9. Getting started, on the dark band: four steps and an example of what take-on files become
10. Larger teams: the only form, which opens the visitor's email client with the details filled in
11. Sage integration, with what moves in which direction and what stays in Sage
12. Who builds it: GEMIS, what is real on the page, and the customer-stories policy
13. FAQ with the support entry point
14. Final call to action on the dark band with three paths, footer, sticky action bar on phones

The header menu is centred: Features, Product, For your trade, Pricing, Support. The dark bands reuse the hero's `.sky` (rays, blooms, grain) so the page reads as one system.

## Trial sign-up address

Every trial button carries `data-signup`. The address is set once, on `<body data-signup="…">` in `index.html`, and the script copies it into each button; the markup carries the same address as a fallback. It is `https://app.managem.co.za/signup`, a placeholder until the real sign-up URL is supplied. Confirm it before launch.

## Contact details

The form, the FAQ and the footer use the GEMIS contact published on the GEMIS corporate site: `info@gemis.co.za` and `+27 11 219 5008`. The form's address is the `data-to` attribute on `#teamForm`. Change these in `index.html` if ManaGEM enquiries should go elsewhere.

## Regenerating mockups

The mockups are real screens from `reference/product/managem-app.html`, rendered in Chromium at 1440 px, signed in with the prefilled prototype user, and saved as WebP. Full screens (`app-*.webp`) are 1800 by 1125, captured at 1.25x; cards and tables are element screenshots at 2x. The product is not responsive below desktop width, so phone frames are not used.

## Content still to confirm

The copy publishes only what the product build and the approved V1 draft support. These points are still marked "to confirm" in V1, and the audit in `docs/homepage-audit-2026-10.md` lists what was removed and why.

| Item | Status |
| --- | --- |
| Trial length and card requirement | 14 days, no card, from V1. Commercial terms not frozen. |
| Plan prices and user limits | R1,000 / R2,000 / R3,000 for 2 / 5 / 10 users, from V1. Commercial terms not frozen. |
| Sign-up URL | `https://app.managem.co.za/signup` is a placeholder. |
| Contact details | GEMIS corporate email and phone used; confirm routing for ManaGEM. |
| Sage editions supported, direction of product sync | Phrased generally ("synced with Sage"); add specifics when known. |
| Hosting location, retention after an account closes, notice period | Not stated; the FAQ says "ask us". |
| Field-user pricing | Not stated; "ask us". |
| Several companies per account | Not stated as a feature; routed to the larger-teams path. |
| AI-assisted take-on | Described as in V1, with human review stated and no time estimate. Confirm the feature before launch. |
| Job costing, labour hours, margin per job | Not in the product build. Not claimed anywhere on the page. If the live application has them, the hero can return to a profitability promise. |
| Customer stories | None published. The page says so and offers a reference call. |
| Legal pages | Privacy notice and terms of service do not exist yet; the footer says they are being finalised. |
| Xero | Planned, not available. |
