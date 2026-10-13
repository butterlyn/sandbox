"""Figure 11 (Ch2_F.11): forecast business underlying consumption by component, Expected scenario.

Excel: seven stacked areas (Business mass market at the bottom ... Energy efficiency, drawn with
an ltDnDiag pattern, on top) plus two lines, Underlying (dashed) and Delivered (solid). Underlying
equals the sum of the first six areas, so the hatched Energy efficiency band sits above it.
Values are TWh.

The chart also carries user shapes (xl/drawings/drawing16.xml): a short white line across the gap
between the Underlying and Delivered lines near the right edge (x = 0.935 of the chart space,
about two-thirds of the way from 2034-35 to 2035-36) and a white arrow pointing to it from the
text "Supplied by rooftop solar" placed in the Large industrial loads band. A leftover white
double-headed arrow at x = 0.991 sits outside the plot on the white background and is not visible.
They are not in the raw extraction; the annotation is stored here so the module can redraw it.
"""
import os
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from prep_common import load_raw, visible_charts, series, name, values, color, write  # noqa: E402

FID = 'Ch2_F.11'

raw = load_raw(FID)
chart = visible_charts(raw)[0]
ss = series(chart)  # group order: the area group, then the line group (as Excel lists the legend)
types = [s['type'] for s in ss]
assert types == ['area'] * 7 + ['line'] * 2, types

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

# The gap marker sits between categories in Excel; category axes snap to whole categories, so it
# is redrawn at the nearest one that leaves room for the arrow (2034-35), with the label in the
# Large industrial loads band a category to the left, as in the register.
out['annotation'] = {
    'text': ['Supplied by', 'rooftop solar'],
    'category': '2034-35',
    'labelCategory': '2033-34',
    'from': 'Underlying',
    'to': 'Delivered',
}
assert out['annotation']['category'] in out['categories']
write(FID, out)
