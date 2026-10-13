"""Figure 4 (A1_F.4): actual and forecast installed residential distributed PV capacity (MW
degraded), 2025 vs 2026 WEM ESOO, three scenarios.

Monthly data (Oct 2019 to Sep 2036, 204 months). Excel's category axis is the capacity-year
column B24:B227 (each label repeated for 12 months, one label shown per 12 categories:
tickLblSkip=12); the month-end dates in column C are kept for the tooltip and data table.
Eight lines: 2025 ESOO actual and scenarios (sysDot), 2026 ESOO actual and scenarios (solid).
"""
import os
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from prep_common import load_raw, visible_charts, series, name, values, color, block, write  # noqa: E402

FID = 'A1_F.4'
raw = load_raw(FID)
chart = visible_charts(raw)[0]
ss = sorted(series(chart), key=lambda s: s['order'])

years = values(ss[0]['cat'])
dates = [r[0] for r in block(raw, 'C24', 'C227')]
assert len(dates) == len(years), (len(dates), len(years))

out = {'years': years, 'dates': dates, 'series': []}
for s in ss:
    ln = s.get('line') or {}
    vals = values(s['val'])
    assert len(vals) == len(years)
    out['series'].append({
        'name': name(s),
        'color': color(s),
        'width': ln.get('width_pt'),
        'dash': ln.get('dash'),
        'values': vals,
    })
write(FID, out)
