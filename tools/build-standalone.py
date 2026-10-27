#!/usr/bin/env python3
"""Build the whole ManaGEM site as one self-contained HTML file.

    python3 tools/build-standalone.py [output.html]     (default: dist/ManaGEM-website.html)

The file opens straight from disk on any device, with no web server and no
network: the stylesheet, fonts, logos, product screens and walkthrough clips
are all embedded. The homepage is written out as ordinary HTML, so it reads
fully even where scripts do not run. A small router holds every other page and
swaps it in when a link is followed, using addresses such as
#/pricing.html or #/contact.html?enquiry=accountant-demo~reach (~ marks the
section to scroll to), so Back, Forward and reloading all work. The site's own
behaviour (assets/js/site.js) runs unchanged for each page; the router removes
the listeners, timers and observers it left behind before the next page loads.

Only the H.264 clips are embedded (every browser plays them), not the AV1 copies.
"""
import base64, json, mimetypes, posixpath, re, sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
OUT = Path(sys.argv[1]) if len(sys.argv) > 1 else ROOT / 'dist' / 'ManaGEM-website.html'
SKIP = {'accountants.html'}                     # a redirect page; its address routes to the page it points at
ALIAS = {'accountants.html': 'accounting-and-bookkeeping.html'}
LIVE = 'https://sphamandla-designer.github.io/ManaGEM/'
mimetypes.add_type('image/webp', '.webp'); mimetypes.add_type('font/woff2', '.woff2')

pages = sorted(str(p.relative_to(ROOT)) for p in list(ROOT.glob('*.html')) + list(ROOT.glob('*/*.html'))
               if not str(p.relative_to(ROOT)).startswith(('reference/', 'docs/')) and p.name not in SKIP and p.name != OUT.name)
PAGES = set(pages)


def b64(path):
    return base64.b64encode((ROOT / path).read_bytes()).decode()


def data_uri(path):
    return f'data:{mimetypes.guess_type(path)[0]};base64,{b64(path)}'


def resolve(page, url):
    """Map a link or asset address in `page` to ('page', route) / ('asset', path) / (None, url)."""
    if re.match(r'(?i)(https?:|mailto:|tel:|data:|javascript:)', url) or url.startswith('#'):
        return None, url
    path, frag = (url.split('#', 1) + [''])[:2]
    path, query = (path.split('?', 1) + [''])[:2]
    target = posixpath.normpath(posixpath.join(posixpath.dirname(page), path)) if path else page
    if target in ('.', ''): target = 'index.html'
    if url.split('#')[0].split('?')[0].endswith('/'): target = posixpath.join(target, 'index.html')
    target = ALIAS.get(target, target)
    if target in PAGES:
        return 'page', '#/' + target + ('?' + query if query else '') + ('~' + frag if frag else '')
    if target.startswith('assets/') and (ROOT / target).is_file():
        return 'asset', target
    if (ROOT / target).is_file():                # e.g. the product demo: too large to embed, so open it on the live site
        return None, LIVE + target + ('?' + query if query else '') + ('#' + frag if frag else '')
    raise SystemExit(f'{page}: cannot resolve {url!r}')


def rewrite(page, html, used):
    def sub(m):
        attr, url = m.group(1), m.group(2)
        kind, val = resolve(page, url)
        if kind is None: return m.group(0) if val == url else f' {attr}="{val}"'
        if kind == 'page': return f' {attr}="{val}"'
        if attr == 'data-webm': return ''
        used.add(val)
        return f' data-mg-{attr.replace("data-", "")}="{val}"'
    return re.sub(r'\s(href|src|poster|data-mp4|data-webm)="([^"]*)"', sub, html)


def parse(page):
    s = (ROOT / page).read_text()
    title = re.search(r'<title>(.*?)</title>', s, re.S).group(1)
    m = re.search(r'<body([^>]*)>(.*)</body>', s, re.S)
    attrs = dict(re.findall(r'([\w-]+)="([^"]*)"', m.group(1)))
    body = re.sub(r'\s*<script src="[^"]*site\.js"[^>]*></script>', '', m.group(2))
    return title, attrs, body, s


used, tpl = set(), {}
for p in pages:
    title, attrs, body, _ = parse(p)
    tpl[p] = {'t': title, 'a': attrs, 'h': rewrite(p, body, used)}

# ---- homepage as plain HTML: its images carry their data, so it reads without scripts ----
title, attrs, home_body, home_src = parse('index.html')
static_used = set()
static = rewrite('index.html', home_body, static_used)
def inline(m):
    attr, path = m.group(1), m.group(2)
    real = {'src': 'src', 'poster': 'poster', 'href': 'href'}.get(attr)
    return m.group(0) + (f' {real}="{data_uri(path)}"' if real else '')
static = re.sub(r'\sdata-mg-(src|poster|href|mp4)="([^"]*)"', inline, static)
in_static = {p for p in static_used if not p.endswith('.mp4')}
assets = {p: b64(p) for p in sorted(used) if p not in in_static}

# ---- stylesheet: fonts embedded; reveal-on-scroll only hides content once scripts are running ----
css = (ROOT / 'assets/css/site.css').read_text()
css = re.sub(r'url\("\.\./(fonts/[^"]+)"\)', lambda m: f'url("{data_uri("assets/" + m.group(1))}")', css)
css, n = re.subn(r'(?m)^(\s*)\.reveal\{opacity:0', r'\1.js .reveal{opacity:0', css)
assert n == 1, 'reveal rule not found'

head = '\n'.join(x for x in [
    '<meta charset="utf-8">',
    '<meta name="viewport" content="width=device-width, initial-scale=1">',
    f'<title>{title}</title>',
    *re.findall(r'<meta name="(?:description|theme-color)"[^>]*>', home_src),
    f'<link rel="icon" type="image/png" sizes="32x32" href="{data_uri("assets/brand/ManaGEM-favicon-32.png")}">',
    f'<link rel="apple-touch-icon" href="{data_uri("assets/brand/ManaGEM-favicon-180.png")}">',
    *re.findall(r'<script type="application/ld\+json">.*?</script>', home_src, re.S),
    "<script>document.documentElement.className+=' js'</script>",
    f'<style>{css}</style>',
])

site_js = (ROOT / 'assets/js/site.js').read_text()
site_js, n = re.subn(r'\blocation\.search\b', 'routeSearch', site_js)
assert n == 1, 'location.search not found in site.js'
# a clip is decoded only when the walkthrough is about to play it
site_js, n = re.subn(r"v\.getAttribute\('data-mp4'\)", "assetUrl(v.getAttribute('data-mg-mp4'))", site_js)
assert n == 1, 'data-mp4 lookup not found in site.js'

ROUTER = r"""
(function () {
  'use strict';
  var PAGES = JSON.parse(document.getElementById('mg-pages').textContent);
  var ASSETS = JSON.parse(document.getElementById('mg-assets').textContent);
  var addListener = EventTarget.prototype.addEventListener;
  var nativeTimeout = window.setTimeout, nativeInterval = window.setInterval;
  var nativeIO = window.IntersectionObserver;
  var routeSearch = '', current = null;

  /* ---- assets: images already on the homepage give their data; the rest decode on first use ---- */
  var urls = {};
  [['src', 'src'], ['poster', 'poster']].forEach(function (pair) {
    Array.prototype.forEach.call(document.querySelectorAll('[data-mg-' + pair[0] + ']'), function (el) {
      if (el.getAttribute(pair[1])) urls[el.getAttribute('data-mg-' + pair[0])] = el.getAttribute(pair[1]);
    });
  });
  function assetUrl(path) {
    if (urls[path]) return urls[path];
    var b = ASSETS[path]; if (!b) return '';
    var type = /\.mp4$/.test(path) ? 'video/mp4' : /\.webp$/.test(path) ? 'image/webp' : 'image/png';
    if (type === 'video/mp4' && window.Blob && window.URL && URL.createObjectURL) {
      var bin = atob(b), bytes = new Uint8Array(bin.length);
      for (var i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
      urls[path] = URL.createObjectURL(new Blob([bytes], { type: type }));
    } else urls[path] = 'data:' + type + ';base64,' + b;
    return urls[path];
  }
  function hydrate(root) {
    [['src', 'src'], ['poster', 'poster'], ['href', 'href']].forEach(function (pair) {
      Array.prototype.forEach.call(root.querySelectorAll('[data-mg-' + pair[0] + ']'), function (el) {
        var path = el.getAttribute('data-mg-' + pair[0]);
        if (!el.getAttribute(pair[1]) || el.getAttribute(pair[1]).indexOf('data:') !== 0) el.setAttribute(pair[1], assetUrl(path));
      });
    });
  }

  /* ---- what a page leaves behind: window and document listeners, timers, observers ---- */
  var listeners = [], timers = [], observers = [];
  [window, document].forEach(function (target) {
    target.addEventListener = function (type, fn, opts) { listeners.push([target, type, fn, opts]); return addListener.call(target, type, fn, opts); };
  });
  window.setTimeout = function () { var id = nativeTimeout.apply(window, arguments); timers.push(id); return id; };
  window.setInterval = function () { var id = nativeInterval.apply(window, arguments); timers.push(id); return id; };
  if (nativeIO) {
    window.IntersectionObserver = function (cb, opts) { var io = new nativeIO(cb, opts); observers.push(io); return io; };
    window.IntersectionObserver.prototype = nativeIO.prototype;
  }
  function cleanup() {
    listeners.forEach(function (l) { EventTarget.prototype.removeEventListener.call(l[0], l[1], l[2], l[3]); });
    timers.forEach(function (id) { clearTimeout(id); clearInterval(id); });
    observers.forEach(function (io) { io.disconnect(); });
    listeners = []; timers = []; observers = [];
    Array.prototype.forEach.call(document.querySelectorAll('video'), function (v) {
      v.pause(); while (v.firstChild) v.removeChild(v.firstChild); v.removeAttribute('src'); v.load();
    });
  }

  /* ---- routes: #/page.html?query~section ---- */
  function parse(hash) {
    var m = /^#\/([^?~]*)(\?[^~]*)?(?:~(.*))?$/.exec(hash || '');
    if (!m) return null;
    var path = decodeURIComponent(m[1] || 'index.html');
    if (path === 'accountants.html') path = 'accounting-and-bookkeeping.html';
    if (!PAGES[path]) path = 'index.html';
    return { path: path, search: m[2] || '', anchor: m[3] ? decodeURIComponent(m[3]) : '' };
  }
  /* page changes land at once; only a section on the same page glides into view */
  function jump(fn) {
    var root = document.documentElement, was = root.style.scrollBehavior;
    root.style.scrollBehavior = 'auto'; fn(); root.style.scrollBehavior = was;
  }
  function toSection(id, smooth) {
    var el = id && document.getElementById(id);
    if (!el) return false;
    if (smooth) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    else jump(function () { el.scrollIntoView({ block: 'start' }); });
    if (id === 'main' || el.tabIndex >= 0 || /^(A|BUTTON|INPUT|SELECT|TEXTAREA)$/.test(el.tagName)) {
      if (el.tabIndex < 0) el.setAttribute('tabindex', '-1');
      el.focus({ preventScroll: true });
    }
    return true;
  }
  function render(route, first) {
    var page = PAGES[route.path], key = route.path + route.search;
    if (current === key) { if (!toSection(route.anchor, true)) window.scrollTo({ top: 0, behavior: 'smooth' }); return; }
    var keepStatic = first && route.path === 'index.html';
    if (!keepStatic) {
      cleanup();
      var b = document.body;
      while (b.attributes.length) b.removeAttribute(b.attributes[0].name);
      Object.keys(page.a).forEach(function (k) { b.setAttribute(k, page.a[k]); });
      b.innerHTML = page.h;
    }
    document.title = page.t;
    hydrate(document.body);
    routeSearch = route.search; current = key;
    jump(function () { window.scrollTo(0, 0); });
    runSite();
    if (!toSection(route.anchor, false) && !first) {
      var main = document.getElementById('main');
      if (main) { main.setAttribute('tabindex', '-1'); main.focus({ preventScroll: true }); }
    }
  }
  function go() {
    var hash = location.hash, route = parse(hash);
    if (route) return render(route, current === null);
    /* no address, or a plain #section: the section on the current page, else the homepage */
    var id = decodeURIComponent(hash.slice(1));
    if (current !== null && id && toSection(id, true)) return;
    render({ path: 'index.html', search: '', anchor: id }, current === null);
  }

  /* in-page links scroll without leaving the page, and the address keeps the page */
  addListener.call(document, 'click', function (e) {
    var a = e.target.closest && e.target.closest('a[href^="#"]');
    if (!a || e.defaultPrevented || a.getAttribute('href').charAt(1) === '/' || a.getAttribute('href') === '#') return;
    var id = decodeURIComponent(a.getAttribute('href').slice(1));
    if (!document.getElementById(id)) return;
    e.preventDefault();
    var route = current ? current.split('?') : ['index.html'];
    try { history.pushState(null, '', '#/' + route[0] + (route[1] ? '?' + route[1] : '') + '~' + encodeURIComponent(id)); } catch (err) {}
    toSection(id, true);
  });
  addListener.call(window, 'hashchange', go);
  if ('scrollRestoration' in history) history.scrollRestoration = 'manual';

  function runSite() {
%SITE%
  }
  go();
})();
"""

def safe_json(obj):
    return json.dumps(obj, ensure_ascii=False, separators=(',', ':')).replace('<', '\\u003c')

body_attrs = ''.join(f' {k}="{v}"' for k, v in attrs.items())
doc = f"""<!DOCTYPE html>
<html lang="en-ZA">
<head>
{head}
</head>
<body{body_attrs}>
{static}
<script type="application/json" id="mg-pages">{safe_json(tpl)}</script>
<script type="application/json" id="mg-assets">{safe_json(assets)}</script>
<script>{ROUTER.replace('%SITE%', site_js)}</script>
</body>
</html>
"""
OUT.parent.mkdir(parents=True, exist_ok=True)
OUT.write_text(doc)
print(f'{OUT}: {len(doc.encode()) / 1e6:.1f} MB, {len(pages)} pages, {len(used)} assets')
