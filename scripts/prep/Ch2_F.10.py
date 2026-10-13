"""Figure 10 (Ch2_F.10): forecast underlying residential consumption by component, Expected scenario.

Excel: four stacked areas (Lighting and appliances, Electric vehicles, Electrification, and
Energy efficiency drawn with an ltDnDiag pattern on top) plus two lines, Delivered (solid) and
Underlying (dashed). Underlying equals the sum of the first three areas, so the hatched Energy
efficiency band sits above it. Values are TWh. Hidden column D (2018-19, empty) is outside the
chart's E:O references.

The chart also carries user shapes (xl/drawings/drawing14.xml): a white double-headed arrow at
2033-34 from the Underlying line down to the Delivered line, labelled "Supplied by rooftop solar".
They are not in the raw extraction; the annotation is stored here so the module can redraw it.
"""
import os
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from prep_common import load_raw, visible_charts, series, name, values, color, write  # noqa: E402

FID = 'Ch2_F.10'

raw = load_raw(FID)
chart = visible_charts(raw)[0]
ss = series(chart)  # group order: the area group, then the line group (as Excel lists the legend)
types = [s['type'] for s in ss]
assert types == ['area'] * 4 + ['line'] * 2, types

out = {'categories': values(ss[0]['cat']), 'unit': 'TWh', 'series': []}
for s in ss:
    f = s.get('fill') or {}
    ln = s.get('line') or {}
    item = {'name': name(s), 'type': s['type'], 'color': color(s), 'values': values(s['val'])}
    if f.get('pattern'):
        item['pattern'] = f['pattern']
        item['patternBg'] = f.get('bg')
    if s['type'] == 'line':
        item['width'] = ln.get('width_pt')
        item['dash'] = ln.get('dash')
    out['series'].append(item)

# drawing14.xml: arrow connector at x = 0.783 of the chart space, which is the 2033-34 category,
# spanning the gap between the Underlying and Delivered lines; text box to its right.
out['annotation'] = {
    'text': ['Supplied by', 'rooftop solar'],
    'category': '2033-34',
    'from': 'Underlying',
    'to': 'Delivered',
}
assert out['annotation']['category'] in out['categories']
write(FID, out)
