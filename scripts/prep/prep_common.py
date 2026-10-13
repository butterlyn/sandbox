"""Helpers for per-figure prep scripts.

A prep script turns the raw extraction (work/raw/<id>.json, written by scripts/extract.py)
into the compact data file the page embeds (src/data/<id>.json). Keep data files small:
only the values the chart needs, rounded with rnd().

Typical use (scripts/prep/ES_F.1.py):

    import sys, os; sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
    from prep_common import *
    raw = load_raw('ES_F.1')
    ch = visible_charts(raw)[0]
    out = {'categories': values(series(ch)[1]['cat'])}
    ...
    write('ES_F.1', out)
"""
import json
import math
import os
import re

ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
RAW = os.path.join(ROOT, 'work', 'raw')


def load_raw(fid):
    with open(os.path.join(RAW, fid + '.json'), encoding='utf-8') as fh:
        return json.load(fh)


def visible_charts(raw):
    """Native charts on the sheet, excluding zero-size leftovers and hidden shapes."""
    return [c for c in raw['charts'] if not c['anchor'].get('zeroSize') and not c['anchor'].get('hidden')]


def series(chart):
    """All series of a chart (across groups), in plot order, each with its group attached as s['group']."""
    out = []
    for g in chart['groups']:
        gi = {k: v for k, v in g.items() if k != 'series'}
        for s in g['series']:
            s = dict(s)
            s['group'] = gi
            out.append(s)
    return out


def name(s, clean=True):
    """Series name from its tx reference (sheet value, else cached)."""
    d = s.get('name') or {}
    v = (d.get('values') or d.get('cache') or [None])[0]
    if v is None:
        return None
    v = str(v)
    return clean_name(v) if clean else v


def clean_name(v):
    """Tidy a workbook label for display: trim, collapse spaces, '_' separators -> ' – '."""
    v = re.sub(r'\s+', ' ', str(v)).strip()
    v = re.sub(r'\s*_\s*', ' – ', v)
    return v


def values(d, drop_hidden=True, use_cache=False):
    """Values of a data reference dict (cat/val/x/y): sheet values when the reference resolved,
    otherwise the chart's cached values. Points in hidden rows/columns are dropped (Excel's
    'show data in hidden rows and columns' is off in these charts: plotVisOnly=1)."""
    if d is None:
        return None
    if d.get('levels') is not None and not use_cache:
        vals = [list(x) for x in d['levels']]
        if drop_hidden and d.get('hiddenIdx'):
            hid = set(d['hiddenIdx'])
            vals = [[v for i, v in enumerate(lv) if i not in hid] for lv in vals]
        return vals
    if d.get('values') is not None and not use_cache:
        vals = list(d['values'])
    else:
        vals = list(d.get('cacheDates') or d.get('cache') or [])
    if drop_hidden and d.get('hiddenIdx') and not use_cache and d.get('values') is not None:
        hid = set(d['hiddenIdx'])
        vals = [v for i, v in enumerate(vals) if i not in hid]
    return vals


def color(s):
    """Primary colour of a series: fill for bars/areas, line colour for lines/scatter."""
    f = s.get('fill') or {}
    ln = s.get('line') or {}
    if s['type'] in ('line', 'scatter', 'radar'):
        return ln.get('color') or f.get('hex')
    if f.get('none'):
        return None
    return f.get('hex') or ln.get('color')


def rnd(x, sig=6):
    """Round numbers to `sig` significant digits (ints stay ints); None/str pass through."""
    if isinstance(x, bool) or x is None:
        return x
    if isinstance(x, int):
        return x
    if isinstance(x, float):
        if math.isnan(x) or math.isinf(x):
            return None
        if x == 0:
            return 0
        r = round(x, sig - 1 - int(math.floor(math.log10(abs(x)))))
        return int(r) if float(r).is_integer() and abs(r) < 1e15 else r
    if isinstance(x, list):
        return [rnd(v, sig) for v in x]
    if isinstance(x, dict):
        return {k: rnd(v, sig) for k, v in x.items()}
    return x


def cell(raw, ref):
    """Value of one cell, e.g. cell(raw, 'B24')."""
    m = re.match(r'^\$?([A-Z]+)\$?(\d+)$', ref)
    col = 0
    for ch in m.group(1):
        col = col * 26 + ord(ch) - 64
    r = int(m.group(2))
    grid = raw['grid']
    if r - 1 < len(grid) and col - 1 < len(grid[r - 1]):
        return grid[r - 1][col - 1]
    return None


def block(raw, top_left, bottom_right):
    """2-D list of cell values for a rectangular range, e.g. block(raw, 'B23', 'N29')."""
    def rc(ref):
        m = re.match(r'^\$?([A-Z]+)\$?(\d+)$', ref)
        col = 0
        for ch in m.group(1):
            col = col * 26 + ord(ch) - 64
        return int(m.group(2)), col
    r1, c1 = rc(top_left)
    r2, c2 = rc(bottom_right)
    grid = raw['grid']
    out = []
    for r in range(r1, r2 + 1):
        row = grid[r - 1] if r - 1 < len(grid) else []
        out.append([row[c - 1] if c - 1 < len(row) else None for c in range(c1, c2 + 1)])
    return out


def write(fid, obj, sig=6):
    """Write src/data/<fid>.json (compact). Returns the path. Numbers are rounded with rnd(sig)."""
    path = os.path.join(ROOT, 'src', 'data', fid + '.json')
    with open(path, 'w', encoding='utf-8') as fh:
        json.dump(rnd(obj, sig), fh, separators=(',', ':'), ensure_ascii=False)
    size = os.path.getsize(path)
    print(f'wrote {os.path.relpath(path, ROOT)} ({size / 1024:.1f} KB)')
    return path
