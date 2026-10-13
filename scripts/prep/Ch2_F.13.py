"""Figure 13 (Ch2_F.13): 10%, 50% and 90% POE summer peak unscheduled operational demand forecasts
from the 2025 and 2026 WEM ESOOs, Expected scenario, 2024-25 to 2035-36 (MW).

Six lines on one category axis (I23:T23): the 2025 ESOO POE levels (dotted at 50% transparency,
hollow diamonds) and the 2026 ESOO POE levels (solid, filled diamonds). The sheet's Actual row (24)
is not in the chart. Blank cells are gaps (dispBlanksAs=gap).
"""
import os
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from prep_common import load_raw, visible_charts, series, name, values, color, write  # noqa: E402

FID = 'Ch2_F.13'
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


out = {'categories': categories, 'unit': 'MW', 'yTitle': yax.get('title'), 'series': []}
for s in ss:
    vals = values(s['val'])
    vals = vals + [None] * (len(categories) - len(vals))
    out['series'].append(dict(name=name(s), values=vals, **style(s)))
write(FID, out)
