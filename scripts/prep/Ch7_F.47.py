"""Figure 47 (Ch7_F.47): forecast peak capacity for 2028-29 (MW).

A waterfall built as stacked columns: an invisible 'Total' base series (fill none, literal values:
the running total each floating column starts from), then Capability Class 1, 2 and 3. The RCT is a
dashed line on secondary axes (literal values, 6,323 at every point; the secondary value axis is
deleted and crossBetween=midCat, so the line runs from edge to edge of the plot at the primary-axis
height).

Annotations carried over from the chart (chart34.xml) and its sheet drawing (drawing53.xml):
- Class 3's labels on the first four columns are "value from cells" labels showing the column
  total, not Class 3's own value: G27 (Existing total), H27 (Committed total), F28 (RLM uplift,
  240) and E29 (Anticipated, 622). They are read from those cells here.
- The Total column labels Class 1 (4,183), Class 2 (2,529) and Class 3 (580) with their values.
- Text box "RCT 6,323" above the start of the line, and a left brace beside the Total column from 0
  up to the top of Class 2 with the text box "6,712". That text is typed in the drawing; it equals
  Class 1 + Class 2 of the Total column (D30 + E30 = 6,711.6), which is what is exported here.
"""
import os
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from prep_common import (load_raw, visible_charts, series, name, values, color, cell,  # noqa: E402
                         clean_name, write)

FID = 'Ch7_F.47'
raw = load_raw(FID)
chart = visible_charts(raw)[0]
ss = sorted(series(chart), key=lambda s: s['order'])

bars = [s for s in ss if s['type'] == 'bar']
base = next(s for s in bars if (s.get('fill') or {}).get('none'))
classes = [s for s in bars if s is not base]
rct = next(s for s in ss if s['type'] == 'line')

categories = [clean_name(c) for c in values(classes[0]['cat'])]  # 'Existing  ' -> 'Existing'
n = len(categories)

# value-from-cells labels on Class 3 (dLbl idx 0-3 in chart34.xml), in category order
label_cells = ['G27', 'H27', 'F28', 'E29']
top_labels = [cell(raw, ref) for ref in label_cells] + [None]

out = {
    'categories': categories,
    'base': values(base['val']),  # literal values: cached only
    'classes': [{'name': name(s), 'color': color(s), 'values': values(s['val'])} for s in classes],
    'rct': {
        'name': name(rct),
        'color': (rct.get('line') or {}).get('color'),
        'width': (rct.get('line') or {}).get('width_pt'),
        'dash': (rct.get('line') or {}).get('dash'),
        'values': values(rct['val']),
    },
    'topLabels': top_labels,
}
total = out['classes']
out['brace'] = {'index': n - 1, 'value': total[0]['values'][-1] + total[1]['values'][-1]}

assert len(out['base']) == n and all(len(c['values']) == n for c in out['classes'])
assert len(out['rct']['values']) == n
# the floating columns start where the previous column ended
for i in range(1, n - 1):
    prev_top = (out['base'][i - 1] or 0) + sum(c['values'][i - 1] for c in out['classes'])
    assert abs(prev_top - out['base'][i]) < 0.01, (i, prev_top, out['base'][i])
write(FID, out)
