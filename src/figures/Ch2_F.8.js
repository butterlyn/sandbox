// Figure 8 (Ch2_F.8) — Actual and forecast underlying electricity consumption by component,
// Expected scenario, 2019-20 to 2035-36 (TWh). Excel: six stacked columns (gap width 30),
// Residential at the bottom, legend in series order (as in the report). The sheet holds GWh and
// Excel shows the axis in thousands (display units), so the prep script converts to TWh. The
// 0-35 range with steps of 5 is where Excel's automatic scale lands; it is fixed here so the
// browser draws the same range. Tooltip lists the stack top-down with a Total row (the sum of
// all six components, i.e. total underlying consumption).
ESOO.register({
  id: 'Ch2_F.8',
  height: { lg: 480, md: 460, sm: 400 },
  categoryLabel: 'Financial year',
  // the register lists GWh; three decimals in TWh keep its full precision
  table: function (d) {
    return {
      columns: ['Financial year'].concat(d.series.map(function (s) { return s.name; })),
      rows: d.categories.map(function (c, i) {
        return [c].concat(d.series.map(function (s) { return s.values[i]; }));
      }),
      decimals: 3,
      note: 'Values in TWh. The data register lists them in GWh.',
    };
  },
  option: function (d, t) {
    var twh = function (v) { return t.fmt.num(v, 2); };
    // rotate year labels only when they would collide (17 categories)
    var rotate = (t.width - 70) / d.categories.length < 48 ? 45 : 0;
    return {
      tooltip: t.tooltipAxis({ format: twh, unit: 'TWh', reverse: true, total: 'Total underlying consumption' }),
      xAxis: t.cAxis({ data: d.categories, rotate: rotate }),
      yAxis: t.vAxis({ name: 'Underlying consumption (TWh)', min: 0, max: 35, interval: 5, numFmt: '#,##0' }),
      series: d.series.map(function (s) {
        return {
          name: s.name,
          type: 'bar',
          stack: 'components',
          barCategoryGap: '23%', // Excel gap width 30, overlap 100
          itemStyle: { color: t.c(s.color) },
          data: s.values,
        };
      }),
    };
  },
});
