"""Appendix Figure 24 (A4_F.24): depth of dispatched ESR (Total Accumulated Depth) for each weather
reference year, against ESR Capacity Credits and the median depth.

Excel: one clustered column series (gap width 35) and two dashed 2.25pt lines over the 16 weather
reference years (2009 to 2024). The legend lists the column series first, then the lines, so the
series are written in that order. The category axis title is a cell reference (B23).
"""
import os
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from prep_common import load_raw, visible_charts, series, name, values, color, cell, write  # noqa: E402

FID = 'A4_F.24'
raw = load_raw(FID)
chart = visible_charts(raw)[0]
# Excel draws (and lists in the legend) the bar group first, then the line group, each in series order
ss = sorted(series(chart), key=lambda s: (s['type'] != 'bar', s['order']))

cat_axis = next(a for a in chart['axes'] if a['kind'] == 'catAx')
assert cat_axis['title'] == "'A4_F.24'!$B$23"
out = {
    'categoryTitle': cell(raw, 'B23'),
    'categories': [str(v) for v in values(ss[0]['cat'])],
    'series': [],
}
for s in ss:
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
