"""Appendix Figure 23 (A4_F.23): depth of base and tranches, and operational demand estimate, for the
ESR Duration Requirement Uplift calculation (2009-10 weather reference year).

Excel: eight stacked column series (Base at the bottom, then Tranche 7 (6 Hour), Tranche 6 … Tranche 1
on top; each outlined in a dark default-width line) and a line with white-filled circle markers
(Operational demand estimate), over the 48 half-hourly Trading Intervals the chart references
(B24:B71, 08:00 to 07:30 the next day, shown as 'hh:mm'). Two series have no category reference of
their own; all share B24:B71.
"""
import datetime as dt
import os
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from prep_common import load_raw, visible_charts, series, name, values, color, write  # noqa: E402

FID = 'A4_F.23'
raw = load_raw(FID)
chart = visible_charts(raw)[0]
ss = sorted(series(chart), key=lambda s: s['order'])


def hhmm(v):
    """'08:00:00' (time) or '1900-01-01T00:30:00' / '1900-01-01' (day 1 + time) -> 'hh:mm'."""
    v = str(v)
    if len(v) >= 10 and v[4] == '-':
        return dt.datetime.fromisoformat(v).strftime('%H:%M')
    return v[:5]


cat_src = next(s for s in ss if s.get('cat'))['cat']
assert cat_src['ref'].endswith('$B$24:$B$71'), cat_src['ref']
categories = [hhmm(v) for v in values(cat_src)]
assert len(categories) == 48 and len(set(categories)) == 48, categories
out = {'categories': categories, 'series': []}
for s in ss:
    ln = s.get('line') or {}
    item = {'name': name(s), 'type': s['type'], 'color': color(s), 'values': values(s['val'])}
    assert len(item['values']) == 48
    if s['type'] == 'bar':
        # outline: Excel's default line width is 0.75pt when none is given
        item['border'] = ln.get('color')
        item['borderWidth'] = ln.get('width_pt') or 0.75
    else:
        mk = s.get('marker') or {}
        item.update({
            'width': ln.get('width_pt'),
            'dash': ln.get('dash'),
            'marker': mk.get('symbol'),
            'markerSize': mk.get('size'),
            'markerFill': (mk.get('fill') or {}).get('hex'),
            'markerLine': (mk.get('line') or {}).get('color'),
            'markerLineWidth': (mk.get('line') or {}).get('width_pt'),
        })
    out['series'].append(item)
write(FID, out)
