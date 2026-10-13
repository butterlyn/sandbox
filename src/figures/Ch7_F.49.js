// Figure 49 (Ch7_F.49) — Reserve Capacity Price, Benchmark Reserve Capacity Price and capacity
// excess/deficit, 2017-18 to 2028-29. Excel: green columns (Excess capacity, MW) on the right-hand axis
// (max 1,000; Excel lands on -1,000 with 200 steps) behind three price lines with diamond markers on
// the left-hand axis ($ per MW per year, $0 to $500,000 in $50,000 steps). Both axes have ten
// intervals, so their gridlines coincide (only the left axis draws them, as in Excel). The tooltip
// formats each series in its own unit: prices to the cent as in the register ("$"#,##0.00), the
// excess/deficit in whole MW.
ESOO.register({
  id: 'Ch7_F.49',
  height: { lg: 480, md: 460, sm: 440 },
  categoryLabel: 'Capacity year',
  option: function (d, t) {
    var fmtMW = t.fmt.excel('#,##0');
    var fmts = {};
    d.series.forEach(function (s) {
      var f = t.fmt.excel(s.numFmt);
      fmts[s.name] = s.axis === 'r'
        ? function (v) { return fmtMW(v) + ' MW'; }
        : function (v) { return f(v) + '/MW/year'; };
    });
    var series = d.series.map(function (s) {
      var yi = s.axis === 'r' ? 1 : 0;
      if (s.type === 'bar') {
        return {
          name: s.name,
          type: 'bar',
          yAxisIndex: yi,
          data: s.values,
          barCategoryGap: '23%', // Excel gap width 30
          itemStyle: { color: t.c(s.color) },
          z: 1,
        };
      }
      var w = t.lw(s.width);
      return {
        name: s.name,
        type: 'line',
        yAxisIndex: yi,
        data: s.values,
        lineStyle: { color: t.c(s.color), width: w, type: t.dash(s.dash, w) },
        itemStyle: { color: t.c(s.color) },
        symbol: s.marker ? t.symbol(s.marker.symbol) : 'none',
        symbolSize: s.marker ? s.marker.size * 1.1 : 0,
        connectNulls: false, // dispBlanksAs = gap
        z: 3,
      };
    });
    var right = t.vAxis({
      name: 'Capacity excess/deficit (MW)', position: 'right', min: -1000, max: 1000, interval: 200,
      numFmt: '#,##0', grid: false,
    });
    // on phones the two axis titles would collide: lift the right-hand one a row above the left
    var sm = t.size === 'sm';
    if (sm) right.nameGap = 32;
    return {
      grid: { top: sm ? 58 : 40, right: 16, bottom: 8, left: 8, containLabel: true },
      tooltip: t.tooltipAxis({
        format: function (v, name) { return (fmts[name] || fmtMW)(v); },
      }),
      xAxis: t.cAxis({ data: d.categories, rotate: sm ? 45 : 0 }),
      yAxis: [
        t.vAxis({ name: '$ per MW per year', min: 0, max: 500000, interval: 50000, numFmt: '"$"#,##0' }),
        right,
      ],
      series: series,
    };
  },
  // derived table would drop the units, which differ by column
  table: function (d) {
    return {
      columns: ['Capacity year'].concat(d.series.map(function (s) {
        return s.name + (s.axis === 'r' ? ' (MW)' : ' ($ per MW per year)');
      })),
      rows: d.categories.map(function (c, i) {
        return [c].concat(d.series.map(function (s) { return s.values[i]; }));
      }),
      decimals: [null].concat(d.series.map(function (s) { return s.axis === 'r' ? 0 : 2; })),
    };
  },
});
