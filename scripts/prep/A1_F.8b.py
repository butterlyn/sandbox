"""Appendix Figure 8b (A1_F.8b): actual and forecast distributed battery capacity (MWh degraded),
2025 vs 2026 ESOO.

Seven lines with diamond markers in Excel's plot order: 2025 Low/Expected/High (dotted, hollow
markers), Actual (solid, dark grey), 2026 Low/Expected/High (solid, filled markers). This is the
MWh view (sheet unit "MWh Degraded", axis "Capacity (MWh degraded)", max fixed at 10,000); Figure 8a
is the MW view.
"""
import os
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from prep_common import load_raw, visible_charts, series, name, values, color, write  # noqa: E402

FID = 'A1_F.8b'

raw = load_raw(FID)
chart = visible_charts(raw)[0]
ss = sorted(series(chart), key=lambda s: s['order'])

out = {'categories': [str(c) for c in values(ss[0]['cat'])], 'series': []}
for s in ss:
    ln = s.get('line') or {}
    mk = s.get('marker') or {}
    mfill = mk.get('fill') or {}
    out['series'].append({
        'name': name(s),
        'color': color(s),
        'width': ln.get('width_pt'),
        'dash': ln.get('dash'),
        'marker': {
            'symbol': mk.get('symbol'),
            'size': mk.get('size'),
            'fill': mfill.get('hex'),
            # scheme bg1 = the chart background (white): drawn in the page surface colour
            'hollow': mfill.get('scheme') == 'bg1',
            'line': (mk.get('line') or {}).get('color'),
            'lineWidth': (mk.get('line') or {}).get('width_pt'),
        },
        'values': values(s['val']),
    })
write(FID, out)
