"""Figure 12e (A1_F.12e): average annual household heating response consumption, 2020-21 to 2035-36 (kWh/HDD).

Excel scatter chart in two groups (the same layout and code as Figures 12c and 12d):
- 'historical' (lineMarker group): the five actual years 2021-2025 with no line and no markers; it only
  carries Excel's linear trendline (dashed). The trendline is the least-squares fit of those points,
  drawn from the first to the last x; it is computed here.
- one single-point series per actual year (named '2021' … '2025' after cells B24:B28) that draws the
  coloured markers. The 2025 series has an automatic marker, which renders as a circle the same size
  as the others in the published panel.
- the forecast 2026-2036 (smoothMarker group): smoothed line, no markers.
Capacity Year labels ('2020-21' …) come from column C next to each 'Capacity Year ended' (column B).
"""
import os
import re
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from prep_common import load_raw, visible_charts, series, name, values, color, cell, write  # noqa: E402

FID = 'A1_F.12e'
AUTO_MARKER = {'symbol': 'circle', 'size': 6}

raw = load_raw(FID)
chart = visible_charts(raw)[0]
ss = sorted(series(chart), key=lambda s: s['order'])
axes = {a['pos']: a for a in chart['axes']}


def title(ax):
    """Axis title text; a cell reference ('A1_F.12e'!$B$23) is resolved from the sheet."""
    t = ax.get('title') or ''
    m = re.match(r"^'?[^'!]+'?!\$?([A-Z]+)\$?(\d+)$", t)
    if m:
        t = cell(raw, m.group(1) + m.group(2))
    return re.sub(r'\s+', ' ', str(t)).strip()


def linear_fit(xs, ys):
    n = len(xs)
    mx, my = sum(xs) / n, sum(ys) / n
    sxx = sum((x - mx) ** 2 for x in xs)
    sxy = sum((x - mx) * (y - my) for x, y in zip(xs, ys))
    slope = sxy / sxx
    return slope, my - slope * mx


# sheet table: B = Capacity Year ended, C = Capacity Year, E = value (header in E23)
years, labels, vals = [], [], []
r = 24
while isinstance(cell(raw, f'B{r}'), (int, float)):
    years.append(int(cell(raw, f'B{r}')))
    labels.append(str(cell(raw, f'C{r}')))
    vals.append(cell(raw, f'E{r}'))
    r += 1

y_title = title(axes['l'])
out = {
    'xTitle': title(axes['b']),
    'yTitle': y_title,
    'unit': re.search(r'\(([^()]*)\)\s*$', y_title).group(1),
    'name': str(cell(raw, 'E23')),
    'years': years,
    'labels': labels,
    'points': [],
}
for s in ss:
    mk = s.get('marker') or {}
    if s.get('trendlines'):
        assert mk.get('symbol') == 'none' and (s.get('line') or {}).get('none'), 'trend carrier should be invisible'
        tl = s['trendlines'][0]
        assert tl['type'] == 'linear'
        xs, ys = values(s['x']), values(s['y'])
        slope, icpt = linear_fit(xs, ys)
        tx = [min(xs) + i for i in range(int(max(xs) - min(xs)) + 1)]  # whole years: same straight line
        out['trend'] = {
            'name': tl.get('name') or 'Linear (%s)' % name(s),  # Excel's default trendline name
            'color': tl['line'].get('color'),
            'width': tl['line'].get('width_pt'),
            'dash': tl['line'].get('dash'),
            'x': tx,
            'y': [slope * x + icpt for x in tx],
        }
    elif s['group'].get('scatterStyle') == 'smoothMarker' or (s.get('line') or {}).get('color'):
        ln = s.get('line') or {}
        out['line'] = {
            'name': name(s),
            'color': color(s),
            'width': ln.get('width_pt'),
            'dash': ln.get('dash'),
            'smooth': bool(s.get('smooth')),
            'x': values(s['x']),
            'y': values(s['y']),
        }
    else:
        xs, ys = values(s['x']), values(s['y'])
        assert len(xs) == 1
        fill = mk.get('fill') or {}
        out['points'].append({
            'name': name(s),
            'x': xs[0],
            'y': ys[0],
            'color': fill.get('hex'),
            'symbol': mk.get('symbol') or AUTO_MARKER['symbol'],
            'size': mk.get('size') or AUTO_MARKER['size'],
        })

# the plotted values are the sheet table: points for the actual years, the line for the forecast
assert [p['x'] for p in out['points']] + out['line']['x'] == years
assert [p['y'] for p in out['points']] + out['line']['y'] == vals
write(FID, out)
