"""Figure 34 (Ch5_F.34): modelled dispatch over a two-day period in March 2027 (USE event).

Picture-based figure: in the register the chart is a pasted image (image12.png); the sheet holds
the half-hourly table B27:S124 (97 rows, 20 Mar 2027 00:00 to 22 Mar 2027 00:00).

Timestamps are StartDate + time of day. The Time column holds Excel day fractions that run past 1
on the second day (1.0208 is shown as 00:30), so only its time-of-day part is used. Every value
column is kept in sheet order; MW values are rounded to 0.001 first, which also clears the
floating-point noise (e.g. 9.9e-14) in some cells.
"""
import datetime as dt
import os
import re
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from prep_common import load_raw, write  # noqa: E402

FID = 'Ch5_F.34'
raw = load_raw(FID)
grid = raw['grid']

# header row: the row whose column B reads 'StartDate'
hr = next(i for i, r in enumerate(grid) if len(r) > 1 and r[1] == 'StartDate')
header = [h for h in grid[hr][1:] if h not in (None, '')]
rows = [r[1:1 + len(header)] for r in grid[hr + 1:] if len(r) > 2 and r[1] not in (None, '')]
assert header[:2] == ['StartDate', 'Time'], header


def stamp(date, time):
    m = re.search(r'(\d{2}):(\d{2})(?::\d{2})?$', str(time))
    hh, mm = (m.group(1), m.group(2)) if m else ('00', '00')
    return f'{date}T{hh}:{mm}'


times = [stamp(r[0], r[1]) for r in rows]
ts = [dt.datetime.fromisoformat(s) for s in times]
assert all(b - a == dt.timedelta(minutes=30) for a, b in zip(ts, ts[1:])), 'not half-hourly'

series = []
for j, name in enumerate(header[2:], start=2):
    vals = [round(float(r[j]), 3) for r in rows]
    series.append({'name': name, 'values': vals})

write(FID, {'time': times, 'series': series})
print(f'{len(times)} intervals {times[0]} .. {times[-1]}; columns: {[s["name"] for s in series]}')
