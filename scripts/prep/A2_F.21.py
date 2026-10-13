"""Appendix Figure 21 (A2_F.21): assigned Peak Capacity Credits by Facility, 2026-27 and 2027-28.

Two clustered column series over 39 Facilities (sheet order, 'Small Facilities' last).
"""
import os
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from prep_common import load_raw, visible_charts, series, name, values, color, write  # noqa: E402

FID = 'A2_F.21'
raw = load_raw(FID)
chart = visible_charts(raw)[0]
ss = sorted(series(chart), key=lambda s: s['order'])

out = {'categories': values(ss[0]['cat']), 'series': []}
for s in ss:
    assert values(s['cat']) == out['categories'], 'series share one category range'
    out['series'].append({'name': name(s), 'color': color(s), 'values': values(s['val'])})
write(FID, out)
