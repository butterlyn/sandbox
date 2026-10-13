"""Figure 27 (Ch3_F.27): frequency of Forced Outage exceeding the single, two and three largest
generators during peak intervals, 2020-21 to 2025-26 Hot Seasons.

Three clustered column series (fractions, shown with Excel's 0% format) over six Hot Seasons.
"""
import os
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from prep_common import load_raw, visible_charts, series, name, values, color, write  # noqa: E402

FID = 'Ch3_F.27'
raw = load_raw(FID)
chart = visible_charts(raw)[0]
ss = sorted(series(chart), key=lambda s: s['order'])

out = {'categories': values(ss[0]['cat']), 'series': []}
for s in ss:
    assert values(s['cat']) == out['categories'], 'series share one category range'
    out['series'].append({'name': name(s), 'color': color(s), 'values': values(s['val'])})
write(FID, out)
