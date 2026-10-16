#!/usr/bin/env python3
"""Regenerate the News page (docs/news.html) and the "Latest news" block on the home page (docs/index.html)
from the repository's CHANGELOG.md. Run it after each release:

    python3 docs/tools/build_news.py            (from the repository root)

It reads CHANGELOG.md sections that start with "# Heavenly Mandate — vX.YYY changelog", takes the bold line under
each heading as the title and the numbered items as the changes, and writes the latest five versions (title and
3-5 short bullets each) between the <!-- NEWS:START --> / <!-- NEWS:END --> markers in news.html, and the newest one
between <!-- LATEST:START --> / <!-- LATEST:END --> in index.html. Release dates come from the git log
("Release vX.YYY" commits) when git is available. Only the standard library is used.
"""
import html, os, re, subprocess, sys

HERE = os.path.dirname(os.path.abspath(__file__))
DOCS = os.path.dirname(HERE)
REPO = os.path.dirname(DOCS)
CHANGELOG = sys.argv[1] if len(sys.argv) > 1 else os.path.join(REPO, 'CHANGELOG.md')
COUNT = 5          # versions on the News page
BULLETS = 5        # at most this many bullets per version
MONTHS = 'January February March April May June July August September October November December'.split()
e = lambda s: html.escape(s, quote=False)


def parse(text):
    out = []
    for block in re.split(r'^# ', text, flags=re.M):
        m = re.match(r'Heavenly Mandate\s+[—-]+\s+v?([\d.]+)\s+changelog', block)
        if not m:
            continue
        ver = m.group(1)
        t = re.search(r'^\*\*(.+?)\*\*\s*$', block, flags=re.M)
        items = [re.sub(r'\s+', ' ', x).strip() for x in re.findall(r'^\d+\.\s+(.+)$', block, flags=re.M)]
        out.append({'ver': ver, 'title': (t.group(1).strip() if t else f'Version {ver}'), 'items': items})
    return out


def clean(s):
    s = re.sub(r'\*\*|__|`', '', s)
    s = re.sub(r'\[([^\]]+)\]\([^)]+\)', r'\1', s)
    return s.strip().rstrip('.')


def first_sentence(s):
    m = re.search(r'(?<=[A-Za-z0-9)”"%])\.\s|;\s|:\s', s)
    return s[:m.start()] if m else s


def clip(s, n=170):
    if len(s) <= n:
        return s
    cut = s[:n].rsplit(' ', 1)[0].rstrip(',;:—–- ')
    return cut + '…'


def short(item):
    """One readable line from a changelog item: its lead-in, or the lead-in and its first sentence when the lead-in is a label."""
    s = clean(item)
    if ': ' in s:
        head, rest = s.split(': ', 1)
        s = first_sentence(head) if len(head) >= 28 and '›' not in head else head + ': ' + first_sentence(rest)
    else:
        s = first_sentence(s)
    s = clip(s)
    return s[0].upper() + s[1:] if s else s


def release_date(ver):
    try:
        out = subprocess.run(['git', '-C', REPO, 'log', '--format=%cs', '--grep', f'^Release v{ver}'],
                             capture_output=True, text=True, timeout=20).stdout.split()
        if out:
            y, m, d = out[-1].split('-')
            return out[-1], f'{int(d)} {MONTHS[int(m) - 1]} {y}'
    except Exception:
        pass
    return None, None


def item_html(v, latest=False, level='h2'):
    iso, human = release_date(v['ver'])
    bullets = [short(x) for x in v['items'][:BULLETS]]
    more = len(v['items']) - len(bullets)
    if len(v['items']) < 3:   # a short release: show the sentences of its items instead
        sents = [x for it in v['items'] for x in re.split(r'(?<=[A-Za-z0-9)%])\.\s+(?=[A-Z])', clean(it))]
        bullets = [clip(x.rstrip('.')) for x in sents[:3] if x.strip()]
    lis = ''.join(f'<li>{e(b)}</li>' for b in bullets if b)
    if more > 0:
        lis += f'<li class="muted">And {more} more change{"s" if more > 1 else ""}.</li>'
    when = f'<time datetime="{iso}">{human}</time>' if iso else ''
    return (f'<article class="news-item frame reveal{" latest" if latest else ""}" id="v{v["ver"]}">'
            f'<header><span class="ver">v{e(v["ver"])}</span>{when}<{level} class="h3">{e(clean(v["title"]))}</{level}></header>'
            f'<ul>{lis}</ul></article>')


def replace_between(path, start, end, content):
    s = open(path, encoding='utf-8').read()
    if start not in s or end not in s:
        sys.exit(f'{path}: markers {start} / {end} not found')
    a, b = s.index(start) + len(start), s.index(end)
    s = s[:a] + '\n' + content + '\n  ' + s[b:]
    open(path, 'w', encoding='utf-8').write(s)


def main():
    vs = parse(open(CHANGELOG, encoding='utf-8').read())
    if not vs:
        sys.exit('no versions found in ' + CHANGELOG)
    def vnum(v):   # old style 0.056 = minor 56; new style 0.5.07 = 5*1000+7 (0.5.07 is newer than 0.056)
        p = [int(x) for x in v.split('.') if x.isdigit()]
        return p[0] * 10**6 + p[1] * 1000 + p[2] if len(p) >= 3 else p[0] * 10**6 + (p[1] if len(p) > 1 else 0)
    vs.sort(key=lambda v: vnum(v['ver']), reverse=True)
    top = vs[:COUNT]
    news = '<div class="news-list">\n' + '\n'.join(item_html(v, i == 0) for i, v in enumerate(top)) + '\n</div>\n'
    news += '<p class="muted" style="margin-top:24px">Older versions are listed in the full changelog in the game\'s repository.</p>'
    replace_between(os.path.join(DOCS, 'news.html'), '<!-- NEWS:START -->', '<!-- NEWS:END -->', news)

    older = ''.join(f'<li><a href="/news#v{v["ver"]}"><span class="ver">v{e(v["ver"])}</span> {e(clean(v["title"]))}</a></li>' for v in vs[1:4])
    latest = (f'<div class="news-home">{item_html(vs[0], True, "h3")}'
              f'<div class="frame reveal news-older"><h3>Earlier updates</h3><ul>{older}</ul>'
              f'<p><a class="btn" href="/news">All news</a></p></div></div>')
    replace_between(os.path.join(DOCS, 'index.html'), '<!-- LATEST:START -->', '<!-- LATEST:END -->', latest)
    print(f'news.html: {", ".join("v" + v["ver"] for v in top)}; index.html: latest v{vs[0]["ver"]}')


if __name__ == '__main__':
    main()
