# ManaGEM — LinkedIn and Facebook artwork

Every file here is rendered from `src/banners.html` by `build.mjs` (`node brand/social/build.mjs`), so a
change to the copy or the look is made once and re-rendered. The artwork uses the website's own look:
the navy-to-teal gradient, the flowing teal lines from the log-in page, Outfit and IBM Plex Mono, the
logo from `assets/brand/`, and the dashboard screen from `assets/mockups/app-dashboard.webp`. The copy is
the website's: "Know where every job stands, from enquiry to invoice.", "Synced with Sage and Xero",
"For South African businesses", "14-day free trial".

## LinkedIn

| File | Size | Where it goes |
| --- | --- | --- |
| `linkedin/managem-linkedin-banner-1584x396.png` | 1584×396 | Personal profile background (Edit profile → background photo) |
| `linkedin/managem-linkedin-banner-light-1584x396.png` | 1584×396 | The same on a light ground |
| `linkedin/managem-linkedin-company-cover-1128x191.png` | 1128×191 | Company page cover (Edit page → Header → Cover image) |
| `linkedin/managem-linkedin-company-cover@2x-2256x382.png` | 2256×382 | The same at twice the size, for sharper screens |
| `linkedin/managem-linkedin-logo-400x400.png` | 400×400 | Company page logo, or profile picture |

## Facebook

| File | Size | Where it goes |
| --- | --- | --- |
| `facebook/managem-facebook-page-cover-1640x624.png` | 1640×624 | Page cover photo (shown at 820×312 on computers) |
| `facebook/managem-facebook-group-cover-1640x856.png` | 1640×856 | Group cover photo |
| `facebook/managem-facebook-event-cover-1920x1005.png` | 1920×1005 | Event cover photo |
| `facebook/managem-facebook-profile-720x720.png` | 720×720 | Page profile picture (shown as a circle) |

## Safe areas

Both platforms cover part of a banner with the profile picture and crop the sides on phones. All the
words sit inside the area that is always shown; the product screen may be cut at the edges, which is
fine. `safe-area-guides/` has a copy of each layout with those zones drawn: the pink dashed shape is
where the profile picture lands, and the orange dashed lines are the narrow-screen crop. They are for
checking only, not for upload.

## Notes

- The product screen shows the demo company and its made-up records, the same as the website.
- No web address is printed on the artwork. Add the page's link in each platform's profile settings.
