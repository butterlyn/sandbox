// Figure 12c (A1_F.12c) — Average annual household base load consumption, 2020-21 to 2035-36 (kWh).
// Panel of Appendix Figure 12; Figures 12d and 12e use the same module code. Excel scatter chart with no
// legend: one coloured circle (size 6) per actual year 2021–2025, each its own single-point series;
// Excel's linear trendline through those five points (dashed sysDash, 2.25 pt, #424242; the least-squares
// fit is computed in the prep script); and the 2026–2036 forecast as a smoothed grey line without
// markers. x axis: Excel fixes max 2036 and step 2, the minimum lands on 2020. y axis: Excel fixes the
// minimum at 4,000; its automatic maximum and step (6,000, 200) are taken from the published panel.
// The year markers carry the sheet's column name (E23) instead of their bare year so the hover readout
// lists "Base load" for every year; the readout header is the Capacity Year (sheet column C).
(function () {
  var ID = 'A1_F.12c';
  var Y_AXIS = { min: 4000, max: 6000, interval: 200, numFmt: '#,##0' };
  var TIP_DECIMALS = 0;

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

  /** Excel's 2-year step on the x axis, or 4 years when the year labels would touch (narrow phones). */
  function yearStep(t, y, min, max) {
    var plotW = t.width - 8 - labelW(t, y) - 8 - 18; // grid left, y labels, label margin, grid right
    return plotW / ((max - min) / 2) >= textW(t, String(max)) + 4 ? 2 : 4;
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

  function pairs(s) {
    return s.x.map(function (x, i) { return [x, s.y[i]]; });
  }

  ESOO.register({
    id: ID,
    height: { lg: 420, md: 400, sm: 340 },
    legend: false, // the Excel chart has no legend
    option: function (d, t) {
      var label = {};
      d.years.forEach(function (y, i) { label[y] = d.labels[i]; });
      var trendW = t.lw(d.trend.width);
      var lineW = t.lw(d.line.width);
      var series = d.points.map(function (p) {
        return {
          name: d.name,
          type: 'scatter',
          data: [[p.x, p.y]],
          symbol: t.symbol(p.symbol),
          symbolSize: p.size * 1.1,
          itemStyle: { color: t.c(p.color) },
          z: 2,
        };
      });
      series.push({
        name: d.trend.name,
        type: 'line',
        data: pairs(d.trend),
        showSymbol: false,
        lineStyle: { color: t.c(d.trend.color), width: trendW, type: t.dash(d.trend.dash, trendW), cap: 'butt' },
        itemStyle: { color: t.c(d.trend.color) },
        z: 4,
      });
      series.push({
        name: d.line.name,
        type: 'line',
        data: pairs(d.line),
        smooth: d.line.smooth,
        showSymbol: false,
        lineStyle: { color: t.c(d.line.color), width: lineW, type: t.dash(d.line.dash, lineW) },
        itemStyle: { color: t.c(d.line.color) },
        z: 3,
      });
      var y = t.vAxis({ name: d.yTitle, min: Y_AXIS.min, max: Y_AXIS.max, interval: Y_AXIS.interval, numFmt: Y_AXIS.numFmt });
      return {
        grid: { top: fitTitle(t, y), right: 18, bottom: 34, left: 8, containLabel: true },
        tooltip: t.tooltipAxis({
          format: function (v) { return t.fmt.num(v, TIP_DECIMALS); },
          unit: d.unit,
          header: function (p) { return 'Capacity Year ' + (label[p.axisValue] || p.axisValue); },
        }),
        xAxis: xAxis(t, { name: d.xTitle, min: 2020, max: 2036, interval: yearStep(t, y, 2020, 2036), format: function (v) { return String(v); } }),
        yAxis: y,
        series: series,
      };
    },
    table: function (d) {
      var val = {}, trend = {};
      d.points.forEach(function (p) { val[p.x] = p.y; });
      d.line.x.forEach(function (x, i) { val[x] = d.line.y[i]; });
      d.trend.x.forEach(function (x, i) { trend[x] = d.trend.y[i]; });
      return {
        columns: [d.xTitle, 'Capacity Year', d.name + ' (' + d.unit + ')', d.trend.name + ' (' + d.unit + ')'],
        rows: d.years.map(function (y, i) { return [String(y), d.labels[i], val[y], trend[y] != null ? trend[y] : null]; }),
        note: 'Years ended 2021–2025 are drawn as points and 2026–2036 as the line. ' + d.trend.name +
          ' is the least-squares trendline Excel fits to the five points.',
      };
    },
  });
})();
