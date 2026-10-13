"""Figure 29 (Ch3_F.29): Forced Outage rate (%) and maximum assigned Capacity Credits (MW) for the
20 Facilities with the highest outage rates, 36 months to 26 April 2026.

Excel: clustered columns (MW) on the right-hand value axis, and a marker-only line (outage rate,
fractions in 0% format) on the left-hand axis. Facilities keep the sheet order (highest rate first).
"""
import os
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from prep_common import load_raw, visible_charts, series, name, values, color, write  # noqa: E402

FID = 'Ch3_F.29'
raw = load_raw(FID)
chart = visible_charts(raw)[0]
ss = sorted(series(chart), key=lambda s: s['order'])
bar = next(s for s in ss if s['type'] == 'bar')
rate = next(s for s in ss if s['type'] == 'line')
assert values(bar['cat']) == values(rate['cat'])

mk = rate.get('marker') or {}
out = {
    'categories': values(bar['cat']),
    'bar': {'name': name(bar), 'color': color(bar), 'values': values(bar['val'])},
    'rate': {
        'name': name(rate),
        'color': (mk.get('fill') or {}).get('hex'),  # marker-only series: line is 'none'
        'symbol': mk.get('symbol'),
        'size': mk.get('size'),
        'values': values(rate['val']),
    },
}
write(FID, out)
