"""Figure 23 (Ch3_F.23): forecast peak capacity with and without RLM uplift capacity, three scenarios.

One stacked column group (existing capacity, committed capacity, RLM uplift, anticipated capacity,
RLM uplift again) and one *stacked* line group (Low; Expected without / with RLM uplift; High
without / with RLM uplift). The sheet's line rows hold increments, so Excel's stacked lines plot
running totals; the lines' values here are those plotted running totals.

The first RLM uplift row (row 28) is blank in 2026-27 and 2027-28; blanks stay null (no bar).
"""
import os
import re
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from prep_common import load_raw, visible_charts, series, name, values, color, cell, clean_name, write  # noqa: E402

FID = 'Ch3_F.23'
raw = load_raw(FID)
chart = visible_charts(raw)[0]
ss = sorted(series(chart), key=lambda s: s['order'])


def ref_row(s):
    m = re.search(r'\$(\d+)(?::\$?[A-Z]+\$?\d+)?$', s['val'].get('ref') or '')
    return int(m.group(1)) if m else None


lines = [s for s in ss if s['type'] == 'line']
categories = values(lines[0]['cat'])
header_row = re.search(r'\$(\d+):', lines[0]['cat']['ref']).group(1)
header = clean_name(cell(raw, 'B' + header_row))  # 'Capacity'

bars = []
for s in ss:
    if s['type'] != 'bar':
        continue
    f = s.get('fill') or {}
    bars.append({
        'row': ref_row(s),
        'name': name(s),
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
