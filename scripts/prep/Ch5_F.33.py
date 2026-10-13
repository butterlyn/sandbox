"""Figure 33 (Ch5_F.33): boxplot of annual unserved energy, 2026-27 to 2035-36 (% of annual consumption).

The register holds the chart as a picture (seaborn box plot + strip plot, with an inset zooming into
2026-27 to 2030-31). The sheet holds the data behind it: for each Capacity Year, the 1,600 modelled
iterations (16 weather reference years x 100 forced-outage draws), ranked ascending (rows 25-1624,
columns C-L, header row 24). Values are already in % of annual consumption.

Box statistics follow the sheet note and matplotlib's boxplot_stats (what seaborn uses):
  - Q1 / median / Q3: percentiles with linear interpolation (numpy default),
  - whiskers: most extreme iterations within 1.5 x IQR of Q1 / Q3 (Tukey),
  - outliers: iterations beyond the whiskers; mean: arithmetic mean (the dashed line).
The picture also draws every iteration as a dot, so the per-year values are kept too (4 significant
digits; zeros, which sort first, are stored as a count).
"""
import math
import os
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from prep_common import load_raw, rnd, write  # noqa: E402

FID = 'Ch5_F.33'


def percentile(sorted_vals, p):
    """numpy.percentile(..., method='linear') on an ascending list."""
    n = len(sorted_vals)
    pos = (n - 1) * p / 100.0
    lo = int(math.floor(pos))
    hi = min(lo + 1, n - 1)
    return sorted_vals[lo] + (sorted_vals[hi] - sorted_vals[lo]) * (pos - lo)


def box_stats(vals, whis=1.5):
    """matplotlib.cbook.boxplot_stats for one sample:
    [min, lower whisker, Q1, median, Q3, upper whisker, max, mean, n below, n above]."""
    a = sorted(vals)
    q1, med, q3 = (percentile(a, p) for p in (25, 50, 75))
    iqr = q3 - q1
    inside_hi = [v for v in a if v <= q3 + whis * iqr]
    inside_lo = [v for v in a if v >= q1 - whis * iqr]
    hi = max(inside_hi) if inside_hi and max(inside_hi) >= q3 else q3
    lo = min(inside_lo) if inside_lo and min(inside_lo) <= q1 else q1
    below = sum(1 for v in a if v < lo)
    above = sum(1 for v in a if v > hi)
    return [a[0], lo, q1, med, q3, hi, a[-1], sum(a) / len(a), below, above]


raw = load_raw(FID)
grid = raw['grid']
hdr = next(i for i, r in enumerate(grid) if len(r) > 1 and r[1] == 'Rank')  # row 23 'Rank | Capacity Year'
years = [v for v in grid[hdr + 1][2:] if v not in (None, '')]           # row 24: 2026-27 ... 2035-36
cols = {y: [] for y in years}
for r in grid[hdr + 2:]:
    if len(r) < 3 or r[1] in (None, ''):
        continue
    for j, y in enumerate(years):
        v = r[2 + j]
        if isinstance(v, (int, float)):
            cols[y].append(float(v))

out = {'years': years, 'n': [], 'stats': [], 'zeros': [], 'points': []}
for y in years:
    a = sorted(cols[y])
    out['n'].append(len(a))
    out['stats'].append(box_stats(a))
    out['zeros'].append(sum(1 for v in a if v == 0))
    out['points'].append([rnd(v, 4) for v in a if v != 0])
write(FID, out)
