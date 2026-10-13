"""Appendix Figure 9 (A1_F.9): distributed battery capacity by segment under the three 2026 ESOO scenarios.

The sheet has three native charts side by side (stacked columns, gap width 25), one per scenario,
each titled from a cell (B24 'Low', B28 'Expected', B32 'High') and each with a fixed 0-3,750 MW axis
(major unit 750). Panels are written left to right as the charts sit on the sheet; within each panel
the series keep Excel's plot order (Residential VPP-capable at the base, then Residential nonVPP,
then Business on top).
"""
import os
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from prep_common import load_raw, visible_charts, series, name, values, color, cell, write  # noqa: E402

FID = 'A1_F.9'

raw = load_raw(FID)
charts = sorted(visible_charts(raw), key=lambda c: (c['anchor']['from'][0], c['anchor']['from'][1]))


def title_of(chart):
    ref = chart.get('title') or ''
    if '!' in ref:  # cell reference like 'A1_F.9'!$B$24
        return str(cell(raw, ref.split('!')[-1].replace('$', ''))).strip()
    return ref.strip()


def value_axis(chart):
    return next(a for a in chart['axes'] if a['kind'] == 'valAx')


categories = None
panels = []
for ch in charts:
    ss = sorted(series(ch), key=lambda s: s['order'])
    cats = [str(c) for c in values(ss[0]['cat'])]
    if categories is None:
        categories = cats
    assert cats == categories, 'panels must share categories'
    va = value_axis(ch)
    panels.append({
        'title': title_of(ch),
        'axis': {'min': va.get('min'), 'max': va.get('max'), 'interval': va.get('majorUnit')},
        'series': [{'name': name(s), 'color': color(s), 'values': values(s['val'])} for s in ss],
    })

out = {
    'categories': categories,
    'gapWidth': charts[0]['groups'][0].get('gapWidth'),
    'panels': panels,
}
write(FID, out)
