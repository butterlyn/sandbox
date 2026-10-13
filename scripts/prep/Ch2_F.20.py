"""Figure 20 (Ch2_F.20): minimum operational demand forecast and committed ESR entry, 90% POE.

Excel combo chart (chart18.xml), all series picked by their series idx:
  primary stacked areas: row 40 operational demand (D:W, grey), row 41 PV and PVNSG (D:V, actuals),
    row 46 PV (D:W, forecast) -- the column-W point is an unlabeled 20th category that only extends
    the areas past the last bar;
  secondary standard areas: row 50 management minimum (550 MW), row 48 technical envelope (300 MW),
    row 61 (-500 MW helper, zero height in Excel's rendering because the areas fill down to the
    axis minimum);
  primary stacked columns: invisible base row 45 (forecast demand) + ESR row 55 for 2025-26 to
    2030-31; for 2031-32 to 2035-36 Excel uses the 'Construction' rows 59 (the negative demand part)
    and 60 (ESR + demand) instead, which spans exactly row 45 .. row 45 + row 55;
  secondary stacked columns: invisible base row 45 + NCESS row 53 (2025-26 only, wdDnDiag pattern);
  lines: row 40 actuals (D:K) and row 45 forecast (D:V).
The module draws each ESR bar as one floating segment (base row 45, height row 55), so the
data file carries the register's ESR row for every forecast year.
"""
import os
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from prep_common import load_raw, visible_charts, series, name, values, color, block, write  # noqa: E402

FID = 'Ch2_F.20'
raw = load_raw(FID)
chart = visible_charts(raw)[0]
by_idx = {s['idx']: s for s in series(chart)}
N = 20  # D:W -- the longest series in the chart (19 labelled years + the unlabeled column W)


def pad(v):
    v = list(v)
    return v + [None] * (N - len(v))


def row(r):
    """Sheet row r, columns D:W (20 values), straight from the grid."""
    return pad(block(raw, f'D{r}', f'W{r}')[0])


categories = values(by_idx[1]['cat'])
assert len(categories) == 19 and categories[0] == '2017-18' and categories[-1] == '2035-36'


def fill(s):
    f = s.get('fill') or {}
    return {'color': f.get('hex'), 'alpha': f.get('alpha', 1)}


def line(s):
    ln = s.get('line') or {}
    mk = s.get('marker') or {}
    return {'name': name(s), 'color': color(s), 'width': ln.get('width_pt'), 'dash': ln.get('dash'),
            'symbol': mk.get('symbol'), 'symbolSize': mk.get('size')}


# check the chart still points where this script expects
assert by_idx[4]['val']['ref'].endswith('$D$45:$Q$45') and by_idx[9]['val']['ref'].endswith('$D$55:$Q$55')
assert by_idx[10]['val']['ref'].endswith('$D$59:$V$59') and by_idx[11]['val']['ref'].endswith('$D$60:$V$60')
esr = row(55)
base = row(45)
# the 2031-32+ construction rows reproduce the same bar span: row 59 = row 45, row 60 = row 45 + row 55
for i in range(14, 19):
    assert abs(values(by_idx[10]['val'])[i] - base[i]) < 1e-6
    assert abs(values(by_idx[11]['val'])[i] - (base[i] + esr[i])) < 1e-3

out = {
    'categories': categories,
    'n': N,
    'areas': [  # primary stacked areas, plot order (bottom first)
        dict(name=name(by_idx[1]), values=pad(values(by_idx[1]['val'])), **fill(by_idx[1])),
        dict(name=name(by_idx[2]), values=pad(values(by_idx[2]['val'])), **fill(by_idx[2])),
        dict(name=name(by_idx[5]), values=pad(values(by_idx[5]['val'])), **fill(by_idx[5])),
    ],
    'bands': [  # secondary standard areas, plot order (row 61's -500 helper has zero height: dropped)
        dict(name=name(by_idx[7]), values=pad(values(by_idx[7]['val'])), **fill(by_idx[7])),
        dict(name=name(by_idx[6]), values=pad(values(by_idx[6]['val'])), **fill(by_idx[6])),
    ],
    'esr': dict(name=name(by_idx[9]), base=pad(base[:19]), values=pad(esr[:19]), **fill(by_idx[9])),
    'ncess': dict(name=name(by_idx[13]), base=pad(values(by_idx[8]['val'])), values=pad(values(by_idx[13]['val'])),
                  color=by_idx[13]['fill']['hex'], pattern=by_idx[13]['fill'].get('pattern'),
                  patternBg=by_idx[13]['fill'].get('bg')),
    'lines': [
        dict(values=pad(values(by_idx[0]['val'])), **line(by_idx[0])),
        dict(values=pad(values(by_idx[3]['val'])), **line(by_idx[3])),
    ],
}
write(FID, out)
