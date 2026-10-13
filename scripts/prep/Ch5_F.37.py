"""Figure 37 (Ch5_F.37): annual maximum Four-Hour Demand Increase by Trading Interval, 2026-27 to 2029-30.

Excel: four lines (one per Capacity Year) over the 48 half-hourly Trading Intervals of a day, labelled
'hh:mm'. Each series has one data-point override (idx 37, marker 'none'), which changes nothing visible.
"""
import os
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from prep_common import load_raw, visible_charts, series, name, values, color, write  # noqa: E402

FID = 'Ch5_F.37'
raw = load_raw(FID)
chart = visible_charts(raw)[0]
ss = sorted(series(chart), key=lambda s: s['order'])

# times of day come through as 'hh:mm:ss' strings
categories = [str(v)[:5] for v in values(ss[0]['cat'])]
assert len(categories) == 48 and categories[0] == '00:00' and categories[-1] == '23:30', categories
out = {'categories': categories, 'series': []}
for s in ss:
    ln = s.get('line') or {}
    out['series'].append({
        'name': name(s),
        'color': color(s),
        'width': ln.get('width_pt'),
        'dash': ln.get('dash'),
        'values': values(s['val']),
    })
write(FID, out)
