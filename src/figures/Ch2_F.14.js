// Figure 14 (Ch2_F.14) — Modelled reduction of SWIS annual peak unscheduled operational demand due
// to the virtual power plant, 10% POE Expected scenario, 2026-27 to 2035-36 (MW). Excel: one
// clustered column series (Impact, gap width 30, value labels at the bar ends) under two lines with
// diamond markers in #A3519B: before VPP, and after VPP drawn at 70% line and 50% marker opacity.
// Value axis fixed at min -1,500 with steps of 1,000 (Excel lands on max 7,500). The category axis
// crosses at zero (drawn as the zero line) while its labels sit at the bottom ("low"), so there is
// no axis line at -1,500, only the gridline. Legend in Excel's order (column group first). Tooltip
// lists before VPP, after VPP and the impact (ordered by value, which is always that order here).
ESOO.register({
  id: 'Ch2_F.14',
  height: { lg: 480, md: 460, sm: 420 },
  categoryLabel: 'Financial year',
  // one decimal throughout, the precision of the register's values
  table: function (d) {
    return {
      columns: ['Financial year'].concat(d.series.map(function (s) { return s.name; })),
      rows: d.categories.map(function (c, i) {
        return [c].concat(d.series.map(function (s) { return s.values[i]; }));
      }),
      decimals: 1,
      note: 'Values in MW.',
    };
  },
  option: function (d, t) {
    var fmt = t.fmt.excel('#,##0');
    var rotate = (t.width - 70) / d.categories.length < 48 ? 45 : 0;
    var series = d.series.map(function (s) {
      if (s.type === 'bar') {
        return {
          name: s.name,
          type: 'bar',
          barCategoryGap: '23%', // Excel gap width 30
          itemStyle: { color: t.c(s.color) },
          // value labels outside the bar end: below these negative bars
          data: s.values.map(function (v) { return { value: v, label: { position: v < 0 ? 'bottom' : 'top' } }; }),
          label: { show: s.labels, color: t.text2, fontSize: 11, formatter: function (p) { return fmt(p.value); } },
          // the category axis line, which Excel draws at zero
          markLine: {
            silent: true,
            symbol: 'none',
            label: { show: false },
            emphasis: { disabled: true },
            lineStyle: { color: t.axis, width: 1, type: 'solid' },
            data: [{ yAxis: 0 }],
          },
          z: 1,
        };
      }
      var w = t.lw(s.width);
      var c = t.c(s.color);
      var mk = s.markerAlpha < 1 ? t.alpha(c, s.markerAlpha) : c;
      return {
        name: s.name,
        type: 'line',
        data: s.values,
        symbol: t.symbol(s.marker),
        symbolSize: s.markerSize * 1.1,
        showSymbol: true,
        lineStyle: { color: s.alpha < 1 ? t.alpha(c, s.alpha) : c, width: w, type: t.dash(s.dash, w) },
        itemStyle: { color: mk, borderColor: mk, borderWidth: 0.75 },
        z: 3,
      };
    });
    var xAxis = t.cAxis({ data: d.categories, rotate: rotate });
    xAxis.axisLine.show = false; // labels "low"; the zero line above stands in for the axis line
    return {
      tooltip: t.tooltipAxis({ format: fmt, unit: 'MW', sortByValue: true }),
      xAxis: xAxis,
      yAxis: t.vAxis({ name: 'Demand (MW)', min: -1500, max: 7500, interval: 1000, numFmt: '#,##0' }),
      series: series,
    };
  },
});
