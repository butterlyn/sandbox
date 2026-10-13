"""Figure 31 (Ch4_F.31): residual demand, ESR dispatch and Peak ESROD Demand on one peak demand day.

Excel: two stacked column series (Residual Demand at the bottom, ESR Dispatch on top) and one dashed
line (Peak ESROD Demand) over 48 half-hourly Trading Intervals, 25 Feb 2027 08:00 to 26 Feb 07:30.
The stack total equals the sheet's Operational Demand column (C), which the chart does not plot; the
module labels the tooltip total with it, so the prep checks that C = D + E.
"""
import datetime as dt
import os
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from prep_common import load_raw, visible_charts, series, name, values, color, cell, write  # noqa: E402

FID = 'Ch4_F.31'
raw = load_raw(FID)
chart = visible_charts(raw)[0]
ss = sorted(series(chart), key=lambda s: s['order'])


def label(v):
    """ISO date-time -> 'yyyy-mm-dd hh:mm' (midnight comes through as a bare date)."""
    return dt.datetime.fromisoformat(str(v)).strftime('%Y-%m-%d %H:%M')


categories = [label(v) for v in values(ss[0]['cat'])]
out = {'categories': categories, 'series': []}
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

# Operational Demand (column C) = ESR Dispatch (D) + Residual Demand (E) in every row
assert cell(raw, 'C23') == 'Operational Demand'
for r in range(25, 25 + len(categories)):
    c, d, e = (cell(raw, f'{col}{r}') for col in 'CDE')
    assert abs(c - (d + e)) < 1e-6 * max(1.0, abs(c)), (r, c, d, e)
out['stackTotal'] = 'Operational Demand'
write(FID, out)
