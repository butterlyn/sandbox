"""Figure 26 (Ch3_F.26): Peak Capacity Credits for 2027-28 by Facility age and technology type.

One stacked column group, nine technology series over eight age bands (oldest first, as in the
sheet). Series are kept in Excel's plot order (Coal at the bottom of the stack, ESR on top).
Hydro's single data-point override has the same fill as the series, so it is not carried over.
"""
import os
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from prep_common import load_raw, visible_charts, series, name, values, color, write  # noqa: E402

FID = 'Ch3_F.26'
raw = load_raw(FID)
chart = visible_charts(raw)[0]
ss = sorted(series(chart), key=lambda s: s['order'])

out = {'categories': values(ss[0]['cat']), 'series': []}
for s in ss:
    assert values(s['cat']) == out['categories'], 'series share one category range'
    out['series'].append({'name': name(s), 'color': color(s), 'values': values(s['val'])})
write(FID, out)
