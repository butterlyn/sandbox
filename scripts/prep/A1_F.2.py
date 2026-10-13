"""Figure 2 (A1_F.2): actual and forecast WA dwellings, 2025 vs 2026 WEM ESOO, three scenarios.

Eight line series with diamond markers over 17 financial years (D23:T23). 2025 ESOO series are
dotted (sysDot) with hollow (white-filled) markers; 2026 ESOO series are solid with filled
markers. Blank cells are gaps (dispBlanksAs=gap), so actuals and forecasts do not join.
"""
import os
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from prep_common import load_raw, visible_charts, series, name, values, color, write  # noqa: E402

FID = 'A1_F.2'
raw = load_raw(FID)
chart = visible_charts(raw)[0]
ss = sorted(series(chart), key=lambda s: s['order'])

out = {'categories': values(ss[0]['cat']), 'series': []}
for s in ss:
    ln = s.get('line') or {}
    mk = s.get('marker') or {}
    out['series'].append({
        'name': name(s),
        'color': color(s),
        'width': ln.get('width_pt'),
        'dash': ln.get('dash'),
        'marker': {
            'symbol': mk.get('symbol'),
            'size': mk.get('size'),
            'fill': (mk.get('fill') or {}).get('hex'),
            # scheme bg1 = background fill (hollow marker): the page swaps it for the surface colour
            'hollow': (mk.get('fill') or {}).get('scheme') == 'bg1',
            'lineWidth': (mk.get('line') or {}).get('width_pt'),
            'lineColor': (mk.get('line') or {}).get('color'),
        },
        'values': values(s['val']),
    })
write(FID, out)
