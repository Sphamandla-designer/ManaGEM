#!/usr/bin/env python3
"""Write the Adverts tab of blog.html from the list below.

    python3 tools/build-adverts.py

Each advert is one card: a still (assets/img/ads/<slug>.webp), the title, a line on what it shows, its
length (read from the video), and the formats it comes in. The card links to its first video, so it plays
even without JavaScript; site.js opens it in the player instead and offers the other formats.

Videos live in assets/video/ads/<slug>-<16x9|9x16|1x1>.mp4: H.264 and AAC at 720p, so they play on every
phone and browser. Add an advert by adding its videos and a still, then a line below, and run this.
"""
import json, re, subprocess
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
ADS = [
    ('now-serving', 'Now Serving',
     'A customer waits nine days for a quote. With ManaGEM every enquiry has a sales rep, a quote template and a follow-up date.'),
    ('leaks', 'Leaks',
     'A roofer can find any leak on a roof. ManaGEM shows the ones in the business: what customers owe, what has been paid, and what each product costs against its price.'),
    ('light', 'One system for your whole business',
     'Customers, quotes and invoices. Projects, stock and the factory floor. Debtors and reports. All connected, all live.'),
    ('voiceover', 'Know what’s making you money',
     'The whole business in one system, told in six lines. Made for phones.'),
    ('advert', 'Your whole business. One view.',
     'From scattered spreadsheets and chat groups to one live view: enquiries, invoices, projects, stock, the factory and debtors.'),
]
SHAPES = [('16x9', 'Landscape'), ('9x16', 'Vertical'), ('1x1', 'Square')]
PLAY = '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5.5v13l11-6.5z"/></svg>'


def seconds(path):
    out = subprocess.run(['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', str(path)],
                         capture_output=True, text=True, check=True).stdout
    return round(float(out))


cards = []
for slug, title, line in ADS:
    files = [(k, label, f'assets/video/ads/{slug}-{k}.mp4') for k, label in SHAPES if (ROOT / f'assets/video/ads/{slug}-{k}.mp4').exists()]
    if not files:
        raise SystemExit(f'no videos for {slug}')
    secs = seconds(ROOT / files[0][2])
    length = f'0:{secs:02d}' if secs < 60 else f'{secs // 60}:{secs % 60:02d}'
    data = ''.join(f' data-{k}="{path}"' for k, _, path in files)
    chips = ''.join(f'<span>{label}</span>' for _, label, _ in files)
    cards.append(f'''<article class="ad-card reveal">
        <a class="ad-play" href="{files[0][2]}" data-title="{title}"{data} aria-label="Play the advert: {title} ({secs} seconds)"><img src="assets/img/ads/{slug}.webp" alt="" width="1280" height="720" loading="lazy" decoding="async"><span class="ad-btn">{PLAY}</span><span class="ad-len">{length}</span></a>
        <div class="ad-body"><span class="post-meta"><span class="post-tag">Advert</span>{secs} seconds</span><b>{title}</b><span class="post-ex">{line}</span><span class="ad-formats" aria-label="Formats">{chips}</span></div>
      </article>''')

panel = '\n      '.join(cards)
blog = ROOT / 'blog.html'
s = blog.read_text()
s, n = re.subn(r'(<!-- adverts:start -->).*?(<!-- adverts:end -->)', lambda m: f'{m.group(1)}\n      {panel}\n      {m.group(2)}', s, flags=re.S)
assert n == 1, 'adverts markers not found in blog.html'
s, n = re.subn(r'(<span class="count" id="advertsCount">)\d*(</span>)', rf'\g<1>{len(cards)}\g<2>', s)
assert n == 1
blog.write_text(s)
print(f'blog.html: {len(cards)} adverts')
