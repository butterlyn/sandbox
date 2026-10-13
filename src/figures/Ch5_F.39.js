// Figure 39 (Ch5_F.39) — Forecast supply-demand balance of flexible capacity, Expected scenario,
// 2027-28 to 2035-36 (MW). Excel: four lines, 2026 solid and 2025 dashed (Flexible RCT purple,
// Expected flexible capacity teal). The y axis fixes only min 2,000; its auto max and step land on
// 5,500 and 500 in the published figure, so both are pinned here.
ESOO.register({
  id: 'Ch5_F.39',
  height: { lg: 440, md: 420, sm: 380 },
  categoryLabel: 'Capacity year',
  option: function (d, t) {
    var fmt = t.fmt.excel('#,##0');
    return {
      grid: { top: 40, right: 16, bottom: 8, left: 8, containLabel: true },
      tooltip: t.tooltipAxis({ format: fmt, unit: 'MW' }),
      xAxis: t.cAxis({ data: d.categories, rotate: t.size === 'sm' ? 45 : 0 }),
      yAxis: t.vAxis({ name: 'Forecast capacity (MW)', min: 2000, max: 5500, interval: 500, format: fmt }),
      series: d.series.map(function (s) {
        var w = t.lw(s.width);
        return {
          name: s.name,
          type: 'line',
          data: s.values,
          lineStyle: { color: t.c(s.color), width: w, type: t.dash(s.dash, w) },
          itemStyle: { color: t.c(s.color) },
          connectNulls: false, // dispBlanksAs = gap
        };
      }),
    };
  },
});
