// Figure 37 (Ch5_F.37) — Annual maximum Four-Hour Demand Increase (FHDI) by Trading Interval for the
// Capacity Years 2026-27 to 2029-30 (MW). Excel: four 2.25pt lines over the 48 half-hourly Trading
// Intervals of a day (points centred on each interval); y axis auto, which Excel draws as 0 to 3,000 in
// 500 steps.
(function () {
  'use strict';

  // Half-hourly day axis: label whole hours, as often as horizontal 'hh:mm' labels fit.
  function hourInterval(t, n) {
    var per = (t.width - 72) / n; // px per Trading Interval (plot width ≈ chart width minus y labels)
    var steps = [2, 4, 6, 8, 12]; // every 1, 2, 3, 4 or 6 hours
    for (var i = 0; i < steps.length; i++) if (steps[i] * per >= 40) return steps[i] - 1;
    return 11;
  }
  // Long axis titles wrap on narrow screens (ECharts truncates axis names, so break the text into
  // lines here); returns the number of lines so the grid can make room above the plot.
  function wrapName(ax, t) {
    var avail = Math.max(160, t.width - 72);
    var ctx = document.createElement('canvas').getContext('2d');
    ctx.font = '600 12px ' + t.font;
    var out = [], cur = '';
    String(ax.name).split(' ').forEach(function (w) {
      var test = cur ? cur + ' ' + w : w;
      if (cur && ctx.measureText(test).width > avail) { out.push(cur); cur = w; } else cur = test;
    });
    out.push(cur);
    ax.name = out.join('\n');
    ax.nameTextStyle.lineHeight = 15;
    return out.length;
  }

  ESOO.register({
    id: 'Ch5_F.37',
    height: { lg: 460, md: 440, sm: 400 },
    categoryLabel: 'Trading Interval',
    option: function (d, t) {
      var fmt = t.fmt.excel('#,##0');
      var series = d.series.map(function (s) {
        var w = t.lw(s.width);
        return {
          name: s.name,
          type: 'line',
          data: s.values,
          lineStyle: { color: t.c(s.color), width: w, type: t.dash(s.dash, w) },
          itemStyle: { color: t.c(s.color) },
        };
      });
      var yAxis = t.vAxis({ name: 'Four-Hour Demand Increase (MW)', min: 0, max: 3000, interval: 500, format: fmt });
      var lines = wrapName(yAxis, t);
      return {
        grid: { top: 40 + 15 * (lines - 1), right: 16, bottom: 30, left: 8, containLabel: true },
        tooltip: t.tooltipAxis({ format: fmt, unit: 'MW' }),
        xAxis: t.cAxis({ data: d.categories, name: 'Trading Interval', interval: hourInterval(t, d.categories.length) }),
        yAxis: yAxis,
        series: series,
      };
    },
  });
})();
