"""Figure 24 (Ch3_F.24): forecast flexible capacity by technology type, Expected scenario.

The sheet holds two charts: a zero-size leftover (chart21.xml, external #REF! data) that is not
drawn, and the visible chart22.xml: nine stacked column series (Coal at the bottom ... ESR at the
top, in plot order) and the 'Forecast total flexible capacity' line.
"""
import os
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from prep_common import load_raw, visible_charts, series, name, values, color, write  # noqa: E402

FID = 'Ch3_F.24'
raw = load_raw(FID)
charts = visible_charts(raw)
assert len(charts) == 1 and charts[0]['file'] == 'chart22.xml'
ss = sorted(series(charts[0]), key=lambda s: s['order'])

out = {'categories': values(ss[0]['cat']), 'series': []}
for s in ss:
    ln = s.get('line') or {}
    assert values(s['cat']) == out['categories']
    out['series'].append({
        'name': name(s),
        'type': s['type'],
        'color': color(s),
        'width': ln.get('width_pt') if s['type'] == 'line' else None,
        'values': values(s['val']),
    })
write(FID, out)
