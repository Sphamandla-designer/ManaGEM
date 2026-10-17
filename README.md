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
| `index.html` | The homepage, one page with anchored sections |
| `support.html` | The support centre: one ticket form and the contact details |
| `contact.html` | Talk to sales: a short sales form and the contact details |
| `accounting-and-bookkeeping.html` | Accounting & Bookkeeping landing page for accountants, bookkeepers and the businesses they support |
| `accountants.html` | Redirect from the old accountants address to the accounting page (noindex) |
| `about.html` | About ManaGEM: what it does, who builds it, how GEMIS works with customers, who it is for |
| `blog.html`, `blog/` | The blog index and its three articles |
| `industries/` | One page per industry |
| `tools/prototype-bundle.py` | Unpacks and repacks the single-file product prototype for editing |
| `tools/build-chrome.py` | Writes the shared header, menus, phone drawer and footer into every page |
| `pricing.html` | The pricing page: plans, what every plan includes, the full comparison, and what you can count on |
| `assets/css/site.css` | Design tokens and all styles |
| `assets/js/site.js` | Header state, mobile menu, scroll reveal, walkthrough clips and tabs, trade tabs, trust figure count-up and moving trust row, sticky bar |
| `assets/video/` | The walkthrough clips, MP4 and WebM |
| `features/` | One page per feature |
| `tools/make-walkthrough-videos.py` | Builds the walkthrough clips with ffmpeg |
| `assets/fonts/` | Self-hosted latin subsets of Outfit (variable) and IBM Plex Mono, SIL Open Font License |
| `docs/homepage-audit-2026-10.md` | The October 2026 audit: what was verified against the product build, what was removed, and what still needs confirming |
| `assets/brand/` | Logo files supplied by the brand, plus trimmed `logo.png`, `logo-reversed.png`, `mark.png` |
| `assets/mockups/` | WebP screenshots of the real ManaGEM product, used as the site's mockups and as the clips' posters |
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
- **Restraint.** No background video and no floating cards. The trust figures count up once, and only verified figures are shown. The product screens are the visuals.

## Page order

1. Hero, following `reference/design/reference-03-hero.jpeg`: left-aligned copy over a black-to-teal-to-white gradient with drifting light rays and blooms, a "Synced with Sage and Xero" pill, a white call to action and an arrow link, and the dashboard standing on the white bloom with its lower part faded out
2. Product value, centred on white, under the small "Built by GEMIS" eyebrow ("Every job. Every quote. Every invoice. One place."): four static statements as a description list (1 connected workflow; live job visibility; centralised business records; South Africa, built for local businesses), a customer quote card, then a moving row of trust marks with a pause button; hover and keyboard focus also pause it, and with reduced motion it is a static, wrapped row
3. Features, "Run the work, not the paperwork.": three white linked cards in one row (sales pipeline, jobs and bookings, invoicing and Sage or Xero); each is a link to its page under `features/`, and the only control is the animated arrow. The "Also in every plan" line below links the quotes, stock and factory pages
4. Inside ManaGEM, centred on a clean navy-to-teal-to-white band (`--grad-band`, no pattern): six steps, enquiry to payment, each with a heading and one short line above an auto-playing silent clip of the real screen (see below); the clips play through in order and a chosen step loops
5. Pricing, centred: four plan cards and a link to the pricing page
6. Industries: five industry tabs with outcomes, modules and a product crop, each with a link to its industry page, plus the accountants card
7. Getting started, a full-width navy-to-teal band (no card): four steps and an example of what take-on files become
8. Support and questions: the contact tile and a numbered FAQ
9. Final call to action on the dark band with three paths, footer, sticky action bar on phones

### Product-value statements

The four blocks under "Built by GEMIS" are product-value statements, not measured figures, and are static text. Each is a `dt` (label) followed by `dd` elements (value, then detail), so a screen reader reads label, value and detail once each.

Two items were supplied by GEMIS and still need confirming before they are relied on:

- "Live" job visibility. The product shows job progress in one place, but nothing in the build confirms real-time updates. If updates are not real time, change the value, for example to "Clear".
- The customer quote (operations manager, waterproofing contractor, Gauteng, 6 users). Confirm its source and the customer's consent to be quoted.

## Pricing page

`pricing.html` holds the pricing detail that used to sit on the homepage: the four plans, "Everything, on every plan", the full plan comparison (always open, scrollable on phones), "Good to know", and the four commitments (your data stays yours, POPIA, monthly with no minimum term, support from the people who build it). The homepage pricing section and the feature pages link to it.

Every section uses the same spacing (the `.section` padding); there are no per-section overrides.

The header menu is centred: Product, Industries, Pricing, Support, with Log in and Start free trial on the right. Below 980px it collapses into the phone drawer.

- **Product** opens a menu with the walkthrough as the featured item ("See one job from enquiry to payment") and the six feature pages.
- **Industries** opens a short list of the five industry pages.
- **Pricing** goes to `pricing.html` and **Support** to `support.html`. Both are plain links.
- The phone drawer has the same four items plus Log in. Product and Industries open in place, and Start free trial is pinned to the bottom.
- Blog, Accountants and bookkeepers, and Talk to sales are in the footer.

The header, menus and footer are generated. Edit `tools/build-chrome.py`, then run `python3 tools/build-chrome.py` from the repository root; it rewrites only the regions between the `chrome:header` and `chrome:footer` markers on every page. Contact goes to `info@gemis.co.za` by email; there is no form on the site.

## Industry pages

`industries/<slug>.html`, one per industry: waterproofing, roofing, building and renovation, manufacturing and factory, maintenance and service. Each has a hero with a real product screen, what ManaGEM handles for that industry and the modules used most (the same verified points as the homepage tabs), links to the three features that matter most, and a next-industry link. Edit them directly.

## Accounting & Bookkeeping

`accounting-and-bookkeeping.html` explains ManaGEM to accountants, bookkeepers and the businesses they support, without presenting it as accounting software. Sections: hero with four real screens (enquiry, quote, job, invoice); the operational information problem; ManaGEM's role; how ManaGEM works alongside accounting software (three stages, with the real Accounting Sync screen for Sage Accounting or Xero); benefits; who it suits; a practical example that follows one job through the screens; FAQ; final call to action. "Book a ManaGEM Demo" opens the sales form pre-filled (`contact.html?enquiry=accountant-demo`); "Contact GEMIS" goes to the contact details on `contact.html#reach`. The page is in the Industries menu, the footer and the homepage accountants card. The old `accountants.html` address redirects here.

Integration copy:

- **Sage Accounting:** invoices post with net, VAT, total and a Sage reference; each invoice shows synced, pending or error and its last sync time; a Sync now action; products can be synced.
- **Xero:** supported (confirmed by GEMIS, October 2026). The page describes it with the same invoice sync as Sage.
- **Not stated:** which Sage editions or Xero plans are supported, and how often sync runs on its own. The page asks visitors to check their setup with the team.

## About ManaGEM

`about.html` replaces the footer's external "About GEMIS" link. It covers what ManaGEM does (links to the six feature pages), who builds it (GEMIS, from the 2025 company profile), how the team works with customers (from the homepage FAQ), and who it is for. It links to the GEMIS website.

## Blog and support

`blog.html` lists three articles under `blog/`: moving off spreadsheets for the take-on, how one job record runs from enquiry to payment, and how ManaGEM and Sage or Xero split the work. They describe only what the product build and the V1 draft support, and carry no statistics. Add new articles by copying one and adding a card to `blog.html`.

`support.html` has one support ticket form (category, company, name, phone, description and a screenshot), with the phone number, email and FAQ beside it. `contact.html` is the sales form (name, company, phone, number of users, what you need); every "Talk to us", "Talk to the team" and "Email the team" link goes there.

## Forms, copy buttons and WhatsApp

- **Where forms send.** Both forms have a `data-endpoint` attribute, empty today. Put a form-handling URL there (for example a Formspree or Basin form, or your own endpoint) and the form posts its fields and the screenshot as multipart form data, then shows the result on the page. With no endpoint, sending opens the visitor's email app with every field filled in, addressed to `info@gemis.co.za`, and the page says so. Screenshots cannot be attached that way, so the visitor is asked to attach it in the email.
- **Subject lines.** Sales enquiries use "ManaGEM sales enquiry". Support tickets use "ManaGEM support: <category>".
- **Copy buttons.** The email address and phone number sit beside each form as plain text with a Copy button, so nobody is stuck if the form fails.
- **WhatsApp.** Set the number once per page in `<body data-whatsapp="27…">` (international format, digits only). While it is empty, every WhatsApp link stays hidden. Only switch it on for a number someone monitors.

## Feature pages

`features/<slug>.html`, six pages: three reached from the feature cards and three from the "Also in every plan" line. Each has the same header and footer as the homepage, a hero on the dark band with the real screen, a "what you get" list drawn only from what the product build shows, and a next-feature link. They are static pages generated from the content table in the October 2026 rebuild; edit them directly.

## Product prototype

`reference/product/managem-app.html` is the product prototype the mockups and clips are captured from. It opens in a browser on its own; screens are addressed by hash (for example `#dashboard`, `#enquiries`, `#enquiry-detail`, `#projects`, `#stock`, `#invoices`, `#sage`, `#factory`, `#debtors`, `#customers`). The company shown is ManaGEM, and the accounting screen (`#sage`, "Accounting Sync") switches between Sage Accounting and Xero.

To edit it, unpack it, change the JavaScript modules under `res/`, and repack:

```
python3 tools/prototype-bundle.py unpack /tmp/proto
python3 tools/prototype-bundle.py repack /tmp/proto
```

Then recapture the mockups in `assets/mockups/` (full screens at 1440x900 and 1.25x; cards and tables as element captures at 2x) and rebuild the walkthrough clips from 2x captures with `tools/make-walkthrough-videos.py`.

## Walkthrough clips

`assets/video/walk-<step>.mp4` (H.264) and `walk-<step>.webm` (AV1) are 12-second silent loops at 1280x800, 480 KB to 1 MB each, made from 2x captures of the product build: an eased zoom and pan across the screen with captions in Outfit, starting and ending on the full screen so each loop is seamless. They are generated by `tools/make-walkthrough-videos.py` (see its header for the inputs).

The page is light on data:

- Every clip has `preload="none"`, `muted playsinline loop` and a poster still, and carries no source in the HTML.
- Nothing downloads until the tour is on screen. Then only step 1 loads. Picking a step loads that clip and unloads the previous one.
- Browsers that play AV1 get the WebM; the rest get the MP4.
- A visible Pause button sits in the browser bar of each clip (WCAG 2.2.2). Under reduced motion nothing loads or plays until Play is pressed.

## Trial sign-up and login addresses

The login link carries `data-login` and reads `<body data-login="…">`, currently `https://app.managem.co.za/`, a placeholder like the sign-up address. Every trial button carries `data-signup`. The address is set once, on `<body data-signup="…">` in `index.html`, and the script copies it into each button; the markup carries the same address as a fallback. It is `https://app.managem.co.za/signup`, a placeholder until the real sign-up URL is supplied. Confirm it before launch.

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
| Form endpoint | None set. Forms open the visitor's email app until `data-endpoint` is filled on both forms. |
| WhatsApp number | None set, so WhatsApp links are hidden. Add a monitored number to `data-whatsapp`. |
| Sage editions and Xero plans supported, direction of product sync | Phrased generally ("synced with Sage or Xero"); add specifics when known. |
| Availability | South African companies only, for now. Stated on the homepage FAQ, the pricing and About pages, the footer and in the structured data. |
| Hosting location, retention after an account closes, notice period | Not stated; the FAQ says "ask us". |
| Field-user pricing | Not stated; "ask us". |
| Several companies per account | Not stated as a feature; routed to the larger-teams path. |
| AI-assisted take-on | Described as in V1, with human review stated and no time estimate. Confirm the feature before launch. |
| Job costing, labour hours, margin per job | Not in the product build. Not claimed anywhere on the page. If the live application has them, the hero can return to a profitability promise. |
| Customer stories | None published. The page says so and offers a reference call. |
| Legal pages | Privacy notice and terms of service do not exist yet; the footer says they are being finalised. |
| Xero | Supported, confirmed by GEMIS in October 2026. The site names Sage Accounting and Xero together. |
| Sage and Xero sync frequency | Not stated. The build shows a Sync now action and a last-sync time per invoice. |
