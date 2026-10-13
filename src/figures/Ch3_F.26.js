// Figure 26 (Ch3_F.26) — Peak Capacity Credits for 2027-28, by Facility age and technology type,
// as of 7 May 2026, Expected scenario (MW). Excel: stacked columns (gap width 30) over eight age
// bands, oldest first; nine technologies in plot order Coal (bottom) … ESR (top); y axis fixed at
// 0–2,400 in 400 steps. The legend lists the stack top-down, as Excel's right-hand legend does.
ESOO.register({
  id: 'Ch3_F.26',
  height: { lg: 480, md: 460, sm: 420 },
  // same rows/columns as the derived table, but one decimal throughout (values go down to 0.425 MW)
  table: function (d) {
    return {
      columns: ['Generator age (years)'].concat(d.series.map(function (s) { return s.name; })),
      rows: d.categories.map(function (c, i) {
        return [c].concat(d.series.map(function (s) { return s.values[i]; }));
      }),
      decimals: 1,
    };
  },
  legendItems: function (d, t) {
    return d.series.slice().reverse().map(function (s) {
      return { name: s.name, color: t.c(s.color), shape: 'rect' };
    });
  },
  option: function (d, t) {
    var fmt = t.fmt.excel('#,##0');
    return {
      grid: { top: 40, right: 16, bottom: 34, left: 8, containLabel: true },
      // one decimal in the readout so the small Waste/Hydro slices do not read as 0
      tooltip: t.tooltipAxis({ format: t.fmt.excel('#,##0.0'), unit: 'MW', reverse: true, hideZero: true, total: 'Total', pointer: 'shadow' }),
      xAxis: t.cAxis({ data: d.categories, name: 'Generator age (years)', rotate: t.size === 'sm' ? 45 : 0, nameGap: t.size === 'sm' ? 44 : 30 }),
      yAxis: t.vAxis({ name: 'Capacity Credits (MW)', min: 0, max: 2400, interval: 400, format: fmt }),
      series: d.series.map(function (s) {
        return {
          name: s.name,
          type: 'bar',
          stack: 'age',
          barCategoryGap: '23%', // Excel gap width 30
          itemStyle: { color: t.c(s.color) },
          data: s.values,
        };
      }),
    };
  },
});
