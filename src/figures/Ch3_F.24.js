// Figure 24 (Ch3_F.24) — Forecast flexible capacity by technology type, Expected scenario, 2027-28 to
// 2035-36 (MW). Excel (chart22): nine stacked column series, gap width 30, in plot order Coal (bottom)
// … ESR (top) — Coal, Hydro, Waste and Solar are zero throughout — with the 'Forecast total flexible
// capacity' line (no markers) on top. y axis 0 to 5,000 by 500 as in the published figure. The legend
// lists the stack top-down, then the line, as Excel's right-hand legend does. The sheet's zero-size
// leftover chart (external #REF! data) is not drawn.
ESOO.register({
  id: 'Ch3_F.24',
  height: { lg: 470, md: 450, sm: 420 },
  categoryLabel: 'Financial year',
  legendItems: function (d, t) {
    var bars = d.series.filter(function (s) { return s.type === 'bar'; }).reverse();
    var lines = d.series.filter(function (s) { return s.type === 'line'; });
    return bars.map(function (s) { return { name: s.name, color: t.c(s.color), shape: 'rect' }; })
      .concat(lines.map(function (s) { return { name: s.name, color: t.c(s.color), shape: 'line' }; }));
  },
  option: function (d, t) {
    var fmt = t.fmt.excel('#,##0');
    return {
      grid: { top: 40, right: 16, bottom: 8, left: 8, containLabel: true },
      // stack listed top-down under the total line; all-zero technologies left out of the readout
      tooltip: t.tooltipAxis({ format: fmt, unit: 'MW', reverse: true, hideZero: true, pointer: 'shadow' }),
      xAxis: t.cAxis({ data: d.categories, rotate: t.size === 'sm' ? 45 : 0 }),
      yAxis: t.vAxis({ name: 'Forecast flexible capacity (MW)', min: 0, max: 5000, interval: 500, format: fmt }),
      series: d.series.map(function (s) {
        if (s.type === 'line') {
          var w = t.lw(s.width);
          return {
            name: s.name,
            type: 'line',
            data: s.values,
            lineStyle: { color: t.c(s.color), width: w },
            itemStyle: { color: t.c(s.color) },
            z: 3,
          };
        }
        return {
          name: s.name,
          type: 'bar',
          stack: 'tech',
          barCategoryGap: '23%', // Excel gap width 30
          itemStyle: { color: t.c(s.color) },
          data: s.values,
        };
      }),
    };
  },
});
