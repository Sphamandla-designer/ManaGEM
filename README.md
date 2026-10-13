# ManaGEM website

Marketing site for ManaGEM, the job-management product built and supported by GEMIS.

## Run it

The site is static. Open `index.html` directly, or serve the folder:

```
python3 -m http.server 8080
```

No build step. Fonts load from Google Fonts; everything else is local.

## Layout

| Path | What it is |
| --- | --- |
| `index.html` | The site, one page with anchored sections |
| `assets/css/site.css` | Design tokens and all styles |
| `assets/js/site.js` | Header state, mobile menu, scroll reveal, product tabs, pricing, trial form |
| `assets/brand/` | Logo files supplied by the brand, plus trimmed `logo.png`, `logo-reversed.png`, `mark.png` |
| `assets/mockups/` | WebP screenshots of the real ManaGEM product, used as the site's mockups |
| `reference/design/` | The two approved layout references the site follows |
| `reference/product/` | The self-contained ManaGEM product build the mockups were captured from |
| `reference/ManaGEM-website-V1_1.html` | The V1 content draft this site's copy is based on |
| `.claude/skills/ui-ux-pro-max/` | UI/UX guidance skill used during the build |

## Design system

Taken from the brand files and the product itself, not invented for the site.

- **Colour.** Navy ink `#0F172A` and `#0B1222` for dark bands, GEM teal `#00BFA6` for the primary action and highlights, product sky-blue `#0EA5E9` for focus and links, slate neutrals for text and lines.
- **Type.** Outfit for everything, IBM Plex Mono for figures and references, matching the product.
- **Shape.** Pill buttons, 16 to 32 px radii, soft layered shadows on product cards, thin 1 px dividers in the feature bento.
- **Motion.** Entrance rise on the hero, reveal on scroll, 160 to 600 ms easings. Everything respects `prefers-reduced-motion`.

## Page order

Follows the reference layout, section for section.

1. Dark hero with centred headline and floating product cards that overlap onto the page
2. Trades strip
3. Feature bento, two wide cells then three narrow, each with a product crop
4. Why it matters, three problem cards
5. Product tour, tabbed browser frame with five full screens
6. How it works, dark band with three steps and the trial form
7. Sage integration
8. Customer quotes with two stat tiles
9. Pricing with monthly and yearly toggle, included list and plan selector
10. FAQ
11. Final call to action and footer

## Hero video

`assets/video/hero.mp4` and `hero.webm` are cut from `reference/design/hero-source-16-9.mp4`. The source is a 1280 by 720 abstract gradient loop with a vendor badge in the bottom-right corner. The badge is removed by cropping the frame to 1280 by 648, and the blue-to-purple palette is remapped through a luminance curve to navy, deep teal and GEM teal. A poster frame is exported as WebP. The page pauses the video under reduced motion or data saver and layers a navy shade over it for contrast.

Regenerate with ffmpeg: crop `1280:648:0:0`, convert to grey, then map luminance to the three brand stops with `geq`.

## Regenerating mockups

The mockups are real screens from `reference/product/managem-app.html`, rendered in Chromium at 1440 px and 2x scale, signed in with the prefilled prototype user, cropped per card with Playwright element screenshots and saved as WebP. The product is not responsive below desktop width, so phone frames are not used.

## Content still to confirm

The copy keeps the V1 positioning. These points are still proposals or placeholders and are marked in the source where relevant.

| Item | Status |
| --- | --- |
| Customer quotes | Drafts written in the customer's voice. Replace with approved, named quotes before launch. |
| Yearly billing at ten months' price | Proposal shown by the pricing toggle. Commercial terms not frozen. |
| Field users not counting toward plan users | Proposal from V1, not yet priced. |
| Trial length, card requirement, notice period | As in V1, to be confirmed by Leon and Graeme. |
| Sage editions supported, hosting location, data deletion period | Phrased generally; add specifics when known. |
| Xero | Listed as roadmap only. |
| Phone capture of hours and slips by foremen | Mentioned in FAQ and pricing; confirm it exists before launch. |
| Customer login URL | Links point to the top of the page until the app URL is supplied. |
| Stats strip figures | "12 businesses" comes from V1 and is unconfirmed. "24 modules" counts the sidebar entries in the product build. |
