"""Figure 12b (A1_F.12b): household electricity consumption response to temperature, 2020-21 to 2024-25.

Excel scatter chart (scatterStyle lineMarker) with ten series:
- five fitted model lines (order 0-4): x = 'A1_F.12b'!B24:B63 holds text labels ('1°C' … '40°C'), so Excel
  plots them at their position 1 … 40 (which equals the temperature); line only, no markers;
- five years of daily data points (order 5-9): x = average daily temperature (col M), y = underlying
  household consumption (col L); circle markers size 4, fill at 20% opacity, no outline, no line.
Each data series covers consecutive days; the date of its first row (col J) is kept so the tooltip can
show the date of every point.
"""
import datetime as dt
import os
import re
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from prep_common import load_raw, visible_charts, series, name, values, color, cell, write  # noqa: E402

FID = 'A1_F.12b'
raw = load_raw(FID)
chart = visible_charts(raw)[0]
ss = sorted(series(chart), key=lambda s: s['order'])
axes = {a['pos']: a for a in chart['axes']}


def tidy(s):
    return re.sub(r'\s+', ' ', s).strip()


def first_row(ref):
    return int(re.search(r'\$[A-Z]+\$(\d+)', ref).group(1))


out = {
    'xTitle': tidy(axes['b']['title']),
    'yTitle': tidy(axes['l']['title']),
    'models': [],
    'data': [],
}
for s in ss:
    mk = s.get('marker') or {}
    if mk.get('symbol') == 'none':
        # model line: text x values -> Excel uses the 1-based position
        xs_txt = values(s['x'])
        xs = list(range(1, len(xs_txt) + 1))
        assert all(float(re.match(r'\s*(-?[\d.]+)', str(t)).group(1)) == x for t, x in zip(xs_txt, xs)), xs_txt
        ln = s.get('line') or {}
        out['models'].append({
            'name': name(s),
            'color': color(s),
            'width': ln.get('width_pt'),  # None: Excel's default series line (2.25 pt)
            'dash': ln.get('dash'),
            'x': xs,
            'y': values(s['y']),
        })
    else:
        fill = mk.get('fill') or {}
        xs, ys = values(s['x']), values(s['y'])
        assert len(xs) == len(ys) and None not in xs and None not in ys
        r0 = first_row(s['x']['ref'])
        assert r0 == first_row(s['y']['ref'])
        year = cell(raw, f'K{r0}')
        start = str(cell(raw, f'J{r0}'))[:10]
        # every row of the block is the next calendar day (checked so dates can be derived from the index)
        d0 = dt.date.fromisoformat(start)
        for i in range(len(xs)):
            assert str(cell(raw, f'J{r0 + i}'))[:10] == (d0 + dt.timedelta(days=i)).isoformat()
            assert cell(raw, f'K{r0 + i}') == year
        assert name(s).startswith(year), (name(s), year)
        out['data'].append({
            'name': name(s),
            'year': year,
            'start': start,
            'color': fill.get('hex'),
            'alpha': fill.get('alpha', 1),
            'symbol': mk.get('symbol'),
            'size': mk.get('size'),
            'points': [[x, y] for x, y in zip(xs, ys)],
        })

write(FID, out)
