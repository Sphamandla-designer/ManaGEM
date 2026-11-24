// Render the ManaGEM LinkedIn and Facebook artwork in brand/social/src/banners.html to PNGs.
//
//   node brand/social/build.mjs
//
// Each canvas is written at the size the platform asks for; the LinkedIn company cover is also written
// at 2x for sharp screens. A second render with the safe areas drawn goes to safe-area-guides/.
import pw from '/opt/node22/lib/node_modules/playwright/index.js';
import { createServer } from 'node:http';
import { createReadStream, existsSync, mkdirSync, statSync } from 'node:fs';
import { dirname, extname, join, normalize } from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = join(HERE, '..', '..');
const OUT = [
  ['li-banner', 'linkedin/managem-linkedin-banner-1584x396.png'],
  ['li-banner-light', 'linkedin/managem-linkedin-banner-light-1584x396.png'],
  ['li-cover', 'linkedin/managem-linkedin-company-cover-1128x191.png'],
  ['li-cover', 'linkedin/managem-linkedin-company-cover@2x-2256x382.png', 2],
  ['li-logo', 'linkedin/managem-linkedin-logo-400x400.png'],
  ['fb-cover', 'facebook/managem-facebook-page-cover-1640x624.png'],
  ['fb-group', 'facebook/managem-facebook-group-cover-1640x856.png'],
  ['fb-event', 'facebook/managem-facebook-event-cover-1920x1005.png'],
  ['fb-profile', 'facebook/managem-facebook-profile-720x720.png'],
];
const GUIDES = ['li-banner', 'li-cover', 'fb-cover', 'fb-group', 'fb-profile'];

const MIME = { '.html': 'text/html; charset=utf-8', '.webp': 'image/webp', '.png': 'image/png', '.woff2': 'font/woff2' };
const server = createServer((req, res) => {
  const f = join(ROOT, normalize(decodeURIComponent(req.url.split('?')[0])));
  if (!f.startsWith(ROOT) || !existsSync(f) || !statSync(f).isFile()) { res.writeHead(404).end(); return; }
  res.writeHead(200, { 'content-type': MIME[extname(f)] || 'application/octet-stream' });
  createReadStream(f).pipe(res);
});
await new Promise((ok) => server.listen(0, '127.0.0.1', ok));
const url = `http://127.0.0.1:${server.address().port}/brand/social/src/banners.html`;

const browser = await pw.chromium.launch();
async function shoot(scale, guides, jobs) {
  const page = await browser.newPage({ viewport: { width: 2400, height: 1200 }, deviceScaleFactor: scale });
  await page.goto(url, { waitUntil: 'networkidle' });
  await page.evaluate(async (g) => { document.body.classList.toggle('guides', g); await document.fonts.ready; }, guides);
  for (const [id, file] of jobs) {
    mkdirSync(dirname(join(HERE, file)), { recursive: true });
    await page.locator('#' + id).screenshot({ path: join(HERE, file) });
    console.log('wrote', file);
  }
  await page.close();
}
await shoot(1, false, OUT.filter((o) => !o[2]));
await shoot(2, false, OUT.filter((o) => o[2] === 2));
await shoot(1, true, GUIDES.map((id) => [id, `safe-area-guides/${id}-guides.png`]));
await browser.close();
server.close();
