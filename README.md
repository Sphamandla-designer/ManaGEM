# ManaGEM

The ManaGEM website and the ManaGEM application, joined into one journey: a visitor reads the site, starts a trial or signs in, and lands in the working product. ManaGEM is the job-management product built and supported by GEMIS.

## The journey

1. **Website** (`index.html`). Every "Start your free trial" button opens `app/#signup`; "Sign in" in the header opens `app/#login`; "Open the live demo" under the product walkthrough opens `app/#demo`.
2. **Sign in or start a trial** (`app/#login`, `app/#signup`). Split screen after the approved login reference (`reference/design/login-screen-reference.png`). Email first: a known address asks for the password, a new one goes to "Create your account" (name, company, email, trade, team size, password), then a short workspace set-up, then the dashboard. Google and Microsoft buttons lead to the same account step. "Home" returns to the website.
3. **The application** (`app/#dashboard` and every module). The sidebar shows the signed-in person and their company, the dashboard greets them by name, a banner shows the trial days left, and sign-out returns to the sign-in screen. App pages need a session; without one they redirect to sign-in.

There is no server yet. Accounts and the session are kept in the browser's `localStorage` (`managem.accounts`, `managem.session`) so the journey holds together across reloads. Replace `app/src/00-session.jsx` and the submit handlers in `app/src/22-auth.jsx` with real authentication before launch.

## Sample data, not client data

Every workspace opens on the same sample data from a fictional company, **Ridgeway Waterproofing**: fictional staff, customers, suppliers, addresses, `.example` email addresses, `+27 xx 000 xxxx` phone numbers and masked bank references. No real customer's data is in this repository. The previous bundled builds in `reference/product/` were removed because they carried a client's records, and the site mockups were recaptured from the sanitised app.

## Run it

Serve the folder and open http://localhost:8080:

```
python3 -m http.server 8080
```

No build step is needed to run it. Everything is local, including the fonts and the app's React and Chart.js files. Opening `index.html` straight from disk also works for the site; the app works best served, so that `localStorage` persists.

## Changing the app

The app's source is `app/src/*.jsx`, loaded in file-name order and sharing globals. `app/app.js` is generated from it and committed, so the app runs without tooling. After editing the source:

```
cd app && npm install && npm run build
```

## Layout

| Path | What it is |
| --- | --- |
| `index.html` | The site, one page with anchored sections |
| `app/index.html` | The application entry point |
| `app/src/` | Application source: session, sign-in, shell and one file per module |
| `app/app.js` | Generated from `app/src` by `app/build.mjs` |
| `app/app.css` | Application design system and the sign-in screen |
| `app/vendor/` | React 18.3.1 and Chart.js 4.4.1 production builds |
| `assets/css/site.css` | Design tokens and all styles |
| `assets/js/site.js` | Header state, mobile menu, scroll reveal, walkthrough and trade tabs, plan comparison, sticky bar, larger-teams form |
| `assets/fonts/` | Self-hosted latin subsets of Outfit (variable) and IBM Plex Mono, SIL Open Font License |
| `docs/homepage-audit-2026-10.md` | The October 2026 audit: what was verified against the product build, what was removed, and what still needs confirming |
| `assets/brand/` | Logo files supplied by the brand, plus trimmed `logo.png`, `logo-reversed.png`, `mark.png` |
| `assets/mockups/` | WebP screenshots of the real ManaGEM product, used as the site's mockups |
| `reference/design/` | The approved layout references, including the hero and login-screen references |
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

1. Hero: the proposition, two calls to action, trial terms, and the dashboard in a browser frame
2. Verified facts strip: one record per job, Sage sync, the 14-day trial, built by GEMIS
3. Why it matters: three problem categories with illustrative figures, labelled as such
4. Product walkthrough: six tabs, enquiry to payment, each with its own copy and real screen
5. What it does: three outcomes with product crops
6. For your trade: five trade tabs with outcomes, modules and a product crop, plus the accountants card
7. Pricing: four plan cards, "everything on every plan", an expandable comparison
8. What you can count on: data export, POPIA, monthly billing, support
9. Getting started: four steps and an example of what take-on files become
10. Larger teams: the only form, which opens the visitor's email client with the details filled in
11. Sage integration, with what moves in which direction and what stays in Sage
12. Who builds it: GEMIS, what is real on the page, and the customer-stories policy
13. FAQ with the support entry point
14. Final call to action with three paths, footer, sticky action bar on phones

## Trial sign-up address

Every trial button carries `data-signup`. The address is set once, on `<body data-signup="…">` in `index.html`, and the script copies it into each button; the markup carries the same address as a fallback. It is `app/#signup`, the app in this repository. When the app is hosted on its own domain, change it to that address (for example `https://app.managem.co.za/#signup`) and update the "Sign in" and "Open the live demo" links.

## Contact details

The form, the FAQ and the footer use the GEMIS contact published on the GEMIS corporate site: `info@gemis.co.za` and `+27 11 219 5008`. The form's address is the `data-to` attribute on `#teamForm`. Change these in `index.html` if ManaGEM enquiries should go elsewhere.

## Regenerating mockups

The mockups are real screens from the app in `app/`, rendered in Chromium at 1440 px in the demo workspace (`app/#demo`) with the sample-data banner hidden, and saved as WebP. Full screens (`app-*.webp`) are 1800 by 1125, captured at 1.25x; cards and tables are element screenshots at 2x. The product is not responsive below desktop width, so phone frames are not used.

## Content still to confirm

The copy publishes only what the product build and the approved V1 draft support. These points are still marked "to confirm" in V1, and the audit in `docs/homepage-audit-2026-10.md` lists what was removed and why.

| Item | Status |
| --- | --- |
| Trial length and card requirement | 14 days, no card, from V1. Commercial terms not frozen. |
| Plan prices and user limits | R1,000 / R2,000 / R3,000 for 2 / 5 / 10 users, from V1. Commercial terms not frozen. |
| Sign-up URL | Points at the app in this repository (`app/#signup`). Change it when the app has its own domain. |
| Authentication | Prototype only: accounts live in the browser. Google and Microsoft sign-in are not connected. |
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
