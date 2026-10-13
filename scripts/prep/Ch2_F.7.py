"""Figure 7 (Ch2_F.7): actual and forecast underlying consumption, 2025 and 2026 WEM ESOOs.

Eight lines on one category axis (2019-20 to 2035-36): actuals and Low / Expected / High forecasts
from the 2025 ESOO (dotted, hollow diamonds) and the 2026 ESOO (solid, filled diamonds). Blank cells
are gaps (dispBlanksAs=gap). The sheet holds GWh; the Excel value axis uses display units
"thousands" (dispUnits) under the title "(TWh)", so values are divided by 1,000 here and the chart
shows TWh. Version 2 of the register corrected I26:T31: values() reads the sheet, so the corrected
values are used.
"""
import os
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from prep_common import load_raw, visible_charts, series, name, values, color, write  # noqa: E402

FID = 'Ch2_F.7'
SCALE = 1000.0  # GWh -> TWh (Excel dispUnits = thousands)

raw = load_raw(FID)
chart = visible_charts(raw)[0]
ss = sorted(series(chart), key=lambda s: s['order'])
categories = values(ss[0]['cat'])
yax = next(a for a in chart['axes'] if a['kind'] == 'valAx')


def style(s):
    """Line and marker style of a series, with None entries dropped."""
    ln = s.get('line') or {}
    mk = s.get('marker') or {}
    mf = mk.get('fill') or {}
    ml = mk.get('line') or {}
    marker = {'symbol': mk.get('symbol'), 'size': mk.get('size'), 'fill': mf.get('hex'), 'fillAlpha': mf.get('alpha'),
              'line': ml.get('color'), 'lineWidth': ml.get('width_pt'), 'lineAlpha': ml.get('alpha')}
    out = {'color': color(s), 'alpha': ln.get('alpha'), 'width': ln.get('width_pt'), 'dash': ln.get('dash'),
           'marker': {k: v for k, v in marker.items() if v is not None}}
    return {k: v for k, v in out.items() if v is not None}


out = {'categories': categories, 'unit': 'TWh', 'yTitle': yax.get('title'), 'series': []}
for s in ss:
    vals = values(s['val'])
    vals = vals + [None] * (len(categories) - len(vals))  # actual rows stop one column short (D:S)
    vals = [None if v is None else v / SCALE for v in vals]
    out['series'].append(dict(name=name(s), values=vals, **style(s)))
write(FID, out)
