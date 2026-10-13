"""Figure 19c (A1_F.19c): data centre forecast methodology, economic based approach, 2026 WEM ESOO.

Second panel of the Figure 19 methodology diagram. One line chart, four series in Excel's plot/legend
order: Actual, Economic Low, Economic Expected, Economic High (solid lines, filled diamond markers).
No hidden rows or columns; blanks are gaps. Excel fixes the axis maximum at 1,800 GWh (1.8 TWh).

Units: the sheet holds GWh (column C), but the chart's value axis has display units of thousands
(<c:dispUnits><c:builtInUnit val="thousands"/></c:dispUnits> in chart61.xml, with no unit label; the
extractor does not record it), so the register's chart reads in TWh, like its axis title. Values are
converted to TWh here so the axis, tooltip and data table all show the plotted unit.
"""
import os
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from prep_common import load_raw, visible_charts, series, name, values, color, cell, write  # noqa: E402

FID = 'A1_F.19c'
DISP_UNITS = 1000  # valAx builtInUnit="thousands": GWh on the sheet -> TWh on the axis

raw = load_raw(FID)
chart = visible_charts(raw)[0]
ss = sorted(series(chart), key=lambda s: s['order'])
vax = next(a for a in chart['axes'] if a['kind'] == 'valAx')
assert cell(raw, 'C24') == 'GWh' and 'TWh' in vax['title'], 'unit check failed'


def twh(vals):
    return [None if v is None else v / DISP_UNITS for v in vals]


def marker(s):
    mk = s.get('marker') or {}
    fill = mk.get('fill') or {}
    ln = mk.get('line') or {}
    return {
        'symbol': mk.get('symbol'),
        'size': mk.get('size'),
        'fill': fill.get('hex'),
        'hollow': fill.get('scheme') == 'bg1',  # filled with the chart background: an open marker
        'border': ln.get('color'),
    }


out = {
    'categories': values(ss[0]['cat']),
    'yTitle': vax['title'],
    'numFmt': vax['numFmt'],
    'series': [],
}
if vax.get('max') is not None:
    out['yMax'] = vax['max'] / DISP_UNITS
for s in ss:
    ln = s.get('line') or {}
    out['series'].append({
        'name': name(s),
        'color': color(s),
        'width': ln.get('width_pt'),
        'dash': ln.get('dash'),
        'marker': marker(s),
        'values': twh(values(s['val'])),
    })
write(FID, out)
