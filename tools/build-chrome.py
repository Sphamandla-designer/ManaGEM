#!/usr/bin/env python3
"""Write the shared header, menus and footer into every page of the site.

The header (with the Features, Industries and Support mega menus), the phone
menu sheet and the footer are the same on every page, apart from relative
paths and which item is marked as the current page. They are defined once
here. After changing a menu, a feature, an industry or a support option, run:

    python3 tools/build-chrome.py

from the repository root. Each page keeps its own <head> and <main>; only the
regions between the chrome markers are rewritten.
"""
import glob, os, sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SIGNUP = 'https://app.managem.co.za/signup'
LOGIN = 'https://app.managem.co.za/'
EMAIL = 'info@gemis.co.za'
PHONE_HREF = 'tel:+27112195008'
PHONE = '+27 11 219 5008'

def ico(d, w='2'):
    return f'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="{w}" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">{d}</svg>'
ARROW = ico('<path d="M5 12h14M13 6l6 6-6 6"/>')
CHEV = ico('<path d="M6 9l6 6 6-6"/>')
LEDGER = ico('<path d="M4 4h16v16H4zM8 9h8M8 13h8M8 17h5"/>')
GRID = ico('<path d="M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z"/>')

# slug, name, one-line description, icon path
FEATURES = [
    ('sales-pipeline', 'Sales pipeline', 'Every enquiry, from first call to signed job', '<path d="M3 5h18l-7 8v6l-4-2v-4z"/>'),
    ('quotes-and-pricing', 'Quotes and pricing', 'Quote from your own product list', '<path d="M7 3h7l5 5v13H7z"/><path d="M14 3v5h5M10 13h6M10 17h6"/>'),
    ('jobs-and-bookings', 'Jobs and bookings', 'Every job with its foreman, dates and progress', '<path d="M4 7h16v13H4zM8 3v4M16 3v4M4 11h16"/>'),
    ('stock-and-purchasing', 'Stock and purchasing', 'Stock across stores and vehicles', '<path d="M3 7l9-4 9 4v10l-9 4-9-4z"/><path d="M3 7l9 4 9-4M12 11v10"/>'),
    ('factory-production', 'Factory production', 'Builds from pending to invoiced', '<path d="M3 21V10l6 4V10l6 4V6h6v15z"/>'),
    ('invoicing-and-debtors', 'Invoicing, debtors and Sage', 'Invoice from the job, chase from one list', '<path d="M6 3h12v18l-3-2-3 2-3-2-3 2z"/><path d="M9 8h6M9 12h6"/>'),
]

# slug, name, one-line description, icon path
INDUSTRIES = [
    ('waterproofing', 'Waterproofing', 'Quotes on today’s costs, warranties on the job', '<path d="M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11z"/>'),
    ('roofing', 'Roofing', 'Deposits, progress claims and the final invoice', '<path d="M3 11l9-7 9 7"/><path d="M5 10v10h14V10"/>'),
    ('building-and-renovation', 'Building and renovation', 'Long jobs, many trades, one record', '<path d="M4 21V9l8-5 8 5v12"/><path d="M9 21v-6h6v6"/>'),
    ('manufacturing-and-factory', 'Manufacturing and factory', 'Builds from pending to invoiced, with QC', '<path d="M3 21V10l6 4V10l6 4V6h6v15z"/>'),
    ('maintenance-and-service', 'Maintenance and service', 'Small jobs, high volume, nothing dropped', '<path d="M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18l3 3 6.3-6.3a4 4 0 0 0 5.4-5.4l-2.5 2.5-2.5-.5-.5-2.5z"/>'),
]

# Support ticket categories, used by the ticket form on support.html
SUPPORT_CATEGORIES = ['Something is not working', 'Log in and access', 'Users and permissions', 'Sage sync',
                      'Importing your data', 'Billing and plans', 'How do I\u2026?', 'Request a feature']

def links(page):
    """Relative links for a page. page['depth'] is 0 for the root, 1 for a subfolder."""
    p = '../' * page['depth']
    home = '' if page['kind'] == 'home' else p + 'index.html'
    return p, home

def cur(flag):
    return ' aria-current="page"' if flag else ''

def mega_product(page):
    p, home = links(page)
    items = ''.join(
        f'<a class="mega-item" href="{p}features/{s}.html"{cur(page.get("feature") == s)}><span class="mega-ico">{ico(d)}</span>'
        f'<span class="mega-t"><b>{n}</b><span>{t}</span></span></a>' for s, n, t, d in FEATURES)
    on = ' is-current' if page['kind'] == 'feature' else ''
    return (f'<li class="has-mega{on}"><a href="{home}#features" aria-expanded="false" aria-controls="megaProduct">Product {CHEV}</a>\n'
            f'          <div class="mega" id="megaProduct"><div class="mega-in mega-feature-first">\n'
            f'            <a class="mega-side mega-featured" href="{home}#tour"><span class="mega-label">Featured</span><b>See one job from enquiry to payment</b>'
            f'<img src="{p}assets/mockups/app-dashboard.webp" alt="" width="1800" height="1125" loading="lazy" decoding="async">'
            f'<span class="mega-go">Watch the walkthrough {ARROW}</span></a>\n'
            f'            <div class="mega-main"><span class="mega-label">Features</span><div class="mega-grid">{items}</div></div>\n'
            f'          </div></div>\n        </li>')

def mega_industries(page):
    p, home = links(page)
    items = ''.join(
        f'<a class="mega-item" href="{p}industries/{s}.html"{cur(page.get("industry") == s)}><span class="mega-ico">{ico(d)}</span>'
        f'<span class="mega-t"><b>{n}</b><span>{t}</span></span></a>' for s, n, t, d in INDUSTRIES)
    items += (f'<a class="mega-item mega-acct" href="{p}accounting-and-bookkeeping.html"{cur(page["kind"] == "accounting")}><span class="mega-ico">{ico(LEDGER)}</span>'
              f'<span class="mega-t"><b>Accounting and bookkeeping</b><span>For accountants and the businesses they support</span></span></a>')
    on = ' is-current' if page['kind'] in ('industry', 'accounting') else ''
    return (f'<li class="has-mega{on}"><a href="{home}#industries" aria-expanded="false" aria-controls="megaIndustries">Industries {CHEV}</a>\n'
            f'          <div class="mega mega-narrow" id="megaIndustries"><div class="mega-in">\n'
            f'            <div class="mega-main"><span class="mega-label">Industries</span><div class="mega-grid cols-1">{items}</div></div>\n'
            f'          </div></div>\n        </li>')

def header(page):
    p, home = links(page)
    k = page['kind']
    brand = '#top' if k == 'home' else home
    sub_p = (f'<li><a class="m-featured" href="{home}#tour">See one job from enquiry to payment</a></li>'
             + ''.join(f'<li><a href="{p}features/{s}.html"{cur(page.get("feature") == s)}>{n}</a></li>' for s, n, _, _ in FEATURES))
    sub_i = (''.join(f'<li><a href="{p}industries/{s}.html"{cur(page.get("industry") == s)}>{n}</a></li>' for s, n, _, _ in INDUSTRIES)
             + f'<li><a href="{p}accounting-and-bookkeeping.html"{cur(k == "accounting")}>Accounting and bookkeeping</a></li>')
    return f'''<header class="site-header on-dark" id="siteHeader">
  <div class="wrap">
    <a class="brand" href="{brand}" aria-label="ManaGEM home">
      <img class="logo-dark" src="{p}assets/brand/logo.png" alt="ManaGEM" width="171" height="30">
      <img class="logo-light" src="{p}assets/brand/logo-reversed.png" alt="ManaGEM" width="171" height="30">
    </a>
    <nav aria-label="Main">
      <ul class="nav-links">
        {mega_product(page)}
        {mega_industries(page)}
        <li><a href="{p}pricing.html"{cur(k == "pricing")}>Pricing</a></li>
        <li><a href="{p}support.html"{cur(k == "support")}>Support</a></li>
      </ul>
    </nav>
    <div class="nav-cta">
      <a class="nav-login" href="{LOGIN}" data-login>Log in</a>
      <a class="btn btn-primary btn-sm" href="{SIGNUP}" data-signup>Start free trial</a>
      <button class="menu-btn" type="button" id="menuBtn" aria-label="Open menu" aria-expanded="false" aria-controls="mobileNav">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16"/></svg>
      </button>
    </div>
  </div>
</header>

<div class="mobile-nav" id="mobileNav" role="dialog" aria-modal="true" aria-label="Menu" hidden>
  <div class="sheet">
    <div class="sheet-head">
      <img src="{p}assets/brand/logo-reversed.png" alt="ManaGEM" width="137" height="24">
      <button class="close" type="button" id="menuClose" aria-label="Close menu"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg></button>
    </div>
    <ul class="m-list">
      <li><button class="m-toggle" type="button" aria-expanded="false" aria-controls="mProduct">Product {CHEV}</button>
        <ul class="m-sub" id="mProduct" hidden>{sub_p}</ul>
      </li>
      <li><button class="m-toggle" type="button" aria-expanded="false" aria-controls="mIndustries">Industries {CHEV}</button>
        <ul class="m-sub" id="mIndustries" hidden>{sub_i}</ul>
      </li>
      <li><a href="{p}pricing.html"{cur(k == "pricing")}>Pricing</a></li>
      <li><a href="{p}support.html"{cur(k == "support")}>Support</a></li>
      <li><a href="{LOGIN}" data-login>Log in</a></li>
    </ul>
    <div class="actions">
      <a class="btn btn-primary btn-lg" href="{SIGNUP}" data-signup>Start free trial</a>
    </div>
  </div>
</div>
'''

def footer(page):
    p, home = links(page)
    brand = '#top' if page['kind'] == 'home' else home
    inds = ''.join(f'<li><a href="{p}industries/{s}.html">{n}</a></li>' for s, n, _, _ in INDUSTRIES)
    return f'''<footer class="site-footer">
  <div class="wrap">
    <div class="foot-grid wide">
      <div>
        <a class="brand" href="{brand}" aria-label="ManaGEM home"><img src="{p}assets/brand/logo-reversed.png" alt="ManaGEM" width="160" height="28"></a>
        <p>Job management for contractors and service businesses. Enquiries, quotes, jobs, stock, production and invoices in one system, synced with Sage. Built and supported by GEMIS in South Africa.</p>
        <a class="btn btn-primary btn-sm" href="{SIGNUP}" data-signup style="margin-top:18px">Start free trial</a>
      </div>
      <div><h3>Product</h3><ul><li><a href="{home}#tour">Product walkthrough</a></li><li><a href="{home}#features">Features</a></li><li><a href="{p}pricing.html">Pricing</a></li><li><a href="{p}pricing.html#compare">Compare plans</a></li><li><a href="{home}#start">Getting started</a></li></ul></div>
      <div><h3>Industries</h3><ul>{inds}<li><a href="{p}accounting-and-bookkeeping.html"{cur(page["kind"] == "accounting")}>Accounting and bookkeeping</a></li></ul></div>
      <div><h3>Support</h3><ul><li><a href="{p}support.html">Support centre</a></li><li><a href="{p}support.html#ticket">Open a ticket</a></li><li><a href="{home}#faq">Help and FAQ</a></li><li><a href="mailto:{EMAIL}">{EMAIL}</a></li><li><a href="{PHONE_HREF}">{PHONE}</a></li></ul></div>
      <div><h3>Company</h3><ul><li><a href="{p}contact.html"{cur(page["kind"] == "contact")}>Talk to sales</a></li><li><a href="{p}blog.html">Blog</a></li><li><a href="{p}about.html"{cur(page["kind"] == "about")}>About ManaGEM</a></li></ul><p class="foot-note">The privacy notice and terms of service are being finalised. Ask the team for the current versions.</p></div>
    </div>
    <div class="foot-bottom">
      <span>© <span id="year">2026</span> <b>GEM Information Systems</b>. South Africa.</span>
      <span class="foot-region"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/></svg>South Africa · English · Prices in ZAR excl. VAT</span>
    </div>
  </div>
</footer>
'''

H0, H1 = '<!-- chrome:header -->\n', '<!-- /chrome:header -->\n'
F0, F1 = '<!-- chrome:footer -->\n', '<!-- /chrome:footer -->\n'

def put(s, start, end, body, find_old):
    if start in s:
        a = s.index(start); b = s.index(end, a) + len(end)
    else:
        a, b = find_old(s)
    return s[:a] + start + body + end + s[b:]

def page_for(rel):
    depth = rel.count('/')
    name = rel.rsplit('/', 1)[-1][:-5]
    if rel == 'index.html': return {'kind': 'home', 'depth': 0}
    if rel.startswith('features/'): return {'kind': 'feature', 'feature': name, 'depth': depth}
    if rel.startswith('industries/'): return {'kind': 'industry', 'industry': name, 'depth': depth}
    if rel == 'blog.html' or rel.startswith('blog/'): return {'kind': 'blog', 'depth': depth}
    if rel in ('pricing.html', 'support.html', 'contact.html', 'about.html'): return {'kind': name, 'depth': depth}
    if rel == 'accounting-and-bookkeeping.html': return {'kind': 'accounting', 'depth': depth}
    return None

def main():
    files = ['index.html', 'pricing.html', 'support.html', 'contact.html', 'about.html', 'accounting-and-bookkeeping.html', 'blog.html'] + sorted(
        os.path.relpath(f, ROOT) for pat in ('features/*.html', 'industries/*.html', 'blog/*.html') for f in glob.glob(os.path.join(ROOT, pat)))
    done = []
    for rel in files:
        path = os.path.join(ROOT, rel)
        if not os.path.exists(path): continue
        page = page_for(rel)
        s = open(path, encoding='utf-8').read()
        s = put(s, H0, H1, header(page), lambda t: (t.index('<header class="site-header'), t.index('<main id="main">')))
        def old_footer(t):
            if '<footer class="site-footer">' in t:
                a = t.index('<footer class="site-footer">'); return a, t.index('</footer>\n', a) + len('</footer>\n')
            a = t.index('</main>\n') + len('</main>\n'); return a, a
        s = put(s, F0, F1, footer(page), old_footer)
        open(path, 'w', encoding='utf-8').write(s)
        done.append(rel)
    print('chrome written:', ', '.join(done))

if __name__ == '__main__':
    main()
