"""Figure 49 (Ch7_F.49): Reserve Capacity Price, Benchmark Reserve Capacity Price and capacity
excess/deficit, 2017-18 to 2028-29.

Two value axes. The column series (Excess capacity, MW, I28:I39) sits on the right-hand axis
("Capacity excess/deficit (MW)", max 1,000) through a deleted category axis; the three price lines
($ per MW per year, D, E and C columns) use the left axis (max $500,000, step $50,000). Note the
extraction flags the line group as 'secondary' because it is listed second; what matters is the axis
position: lines -> left axis, columns -> right axis.
"""
import os
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from prep_common import load_raw, visible_charts, series, name, values, color, write  # noqa: E402

FID = 'Ch7_F.49'
raw = load_raw(FID)
chart = visible_charts(raw)[0]
ss = sorted(series(chart), key=lambda s: s['order'])
axes = {a['id']: a for a in chart['axes']}

categories = values(next(s for s in ss if s.get('cat'))['cat'])
out = {'categories': categories, 'series': []}
for s in ss:
    ln = s.get('line') or {}
    mk = s.get('marker') or {}
    val_axis = next(axes[i] for i in s['group']['axIds'] if axes[i]['kind'] == 'valAx')
    vals = values(s['val'])
    assert len(vals) == len(categories), (name(s), len(vals))
    out['series'].append({
        'name': name(s),
        'type': s['type'],
        'axis': val_axis['pos'],  # 'l' or 'r'
        'color': color(s),
        'width': ln.get('width_pt') if s['type'] == 'line' else None,
        'dash': ln.get('dash') if s['type'] == 'line' else None,
        'marker': {'symbol': mk.get('symbol'), 'size': mk.get('size')} if mk.get('symbol') not in (None, 'none') else None,
        'numFmt': s['val'].get('formatCode'),
        'values': vals,
    })
# prices are quoted to the cent ("$"#,##0.00): keep 8 significant digits so $111,752.53 survives
write(FID, out, sig=8)
