// Appendix Figure 9 (A1_F.9) — Distributed batteries capacity under three scenarios of the 2026 WEM ESOO
// split by segment, 2026-27 to 2035-36 (MW). Excel: three separate stacked-column charts (gap width 25),
// titled Low / Expected / High from cells B24, B28 and B32, each with its own "Capacity (MW)" axis fixed at
// 0-3,750 in steps of 750. Here they are three grids in one option: side by side, or one above the other on
// phones. Each panel title is the name of a label-less top category axis, so it stays attached to its grid
// (the page's PNG export replaces option.title). Stack totals equal the 2026 scenarios in Figure 8a.
var A1_F9_HEIGHT = { lg: 440, md: 430, sm: 1000 };
ESOO.register({
  id: 'A1_F.9',
  height: A1_F9_HEIGHT,
  table: function (d) {
    var rows = [];
    d.panels.forEach(function (p) {
      d.categories.forEach(function (c, i) {
        rows.push([p.title, c].concat(p.series.map(function (s) { return s.values[i]; })));
      });
    });
    return {
      columns: ['Scenario', 'Capacity year'].concat(d.panels[0].series.map(function (s) { return s.name; })),
      rows: rows,
      decimals: 1,
    };
  },
  option: function (d, t) {
    var n = d.panels.length;
    var oneColumn = t.size === 'sm';
    var H = A1_F9_HEIGHT[t.size] || A1_F9_HEIGHT.lg;
    var head = 62; // panel title + y-axis title above each plot
    var gap = (d.gapWidth / (100 + d.gapWidth) * 100) + '%';
    var grids = [], xBottom = [], xTop = [], yAxes = [], series = [], panelOf = {};
    d.panels.forEach(function (p, i) {
      if (oneColumn) {
        var ph = H / n;
        grids.push({ left: 8, right: 16, top: Math.round(i * ph + head), height: Math.round(ph - head - 16), containLabel: true });
      } else {
        var pw = t.width / n;
        grids.push({ left: Math.round(i * pw + 8), width: Math.round(pw - 24), top: head, bottom: 8, containLabel: true });
      }
      var xb = t.cAxis({ data: d.categories, rotate: 45 });
      xb.gridIndex = i;
      xb.axisLabel.interval = 0; // Excel shows every year
      if (!oneColumn && t.width / n < 300) xb.axisLabel.fontSize = 11; // narrow panels: keep labels apart
      xBottom.push(xb);
      xTop.push({
        type: 'category',
        gridIndex: i,
        position: 'top',
        data: d.categories,
        name: p.title,
        nameLocation: 'middle',
        nameGap: 40,
        nameTextStyle: { color: t.text, fontSize: 13, fontWeight: 700, fontStyle: 'italic' },
        axisLine: { show: false },
        axisTick: { show: false },
        axisLabel: { show: false },
        splitLine: { show: false },
        axisPointer: { show: false },
        silent: true,
      });
      var ya = t.vAxis({ name: 'Capacity (MW)', min: p.axis.min, max: p.axis.max, interval: p.axis.interval, numFmt: '#,##0' });
      ya.gridIndex = i;
      yAxes.push(ya);
      p.series.forEach(function (s) {
        panelOf[series.length] = p.title;
        series.push({
          name: s.name,
          type: 'bar',
          stack: 'panel' + i,
          xAxisIndex: i,
          yAxisIndex: i,
          barCategoryGap: gap, // Excel gap width 25
          itemStyle: { color: t.c(s.color) },
          data: s.values,
        });
      });
    });
    return {
      grid: grids,
      tooltip: t.tooltipAxis({
        numFmt: '#,##0',
        unit: 'MW',
        reverse: true,
        total: 'Total',
        pointer: 'shadow',
        header: function (p) { return panelOf[p.seriesIndex] + ' · ' + p.axisValueLabel; },
      }),
      xAxis: xBottom.concat(xTop),
      yAxis: yAxes,
      series: series,
    };
  },
});
