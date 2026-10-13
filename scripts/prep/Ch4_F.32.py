"""Figure 32 (Ch4_F.32): Reference Demand Profiles (sorted demand, highest first) for four Capacity Years.

Excel: five lines over 17,569 Trading Intervals. The category axis is the interval rank 0, 1, 2, ...
(column B), so the data file stores only the count and the module rebuilds 0..n-1. The four profiles
are rounded to 4 significant digits (whole MW above 1,000 MW, 0.1 MW below) to keep the file small.
The Indicative DSP Dispatch Threshold is the same value in every row, so it is stored once (6 digits)
and the module repeats it for every interval.

2023-24 (leap year) fills all 17,569 rows; the other three profiles stop after 17,521 rows and their
last 48 cells are blank, which Excel leaves as gaps (dispBlanksAs=gap). Blanks are kept as null.
"""
import os
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from prep_common import load_raw, visible_charts, series, name, values, color, rnd, write  # noqa: E402

FID = 'Ch4_F.32'
raw = load_raw(FID)
chart = visible_charts(raw)[0]
ss = sorted(series(chart), key=lambda s: s['order'])

cats = values(ss[0]['cat'])
n = len(cats)
assert cats == list(range(n)), 'categories are not the ranks 0..n-1'
assert all(values(s['cat']) == cats for s in ss)

out = {'n': n, 'series': []}
for s in ss:
    ln = s.get('line') or {}
    vals = values(s['val'])
    assert len(vals) == n and all(v is None or isinstance(v, (int, float)) for v in vals), name(s)
    filled = [v for v in vals if v is not None]
    # blanks only as a trailing run (shorter year), never inside a profile
    assert vals[:len(filled)] == filled, name(s)
    item = {
        'name': name(s),
        'color': color(s),
        'width': ln.get('width_pt'),
        'dash': ln.get('dash'),
    }
    if len(filled) == n and len(set(vals)) == 1:
        item['constant'] = vals[0]
    else:
        item['values'] = rnd(vals, 4)
    out['series'].append(item)
write(FID, out)
