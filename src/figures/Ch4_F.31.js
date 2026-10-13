// Figure 31 (Ch4_F.31) — Residual Demand, ESR Dispatch and Peak ESROD Demand at each Trading Interval of
// one peak demand day (25 Feb 2027 08:00 to 26 Feb 07:30). Excel: stacked columns (Residual Demand at
// the bottom, ESR Dispatch on top, gap width 30) behind a dashed Peak ESROD Demand line; y axis auto,
// which Excel draws as 0 to 5,000 in 500 steps. The stack total is the sheet's Operational Demand
// column (checked in the prep script), so the tooltip total carries that name.
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
    id: 'Ch4_F.31',
    height: { lg: 480, md: 460, sm: 420 },
    categoryLabel: 'Trading Interval',
    option: function (d, t) {
      var fmt = t.fmt.excel('#,##0');
      var lineNames = [];
      var series = d.series.map(function (s) {
        if (s.type === 'bar') {
          return {
            name: s.name,
            type: 'bar',
            stack: 'demand',
            barCategoryGap: '23%', // Excel gap width 30, overlap 100
            itemStyle: { color: t.c(s.color) },
            data: s.values,
          };
        }
        var w = t.lw(s.width);
        lineNames.push(s.name);
        return {
          name: s.name,
          type: 'line',
          data: s.values,
          lineStyle: { color: t.c(s.color), width: w, type: t.dash(s.dash, w) },
          itemStyle: { color: t.c(s.color) },
          z: 3,
        };
      });
      var yAxis = t.vAxis({ name: 'Residual Demand, ESR Dispatch, and Peak ESROD Demand (MW)', min: 0, max: 5000, interval: 500, format: fmt });
      var lines = wrapName(yAxis, t);
      return {
        grid: { top: 40 + 15 * (lines - 1), right: 16, bottom: 30, left: 8, containLabel: true },
        tooltip: t.tooltipAxis({
          format: fmt,
          unit: 'MW',
          reverse: true,
          pointer: 'shadow',
          header: function (p) { return t.fmt.date(p.axisValue, 'd mmm yyyy, hh:mm'); },
          total: { label: d.stackTotal, filter: function (n) { return lineNames.indexOf(n) < 0; } },
        }),
        xAxis: t.cAxis({
          data: d.categories,
          name: 'Trading Interval',
          interval: hourInterval(t, d.categories.length),
          format: function (v) { return String(v).slice(11, 16); },
        }),
        yAxis: yAxis,
        series: series,
      };
    },
  });
})();
