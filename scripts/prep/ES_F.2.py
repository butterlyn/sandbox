"""Figure 2 (ES_F.2): forecast peak capacity by technology type, under three scenarios.

One stacked column group (existing, then committed, then anticipated Facilities, each split by
technology type) and one *stacked* line group (Low, Expected, High scenario forecasts).

The three scenarios are not separate categories: each year's column stacks the three facility
statuses, and the sheet's scenario rows hold increments (row 35 = existing total, row 45 = committed
total, row 55 = anticipated total). Excel's line group is stacked, so it plots running totals:
Low = existing, Expected = existing + committed, High = existing + committed + anticipated.
The lines' values here are those plotted running totals.

Facility status comes from the sheet block each series' values sit in (rows 26-34 existing,
36-44 committed, 46-54 anticipated). Three leftover series with a #REF! name and value reference
(cached value 1 MW in 2026-27 only; legend entries deleted) are omitted.
"""
import os
import re
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from prep_common import load_raw, visible_charts, series, name, values, color, cell, clean_name, write  # noqa: E402

FID = 'ES_F.2'
raw = load_raw(FID)
chart = visible_charts(raw)[0]
ss = sorted(series(chart), key=lambda s: s['order'])


def ref_row(s):
    m = re.search(r'\$(\d+)(?::\$?[A-Z]+\$?\d+)?$', s['val'].get('ref') or '')
    return int(m.group(1)) if m else None


lines = [s for s in ss if s['type'] == 'line']
line_rows = sorted(ref_row(s) for s in lines)  # 35, 45, 55
STATUS = ['existing', 'committed', 'anticipated']


def status(row):
    for i, lr in enumerate(line_rows):
        if row < lr:
            return STATUS[i]
    raise ValueError(f'row {row} is below the last scenario row')


categories = values(lines[0]['cat'])
header_row = re.search(r'\$(\d+):', lines[0]['cat']['ref']).group(1)
header = clean_name(cell(raw, 'B' + header_row))  # 'Generation Type' / 'Technology type'
bars = []
for s in ss:
    if s['type'] != 'bar' or s['name'].get('refError') or s['val'].get('refError'):
        continue
    f = s.get('fill') or {}
    bars.append({
        'row': ref_row(s),
        'tech': name(s),
        'status': status(ref_row(s)),
        'color': color(s),
        'pattern': f.get('pattern'),
        'bg': f.get('bg'),
        'values': values(s['val']),
    })

out_lines = []
run = [0.0] * len(categories)
for s in lines:  # plot order Low, Expected, High: Excel stacks the line group
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
