"""Figure 16 (A1_F.16): forecast total energy efficiency savings in the business mass market and
residential sectors, 2025 and 2026 WEM ESOOs, Low/Expected/High scenarios.

One line chart, six series in plot order (no actuals): 2025 Low/Expected/High (sysDot lines, hollow
diamond markers) then 2026 Low/Expected/High (solid lines, filled diamonds). Blank cells are gaps
(dispBlanksAs=gap): the 2025 forecasts run 2024-25 to 2034-35, the 2026 ones 2025-26 to 2035-36.

The sheet is in GWh, but the value axis uses Excel display units "thousands"
(<c:dispUnits><c:builtInUnit val="thousands"/> in chart57.xml, not captured by extract.py), so
the chart reads in TWh. Values are written in TWh (GWh / 1000) so axis, tooltip and table agree
with the figure's unit.
"""
import os
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from prep_common import load_raw, visible_charts, series, name, values, color, write  # noqa: E402

FID = 'A1_F.16'
DISPLAY_UNITS = 1000  # valAx dispUnits = thousands: GWh -> TWh

raw = load_raw(FID)
chart = visible_charts(raw)[0]
ss = sorted(series(chart), key=lambda s: s['order'])

out = {'categories': values(ss[0]['cat']), 'unit': 'TWh', 'series': []}
for s in ss:
    ln = s.get('line') or {}
    mk = s.get('marker') or {}
    out['series'].append({
        'name': name(s),
        'color': color(s),
        'width': ln.get('width_pt'),
        'dash': ln.get('dash') if ln.get('dash') not in (None, 'solid') else None,
        'marker': {
            'symbol': mk.get('symbol'),
            'size': mk.get('size'),
            # bg1 (white) fill = hollow marker; the module maps it to the chart surface colour
            'fill': 'bg' if (mk.get('fill') or {}).get('scheme') == 'bg1' else (mk.get('fill') or {}).get('hex'),
            'line': (mk.get('line') or {}).get('color'),
            'lineWidth': (mk.get('line') or {}).get('width_pt'),
        },
        'values': [None if v is None else v / DISPLAY_UNITS for v in values(s['val'])],
    })
write(FID, out)
