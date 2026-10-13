"""Figure 28 (Ch3_F.28): daily peak percentage of Capacity Credits on Forced Outage, Hot Seasons
2020-21 to 2025-26.

The Excel chart is one area series over B24:B898 / D24:D898 (875 rows). Column B only labels the
first day of each month (the other cells are empty text), so Excel treats the categories as text:
every row is one equally spaced slot, labelled only at month starts, and the 29-30 blank rows
between seasons leave the gaps seen in the PDF. The category cache stops at 845 points only
because Excel drops the trailing empty labels; the value cache matches the sheet (875 rows).

This script keeps every sheet row as one slot (blank rows -> null) and gives each data row its
date. Each season block runs from 1 December to 31 March on consecutive days; the block lengths
are asserted against the calendar. The 2023-24 block has 122 values (29 February 2024 included)
while its Day column was laid out for a 28-day February, so the sheet's labels from 'Mar-24' on
sit one row early; the dates here follow the values. Spot checks against the report text: 21% on
7 December 2024 and 13% on 14 and 15 December 2025.
"""
import datetime as dt
import os
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from prep_common import load_raw, visible_charts, series, name, values, color, write  # noqa: E402

FID = 'Ch3_F.28'
raw = load_raw(FID)
chart = visible_charts(raw)[0]
s = series(chart)[0]

labels = values(s['cat'])  # sheet values: ISO date on month starts, '' elsewhere
vals = values(s['val'])
assert len(labels) == len(vals) == 875, (len(labels), len(vals))
vals = [None if v in (None, '') else float(v) for v in vals]

# consecutive non-blank runs = Hot Seasons
blocks, cur = [], None
for i, v in enumerate(vals):
    if v is None:
        if cur:
            blocks.append(cur)
            cur = None
    elif cur is None:
        cur = [i, i]
    else:
        cur[1] = i
if cur:
    blocks.append(cur)

dates = [None] * len(vals)
seasons = []
for a, b in blocks:
    start = dt.date.fromisoformat(labels[a][:10])
    assert (start.month, start.day) == (12, 1), f'season block at row {a + 24} does not start on 1 December'
    end = dt.date(start.year + 1, 3, 31)
    assert b - a == (end - start).days, f'season {start.year}-{start.year + 1}: {b - a + 1} rows for {(end - start).days + 1} days'
    for k in range(a, b + 1):
        dates[k] = (start + dt.timedelta(days=k - a)).isoformat()
    seasons.append({'label': f'{start.year}-{str(start.year + 1)[2:]}', 'from': a, 'to': b})

# month-start labels in the sheet vs dates by position (reported, not fatal: see docstring)
for i, lab in enumerate(labels):
    if lab and dates[i] != lab[:10]:
        print(f'note: sheet label {lab[:10]} at slot {i} falls on {dates[i]} by position')

out = {
    'name': name(s),
    'color': color(s),
    'dates': dates,
    'values': vals,
    'seasons': seasons,
}
write(FID, out)
