"""Figure 16 (Ch2_F.16): zoom-in on the modelled VPP behaviour and its impact on SWIS unscheduled
peak operational demand, Day 3 15:30-21:00, 2028-29 (half-hourly, MW).

The sheet holds two native charts that together make the figure. They become two panels that
share the trading-interval axis, ordered top to bottom by their anchor row on the sheet:
  top    chart14.xml: 'Demand before distributed batteries' (area) + two demand lines
  bottom chart13.xml: VPP charging (+) / discharging (-) columns. The chart's 'Passive batteries'
         series (column H) is filtered out in Excel (c15:filteredBarSeries), so it is not plotted.
Categories are the two-level range B39:C50 (Day label in B, hh:mm time in C). Sheet values are
used throughout; version 2 of the register corrected H42 and the sheet holds the fix.
"""
import os
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from prep_common import load_raw, visible_charts, series, name, values, color, write  # noqa: E402

FID = 'Ch2_F.16'
raw = load_raw(FID)
charts = sorted(visible_charts(raw), key=lambda c: c['anchor']['from'][1])


def hhmm(iso):
    """'2026-03-16' (midnight) / '2026-03-16T15:30:00' -> '00:00' / '15:30' (cell format hh:mm)."""
    return iso[11:16] if len(iso) > 10 else '00:00'


def category_axis(chart):
    """Unique interval labels ('Day 3 15:30') and the Day groups of the two-level category range."""
    cat = next(s['cat'] for s in series(chart) if s.get('cat'))
    levels = values(cat)
    days = next(lv for lv in levels if any(isinstance(v, str) and v.startswith('Day') for v in lv))
    times = next(lv for lv in levels if lv is not days)
    labels, groups, cur = [], [], None
    for i, (dl, tm) in enumerate(zip(days, times)):
        if dl:
            cur = str(dl).strip()
            groups.append({'label': cur, 'start': i, 'n': 0})
        groups[-1]['n'] += 1
        labels.append(f'{cur} {hhmm(tm)}')
    return labels, groups


def axis(chart, group):
    """The value axis a chart group is plotted on (title, fixed bounds, major unit, number format)."""
    ax = next(a for a in chart['axes'] if a['id'] in group['axIds'] and a['kind'] == 'valAx')
    return {
        'pos': 'right' if ax['pos'] == 'r' else 'left',
        'title': ax.get('title'),
        'min': ax.get('min'),
        'max': ax.get('max'),
        'majorUnit': ax.get('majorUnit'),
        'numFmt': ax.get('numFmt'),
    }


def panel(chart):
    out = {'axes': {}, 'series': []}
    for g in chart['groups']:
        ax = axis(chart, g)
        out['axes'][ax['pos']] = ax
        if g['type'] == 'bar':
            out['gapWidth'] = g.get('gapWidth')
        for s in sorted(g['series'], key=lambda s: s['order']):
            ln = s.get('line') or {}
            out['series'].append({
                'name': name(s),
                'type': 'area' if g['type'] == 'area' else g['type'],
                'stack': 'stack' if g.get('grouping') == 'stacked' else None,
                'axis': ax['pos'],
                'color': color(s),
                'width': ln.get('width_pt') if g['type'] == 'line' else None,
                'dash': ln.get('dash') if g['type'] == 'line' else None,
                'values': values(s['val']),
            })
    return out


labels, groups = category_axis(charts[0])
for c in charts[1:]:
    assert category_axis(c)[0] == labels, 'panels must share the category range'
out = {'categories': labels, 'groups': groups, 'panels': [panel(c) for c in charts]}
for p in out['panels']:
    for s in p['series']:
        assert len(s['values']) == len(labels), s['name']
write(FID, out)
