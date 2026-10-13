"""Appendix Figure 22 (A3_F.22): difference between forecast supply capacity and maximum quantity of
power injectable to the SWIS, wind and solar generators, Expected scenario.

Stacked columns: forecast capacity of wind and solar plus the RLM uplift (solid fills), then the
difference to the maximum injectable quantity for wind and solar (smCheck pattern). The two lines are
a *stacked* line group: 'Forecast for Expected scenario' (row 27 = rows 24-26) and 'Maximum quantity
of power injectable to the SWIS' (row 30 = rows 28-29, plotted on top of row 27). The lines' values
here are the plotted running totals, so the second line is the maximum injectable quantity itself.

Both blocks label their rows 'Wind' / 'Solar'; the patterned (difference) series get a 'kind' so the
module can tell them apart.
"""
import os
import re
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from prep_common import load_raw, visible_charts, series, name, values, color, cell, clean_name, write  # noqa: E402

FID = 'A3_F.22'
raw = load_raw(FID)
chart = visible_charts(raw)[0]
ss = sorted(series(chart), key=lambda s: s['order'])


def ref_row(s):
    m = re.search(r'\$(\d+)(?::\$?[A-Z]+\$?\d+)?$', s['val'].get('ref') or '')
    return int(m.group(1)) if m else None


lines = [s for s in ss if s['type'] == 'line']
categories = values(lines[0]['cat'])
header_row = re.search(r'\$(\d+):', lines[0]['cat']['ref']).group(1)
header = clean_name(cell(raw, 'B' + header_row))  # 'Technology type'
first_line_row = min(ref_row(s) for s in lines)

bars = []
for s in ss:
    if s['type'] != 'bar':
        continue
    f = s.get('fill') or {}
    row = ref_row(s)
    bars.append({
        'row': row,
        'name': name(s),
        'kind': 'capacity' if row < first_line_row else 'difference',
        'color': color(s),
        'pattern': f.get('pattern'),
        'bg': f.get('bg'),
        'values': values(s['val']),
    })

out_lines = []
run = [0.0] * len(categories)
for s in lines:  # plot order; Excel stacks the line group
    v = values(s['val'])
    run = [r + (x or 0) for r, x in zip(run, v)]
    ln = s.get('line') or {}
    out_lines.append({
        'row': ref_row(s),
        'name': name(s),
        'color': color(s),
        'width': ln.get('width_pt'),
        'dash': ln.get('dash'),
        'values': list(run),
    })

write(FID, {'header': header, 'categories': categories, 'bars': bars, 'lines': out_lines})
