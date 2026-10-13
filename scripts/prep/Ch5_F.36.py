"""Figure 36 (Ch5_F.36): modelled time-of-day distribution of unserved energy, 2032-33 to 2035-36.

Picture-based figure: the register shows a pasted image (2 x 2 small multiples, one panel per
capacity year, one line per season). The sheet holds the data table B23:N74:
  row 25: capacity years (C, F, I, L), row 26: season of each column (Shoulder, Summer, Winter),
  B27:B74: trading interval start times 00:00 ... 23:30, C27:N74: average USE ("EUE (MWh)").
Colours are sampled from the register picture (work/ref/pictures/Ch5_F.36-1.png); the legend
order there is Summer, Shoulder, Winter.
"""
import os
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from prep_common import load_raw, block, cell, write  # noqa: E402

FID = 'Ch5_F.36'
raw = load_raw(FID)

SEASONS = ['Summer', 'Shoulder', 'Winter']           # legend / drawing order in the picture
COLORS = {'Summer': '#9B2242', 'Shoulder': '#FFB81C', 'Winter': '#40C1AC'}

years_row = block(raw, 'C25', 'N25')[0]
seasons_row = block(raw, 'C26', 'N26')[0]
body = block(raw, 'B27', 'N74')

times = []
for r in body:
    t = str(r[0])                                      # '00:00:00'
    times.append(t[:5])
assert len(times) == 48 and times[0] == '00:00' and times[-1] == '23:30', times

# map each column to (year, season); a year label sits above the first of its three columns
cols = {}
year = None
for j, (y, s) in enumerate(zip(years_row, seasons_row)):
    if y:
        year = str(y).strip()
    cols[(year, str(s).strip())] = j + 1               # +1: column B holds the times

years = []
for y in years_row:
    if y and str(y).strip() not in years:
        years.append(str(y).strip())
assert years == ['2032-33', '2033-34', '2034-35', '2035-36'], years

values = {}
for y in years:
    values[y] = {}
    for s in SEASONS:
        j = cols[(y, s)]
        vals = [r[j] for r in body]
        assert all(isinstance(v, (int, float)) for v in vals), (y, s)
        values[y][s] = vals

assert cell(raw, 'C23') == 'EUE (MWh)'
write(FID, {
    'times': times,
    'years': years,
    'seasons': SEASONS,
    'colors': COLORS,
    'values': values,
})
