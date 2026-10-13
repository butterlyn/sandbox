# 2026 WEM ESOO figures

Interactive versions of every figure in the data register of AEMO's 2026 Wholesale Electricity Market
Electricity Statement of Opportunities (WEM ESOO), version 2 of 15 July 2026, combined into one static
HTML page:

**[`dist/wem-esoo-2026-figures.html`](dist/wem-esoo-2026-figures.html)**: download it and open it in a browser.
It works offline: the chart library, data and images are inside the file. Web fonts load when online and
fall back to system fonts otherwise.

| Figures in the register | 85 |
|---|---|
| Native Excel charts, recreated from the chart definitions | 61 sheets (68 chart objects) |
| Charts the register holds as pasted pictures, rebuilt from the data on the same sheet | 12 |
| Diagrams and maps with no data, shown as the original images | 12 |

On the page you can hover any chart for exact values, click legend entries to hide a series or
double-click to isolate it, open the data behind each chart, copy or download it as CSV, download a PNG,
zoom long time series, filter figures by text, and switch between light and dark themes. A Patterns
toggle adds texture fills so series can be told apart without colour.

## How the charts are made

1. `scripts/extract.py` reads the workbook: every sheet's cell values, hidden rows and columns, and each
   chart's DrawingML XML (series references resolved against the sheet with Excel's cached values as a
   fallback, theme colours and modifiers resolved to hex, pattern fills, line widths and dashes, markers,
   data labels, axes with bounds, units, number formats and display units, legend entries).
2. `scripts/make_meta.py` writes `src/data/meta.json` (figure numbers, titles, notes, sections) and
   WebP copies of the diagram images.
3. `scripts/prep/<id>.py` turns one figure's extraction into the compact data file `src/data/<id>.json`.
4. `src/figures/<id>.js` maps that data to an [Apache ECharts](https://echarts.apache.org/) option,
   following the Excel chart: series types, stacking, colours, line styles, axis ranges and formats.
   The shared runtime is `src/lib/common.js`; the guide for writing a figure is
   [`docs/FIGURE_GUIDE.md`](docs/FIGURE_GUIDE.md).
5. `scripts/build.py` assembles the page with ECharts 5.6.0 inlined.

Rebuild everything from the workbook in `data/source/` (Python 3 with openpyxl and Pillow; Node 18+ and
Playwright for the QA step):

```bash
scripts/rebuild.sh          # extract, prep, build -> dist/wem-esoo-2026-figures.html
scripts/rebuild.sh --qa     # also screenshot every figure (light, dark, phone) into work/qa/
```

Preview one figure while working on it:

```bash
python3 -I scripts/build.py --only Ch2_F.7 --out work/preview/Ch2_F.7.html
node scripts/shot.mjs work/preview/Ch2_F.7.html work/preview/Ch2_F.7.png --fig Ch2_F.7
```

## Differences from the workbook

- Legends sit above each chart and wrap on narrow screens, instead of to the right.
- Value-axis titles read horizontally above the axis; category labels rotate only when they would collide.
- Where Excel scaled an axis automatically, the range and step are fixed to what Excel drew in the
  published figure, so hiding a series doesn't rescale the chart.
- Series names have the register's `_` separators shown as ` – `.
- Values come from the sheet cells (which include the version 2 corrections); Excel's cached chart values
  are used only where a chart reference is broken (`#REF!`).
- Pictures rebuilt from data compute their statistics (box plots, rankings, categories) from the sheet in
  the figure's prep script; each module's header comment says how.

## Sources

- Data register: <https://www.aemo.com.au/-/media/files/electricity/wem/planning_and_forecasting/esoo/2026/2026-wem-esoo-data-register.xlsx>
- Report: <https://www.aemo.com.au/-/media/files/electricity/wem/planning_and_forecasting/esoo/2026/2026-wem-electricity-statement-of-opportunities.pdf>
- Appendices: <https://www.aemo.com.au/-/media/files/electricity/wem/planning_and_forecasting/esoo/2026/2026-wem-esoo-appendices.pdf>

The data, figure titles, notes and diagram images are © AEMO 2026. ECharts is Apache-2.0 licensed
(`vendor/ECHARTS-LICENSE`).
