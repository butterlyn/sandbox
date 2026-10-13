"""Figure 39 (Ch5_F.39): forecast supply-demand balance of flexible capacity, Expected scenario.

Four lines (2026 and 2025 Flexible RCT and Expected flexible capacity), all on one category axis
D23:L23. The two 2025 series have no category reference of their own (Excel reuses the first
series' categories) and no 2035-36 value (blank cell -> gap). The shortfall/surplus rows 26 and 29
are in the sheet but not in the chart, so they are not exported.
"""
import os
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from prep_common import load_raw, visible_charts, series, name, values, color, write  # noqa: E402

FID = 'Ch5_F.39'
raw = load_raw(FID)
chart = visible_charts(raw)[0]
ss = sorted(series(chart), key=lambda s: s['order'])

categories = values(next(s for s in ss if s.get('cat'))['cat'])
out = {'categories': categories, 'series': []}
for s in ss:
    ln = s.get('line') or {}
    vals = values(s['val'])
    assert len(vals) == len(categories), (name(s), len(vals))
    out['series'].append({
        'name': name(s),
        'color': color(s),
        'width': ln.get('width_pt'),
        'dash': ln.get('dash'),
        'values': vals,
    })
write(FID, out)
