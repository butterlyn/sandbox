// Figure 27 (Ch3_F.27) — Frequency of Forced Outage exceeding the single, two and three largest
// generators during the peak Intervals, 2020-21 to 2025-26 Hot Seasons (%). Excel: three clustered
// column series (gap width 30, overlap -10, so a small gap between bars), values are fractions in
// 0% format; the y axis is Excel's automatic 0–40% in 5% steps (as in the PDF).
// Bar spacing for n clustered series: barCategoryGap = g / (n + (n - 1) * gap + g) with g = 0.30 and
// gap = 0.10 bar widths -> 0.30 / 3.5 = 8.6% of the category; barGap 10%.
ESOO.register({
  id: 'Ch3_F.27',
  height: { lg: 440, md: 420, sm: 380 },
  table: function (d, t) {
    var pct = t.fmt.excel('0%');
    return {
      columns: ['Hot Season'].concat(d.series.map(function (s) { return s.name; })),
      rows: d.categories.map(function (c, i) {
        return [c].concat(d.series.map(function (s) { return s.values[i]; }));
      }),
      format: function (v) { return pct(v); }, // display only; CSV keeps the sheet's fractions
    };
  },
  option: function (d, t) {
    return {
      tooltip: t.tooltipAxis({ numFmt: '0%', pointer: 'shadow' }),
      xAxis: t.cAxis({ data: d.categories, rotate: t.size === 'sm' ? 45 : 0 }),
      yAxis: t.vAxis({ name: 'Frequency (%)', min: 0, max: 0.4, interval: 0.05, numFmt: '0%' }),
      series: d.series.map(function (s) {
        return {
          name: s.name,
          type: 'bar',
          barGap: '10%', // Excel overlap -10
          barCategoryGap: '8.6%', // Excel gap width 30 with three series
          itemStyle: { color: t.c(s.color) },
          data: s.values,
        };
      }),
    };
  },
});
