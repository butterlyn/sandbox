"""Figure 42 (Ch6_F.42): expected unserved energy at the Reference Node (System USE) compared to all
other network sub-regions (Sub-regional USE), 2026-27 to 2035-36 (% annual consumption).

The register holds the chart as a picture (seaborn box plot, two boxes per Capacity Year, inset zooming
into 2026-27 to 2030-31). The sheet lists every modelled iteration: one row per iteration with
Capacity Year (B), Unit (C), 'Sub-regional USE %' (D) and 'System USE %' (E), header in row 23,
about 1,710-1,730 iterations per year. Values are already in %.

Box statistics as matplotlib's boxplot_stats (what seaborn uses): linear-interpolated quartiles,
whiskers at the most extreme iterations within 1.5 x IQR of Q1 / Q3 (Tukey), mean for the dashed line.
The published figure hides outliers (no fliers drawn), so only their counts are kept.
"""
import math
import os
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from prep_common import load_raw, write  # noqa: E402

FID = 'Ch6_F.42'
# picture order (left box, legend first): System USE then Sub-regional USE
SERIES = [('System USE %', 'System USE'), ('Sub-regional USE %', 'Sub-regional USE')]


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


def num(v):
    if isinstance(v, (int, float)):
        return float(v)
    if isinstance(v, str) and v.strip():
        return float(v.strip().rstrip('%'))
    return None


raw = load_raw(FID)
grid = raw['grid']
hdr = next(i for i, r in enumerate(grid) if len(r) > 1 and r[1] == 'Capacity Year')
head = grid[hdr]
col = {h: j for j, h in enumerate(head) if h}
years, data = [], {}
for r in grid[hdr + 1:]:
    if len(r) < 2 or r[1] in (None, ''):
        continue
    y = r[1]
    if y not in data:
        years.append(y)
        data[y] = {k: [] for k, _ in SERIES}
    for k, _ in SERIES:
        v = num(r[col[k]])
        if v is not None:
            data[y][k].append(v)

out = {'years': years, 'n': [len(data[y][SERIES[0][0]]) for y in years], 'series': []}
for k, label in SERIES:
    out['series'].append({'name': label, 'stats': [box_stats(data[y][k]) for y in years]})
write(FID, out)
