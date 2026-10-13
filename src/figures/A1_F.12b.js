// Figure 12b (A1_F.12b) — Household electricity consumption response to temperature, 2020-21 to 2024-25
// (kWh). Top-left panel of Appendix Figure 12. Excel scatter chart: five fitted model lines (x = 1…40 °C,
// straight segments, no markers, default 2.25 pt width) and five years of daily data points (circle
// size 4, fill at 20% opacity, no outline). Axes fixed in Excel: x 8–32 step 2; y 10–25 with an automatic
// step of 2, so Excel labels 10…24 and draws no gridline at the top (25). Points and line segments
// outside that range are clipped, as in Excel. The model lines are drawn above the 20%-opacity points (Excel
// draws them first) and get invisible markers at each whole degree so hovering them shows the modelled
// value; the tooltip of a data point adds its date (sheet column J).
(function () {
  /** ISO date plus n days (UTC, so daylight saving never shifts the day). */
  function addDays(iso, n) {
    var p = iso.split('-');
    return new Date(Date.UTC(+p[0], +p[1] - 1, +p[2] + n)).toISOString().slice(0, 10);
  }

  /** Width in px of a text in the chart font (weight 400 or 600, 12px). */
  function textW(t, s, weight) {
    var ctx = textW.ctx || (textW.ctx = document.createElement('canvas').getContext('2d'));
    ctx.font = (weight || 400) + ' 12px ' + t.font;
    return ctx.measureText(s).width;
  }

  /** Width of the widest tick label of a value axis built by t.vAxis (its min and max). */
  function labelW(t, axis) {
    return Math.max(textW(t, axis.axisLabel.formatter(axis.min)), textW(t, axis.axisLabel.formatter(axis.max)));
  }

  /**
   * Wrap the y-axis title onto several lines when it is wider than the space right of the axis (ECharts
   * truncates axis names instead of wrapping them); returns the grid top that leaves room for it.
   */
  function fitTitle(t, axis) {
    var avail = t.width - 20 - labelW(t, axis); // the title starts 4px left of the axis line, right of the labels
    var lines = [], cur = '';
    axis.name.split(' ').forEach(function (w) {
      var next = cur ? cur + ' ' + w : w;
      if (cur && textW(t, next, 600) > avail) { lines.push(cur); cur = w; } else cur = next;
    });
    lines.push(cur);
    axis.name = lines.join('\n');
    axis.nameTextStyle.lineHeight = 15;
    return 40 + 15 * (lines.length - 1);
  }

  /** Value x axis styled like the page's category axes: title centred below, no vertical gridlines. */
  function xAxis(t, o) {
    var ax = t.vAxis({ min: o.min, max: o.max, interval: o.interval, format: o.format, grid: false });
    ax.position = 'bottom';
    ax.name = o.name;
    ax.nameLocation = 'middle';
    ax.nameGap = 30;
    ax.nameTextStyle = { color: t.text2, fontSize: 12, fontWeight: 600 };
    ax.axisLine = { show: true, onZero: false, lineStyle: { color: t.axis } };
    return ax;
  }

  ESOO.register({
    id: 'A1_F.12b',
    height: { lg: 460, md: 440, sm: 400 },
    option: function (d, t) {
      var nModels = d.models.length;
      var models = d.models.map(function (s) {
        var w = t.lw(s.width);
        var c = t.c(s.color);
        return {
          name: s.name,
          type: 'line',
          // markers are hover targets only: transparent per point (a series-level opacity would also
          // hide the key in the exported PNG legend) and shown while hovered
          data: s.x.map(function (x, i) { return { value: [x, s.y[i]], itemStyle: { opacity: 0 } }; }),
          lineStyle: { color: c, width: w, type: t.dash(s.dash, w) },
          symbol: 'circle',
          symbolSize: 7,
          showSymbol: true,
          itemStyle: { color: c },
          emphasis: { focus: 'none', scale: false, itemStyle: { opacity: 1 } },
          z: 3,
        };
      });
      var points = d.data.map(function (s) {
        return {
          name: s.name,
          type: 'scatter',
          data: s.points,
          symbol: t.symbol(s.symbol),
          symbolSize: s.size * 1.1,
          itemStyle: { color: t.c(s.color), opacity: s.alpha },
          emphasis: { focus: 'none', scale: 1.8, itemStyle: { opacity: 1 } },
          z: 2,
        };
      });
      var y = t.vAxis({ name: d.yTitle, min: 10, max: 25, interval: 2, numFmt: '#,##0' });
      y.axisLabel.showMaxLabel = false; // 25 is the axis end, not a major unit
      y.splitLine.showMaxLine = false;
      return {
        grid: { top: fitTitle(t, y), right: 18, bottom: 34, left: 8, containLabel: true },
        tooltip: t.tooltipItem({
          title: function (p) { return p.seriesName; },
          lines: function (p) {
            var v = p.value;
            var isData = p.seriesIndex >= nModels;
            var rows = [];
            if (isData) rows.push(['Date', t.fmt.date(addDays(d.data[p.seriesIndex - nModels].start, p.dataIndex), 'd mmm yyyy')]);
            rows.push(['Average daily temperature', t.fmt.num(v[0], isData ? 1 : 0) + ' °C']);
            rows.push([isData ? 'Underlying consumption' : 'Modelled consumption', t.fmt.num(v[1], 2) + ' kWh']);
            return rows;
          },
        }),
        xAxis: xAxis(t, { name: d.xTitle, min: 8, max: 32, interval: 2 }),
        yAxis: y,
        series: models.concat(points),
      };
    },
    table: function (d) {
      var rows = [];
      d.models.forEach(function (s) {
        s.x.forEach(function (x, i) { rows.push([s.name, null, x, s.y[i]]); });
      });
      d.data.forEach(function (s) {
        s.points.forEach(function (p, i) { rows.push([s.name, addDays(s.start, i), p[0], p[1]]); });
      });
      return {
        columns: ['Series', 'Date', d.xTitle, d.yTitle],
        rows: rows,
        decimals: [null, null, 2, 3],
        note: 'Model rows give the fitted daily consumption at each whole degree (the sheet tabulates 1–40 °C; the chart shows 8–32 °C). Data rows are daily values.',
      };
    },
  });
})();
