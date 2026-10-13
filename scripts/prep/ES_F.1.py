"""Figure 1 (ES_F.1): forecast supply-demand balance of peak capacity.

One clustered column series (surplus/shortfall) and five lines. Column D of the sheet is
hidden ("column to delete") and is excluded, as in Excel (plotVisOnly).
"""
import os
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from prep_common import load_raw, visible_charts, series, name, values, color, write  # noqa: E402

FID = 'ES_F.1'
raw = load_raw(FID)
chart = visible_charts(raw)[0]
ss = series(chart)

# the column series' category reference is #REF!; every line shares E23:N23
categories = values(next(s for s in ss if s['type'] == 'line')['cat'])
out = {'categories': categories, 'series': []}
for s in sorted(ss, key=lambda s: s['order']):
    ln = s.get('line') or {}
    out['series'].append({
        'name': name(s),
        'type': s['type'],
        'color': color(s),
        'width': ln.get('width_pt'),
        'dash': ln.get('dash'),
        'values': values(s['val']),
    })
write(FID, out)
