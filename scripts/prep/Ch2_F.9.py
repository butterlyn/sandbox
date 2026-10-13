"""Figure 9 (Ch2_F.9): actual and forecast delivered consumption by component, Expected scenario.

Same layout as Figure 8: six stacked column series, 2019-20 to 2035-36. The sheet holds GWh;
Excel's value axis uses display units "thousands" (<c:dispUnits><c:builtInUnit val="thousands"/>
in xl/charts/chart5.xml, not captured by extract.py), so the axis reads 0-30 TWh. Values are
converted to TWh here so the axis, tooltip and data table all match the figure title.
"""
import os
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from prep_common import load_raw, visible_charts, series, name, values, color, cell, write  # noqa: E402

FID = 'Ch2_F.9'
DISP_UNITS = 1000  # GWh -> TWh (Excel display units: thousands)

raw = load_raw(FID)
chart = visible_charts(raw)[0]
ss = sorted(series(chart), key=lambda s: s['order'])
assert all(s['type'] == 'bar' and s['group'].get('grouping') == 'stacked' for s in ss)
assert cell(raw, 'C24') == 'GWh', 'expected the sheet to hold GWh'

out = {'categories': values(ss[0]['cat']), 'unit': 'TWh', 'series': []}
for s in ss:
    out['series'].append({
        'name': name(s),
        'color': color(s),
        'values': [None if v is None else v / DISP_UNITS for v in values(s['val'])],
    })
write(FID, out)
