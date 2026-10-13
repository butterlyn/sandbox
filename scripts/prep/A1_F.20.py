"""Appendix Figure 20 (A1_F.20): illustration of the approach to modelling the impact of the virtual
power plant on peak demand (half-hourly, MW).

The sheet holds two native charts that together make the figure, each with a left (demand) and a
right (charging/discharging) value axis. They become two stacked panels, ordered top to bottom by
their anchor row on the sheet:
  top    chart64.xml: whole day C37:C84 (48 intervals). Columns 'VPP-capable capacity (passive
         operation)' (F, right axis) and lines 'Pre-VPP demand' (E) and 'Adjusted demand (peak
         periods in summer)' (G) on the left axis.
  bottom chart63.xml: evening only C65:C84 (14:00-23:30, 20 intervals). Stacked columns (J, K) and
         'Passive operation (pre-VPP modelling)' (L) on the right axis; 'Adjusted demand' (H) and
         'Post-VPP demand' (I) on the left axis.
The bottom panel's categories are a slice of the top panel's; 'start' records where it begins.
Each group's axis side comes from the axis it is drawn on (axPos l/r), as Excel renders it.
"""
import os
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from prep_common import load_raw, visible_charts, series, name, values, color, write  # noqa: E402

FID = 'A1_F.20'
raw = load_raw(FID)
charts = sorted(visible_charts(raw), key=lambda c: c['anchor']['from'][1])


def hhmm(iso):
    """'2026-03-16' (midnight) / '2026-03-16T14:30:00' -> '00:00' / '14:30' (axis format hh:mm)."""
    return iso[11:16] if len(iso) > 10 else '00:00'


def categories(chart):
    cat = next(s['cat'] for s in series(chart) if s.get('cat'))
    return [hhmm(v) for v in values(cat)]


def axis(chart, group):
    """The value axis a chart group is plotted on (side, title, fixed bounds, major unit, format)."""
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
                'type': g['type'],
                'stack': 'stack' if g.get('grouping') == 'stacked' else None,
                'axis': ax['pos'],
                'color': color(s),
                'width': ln.get('width_pt') if g['type'] == 'line' else None,
                'dash': ln.get('dash') if g['type'] == 'line' else None,
                # sheet column, for the data table's column order
                'col': s['val']['ref'].split('!')[1].split(':')[0].replace('$', '').rstrip('0123456789'),
                'values': values(s['val']),
            })
    return out


cats = categories(charts[0])
out = {'categories': cats, 'panels': []}
for c in charts:
    p = panel(c)
    own = categories(c)
    start = next(i for i in range(len(cats)) if cats[i:i + len(own)] == own)
    p['start'] = start
    for s in p['series']:
        assert len(s['values']) == len(own), s['name']
    out['panels'].append(p)
write(FID, out)
