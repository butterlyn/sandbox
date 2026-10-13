"""Figure 14 (Ch2_F.14): modelled reduction of SWIS annual peak unscheduled operational demand due
to the virtual power plant, 10% POE Expected scenario, 2026-27 to 2035-36 (MW).

Excel: one clustered column series (Impact, negative, value labels at the bar ends) under two
lines with diamond markers (before VPP, and after VPP drawn at 70% line / 50% marker opacity).
Value axis fixed at min -1,500 with 1,000 steps; category labels sit at the bottom ("low").
Series are kept in Excel's legend order: the column group first, then the lines.
"""
import os
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from prep_common import load_raw, visible_charts, series, name, values, color, write  # noqa: E402

FID = 'Ch2_F.14'

raw = load_raw(FID)
chart = visible_charts(raw)[0]
ss = series(chart)
bars = [s for s in ss if s['type'] == 'bar']
lines = sorted([s for s in ss if s['type'] == 'line'], key=lambda s: s['order'])
assert len(bars) == 1 and len(lines) == 2

out = {'categories': values(lines[0]['cat']), 'unit': 'MW', 'series': []}
for s in bars + lines:
    ln = s.get('line') or {}
    item = {'name': name(s), 'type': s['type'], 'color': color(s), 'values': values(s['val'])}
    if s['type'] == 'line':
        mk = s.get('marker') or {}
        item.update({
            'width': ln.get('width_pt'),
            'dash': ln.get('dash'),
            'alpha': ln.get('alpha', 1),
            'marker': mk.get('symbol'),
            'markerSize': mk.get('size'),
            'markerAlpha': (mk.get('fill') or {}).get('alpha', 1),
        })
    else:
        item['labels'] = bool((s.get('dataLabels') or {}).get('showVal'))
    out['series'].append(item)
write(FID, out)
