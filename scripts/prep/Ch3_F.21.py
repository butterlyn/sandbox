"""Figure 21 (Ch3_F.21): forecast proportion of new capacity by technology type, 2035-36 (%).

In the register this figure is a pasted infographic (image8.png: a pipeline of committed,
anticipated and proposed capacity with percentage call-outs). The data is the table in B23:N26
(shares of each capacity status by technology, each row summing to 1). The page rebuilds it as a
100% stacked horizontal bar per capacity status.

- Segments: the table's technology columns in sheet order, dropping those that are 0 in every row
  (Coal, Hydro, ESR/DSP); the data table keeps every column.
- Colours: the register's technology colours, taken from this chapter's native chart of the same
  technologies (Ch3_F.24, chart22.xml) so they match the other figures.
- Row labels as printed in the picture ('Proposedcapacity' in the sheet lacks the space), each with
  the picture's status note ('Likely to proceed', ...).
"""
import os
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from prep_common import load_raw, visible_charts, series, name, color, block, write  # noqa: E402

FID = 'Ch3_F.21'
raw = load_raw(FID)
assert not raw['charts'] and raw['pictures'], 'expected a picture-only sheet'

tbl = block(raw, 'B23', 'N26')
header, rows = tbl[0], tbl[1:]
assert header[:3] == ['Capacity', 'Unit', 'ESR'] and header[-1] == 'Total'
techs = header[2:-1]

# technology colours from the register's native chart of the same technologies (Ch3_F.24)
palette = {name(s): color(s) for s in series(visible_charts(load_raw('Ch3_F.24'))[0]) if s['type'] == 'bar'}

PICTURE_LABELS = {'Committed capacity': ('Committed capacity', 'Likely to proceed'),
                  'Anticipated capacity': ('Anticipated capacity', 'Less likely to proceed'),
                  'Proposedcapacity': ('Proposed capacity', 'Early-stage proposals')}
categories, notes = [], []
for r in rows:
    label, note = PICTURE_LABELS[r[0]]
    assert r[1] == '%' and abs(sum(r[2:-1]) - r[-1]) < 1e-9 and r[-1] == 1
    categories.append(label)
    notes.append(note)

out = {'categories': categories, 'notes': notes, 'series': [], 'technologies': techs,
       'shares': [r[2:-1] for r in rows]}
for j, tech in enumerate(techs):
    vals = [r[2 + j] for r in rows]
    if all(v == 0 for v in vals):
        continue
    out['series'].append({'name': tech, 'color': palette[tech], 'values': vals})
assert [s['name'] for s in out['series']] == ['ESR', 'Wind', 'Gas', 'Solar', 'Waste', 'DSP', 'Distillate']
write(FID, out)
