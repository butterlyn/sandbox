#!/usr/bin/env python3
"""Combine the figure modules into one self-contained HTML page.

  python3 -I scripts/build.py
      -> dist/wem-esoo-2026-figures.html  (complete document, ECharts inlined, downloads enabled)
  python3 -I scripts/build.py --only ES_F.1,Ch2_F.7 --out work/preview/ES_F.1.html
      -> preview of a subset (charts render immediately, no lazy loading)
  python3 -I scripts/build.py --artifact --out work/artifact/index.html
      -> page body for publishing (ECharts from cdnjs, file downloads hidden)

Each figure needs src/figures/<id>.js (ESOO.register) and, usually, src/data/<id>.json.
Diagram figures (kind "image") are rendered from src/img/*.webp listed in meta.json.
"""
import argparse
import base64
import datetime as dt
import html
import json
import os
import re
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
ECHARTS_VERSION = '5.6.0'
ECHARTS_CDN = f'https://cdnjs.cloudflare.com/ajax/libs/echarts/{ECHARTS_VERSION}/echarts.min.js'
FONTS = ('https://fonts.googleapis.com/css2?family=Source+Code+Pro:wght@500;600'
         '&family=Source+Sans+3:ital,wght@0,400;0,500;0,600;0,700;1,400'
         '&family=Source+Serif+4:opsz,wght@8..60,600&display=swap')
TITLE = '2026 WEM ESOO Figures'
SOURCES = [
    ('Data register (XLSX)', 'https://www.aemo.com.au/-/media/files/electricity/wem/planning_and_forecasting/esoo/2026/2026-wem-esoo-data-register.xlsx'),
    ('Report (PDF)', 'https://www.aemo.com.au/-/media/files/electricity/wem/planning_and_forecasting/esoo/2026/2026-wem-electricity-statement-of-opportunities.pdf'),
    ('Appendices (PDF)', 'https://www.aemo.com.au/-/media/files/electricity/wem/planning_and_forecasting/esoo/2026/2026-wem-esoo-appendices.pdf'),
]
SEARCH_ICON = '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>'


def e(s):
    return html.escape(str(s if s is not None else ''), quote=True)


def read(path):
    with open(path, encoding='utf-8') as fh:
        return fh.read()


def script_safe(src, what):
    if re.search(r'</script', src, re.I):
        raise SystemExit(f'{what} contains "</script" which would break the page; escape it')
    return src


def json_script(obj_text):
    # JSON inside <script type="application/json">: only "</" needs escaping
    return obj_text.replace('</', '<\\/')


def badge(m):
    if m['origin'] == 'picture-data':
        return ('<span class="badge badge--data" title="In the data register this figure is a pasted image; '
                'this chart is drawn from the data in the sheet.">Rebuilt from sheet data</span>')
    if m['origin'] == 'diagram':
        return ('<span class="badge badge--image" title="The register holds this figure as an image with no '
                'underlying data, so it is shown as an image.">Diagram · image</span>')
    return ''


def source_line(m):
    doc = 'Report' if m['doc'] == 'report' else 'Appendices'
    page = f' · {doc} page {m["pdfPage"]}' if m.get('pdfPage') else ''
    return f'<span class="fig-src">Data register sheet <code>{e(m["sheet"])}</code>{page}</span>'


def card(m, img_uri):
    fid = m['id']
    eyebrow = (f'<p class="fig-eyebrow"><span class="fig-num">{e(m["label"])}</span>'
               f'<span>{e(m["sectionShort"])}</span>{badge(m)}</p>')
    head = f'<header class="fig-head">{eyebrow}<h3 class="fig-title" id="t-{e(fid)}">{e(m["title"])}</h3></header>'
    notes = ''
    if m.get('notes'):
        notes = '<div class="fig-notes">' + ''.join(f'<p>{e(n)}</p>' for n in m['notes']) + '</div>'
    if m['kind'] == 'image':
        imgs = m.get('images', [])
        cls = 'fig-img fig-img--grid' if len(imgs) > 1 else 'fig-img'
        def one(k, i):
            alt = i.get('caption') or (m['title'] + (f' (panel {k + 1})' if len(imgs) > 1 else ''))
            tag = (f'<img src="{img_uri(i["src"])}" width="{i["w"]}" height="{i["h"]}" loading="lazy" '
                   f'decoding="async" alt="{e(m["label"] + ": " + alt)}">')
            if i.get('caption') and len(imgs) > 1:
                return f'<figure class="fig-panel">{tag}<figcaption>{e(i["caption"])}</figcaption></figure>'
            return tag
        body = f'<div class="{cls}">' + ''.join(one(k, i) for k, i in enumerate(imgs)) + '</div>'
        actions = (f'<div class="fig-actions"><button class="btn" type="button" data-act="link">Copy link</button>'
                   f'{source_line(m)}</div>')
        return (f'<article class="fig" id="fig-{e(fid)}" data-fig="{e(fid)}" data-kind="image" '
                f'aria-labelledby="t-{e(fid)}">{head}{body}{notes}{actions}</article>')
    body = (f'<div class="fig-legend" hidden></div>'
            f'<div class="fig-chart" role="img" aria-busy="true" '
            f'aria-label="{e(m["label"] + ": " + m["title"] + ". Interactive chart; use Show data for a table of the values.")}"></div>')
    actions = ('<div class="fig-actions">'
               '<button class="btn" type="button" data-act="table" aria-expanded="false">Show data</button>'
               '<button class="btn" type="button" data-act="copy">Copy CSV</button>'
               '<button class="btn" type="button" data-act="csv">Download CSV</button>'
               '<button class="btn" type="button" data-act="png">Download PNG</button>'
               '<button class="btn" type="button" data-act="zoom" hidden>Reset zoom</button>'
               '<button class="btn" type="button" data-act="link">Copy link</button>'
               f'{source_line(m)}</div><div class="fig-table" hidden></div>')
    return (f'<article class="fig" id="fig-{e(fid)}" data-fig="{e(fid)}" data-kind="chart" '
            f'aria-labelledby="t-{e(fid)}">{head}{body}{notes}{actions}</article>')


def build(args):
    meta = json.load(open(os.path.join(ROOT, 'src/data/meta.json'), encoding='utf-8'))
    if args.only:
        want = [x.strip() for x in args.only.split(',') if x.strip()]
        unknown = [w for w in want if w not in {m['id'] for m in meta}]
        if unknown:
            raise SystemExit(f'unknown figure id(s): {unknown}')
        meta = [m for m in meta if m['id'] in want]
    full_meta = json.load(open(os.path.join(ROOT, 'src/data/meta.json'), encoding='utf-8'))

    def img_uri(rel):
        with open(os.path.join(ROOT, 'src', rel), 'rb') as fh:
            return 'data:image/webp;base64,' + base64.b64encode(fh.read()).decode()

    warnings = []
    modules, datas = [], []
    for m in meta:
        if m['kind'] != 'chart':
            continue
        mp = os.path.join(ROOT, 'src/figures', m['id'] + '.js')
        dp = os.path.join(ROOT, 'src/data', m['id'] + '.json')
        if os.path.exists(mp):
            modules.append((m['id'], script_safe(read(mp), mp)))
        else:
            warnings.append(f'missing module: src/figures/{m["id"]}.js')
        if os.path.exists(dp):
            datas.append((m['id'], json.dumps(json.load(open(dp, encoding='utf-8')), separators=(',', ':'), ensure_ascii=False)))
        else:
            warnings.append(f'missing data: src/data/{m["id"]}.json')

    # sections, contents and figure cards
    sections, order = {}, []
    for m in meta:
        if m['section'] not in sections:
            sections[m['section']] = []
            order.append(m['section'])
        sections[m['section']].append(m)
    toc, main = [], []
    for sec in order:
        ms = sections[sec]
        name = ms[0]['sectionName']
        doc = 'Report' if ms[0]['doc'] == 'report' else 'Appendices'
        sid = 'sec-' + re.sub(r'[^A-Za-z0-9]+', '', sec)
        toc.append(f'<div class="toc-sec"><h2>{e(doc + " · " + name)}</h2><ol>' + ''.join(
            f'<li><a href="#fig-{e(m["id"])}"><span class="toc-n">{e(m["number"] or "")}</span>'
            f'<span class="toc-t">{e(m["title"])}</span></a></li>' for m in ms) + '</ol></div>')
        main.append(f'<section class="sec" id="{sid}" aria-labelledby="h-{sid}"><h2 class="sec-title" id="h-{sid}">'
                    f'<small>{e(doc)}</small>{e(name)}</h2>' + ''.join(card(m, img_uri) for m in ms) + '</section>')

    counts = {'native': 0, 'picture-data': 0, 'diagram': 0}
    for m in full_meta:
        counts[m['origin']] += 1
    built = dt.date.today().isoformat()
    style = read(os.path.join(ROOT, 'src/styles.css'))
    common = script_safe(read(os.path.join(ROOT, 'src/lib/common.js')), 'common.js')
    build_cfg = {'downloads': not args.artifact, 'eager': bool(args.only) or args.eager, 'built': built}

    head = (f'<title>{TITLE}</title>\n'
            f'<meta name="description" content="Interactive versions of the figures in AEMO\'s 2026 WEM Electricity '
            f'Statement of Opportunities data register.">\n'
            f'<link rel="preconnect" href="https://fonts.googleapis.com">\n'
            f'<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>\n'
            f'<link rel="stylesheet" href="{FONTS}">\n'
            f'<style>\n{style}\n</style>\n')
    sources = ' · '.join(f'<a href="{e(u)}" target="_blank" rel="noopener">{e(n)}</a>' for n, u in SOURCES)
    body = f'''<a class="skip" href="#main">Skip to figures</a>
<div class="page">
<header class="mast">
  <p class="mast-eyebrow">AEMO · Wholesale Electricity Market · South West Interconnected System</p>
  <h1><span>2026 WEM ESOO</span> figures</h1>
  <p class="mast-lede">Interactive versions of every figure in the 2026 WEM Electricity Statement of Opportunities data register (version 2, 15 July 2026). Hover a chart for values, click legend entries to hide or isolate series, and open the data behind any chart.</p>
  <dl class="facts">
    <div><dt>Figures</dt><dd>{len(full_meta)}</dd></div>
    <div><dt>Excel charts recreated</dt><dd>{counts["native"]}</dd></div>
    <div><dt>Rebuilt from sheet data</dt><dd>{counts["picture-data"]}</dd></div>
    <div><dt>Diagrams shown as images</dt><dd>{counts["diagram"]}</dd></div>
  </dl>
  <p class="sources">Sources: {sources}</p>
</header>
</div>
<div class="toolbar"><div class="page toolbar-inner">
  <div class="search">{SEARCH_ICON}<input id="filter" type="search" placeholder="Filter by title, note or sheet" aria-label="Filter figures" autocomplete="off"></div>
  <span class="filter-count" id="filter-count" aria-live="polite"></span>
  <span class="spacer"></span>
  <button class="btn" type="button" id="decal-toggle" aria-pressed="false" title="Add patterns to chart fills so series can be told apart without colour">Patterns</button>
  <button class="btn" type="button" id="theme-toggle">Theme: system</button>
</div></div>
<div class="page layout">
<nav class="toc" aria-label="Contents"><details open><summary>Contents</summary>
{''.join(toc)}
</details></nav>
<main id="main">
{''.join(main)}
<p class="empty" id="filter-empty" hidden>No figures match the filter.</p>
</main>
</div>
<div class="page"><footer class="foot">
  <p>Charts are drawn with Apache ECharts {ECHARTS_VERSION} from the values in the data register. Series, colours, stacking, axes and number formats follow the Excel charts; legends sit above each chart and axis titles read horizontally so they work at any width.</p>
  <p>Figures marked “Rebuilt from sheet data” are pasted images in the register; their charts here are drawn from the data tables on the same sheets. Diagrams and maps have no data in the register and are shown as the original images.</p>
  <p>Source: Australian Energy Market Operator, 2026 Wholesale Electricity Market Electricity Statement of Opportunities. Page built {built}.</p>
</footer></div>
'''
    scripts = [f'<script>window.ESOO_BUILD = {json.dumps(build_cfg)};</script>']
    if args.artifact or args.cdn:
        scripts.append(f'<script src="{ECHARTS_CDN}"></script>')
    else:
        scripts.append('<script>\n' + script_safe(read(os.path.join(ROOT, f'vendor/echarts-{ECHARTS_VERSION}.min.js')), 'echarts') + '\n</script>')
    scripts.append('<script>\n' + common + '\n</script>')
    for fid, src in modules:
        # each module runs in its own function scope so top-level helpers can't collide across figures
        scripts.append(f'<script data-module="{e(fid)}">\ntry {{ (function () {{\n{src}\n}})(); }} catch (err) {{ (window.ESOO.errors = window.ESOO.errors || []).push({{id: {json.dumps(fid)}, error: String(err && err.stack || err)}}); console.error("[ESOO] module {fid}", err); }}\n</script>')
    for fid, js in datas:
        scripts.append(f'<script type="application/json" id="d-{e(fid)}">{json_script(js)}</script>')
    scripts.append('<script>ESOO.boot();</script>')

    if args.artifact:
        out = head + body + '\n'.join(scripts) + '\n'
    else:
        out = ('<!doctype html>\n<html lang="en-AU">\n<head>\n<meta charset="utf-8">\n'
               '<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">\n'
               + head + '</head>\n<body>\n' + body + '\n'.join(scripts) + '\n</body>\n</html>\n')
    os.makedirs(os.path.dirname(os.path.abspath(args.out)), exist_ok=True)
    with open(args.out, 'w', encoding='utf-8') as fh:
        fh.write(out)
    size = os.path.getsize(args.out)
    print(f'wrote {args.out} ({size / 1e6:.2f} MB, {len(meta)} figures, {len(modules)} modules)')
    for w in warnings:
        print('WARN', w, file=sys.stderr)
    if args.strict and warnings:
        raise SystemExit(1)


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument('--only', help='comma-separated figure ids to include (preview build)')
    ap.add_argument('--out', default=os.path.join(ROOT, 'dist/wem-esoo-2026-figures.html'))
    ap.add_argument('--artifact', action='store_true', help='page body for publishing; ECharts from cdnjs; no downloads')
    ap.add_argument('--cdn', action='store_true', help='load ECharts from cdnjs instead of inlining it')
    ap.add_argument('--eager', action='store_true', help='render every chart on load')
    ap.add_argument('--strict', action='store_true', help='fail when a module or data file is missing')
    build(ap.parse_args())


if __name__ == '__main__':
    main()
