"""Appendix Figure 6 (A1_F.6): forecast delivered consumption from electrification, 2025 vs 2026 ESOO.

Six lines (Low / Expected / High from the 2025 and 2026 WEM ESOOs) with diamond markers: the 2025
series are dotted (sysDot) with hollow markers, the 2026 series solid with filled markers.

Units: the sheet holds GWh (column C), but the chart's value axis uses Excel display units
"thousands" (chart41.xml: <c:dispUnits><c:builtInUnit val="thousands"/>, not captured in the raw
extraction) under the title "Delivered consumption (TWh)", so the published figure reads 0-8 TWh.
The values are therefore divided by 1,000 here and the data file is in TWh.
"""
import os
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from prep_common import load_raw, visible_charts, series, name, values, color, write  # noqa: E402

FID = 'A1_F.6'
DISPLAY_UNIT = 1000.0  # GWh -> TWh (Excel display units: thousands)

raw = load_raw(FID)
chart = visible_charts(raw)[0]
ss = sorted(series(chart), key=lambda s: s['order'])

out = {'categories': [str(c) for c in values(ss[0]['cat'])], 'unit': 'TWh', 'series': []}
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
        'values': [None if v is None else v / DISPLAY_UNIT for v in values(s['val'])],
    })
write(FID, out)
