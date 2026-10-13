"""Figure 40 (Ch5_F.40): Availability Curve, 2027-28 and 2028-29 (MW).

Picture-based figure: the register shows a pasted image; the sheet holds the data B23:E280346.
  B24 / D24: capacity year (2027-28, 2028-29)
  B, D: "Demand" (MW), each already ranked in descending order, 280,320 trading intervals
  C, E: "Reserve margin, Intermittent Load allowance, Regulation Raise, and ESROD Uplift" (MW),
        constant down the column (1,243 MW in 2027-28, 1,386 MW in 2028-29)
The curve in the picture is demand + that reserve component: it starts at 6,244 / 6,522 MW and
ends at 1,613 / 1,706 MW, and matches the picture within a pixel along its whole length.

Downsampling (the chart does not need 2 x 280,320 points): one set of ranks shared by both years,
  - full resolution for the steep head (ranks 1-150) and the steep tail (last 50 ranks),
  - then steps that grow by x1.05 per point until they reach every 250th rank (both ends),
  - even steps of ~250 ranks across the flat middle.
That keeps 1,504 of 280,320 ranks per year, always including the first and last. Linear
interpolation between the kept points reproduces every original value within ~4 MW (mean
0.06 MW); the script prints the exact error.
"""
import os
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from prep_common import load_raw, cell, write  # noqa: E402

FID = 'Ch5_F.40'
HEAD, TAIL, STEP, RATIO = 150, 50, 250, 1.05
COLORS = {'2027-28': '#9B2242', '2028-29': '#6B3077'}   # sampled from the register picture

raw = load_raw(FID)
grid = raw['grid']
assert cell(raw, 'B25') == 'Demand' and cell(raw, 'D25') == 'Demand'
assert str(cell(raw, 'C25')).startswith('Reserve margin') and str(cell(raw, 'E25')).startswith('Reserve margin')
assert cell(raw, 'B26') == 'MW' and cell(raw, 'C26') == 'MW'
rows = grid[26:]                                        # row 27 onwards
N = len(rows)
assert N == 280320, N


def column(j):
    vals = [r[j] for r in rows]
    assert all(isinstance(v, (int, float)) for v in vals)
    return vals


years = []
for name_ref, dj, rj in (('B24', 1, 2), ('D24', 3, 4)):
    name = str(cell(raw, name_ref)).strip()
    demand = column(dj)
    reserve = column(rj)
    assert len(set(reserve)) == 1, 'reserve component is expected to be constant'
    assert all(demand[i] >= demand[i + 1] for i in range(N - 1)), 'demand is expected to be ranked'
    years.append({'name': name, 'demand': demand, 'reserve': reserve[0]})
assert [y['name'] for y in years] == ['2027-28', '2028-29']


def ranks():
    """1-based ranks kept: full-resolution ends, geometric ramps, even middle."""
    keep = set(range(1, HEAD + 1)) | set(range(N - TAIL + 1, N + 1))
    # ramp out of the head
    r, step = HEAD, 1.0
    while True:
        step = min(STEP, step * RATIO)
        r += max(1, int(round(step)))
        keep.add(r)
        if step >= STEP:
            break
    a = r
    # ramp into the tail (built from the end backwards)
    r, step = N - TAIL + 1, 1.0
    while True:
        step = min(STEP, step * RATIO)
        r -= max(1, int(round(step)))
        keep.add(r)
        if step >= STEP:
            break
    b = r
    n = max(1, int(round((b - a) / STEP)))
    for k in range(1, n):
        keep.add(int(round(a + (b - a) * k / n)))
    return sorted(keep)


rk = ranks()
assert rk[0] == 1 and rk[-1] == N


def max_interp_error(vals):
    """Largest |linear interpolation between kept points - original value| over all ranks."""
    worst = 0.0
    for p, q in zip(rk, rk[1:]):
        vp, vq = vals[p - 1], vals[q - 1]
        for r in range(p + 1, q):
            v = vp + (vq - vp) * (r - p) / (q - p)
            worst = max(worst, abs(v - vals[r - 1]))
    return worst


out = {'n': N, 'ranks': rk, 'years': []}
worst = 0.0
for y in years:
    avail = [y['demand'][r - 1] + y['reserve'] for r in rk]
    err = max_interp_error(y['demand'])
    worst = max(worst, err)
    print(f"{y['name']}: {len(rk)} of {N} ranks kept, first {avail[0]:.1f} MW, last {avail[-1]:.1f} MW, "
          f"max interpolation error {err:.2f} MW")
    out['years'].append({
        'name': y['name'],
        'color': COLORS[y['name']],
        'reserve': y['reserve'],
        'values': avail,
    })
out['note'] = {'head': HEAD, 'tail': TAIL, 'step': STEP, 'ratio': RATIO, 'maxErr': round(worst, 1)}
write(FID, out, sig=5)
