"""Figure 14 (A1_F.14): actual and forecast business mass market delivered electricity consumption,
2025 and 2026 WEM ESOOs, Low/Expected/High scenarios.

One line chart, eight series in plot order: 2025 Actual/Low/Expected/High (sysDot lines, hollow
diamond markers) then 2026 Actual/Low/Expected/High (solid lines, filled diamonds). Blank cells are
gaps (dispBlanksAs=gap), so each series starts and stops where the sheet has values.

The sheet is in GWh, but the value axis uses Excel display units "thousands"
(<c:dispUnits><c:builtInUnit val="thousands"/> in chart55.xml, not captured by extract.py), so
the chart reads in TWh. Values are written in TWh (GWh / 1000) so axis, tooltip and table agree
with the figure's unit.

The sheet's notes block (B20:B22, above the table) has two bullet notes. extract.py only keeps
note lines that start with "Note"/"Source" or run over 90 characters, so meta.json lost the first
bullet. Both bullets are written here; the module adds any the card does not already show.
"""
import os
import re
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from prep_common import load_raw, visible_charts, series, name, values, color, write  # noqa: E402

FID = 'A1_F.14'
DISPLAY_UNITS = 1000  # valAx dispUnits = thousands: GWh -> TWh

raw = load_raw(FID)
chart = visible_charts(raw)[0]
ss = sorted(series(chart), key=lambda s: s['order'])

# note lines in column B between the sheet title rows and the table header ("Scenario | Unit | ...")
notes = []
for row in raw['grid'][2:]:
    b = row[1] if len(row) > 1 else None
    if isinstance(b, str) and b.strip().lower().startswith('scenario'):
        break
    if isinstance(b, str) and b.strip() and not re.match(r'^notes?\s*:?\s*$', b.strip(), re.I):
        notes.append(b.strip())

out = {'categories': values(ss[0]['cat']), 'unit': 'TWh', 'notes': notes, 'series': []}
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
