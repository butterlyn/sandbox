"""Appendix Figure 28 (A4_F.28): modelled outcomes over two days in July 2032 capturing a USE event
(top), battery utilisation (middle) and gas utilisation (bottom).

Picture-based figure: in the register the chart is two pasted images (image36.png: the dispatch
panel; image37.png: the battery and gas panels); the sheet holds the half-hourly table B43:AB140
(97 rows, 1 Jul 2032 00:00 to 3 Jul 2032 00:00). The first 16 columns are the same data as
Figure 35 (Ch5_F.35).

Timestamps are StartDate + time of day (the Time column holds Excel day fractions that run past 1
on the second day). Coal is zero throughout and not in the picture, so it is dropped; every other
column is kept in sheet order. MW values are rounded to 0.001 first, which also clears the
floating-point noise (e.g. -4.5e-13 in Gas Headroom).

Derived series (the top panel's "Essential System Services" band has no column of its own):
  Essential System Services = Gas Regulation Raise + Gas Contingency Reserve Raise
                              + ESR Regulation Raise + ESR Contingency Reserve Raise
Checked against the picture: its stack top minus (operational demand + distributed PV + headroom
+ outages) follows this sum, including the last two hours where only the gas reserves are
non-zero. The checks below confirm the identities the panels rely on.
"""
import datetime as dt
import os
import re
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from prep_common import load_raw, write  # noqa: E402

FID = 'A4_F.28'
DROP = {'Coal'}  # all zero, not in the picture
ESS = ['Gas Regulation Raise', 'Gas Contingency Reserve Raise', 'ESR Regulation Raise', 'ESR Contingency Reserve Raise']
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

cols = {}
series = []
for j, name in enumerate(header[2:], start=2):
    vals = [round(float(r[j]), 3) for r in rows]
    cols[name] = vals
    if name in DROP:
        assert not any(vals), f'{name} is not all zero'
        continue
    series.append({'name': name, 'values': vals})

n = len(times)


def close(a, b, tol=0.02):
    return all(abs(x - y) <= tol for x, y in zip(a, b))


def total(names):
    return [sum(cols[k][i] for k in names) for i in range(n)]


# identities behind the three panels
assert close(cols['ESR Available Capacity'], total(['ESR (discharge)', 'ESR Regulation Raise', 'ESR Contingency Reserve Raise']))
assert close(cols['Gas Available Capacity'], total(['Gas', 'Gas Headroom', 'Gas Regulation Raise', 'Gas Contingency Reserve Raise']))
assert close(cols['Operational demand'], total(['Unscheduled operational demand', 'ESR (charge)']))
# the gas panel's outage band is the Outages column: gas available capacity + outages is constant
assert max(total(['Gas Available Capacity', 'Outages'])) - min(total(['Gas Available Capacity', 'Outages'])) < 0.02

derived = [{'name': 'Essential System Services', 'of': ESS, 'values': [round(v, 3) for v in total(ESS)]}]
write(FID, {'time': times, 'series': series, 'derived': derived})
print(f'{n} intervals {times[0]} .. {times[-1]}; {len(series)} columns + {len(derived)} derived')
