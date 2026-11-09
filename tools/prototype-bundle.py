#!/usr/bin/env python3
"""Unpack and repack the single-file product prototype (reference/product/managem-app.html).

The prototype is a self-contained bundle: a page template plus embedded resources
(gzip-compressed, base64-encoded JavaScript modules, images and fonts) listed in a
JSON manifest. The app's screens and their data live in the small JavaScript modules.

    python3 tools/prototype-bundle.py unpack <dir>
        Writes <dir>/template.html, <dir>/res/<id>.<ext> for every resource, and
        <dir>/modules.txt (each module's id, size and first comment line).

    python3 tools/prototype-bundle.py repack <dir>
        Re-encodes every resource in <dir>/res and the template back into the
        prototype file. Library modules with an integrity hash must not be edited.

After repacking, recapture the site's mockups and walkthrough clips from the prototype.
"""
import base64, gzip, json, os, re, sys, zlib

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PROTO = os.path.join(ROOT, 'reference', 'product', 'managem-app.html')
EXT = {'image/png': '.png', 'font/woff2': '.woff2'}

def blocks(src):
    man = re.search(r'<script type="__bundler/manifest">(.*?)</script>', src, re.S)
    tpl = re.search(r'<script type="__bundler/template">(.*?)</script>', src, re.S)
    return man, tpl

def unpack(d):
    src = open(PROTO, encoding='utf-8').read()
    man, tpl = blocks(src)
    os.makedirs(os.path.join(d, 'res'), exist_ok=True)
    open(os.path.join(d, 'template.html'), 'w', encoding='utf-8').write(json.loads(tpl.group(1)))
    lines = []
    for k, v in json.loads(man.group(1)).items():
        raw = base64.b64decode(v['data'])
        if v.get('compressed'):
            try: raw = gzip.decompress(raw)
            except OSError: raw = zlib.decompress(raw, -15)
        path = os.path.join(d, 'res', k + EXT.get(v['mime'], '.js'))
        open(path, 'wb').write(raw)
        head = raw[:120].decode('utf-8', 'replace').split('\n')[0] if v['mime'].endswith('javascript') else v['mime']
        lines.append(f'{k}  {len(raw):>8}  {head}')
    open(os.path.join(d, 'modules.txt'), 'w').write('\n'.join(sorted(lines, key=lambda l: int(l.split()[1]))))
    print(f'unpacked {len(lines)} resources to {d}')

def repack(d):
    src = open(PROTO, encoding='utf-8').read()
    man, _ = blocks(src)
    m = json.loads(man.group(1))
    for k, v in m.items():
        raw = open(os.path.join(d, 'res', k + EXT.get(v['mime'], '.js')), 'rb').read()
        v['data'] = base64.b64encode(gzip.compress(raw, 9, mtime=0) if v.get('compressed') else raw).decode()
    out = src[:man.start(1)] + json.dumps(m, separators=(',', ':')) + src[man.end(1):]
    _, tpl = blocks(out)
    t = open(os.path.join(d, 'template.html'), encoding='utf-8').read()
    out = out[:tpl.start(1)] + json.dumps(t, ensure_ascii=False).replace('</', '<\\u002F') + out[tpl.end(1):]
    open(PROTO, 'w', encoding='utf-8').write(out)
    print(f'repacked {len(m)} resources into {os.path.relpath(PROTO, ROOT)}')

if __name__ == '__main__':
    if len(sys.argv) != 3 or sys.argv[1] not in ('unpack', 'repack'):
        sys.exit(__doc__)
    (unpack if sys.argv[1] == 'unpack' else repack)(sys.argv[2])
