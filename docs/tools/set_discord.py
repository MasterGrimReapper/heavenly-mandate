#!/usr/bin/env python3
"""Put the Discord invite on the website: python3 docs/tools/set_discord.py https://discord.gg/XXXX
Fills every data-discord-link href and shows every data-discord element. Run again with a new link to change it."""
import glob, os, re, sys
url = sys.argv[1].strip() if len(sys.argv) > 1 else ''
if not re.match(r'^https://(discord\.gg|discord\.com/invite)/[A-Za-z0-9-]+$', url):
    sys.exit('usage: set_discord.py https://discord.gg/<code>')
docs = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
for f in glob.glob(os.path.join(docs, '*.html')):
    s = open(f, encoding='utf-8').read()
    t = re.sub(r'data-discord-link href="[^"]*"', f'data-discord-link href="{url}"', s)
    t = t.replace('data-discord hidden', 'data-discord')
    if t != s:
        open(f, 'w', encoding='utf-8').write(t); print('updated', os.path.basename(f))
