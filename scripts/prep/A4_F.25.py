"""Appendix Figure 25 (A4_F.25): largest daily unserved energy (USE) events from each weather
reference year, coloured according to system conditions, 2026-27 to 2029-30.

The register's chart is a pasted picture (work/ref/pictures/A4_F.25-1.png); the sheet holds the
events in B23:E89 (Date, Operational demand (MW), Unserved Energy (MWh), Cause). The picture is a
bubble chart: x = event date, y = operational demand, bubble area ~ USE, colour = Cause.

Two things differ between the sheet and the published figure, and this script follows the figure:

1. Period. The sheet also lists 44 events from 2030-31 (22 Nov 2030 - 11 Aug 2031). The figure
   covers capacity years 2026-27 to 2029-30 (x axis Oct-26 to Oct-30), so only events dated
   1 Oct 2026 - 30 Sep 2030 are kept (22 events).

2. Cause column offset. The Cause in sheet row r describes the event in row r+1. Evidence:
   - pixel-sampling the picture at each event's (date, demand), where the bubble size matches its USE,
     gives the previous row's Cause for every event whose colour is unambiguous (20 of 22), while the
     same-row Cause disagrees for 14 of them; with the same-row Cause one event would be red
     (High Outages) and the picture has no red bubble;
   - the highlighted 850 MWh event (21 Mar 2027) is the report's Figure 34 sample day (sheet
     'Ch 5_F.34': 849.5 MWh of USE). There, at the first USE interval, ESR state of charge is 66.5 %
     (not < 50 %) with 1,188 MW of outages, and the report describes low wind plus material outages:
     High Outages and Low Renewables, as the picture shows and the previous row's Cause says, not
     the same row's 'Renewables <= 15% availability & Battery SoC < 50%'.
   So Causes are shifted down one row. The first event's Cause falls on the header row and is not in
   the sheet; it is taken from the picture (purple: High Outages and Low Renewables) and flagged.

Colours are sampled from the picture's legend (identical in Figures 25 and 26).
"""
import os
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from prep_common import load_raw, block, write  # noqa: E402

FID = 'A4_F.25'
PERIOD = ('2026-10-01', '2030-10-01')  # capacity years 2026-27 to 2029-30 (x axis Oct-26 to Oct-30)

# legend of the published figure, in its order (left column, then right column)
CATEGORIES = [
    ('O', 'Outages ≥ reserve margin MW (High Outages)', '#d91a1a'),
    ('R', 'Renewables ≤ 15% availability (Low Renewables)', '#1a66e6'),
    ('B', 'Battery SoC < 50% (Low Battery SoC)', '#ffd11a'),
    ('OB', 'High Outages and Low Battery SoC', '#ec751a'),
    ('OR', 'High Outages and Low Renewables', '#794080'),
    ('RB', 'Low Battery SoC and Low Renewables', '#8c9c80'),
    ('ORB', 'All three drivers', '#663300'),
    ('X', 'Other', '#d9d9d9'),
]


def cause_key(text):
    """Sheet Cause text -> legend key (O/R/B combinations, ORB = all three, X = Other)."""
    t = str(text).strip().lower()
    if t == 'other':
        return 'X'
    if t == 'all three drivers':
        return 'ORB'
    key = ('O' if 'outages' in t else '') + ('R' if 'renewables' in t else '') + ('B' if 'battery soc' in t else '')
    if not key:
        raise SystemExit(f'unrecognised Cause: {text!r}')
    return key


raw = load_raw(FID)
header = block(raw, 'B23', 'E23')[0]
assert header == ['Date', 'Operational demand (MW)', 'Unserved Energy (MWh)', 'Cause'], header

rows = []
r = 24
while True:
    date, demand, use, cause = block(raw, f'B{r}', f'E{r}')[0]
    if date in (None, ''):
        break
    rows.append((str(date)[:10], float(demand), float(use), cause_key(cause)))
    r += 1
assert len(rows) == 66, len(rows)

# re-align the Cause column (see module docstring): event i takes the Cause listed in row i-1
FIRST_FROM_PICTURE = 'OR'
aligned = [FIRST_FROM_PICTURE] + [row[3] for row in rows[:-1]]

events = []
outside = 0
for i, (date, demand, use, _) in enumerate(rows):
    if not (PERIOD[0] <= date <= PERIOD[1]):  # events on the plotted x range
        outside += 1
        continue
    ev = [date, round(demand, 2), round(use, 2), aligned[i]]
    if i == 0:
        ev.append(1)  # flag: condition read from the published picture
    events.append(ev)
assert len(events) == 22 and outside == 44, (len(events), outside)

# the highlighted event (850 MWh label in the picture) must come out as High Outages and Low Renewables
hl = next(e for e in events if e[0] == '2027-03-21')
assert hl[3] == 'OR', hl

present = [c for c in CATEGORIES if any(e[3] == c[0] for e in events)]
index = {c[0]: i for i, c in enumerate(present)}
for e in events:
    e[3] = index[e[3]]
# draw order: largest bubbles first so small ones stay visible on top
events.sort(key=lambda e: (-e[2], e[0]))

out = {
    'xMin': PERIOD[0],
    'xMax': PERIOD[1],
    'categories': [{'name': n, 'color': c} for _, n, c in present],
    'events': events,
    # the picture's callout: 849.5 MWh shown to 3 significant figures
    'callout': {'date': hl[0], 'demand': hl[1], 'label': f'{float(f"{hl[2]:.3g}"):,.0f} MWh'},
    'outside': outside,
}
write(FID, out, sig=7)
