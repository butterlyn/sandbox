"""Figure 25 (Ch3_F.25): change in actual and forecast peak capacity by technology type (MW).

The sheet holds two charts: a zero-size leftover (chart23.xml, external #REF! data) that is not
drawn, and the visible chart24.xml: nine stacked column series of year-on-year changes (positive
and negative; Other at the bottom of the stack order ... ESR at the top) and the 'Net change' line
with diamond markers.
"""
import os
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from prep_common import load_raw, visible_charts, series, name, values, color, write  # noqa: E402

FID = 'Ch3_F.25'
raw = load_raw(FID)
charts = visible_charts(raw)
assert len(charts) == 1 and charts[0]['file'] == 'chart24.xml'
ss = sorted(series(charts[0]), key=lambda s: s['order'])

out = {'categories': values(ss[0]['cat']), 'series': []}
for s in ss:
    ln = s.get('line') or {}
    mk = s.get('marker') or {}
    assert values(s['cat']) == out['categories']
    item = {'name': name(s), 'type': s['type'], 'color': color(s), 'values': values(s['val'])}
    if s['type'] == 'line':
        item.update(width=ln.get('width_pt'), symbol=mk.get('symbol'), symbolSize=mk.get('size'))
    out['series'].append(item)
write(FID, out)
