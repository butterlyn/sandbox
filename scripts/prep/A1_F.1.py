"""Figure 1 (A1_F.1): forecast real economic growth (GDP, real %), Baseline 2024/2025/2026.

Three line series over 39 financial years (B24:B62). The category axis is a dateAx in Excel,
but the categories are text ('2019-20' ...), so they are plotted as text categories.
Values are fractions (0.0211 = 2.11%).
"""
import os
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from prep_common import load_raw, visible_charts, series, name, values, color, write  # noqa: E402

FID = 'A1_F.1'
raw = load_raw(FID)
chart = visible_charts(raw)[0]
ss = sorted(series(chart), key=lambda s: s['order'])

out = {'categories': values(ss[0]['cat']), 'series': []}
for s in ss:
    ln = s.get('line') or {}
    out['series'].append({
        'name': name(s),
        'color': color(s),
        'width': ln.get('width_pt'),
        'dash': ln.get('dash'),
        'values': values(s['val']),
    })
write(FID, out)
