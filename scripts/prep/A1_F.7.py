"""Appendix Figure 7 (A1_F.7): actual and forecast BEV + PHEV fleet size, 2025 vs 2026 ESOO.

Seven lines with diamond markers in Excel's plot order: 2025 Low/Expected/High (dotted, hollow
markers), Actual (solid, dark grey), 2026 Low/Expected/High (solid, filled markers).

Units: the sheet holds EV counts, but the chart's value axis uses Excel display units "millions"
(chart42.xml: <c:dispUnits><c:builtInUnit val="millions"/>, not captured in the raw extraction)
under the title "EV count (millions)", with majorUnit 100,000 (= 0.1 million). The values are
therefore divided by 1,000,000 here and the data file is in millions of vehicles.
"""
import os
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from prep_common import load_raw, visible_charts, series, name, values, color, write  # noqa: E402

FID = 'A1_F.7'
DISPLAY_UNIT = 1e6  # EV count -> millions (Excel display units: millions)

raw = load_raw(FID)
chart = visible_charts(raw)[0]
ss = sorted(series(chart), key=lambda s: s['order'])

out = {'categories': [str(c) for c in values(ss[0]['cat'])], 'unit': 'million', 'series': []}
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
