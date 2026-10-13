"""Figure 38 (Ch5_F.38): forecast supply-demand balance of peak capacity, Expected and High scenarios.

Same layout as Figure 1 (ES_F.1): one clustered column series (surplus/shortfall) behind five lines.
Column D of the sheet is hidden ("column to delete") and is excluded, as in Excel (plotVisOnly).
Series names are the register's current ones (version 2 corrected this figure's legend: the last
series is "2025 forecast peak capacity_Expected scenario").
"""
import os
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from prep_common import load_raw, visible_charts, series, name, values, color, write  # noqa: E402

FID = 'Ch5_F.38'
raw = load_raw(FID)
chart = visible_charts(raw)[0]
ss = series(chart)

# the column series' category reference is #REF!; every line shares E23:N23
categories = values(next(s for s in ss if s['type'] == 'line')['cat'])
out = {'categories': categories, 'series': []}
for s in sorted(ss, key=lambda s: s['order']):
    ln = s.get('line') or {}
    vals = values(s['val'])
    assert len(vals) == len(categories), (name(s), len(vals))
    out['series'].append({
        'name': name(s),
        'type': s['type'],
        'color': color(s),
        'width': ln.get('width_pt'),
        'dash': ln.get('dash'),
        'values': vals,
    })
write(FID, out)
