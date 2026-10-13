"""Figure 43 (Ch6_F.43): expected unserved energy by network sub-region (North, Metro North, South,
Metro South, East), 2026-27 to 2035-36 (% annual consumption).

The register holds the chart as a picture (seaborn box plots, one panel per sub-region, shared y axis).
The sheet lists every modelled iteration: Capacity Year (B), Unit (C) and one '<sub-region> USE %'
column per panel (D-H), header in row 33, about 1,710-1,730 iterations per year. Values are in %.
One cell (H1119, Metro South 2026-27) holds the number as text, '1.28664568327889E-05%'; it is read
as 1.28664568327889E-05 (same % units: Figure 42's sub-regional total for that iteration equals the
sum of the five columns with this value). The sheet header spells 'Metor South'; the panel title in
the picture reads 'Metro South', which is used here.

Box statistics as matplotlib's boxplot_stats (what seaborn uses): linear-interpolated quartiles,
whiskers at the most extreme iterations within 1.5 x IQR of Q1 / Q3 (Tukey), mean for the dashed line,
outliers = iterations beyond the whiskers (drawn as circles; kept as distinct values, 4 significant
digits, with how many iterations share each value).
"""
import math
import os
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from prep_common import load_raw, rnd, write  # noqa: E402

FID = 'Ch6_F.43'
# sheet column header -> panel title in the picture (row-major panel order = column order)
REGIONS = [('North USE %', 'North'), ('Metro North USE %', 'Metro North'), ('South USE %', 'South'),
           ('Metor South USE %', 'Metro South'), ('East USE %', 'East')]


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


def outliers(vals, st):
    """Distinct outlier values (4 significant digits) with the number of iterations at each."""
    lo, hi = st[1], st[5]
    counts = {}
    for v in vals:
        if v < lo or v > hi:
            k = rnd(v, 4)
            counts[k] = counts.get(k, 0) + 1
    return [[k, counts[k]] for k in sorted(counts)]


def num(v):
    if isinstance(v, (int, float)):
        return float(v)
    if isinstance(v, str) and v.strip():
        return float(v.strip().rstrip('%'))  # the one text cell, e.g. '1.28664568327889E-05%'
    return None


raw = load_raw(FID)
grid = raw['grid']
hdr = next(i for i, r in enumerate(grid) if len(r) > 1 and r[1] == 'Capacity Year')
col = {h: j for j, h in enumerate(grid[hdr]) if h}
years, data = [], {}
for r in grid[hdr + 1:]:
    if len(r) < 2 or r[1] in (None, ''):
        continue
    y = r[1]
    if y not in data:
        years.append(y)
        data[y] = {k: [] for k, _ in REGIONS}
    for k, _ in REGIONS:
        v = num(r[col[k]])
        if v is not None:
            data[y][k].append(v)

out = {'years': years, 'n': [len(data[y][REGIONS[0][0]]) for y in years], 'regions': []}
for k, label in REGIONS:
    stats = [box_stats(data[y][k]) for y in years]
    out['regions'].append({
        'name': label,
        'stats': stats,
        'out': [outliers(data[y][k], st) for y, st in zip(years, stats)],
    })
write(FID, out)
