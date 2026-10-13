// Figure 25 (Ch3_F.25) — Change in actual (2020-21 to 2025-26) and forecast peak capacity in the 2026
// WEM ESOO Expected scenario (2026-27 to 2027-28), by technology type (MW). Excel (chart24): nine
// stacked column series of year-on-year changes, gap width 30, stack order Other … ESR. Like Excel,
// positive changes stack upwards from zero and negative changes downwards from zero, each in series
// order (ECharts' default 'samesign' stacking). The 'Net change' line (diamond markers) sits on top.
// y axis -600 to 1,400 by 200 as in the published figure; category labels below the plot (Excel's
// 'low' label position). The legend lists the stack top-down, then the line, as Excel's right-hand
// legend does. The sheet's zero-size leftover chart (external #REF! data) is not drawn.
ESOO.register({
  id: 'Ch3_F.25',
  height: { lg: 480, md: 460, sm: 430 },
  categoryLabel: 'Financial year',
  legendItems: function (d, t) {
    var bars = d.series.filter(function (s) { return s.type === 'bar'; }).reverse();
    var lines = d.series.filter(function (s) { return s.type === 'line'; });
    return bars.map(function (s) { return { name: s.name, color: t.c(s.color), shape: 'rect' }; })
      .concat(lines.map(function (s) { return { name: s.name, color: t.c(s.color), shape: 'line' }; }));
  },
  option: function (d, t) {
    var fmt = t.fmt.excel('#,##0');
    var bars = d.series.filter(function (s) { return s.type === 'bar'; });
    var lines = d.series.filter(function (s) { return s.type === 'line'; });
    return {
      grid: { top: 40, right: 16, bottom: 8, left: 8, containLabel: true },
      // readout: the stack top-down (ESR … Other), then the net change; zero changes left out
      tooltip: t.tooltipAxis({ format: t.fmt.excel('#,##0.0'), unit: 'MW', reverse: true, hideZero: true, pointer: 'shadow' }),
      xAxis: t.cAxis({ data: d.categories, rotate: t.size === 'sm' ? 45 : 0 }),
      yAxis: t.vAxis({ name: 'Capacity changed (MW)', min: -600, max: 1400, interval: 200, format: fmt }),
      series: lines.map(function (s) {
        var w = t.lw(s.width);
        return {
          name: s.name,
          type: 'line',
          data: s.values,
          lineStyle: { color: t.c(s.color), width: w },
          itemStyle: { color: t.c(s.color) },
          symbol: t.symbol(s.symbol),
          symbolSize: s.symbolSize * 1.1,
          showSymbol: true,
          z: 3,
        };
      }).concat(bars.map(function (s) {
        return {
          name: s.name,
          type: 'bar',
          stack: 'change', // stackStrategy 'samesign' (default): Excel's separate +/- stacks
          barCategoryGap: '23%', // Excel gap width 30
          itemStyle: { color: t.c(s.color) },
          data: s.values,
        };
      })),
    };
  },
});
