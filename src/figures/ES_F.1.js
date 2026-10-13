// Figure 1 (ES_F.1) — Forecast supply-demand balance of forecast peak capacity, Expected and High
// scenarios, 2026-27 to 2035-36 (MW). Excel: clustered columns (surplus/shortfall, value labels at
// the bar ends) behind five lines; y axis fixed at max 7,500 with 1,000 steps (Excel lands on -3,500).
ESOO.register({
  id: 'ES_F.1',
  height: { lg: 480, md: 460, sm: 420 },
  categoryLabel: 'Capacity year',
  option: function (d, t) {
    var fmt = t.fmt.excel('#,##0');
    var bars = d.series.filter(function (s) { return s.type === 'bar'; });
    var lines = d.series.filter(function (s) { return s.type === 'line'; });
    var series = bars.map(function (s) {
      return {
        name: s.name,
        type: 'bar',
        barCategoryGap: '23%', // Excel gap width 30
        itemStyle: { color: t.c(s.color) },
        data: s.values.map(function (v) {
          // value labels sit outside the bar end: above positive bars, below negative ones
          return { value: v, label: { position: v < 0 ? 'bottom' : 'top' } };
        }),
        label: { show: true, color: t.text2, fontSize: 11, formatter: function (p) { return fmt(p.value); } },
        z: 1,
      };
    }).concat(lines.map(function (s) {
      var w = t.lw(s.width);
      return {
        name: s.name,
        type: 'line',
        data: s.values,
        lineStyle: { color: t.c(s.color), width: w, type: t.dash(s.dash, w) },
        itemStyle: { color: t.c(s.color) },
        connectNulls: false, // dispBlanksAs = gap
        z: 3,
      };
    }));
    return {
      grid: { top: 40, right: 16, bottom: 8, left: 8, containLabel: true },
      tooltip: t.tooltipAxis({ format: fmt, unit: 'MW' }),
      xAxis: t.cAxis({ data: d.categories, rotate: t.size === 'sm' ? 45 : 0 }),
      yAxis: t.vAxis({ name: 'Forecast peak capacity (MW)', min: -3500, max: 7500, interval: 1000, format: fmt }),
      series: series,
    };
  },
});
