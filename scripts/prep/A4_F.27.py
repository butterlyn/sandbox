"""Appendix Figure 27 (A4_F.27): simulated unserved energy duration, magnitude and frequency, 2030-31.

Picture-based figure: the register shows a pasted bubble chart; the sheet holds its data B23:D324.
  B: average duration of events in the simulation (hours, 0.5 h bins)
  C: magnitude, % of average unscheduled operational demand (2.5% bins)
  D: frequency (fraction; all 39 non-empty rows sum to 1, every value a multiple of 1/1,600)
Rows 64-324 are all zero (unused slots) and are dropped. Row 25 (0 h, 0%, 71.2%) is the outcome
with no unserved energy: the "71%" bubble, drawn not to scale in the picture.

The picture's shaded region "USE greater than the reliability standard" is not in the sheet. Its
boundary was traced from the register picture (work/ref/pictures/A4_F.27-1.png, every pixel column
of the plot from 0.55 h to 6 h) and fits magnitude(%) = c / duration(h) almost exactly: least squares
gives c = 1.751 with a residual of 0.07 px (after a constant 0.07-point offset for the drawn line's
width). 1.752 = 8,760 h x 0.0002, so that round value is kept as BOUNDARY below.

Colours sampled from the picture: bubbles #72277C, shaded region #D0D0D0, boundary line #666666.
"""
import os
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from prep_common import load_raw, block, cell, write  # noqa: E402

FID = 'A4_F.27'
BOUNDARY = 1.752                       # % of average demand x hours (see docstring)
raw = load_raw(FID)

assert cell(raw, 'B23') == 'Average duration for event in simulation'
assert cell(raw, 'C23') == '% of Average unscheduled operational demand'
assert cell(raw, 'D23') == 'Frequency'
rows = block(raw, 'B25', 'D324')
points = []
for x, y, f in rows:
    if (x, y, f) == (0, 0, 0):
        continue                       # unused slot
    points.append([x, y, f])
assert len(points) == 39, len(points)
assert all(r == [0, 0, 0] for r in rows[39:]), 'expected only empty slots after row 63'
assert abs(sum(p[2] for p in points) - 1) < 1e-9
assert points[0][:2] == [0, 0]

write(FID, {
    'points': points,                  # [duration h, % of avg unscheduled operational demand, frequency]
    'boundary': BOUNDARY,
    'colors': {'bubble': '#72277C', 'region': '#D0D0D0', 'boundary': '#666666'},
    # size key of the picture: label and the frequency each reference bubble stands for
    'key': [['0.05% (~1 in 1600)', 0.0005], ['0.1% (~1 in 800)', 0.001], ['1.0% (~1 in 100)', 0.01]],
})
