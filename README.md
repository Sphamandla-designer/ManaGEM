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
| `support.html` | The support centre: nine ticket types, each opening a pre-addressed email, and the contact details |
| `blog.html`, `blog/` | The blog index and its three articles |
| `industries/` | One page per industry |
| `tools/build-chrome.py` | Writes the shared header, mega menus, phone menu and footer into every page |
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

1. Hero, following `reference/design/reference-03-hero.jpeg`: left-aligned copy over a black-to-teal-to-white gradient with drifting light rays and blooms, a "Synced with Sage" pill, a white call to action and an arrow link, and the dashboard standing on the white bloom with its lower part faded out
2. Trust, centred on white ("Backed by more than a decade of building business systems"): four verified figures in navy-to-teal gradient type that count up once (GEMIS in business since 2014, six stages on one job record, five industries, three export formats), then a moving row of trust marks with a pause button; hover and keyboard focus also pause it, and with reduced motion it is a static, wrapped row
3. Features, "Run the work, not the paperwork.": three white linked cards in one row (sales pipeline, jobs and bookings, invoicing and Sage); each is a link to its page under `features/`, and the only control is the animated arrow. The "Also in every plan" line below links the quotes, stock and factory pages
4. Inside ManaGEM, centred on a clean navy-to-teal-to-white band (`--grad-band`, no pattern): six steps, enquiry to payment, each with a heading and one short line above an auto-playing silent clip of the real screen (see below); the clips play through in order and a chosen step loops
5. Pricing, centred: four plan cards and a link to the pricing page
6. Industries: five industry tabs with outcomes, modules and a product crop, each with a link to its industry page, plus the accountants card
7. Getting started, a full-width navy-to-teal band (no card): four steps and an example of what take-on files become
8. Support and questions: the contact tile and a numbered FAQ
9. Final call to action on the dark band with three paths, footer, sticky action bar on phones

### Trust figures

Every figure in the trust panel is sourced. The founding year, the ERP work, the multi-country systems and the Microsoft Cloud team come from the GEMIS company profile (2025). The six stages, five trades and three export formats come from the product build. There is no customer count, client logo row or satisfaction score, because none is confirmed. Add them to the panel or the moving row once they are, with the customers' consent for any names or logos.

## Pricing page

`pricing.html` holds the pricing detail that used to sit on the homepage: the four plans, "Everything, on every plan", the full plan comparison (always open, scrollable on phones), "Good to know", and the four commitments (your data stays yours, POPIA, monthly with no minimum term, support from the people who build it). The homepage pricing section and the feature pages link to it.

Every section uses the same spacing (the `.section` padding); there are no per-section overrides.

The header menu is centred: Features, Product, Industries, Pricing, Blogs, Support, with Log in and the trial button on the right. Below 1180px it collapses into the phone menu.

- **Features**, **Industries** and **Support** open mega menus on hover or keyboard focus; Escape closes them. Features and Industries list every page with a short description. Support lists nine ticket types (a fault, log-in and access, users, Sage sync, importing data, billing, how-to questions, feature requests, sales); each opens the visitor's email with the subject filled in and a short template, addressed to `info@gemis.co.za`. There is no ticketing system behind it; it is email.
- **Pricing** goes to `pricing.html`, **Blogs** to `blog.html`, **Product** to the walkthrough on the homepage.
- On phones the features and industries are listed under their menu items.

The header, menus and footer are generated. Edit `tools/build-chrome.py`, then run `python3 tools/build-chrome.py` from the repository root; it rewrites only the regions between the `chrome:header` and `chrome:footer` markers on every page. Contact goes to `info@gemis.co.za` by email; there is no form on the site.

## Industry pages

`industries/<slug>.html`, one per industry: waterproofing, roofing, building and renovation, manufacturing and factory, maintenance and service. Each has a hero with a real product screen, what ManaGEM handles for that industry and the modules used most (the same verified points as the homepage tabs), links to the three features that matter most, and a next-industry link. Edit them directly.

## Blog and support

`blog.html` lists three articles under `blog/`: moving off spreadsheets for the take-on, how one job record runs from enquiry to payment, and how ManaGEM and Sage split the work. They describe only what the product build and the V1 draft support, and carry no statistics. Add new articles by copying one and adding a card to `blog.html`.

`support.html` repeats the nine ticket types from the Support menu as cards, with the phone number, email and FAQ link.

## Feature pages

`features/<slug>.html`, six pages: three reached from the feature cards and three from the "Also in every plan" line. Each has the same header and footer as the homepage, a hero on the dark band with the real screen, a "what you get" list drawn only from what the product build shows, and a next-feature link. They are static pages generated from the content table in the October 2026 rebuild; edit them directly.

## Walkthrough clips

`assets/video/walk-<step>.mp4` and `.webm` are 12-second silent loops made from 2x captures of the product build: an eased zoom and pan across the screen with captions in Outfit, starting and ending on the full screen so each loop is seamless. They are generated by `tools/make-walkthrough-videos.py` (see its header for the inputs). The page plays the clip of the selected step only, starts it when the section is on screen, pauses it off screen, and does not autoplay under reduced motion (the clips get controls instead).

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
| Sage editions supported, direction of product sync | Phrased generally ("synced with Sage"); add specifics when known. |
| Hosting location, retention after an account closes, notice period | Not stated; the FAQ says "ask us". |
| Field-user pricing | Not stated; "ask us". |
| Several companies per account | Not stated as a feature; routed to the larger-teams path. |
| AI-assisted take-on | Described as in V1, with human review stated and no time estimate. Confirm the feature before launch. |
| Job costing, labour hours, margin per job | Not in the product build. Not claimed anywhere on the page. If the live application has them, the hero can return to a profitability promise. |
| Customer stories | None published. The page says so and offers a reference call. |
| Legal pages | Privacy notice and terms of service do not exist yet; the footer says they are being finalised. |
| Xero | Planned, not available. |
