"""Appendix Figure 26 (A4_F.26): largest daily unserved energy (USE) events from each weather
reference year, coloured according to system conditions, 2031-32 to 2034-35.

The register's chart is a pasted picture (work/ref/pictures/A4_F.26-1.png); the sheet holds 3,486
events in B23:E3509 (Date, Operational demand (MW), Unserved Energy (MWh), Cause). The picture is a
bubble chart: x = event date, y = operational demand, bubble area ~ USE, colour = Cause. Every event
lies on the figure's x axis (Oct-31 to Oct-35; one event sits on the 1 Oct 2035 edge, and the picture
draws it there), so all are kept.

Causes. This sheet uses five labels: the three single drivers, 'Other' and 'All three drivers'.
Pixel-sampling isolated bubbles in the picture shows that the sheet's single-driver and 'Other'
labels match the picture's colours, but its 'All three drivers' events are drawn in all four
combination colours (mostly Low Battery SoC and Low Renewables, also High Outages and Low Renewables,
High Outages and Low Battery SoC, and All three drivers). The sheet cannot tell these apart, so the
chart follows the register and shows them all as 'All three drivers'.

Annotations reproduced from the picture:
- the callout box. Its leader points at the 11 Feb 2032 event (5,693 MW). The picture labels it
  '1,560 MWh', but the sheet gives that event 3,751 MWh and the picture's own bubble there is drawn at
  that size (bubble diameters follow sqrt(USE) exactly), so the label shows the sheet value to 3
  significant figures, as Figure 25's '850 MWh' does.
- the four numbered cluster outlines (they match the four bullet points in the appendix text).
  Their outlines and badge positions were digitised from the picture in data coordinates (date, MW):
  dark-purple outline pixels traced around each cluster centre in 32 angular bins, with the bins
  hidden under a badge interpolated.

Colours are sampled from the picture's legend (identical in Figures 25 and 26).
"""
import os
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from prep_common import load_raw, block, write  # noqa: E402

FID = 'A4_F.26'
PERIOD = ('2031-10-01', '2035-10-01')  # x axis Oct-31 to Oct-35 (capacity years 2031-32 to 2034-35)

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

# numbered clusters digitised from the picture: badge centre and outline, as [date, MW]
CLUSTERS = [
    {'n': 1, 'badge': ['2033-04-02', 5740], 'outline': [
        ['2032-10-19', 5180], ['2032-10-25', 5285], ['2032-11-01', 5385], ['2032-11-09', 5485],
        ['2032-11-17', 5595], ['2032-11-28', 5720], ['2032-12-14', 5840], ['2033-01-04', 5920],
        ['2033-01-29', 5935], ['2033-02-21', 5890], ['2033-03-13', 5800], ['2033-03-28', 5680],
        ['2033-04-07', 5555], ['2033-04-13', 5425], ['2033-04-19', 5305], ['2033-04-23', 5185],
        ['2033-04-27', 5060], ['2033-04-29', 4920], ['2033-04-26', 4780], ['2033-04-16', 4645],
        ['2033-03-28', 4565], ['2033-03-06', 4535], ['2033-02-13', 4540], ['2033-01-25', 4555],
        ['2033-01-08', 4565], ['2032-12-21', 4565], ['2032-12-01', 4565], ['2032-11-09', 4585],
        ['2032-10-20', 4660], ['2032-10-10', 4785], ['2032-10-09', 4930], ['2032-10-13', 5065]]},
    {'n': 2, 'badge': ['2032-12-07', 2335], 'outline': [
        ['2032-09-17', 3380], ['2032-09-18', 3450], ['2032-09-19', 3525], ['2032-09-21', 3615],
        ['2032-09-23', 3725], ['2032-09-27', 3875], ['2032-10-07', 4070], ['2032-10-27', 4250],
        ['2032-11-24', 4290], ['2032-12-18', 4165], ['2032-12-30', 3960], ['2033-01-04', 3780],
        ['2033-01-06', 3650], ['2033-01-08', 3550], ['2033-01-09', 3465], ['2033-01-10', 3385],
        ['2033-01-10', 3310], ['2033-01-10', 3225], ['2033-01-11', 3135], ['2033-01-10', 3020],
        ['2033-01-09', 2875], ['2033-01-02', 2700], ['2032-12-19', 2520], ['2032-11-25', 2360],
        ['2032-10-25', 2295], ['2032-09-27', 2410], ['2032-09-13', 2645], ['2032-09-11', 2875],
        ['2032-09-12', 3035], ['2032-09-13', 3145], ['2032-09-14', 3235], ['2032-09-15', 3310]]},
    {'n': 3, 'badge': ['2033-07-06', 5195], 'outline': [
        ['2033-05-01', 4685], ['2033-05-04', 4780], ['2033-05-10', 4870], ['2033-05-19', 4945],
        ['2033-05-30', 5005], ['2033-06-11', 5050], ['2033-06-25', 5080], ['2033-07-08', 5085],
        ['2033-07-22', 5080], ['2033-08-04', 5055], ['2033-08-15', 5020], ['2033-08-27', 4975],
        ['2033-09-05', 4915], ['2033-09-13', 4845], ['2033-09-18', 4765], ['2033-09-21', 4680],
        ['2033-09-21', 4595], ['2033-09-18', 4510], ['2033-09-12', 4435], ['2033-09-04', 4370],
        ['2033-08-24', 4320], ['2033-08-12', 4300], ['2033-07-31', 4300], ['2033-07-20', 4310],
        ['2033-07-10', 4325], ['2033-07-01', 4340], ['2033-06-22', 4360], ['2033-06-13', 4385],
        ['2033-06-02', 4410], ['2033-05-22', 4450], ['2033-05-11', 4510], ['2033-05-04', 4595]]},
    {'n': 4, 'badge': ['2033-06-20', 2415], 'outline': [
        ['2033-03-05', 3305], ['2033-03-13', 3435], ['2033-03-22', 3555], ['2033-04-02', 3660],
        ['2033-04-16', 3760], ['2033-05-03', 3840], ['2033-05-22', 3890], ['2033-06-11', 3915],
        ['2033-07-01', 3910], ['2033-07-21', 3880], ['2033-08-10', 3835], ['2033-08-27', 3765],
        ['2033-09-11', 3670], ['2033-09-22', 3560], ['2033-10-01', 3440], ['2033-10-08', 3310],
        ['2033-10-11', 3165], ['2033-10-10', 3020], ['2033-10-03', 2880], ['2033-09-21', 2755],
        ['2033-09-03', 2655], ['2033-08-14', 2585], ['2033-07-24', 2535], ['2033-07-02', 2500],
        ['2033-06-10', 2495], ['2033-05-18', 2515], ['2033-04-26', 2560], ['2033-04-05', 2630],
        ['2033-03-18', 2735], ['2033-03-06', 2865], ['2033-02-28', 3015], ['2033-02-28', 3165]]},
]

# the bullet each numbered cluster illustrates (appendix A4.6.2, page 59, verbatim)
CLUSTER_TEXT = {
    1: 'Summer events generally occur at high demand, occurring without specific causes, indicative of overall '
       'shortfall of supply (aligned to supply demand balance for the outer years).',
    2: 'Shoulder events occur at moderate demand levels due to increased Outages, generally due to higher planned '
       'Outages in shoulder seasons.',
    3: 'Winter events at higher demand levels are dominated by reduced renewables availability.',
    4: 'Events in winter also occur at low demand, where low renewables combined with low SOC result in USE even '
       'at low demand.',
}
for cl in CLUSTERS:
    cl['text'] = CLUSTER_TEXT[cl['n']]

# the event the picture's callout points at, and the label the picture gives it
CALLOUT = ('2032-02-11', 5693.32)
PUBLISHED_LABEL = '1,560 MWh'


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

events = []
outside = 0
r = 24
while True:
    date, demand, use, cause = block(raw, f'B{r}', f'E{r}')[0]
    if date in (None, ''):
        break
    r += 1
    date = str(date)[:10]
    if not (PERIOD[0] <= date <= PERIOD[1]):
        outside += 1
        continue
    events.append([date, round(float(demand), 2), round(float(use), 2), cause_key(cause)])
assert len(events) == 3486 and outside == 0, (len(events), outside)

present = [c for c in CATEGORIES if any(e[3] == c[0] for e in events)]
index = {c[0]: i for i, c in enumerate(present)}
for e in events:
    e[3] = index[e[3]]
# draw order: largest bubbles first so small ones stay visible on top
events.sort(key=lambda e: (-e[2], e[0], e[1]))

hits = [e for e in events if e[0] == CALLOUT[0] and abs(e[1] - CALLOUT[1]) < 0.5]
assert len(hits) == 1, hits
hl = hits[0]

out = {
    'xMin': PERIOD[0],
    'xMax': PERIOD[1],
    'categories': [{'name': n, 'color': c} for _, n, c in present],
    'events': events,
    'callout': {'date': hl[0], 'demand': hl[1], 'label': f'{float(f"{hl[2]:.3g}"):,.0f} MWh',
                'published': PUBLISHED_LABEL},
    'clusters': CLUSTERS,
}
write(FID, out, sig=7)
