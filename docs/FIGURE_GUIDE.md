# Figure guide

How to recreate one figure from the 2026 WEM ESOO data register as an interactive ECharts chart in this
repo. The worked example is Figure 1: `scripts/prep/ES_F.1.py` and `src/figures/ES_F.1.js`. Read both
before starting.

Paths are relative to the repo root (`/home/user/sandbox`). Figure ids are sheet names without spaces
(`Ch 2_F.7` → `Ch2_F.7`).

## What you produce per figure

| File | Purpose |
|---|---|
| `scripts/prep/<id>.py` | Reads `work/raw/<id>.json`, writes the compact data file. Must be re-runnable: `python3 -I scripts/prep/<id>.py` |
| `src/data/<id>.json` | Only the values the chart needs, rounded with `rnd()` (default 6 significant digits). Written by the prep script, never by hand. |
| `src/figures/<id>.js` | `ESOO.register({...})` module that returns the ECharts option. Plain ES5-style JS like the example; no imports. |

Do **not** edit shared files: `src/lib/common.js`, `src/styles.css`, `scripts/build.py`, `scripts/extract.py`,
`scripts/prep/prep_common.py`, `src/data/meta.json`, other figures' files. Do not run git. If a shared
helper is missing or wrong, work around it inside your own module and say so in your report.

## Inputs for each figure

- `work/raw/<id>.summary.txt`: start here. Figure title, notes, hidden rows/columns, every chart's
  axes/groups/series (resolved colours, line widths in pt, dash presets, markers, data labels,
  references, value previews) and the first sheet rows.
- `work/raw/<id>.json`: everything in full: `grid` (all sheet cell values, row-major from A1,
  dates as ISO strings), `charts[].groups[].series[]` with `cat`/`val`/`x`/`y` refs holding `values`
  (from the sheet) and `cache` (Excel's cached chart values), `hiddenIdx`, `refError`, axes, legend.
- Reference images: the published figure in the report/appendices PDF, `work/ref/pages/<doc>-pNNN.png`
  (path is in the summary). For figures whose chart is a pasted picture in the register, the original
  picture is in `work/ref/pictures/<id>-N.png`. **Look at these** before and after you build.
- Raw chart XML if you need a detail the summary lacks: unzip `data/source/2026-wem-esoo-data-register.xlsx`
  (`xl/charts/chartN.xml`; the chart file name is in the summary) into `work/xml/` and read it there.

`prep_common.py` helpers: `load_raw`, `visible_charts` (drops zero-size leftovers), `series(chart)` (flat list,
each with `s['group']`), `name(s)` (cleaned name), `values(d)` (sheet values, else cache; drops hidden
rows/columns), `color(s)`, `cell(raw,'B24')`, `block(raw,'B23','N29')`, `rnd`, `write(fid, obj)`.

## Fidelity: recreate the Excel chart

The goal is the same chart the register draws, made interactive. Match, in this order:

1. **Data**: every series the Excel chart shows, same values, same categories, same order. Points in
   hidden rows/columns are not plotted (`plotVisOnly`). A `#REF!` or external reference falls back to
   the chart's cached values (`values()` does this). Never invent or smooth data.
2. **Chart type per series**: column/bar, line, area, scatter; clustered vs stacked vs 100% stacked;
   which series are on a secondary axis (group `secondary: true` → `yAxisIndex: 1`).
3. **Colours** from the summary (resolved hex). Always pass them through `t.c(hex)`, which keeps them
   unchanged in light mode and lifts near-black colours in dark mode. Pattern fills (`pattern: pct80`,
   `narVert`, …) → `itemStyle: {color: t.c(fg), decal: t.pattern(prst, bg)}`. `fill: none` series are
   invisible helpers (e.g. a floating-bar base): keep them for geometry, name them starting with `_`
   (hidden from legend, tooltip and table) and give them `itemStyle: {color: 'transparent'}`.
4. **Lines**: width `t.lw(width_pt)`, dash `t.dash(prst, width)`, markers `t.symbol(sym)` and
   `symbolSize ≈ size × 1.1`. `smooth: true` only where Excel smooths.
5. **Axes**: titles verbatim (they carry the units); min/max/majorUnit when Excel fixes them (`t.vAxis({min,
   max, interval})`). When Excel fixes only max (or only min), it steps ticks from that bound, so check the
   reference image for where the other end landed (Figure 1: max 7,500, step 1,000 → min −3,500). Number
   format from `numFmt` via `t.fmt.excel(code)`. Reversed axes, log axes, crossing points: as in Excel.
6. **Bars**: Excel `gapWidth` g → `barCategoryGap: (g / (100 + g) * 100) + '%'`; stacked groups need
   `stack: '<group>'` and overlap 100. Clustered `overlap` → `barGap` (`-overlap%`).
7. **Data labels** where Excel shows them (`dLbls showVal`), with the same number format, in text colours
   (never series colours). Use `t.label({...})` or a `label` block like the example.
8. **Legend**: the HTML legend above the chart is built automatically from the series names (deduplicated,
   in series order). Match Excel's set and order of entries: deleted legend entries (`deletedEntries`
   are legend indices, which normally follow series `idx`) and helper series get `legendHidden: true` or
   a `_` name; use `legendOrder: [...]` or `legendItems(d, t)` to reorder or relabel. Stacked charts
   usually list the stack top-down.
9. **Text**: series names via `name(s)` (tidies `_` separators to ` – ` and stray spaces). Keep the
   register's wording; don't rewrite labels.

The page shows the figure number, title and notes from `meta.json`, so don't put a title inside the chart.

### Deliberate departures (keep these consistent across all figures)

- Legend sits above the plot (HTML, wraps on phones), not on the right.
- Y-axis titles read horizontally above the axis (`t.vAxis` does this; right axis right-aligned).
- Category labels are horizontal on wide screens; rotate (45°) only when they would collide, usually
  `rotate: t.size === 'sm' ? 45 : 0`.
- Line widths are slightly thinner than Excel's (handled by `t.lw`).
- 3-D effects, shadows and gradient fills are flattened to their main colour.

### Figures whose register chart is a picture (`kind=picture-data`)

Rebuild the chart from the sheet's data table, using the picture in `work/ref/pictures/` as the design
reference (chart type, colours, axis ranges, annotations, panel layout). Where the picture is a statistic
of the data (boxplots, distributions, rankings), compute it in the prep script and say in the module
comment exactly what was computed (for example whisker definition). Small multiples and insets are
several ECharts `grid`s in one option. Reproduce reference lines (e.g. a reliability standard) with
`t.markLine`. Skip purely decorative callouts unless they carry information.

## Interaction (required)

- Tooltip on every chart. Category/time charts: `tooltip: t.tooltipAxis({format, unit, reverse, total})`
  (one readout listing every series at the hovered x; `reverse: true` for stacks so the list reads
  top-down; `total: 'Total'` when a stack total is meaningful). Scatter, bubble, box: `t.tooltipItem({title,
  lines})`.
- Long time series (hundreds of points or more): `dataZoom: t.zoom()`; the page adds a Reset zoom button.
  Line series over ~2,000 points: `sampling: 'lttb'`, `showSymbol: false`.
- Legend toggling, data table, CSV and PNG are provided by the page. If the derived table (category ×
  series from `xAxis.data`) would be wrong or unhelpful (scatter, boxplots, small multiples, duplicate
  names), provide `table(d, t)` returning `{columns, rows, note?, decimals?}` with raw numbers.
  `categoryLabel: 'Capacity year'` names the first column of a derived table.

## Module reference

```js
ESOO.register({
  id: 'Ch2_F.7',
  height: 460,                       // or {lg: 480, md: 460, sm: 400}; tall small multiples may need 640+
  categoryLabel: 'Financial year',   // first column of the derived data table
  legendOrder: ['A', 'B'],           // optional
  legendItems: function (d, t) { return [{name, color, shape: 'line'|'rect'|'dot'|'box', dash: true}] },  // optional
  legend: false,                     // optional: no legend (single series)
  table: function (d, t) { return {columns: [...], rows: [[...]]}; },  // optional
  option: function (d, t) { return { grid, tooltip, xAxis, yAxis, series, dataZoom? }; },
  after: function (chart, d, t) {},  // optional, runs after setOption
});
```

`t` (theme helper; re-created on theme or width change):

| Member | Use |
|---|---|
| `t.c(hex)` | theme-adapted series colour, always use for workbook colours |
| `t.text`, `t.text2`, `t.muted`, `t.grid`, `t.axis`, `t.surface`, `t.accent`, `t.line` | chrome colours for labels, annotations, reference lines |
| `t.dark`, `t.width`, `t.size` (`'sm'` <560px, `'md'` <860px, `'lg'`), `t.pick({lg, md, sm})` | responsive choices |
| `t.vAxis({name, min, max, interval, numFmt \| format \| decimals, position: 'right', grid: false, inverse, type: 'log', logBase, scale})` | value axis |
| `t.cAxis({data, name, rotate, interval, format, boundaryGap})` | category axis (`boundaryGap: false` for line/area charts that start at the axis edge like Excel's "on tick marks") |
| `t.tooltipAxis({...})`, `t.tooltipItem({title(p), lines(p) → [[label, value], …]})` | tooltips |
| `t.zoom({xAxisIndex, start, end, slider})` | dataZoom array |
| `t.label({position, numFmt \| format \| decimals})` | data labels |
| `t.markLine({data, color, dash, label})` | reference lines |
| `t.lw(pt)`, `t.dash(prst, w)`, `t.symbol(sym)`, `t.pattern(prst, bg)` | Excel style mapping |
| `t.fmt.excel(code)`, `t.fmt.num(v, dp)`, `t.fmt.pct(v, dp)`, `t.fmt.auto(v)`, `t.fmt.date(iso, 'mmm-yy' \| 'h:mm' \| 'd mmm' …)` | number/date formatting |
| `t.alpha(hex, a)` | translucent colour (area fills) |

Defaults the page applies (don't fight them): transparent background, fonts, axis/grid colours,
tooltip styling, `grid` with `containLabel: true` (left 8, right 16, top 36, bottom 8; leave `top` ≥ 36 so
the y-axis title fits), hidden ECharts legend (the HTML legend drives it), `symbol: 'none'` for lines
unless you set one, overlapping data labels hidden.

## Verify (required, for every figure)

```bash
python3 -I scripts/prep/<id>.py
python3 -I scripts/build.py --only <id> --out work/preview/<id>.html
node scripts/shot.mjs work/preview/<id>.html work/preview/<id>.png --fig <id>                       # light, 1180px
node scripts/shot.mjs work/preview/<id>.html work/preview/<id>-dark.png --fig <id> --theme dark --hover 0.6,0.5
node scripts/shot.mjs work/preview/<id>.html work/preview/<id>-phone.png --fig <id> --width 390
```

`shot.mjs` exits non-zero and prints `PROBLEMS:` on console errors or a chart that failed to render; fix
all of them. Open the PNGs and compare with the reference image side by side: same series, colours,
stacking, axis range and ticks, labels, legend entries. Check the hover tooltip in the dark screenshot
and that nothing overlaps or clips on the phone screenshot. Iterate until it matches. `--table` opens the
data table in the screenshot if you want to check it.

Keep each `src/data/<id>.json` under about 400 KB: round to 4–5 significant digits when a series has
thousands of points, and drop columns the chart doesn't use.

## Lessons from building all 73 charts

- **Display units.** Excel can show a value axis in thousands or millions (`dispUnits` in the summary,
  e.g. GWh sheets on TWh axes). Divide in the prep script and say so in its docstring.
- **Axis ranges.** Where Excel scales an axis automatically, set the range and step it drew in the
  published figure; ECharts' own choice usually differs.
- **Clustered bars.** With n bars per category and gap width g, `barCategoryGap` is
  `g / (100·n + g)` of the category, not `g / (100 + g)`. Excel overlap o → `barGap: (-o) + '%'`.
- **Patterned areas.** Line series with `areaStyle` take their decal from `lineStyle.decal`; also set
  `itemStyle.decal` so the legend key shows the pattern.
- **Hollow markers.** Fill each point with `t.surface` (per data item) rather than the series, so legend,
  tooltip and PNG keys keep the series colour.
- **Dotted and dashed lines.** The page gives dashed lines butt caps, so `t.dash()` patterns work as is.
  If you want round dots, set `cap: 'round'` and shorten each dash / lengthen each gap by the line width.
- **Long axis titles.** ECharts truncates axis names; insert measured line breaks for phones and add
  ~15px of `grid.top` per extra line.
- **LTTB sampling.** The axis tooltip only sees sampled points; for long series build the tooltip from the
  unsampled data.
- **Multi-panel figures.** Several grids in one option with `axisPointer.link`; don't rely on ECharts
  `title` for panel titles (use an axis name or `graphic` text).
- **Tables.** `table()` may return `format(v, colIndex)` for display formatting (CSV keeps raw values) and
  `decimals` (number or per-column array).
- Each module runs in its own function scope in the combined page.

## Report back

End with a short report:

```
<id>: done — <one line: what the chart is, anything notable>
<id>: done with deviations — <what differs from the Excel/PDF figure and why>
Shared runtime issues: <none | what you worked around>
```
