# Homepage audit and implementation plan, October 2026

Internal note. Nothing here is published to visitors.

## What was inspected

- `index.html`, `assets/css/site.css`, `assets/js/site.js`, the README and `docs/competitor-teardown.md`.
- `reference/ManaGEM-website-V1_1.html`, the approved V1 content draft, including its open questions (Q-numbers).
- `reference/product/managem-app.html`, the product build the mockups come from, signed in and walked module by module.
- The rendered page at 1440 px and 390 px, with console and network logging.
- Deployment: GitHub Pages serving the repository root from the default branch. No build step, no tests, no linters.

## What the product build supports (verified)

Enquiries (four-step capture, pipeline by stage, sales rep, area), quotes with line items, VAT and PDF, products with cost and sales price, variations, kits and price-change history, projects with foreman, dates and progress, bookings, factory builds through pending, build, QC, ready and invoiced, stock across stores and vehicles with receive, dispatch, transfer, returns and stock take, purchase orders, invoices with paid, partial, unpaid and overdue, Sage invoice sync with synced, pending and error states, debtors with ageing, interactions and statements, reports, sales targets, staff records, warranties, inspection reports. Every list exports to CSV, Excel and PDF.

## What the product build does not show

- Labour hours, timesheets, clock-in or any site-capture by foremen.
- Job costing: no budget versus actual, no materials or labour cost on a job, no margin per job. The only cost field is on products.
- An AI take-on or import screen.
- My Companies and Settings are stubs ("module follows established patterns").
- Xero.

The V1 content draft marks exactly these as open questions (Q2, Q5, Q13, Q14, Q16, Q17). They are not confirmed anywhere in the repository.

## Findings, by severity

### Critical: credibility and data integrity

1. Hero headline, lede, "Why it matters" cards, trade bullets, the onboarding section, the final section and several FAQ answers promise job margin, labour-hour overruns and foremen logging hours and slips from a phone. None of this is in the product build. Fix: reposition on what is verified (enquiry to quote to job to stock and production to invoice to payment, with Sage), and move the costing promise to a review note.
2. Stats strip: "12 businesses" is unconfirmed (README), "24 modules" is trivia, "100% of features" is a tautology. Fix: remove the counters; replace with verified facts.
3. Four customer stories with 4.8 to 5.0 star ratings are drafts written in the customer's voice. Fix: remove. Replace with verified evidence: who builds and supports the product, and what the product demonstrably does.
4. Yearly billing at ten months' price is a proposal, not a frozen term. "Priority onboarding call" on two plans is not in V1. Companies per plan is a proposal. Fix: remove the toggle, the onboarding line and the companies row; keep the V1 monthly prices and user limits; keep add-ons as "ask us".
5. "Set up in an afternoon", "14 min from first upload", "Onboard yourself in an afternoon": unverified setup-time estimates. "Daily backups", "a month's notice": unverified. "New: Sage invoice sync and multi-company support": multi-company is a stub. Fix: remove or soften to what V1 says.
6. The larger-teams form shows a success message but sends nothing. Fix: submit by opening the visitor's email client with the details prefilled, and say exactly that; give the address and phone number as the fallback.
7. "Customer login" points at the final call-to-action section; "Sign in" points at the top of the page; "What's new" points at the tour; three legal links are disabled placeholders. Fix: remove the dead links; say plainly that the legal pages are being finalised.
8. The trial URL `https://app.managem.co.za/signup` is documented in the README as a placeholder and cannot be verified from the build environment. Kept, because it is the owner's stated intended destination, but centralised so one edit updates every button, and flagged for confirmation before launch.

### High: information architecture and conversion

9. The page carried five competing promises (margin, trades, features, onboarding, Sage). The rebuilt order follows the brief: hero, verified facts, the problem, the product walkthrough, outcomes, trades, pricing, getting started, Sage, FAQ, final call to action.
10. The product tour swapped only the screenshot; the explanatory text did not change with the tab. Fix: each step of the walkthrough has its own text and screenshot, with proper tab and tabpanel roles.
11. Two different primary labels ("Start a free trial" and "Start your free trial") and a secondary that jumped to different places. Fix: one primary label everywhere; the secondary is "Explore the product" and always goes to the walkthrough.

### Medium: visual and technical

12. Fonts loaded from Google Fonts: a third-party request on every visit and a flash of fallback type. Fix: self-host the latin subsets of Outfit and IBM Plex Mono (SIL Open Font License).
13. A 1 MB background video in the hero. Fix: a static navy gradient; same look, no download, no autoplay.
14. `og:image` was a relative path and there was no canonical URL or `og:url`. Fix: absolute URLs for the current GitHub Pages address, to be changed when the production domain is known.
15. The mobile navigation closed on Escape and restored focus but did not keep focus inside the sheet. Fix: trap Tab inside the open sheet.
16. Several split section headings wrapped to five lines at desktop widths. Fix: wider heading columns and balanced wrapping.
17. `fmt` was declared twice in the script. Fix: one declaration.

## Content kept as published, because it is in the approved V1 draft, but still marked "to confirm" there

- 14-day free trial with no card (V1 "Commercial" tag).
- Starter R1,000 for 2 users, Team R2,000 for 5, Growing R3,000 for 10, larger teams on request; prices exclude VAT; billed monthly; no minimum term.
- Sage sync of invoices and products (direction of product sync, and the Sage editions supported, still open: Q15).
- Support by phone and email from the ManaGEM team.
- AI-assisted take-on from spreadsheets, with the team checking the result (Q17). Described without time estimates and with human review stated.
- Xero as planned, not available (Q6).

## Contact details used

The site had no verified ManaGEM contact. The form and the support links now use the GEMIS contact published on the GEMIS corporate site, info@gemis.co.za and +27 11 219 5008. Confirm that ManaGEM enquiries should route there, or replace them in one place in `index.html`.
