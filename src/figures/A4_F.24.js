// Appendix Figure 24 (A4_F.24) — Depth of dispatched ESR (Total Accumulated Depth) for each weather
// reference year, with ESR Capacity Credits and the median depth, for the ESR Duration Requirement
// Uplift calculation (MW). Excel: columns (gap width 35) with two dashed 2.25pt lines drawn over them;
// y axis min fixed at 800, Excel's auto max lands on 1,800 with 100 steps. Legend: columns first.
(function () {
  'use strict';

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
    id: 'A4_F.24',
    height: { lg: 460, md: 440, sm: 420 },
    categoryLabel: 'Weather reference year',
    option: function (d, t) {
      var fmt = t.fmt.excel('#,##0');
      var series = d.series.map(function (s) {
        if (s.type === 'bar') {
          return {
            name: s.name,
            type: 'bar',
            barCategoryGap: '26%', // Excel gap width 35
            itemStyle: { color: t.c(s.color) },
            data: s.values,
          };
        }
        var w = t.lw(s.width);
        return {
          name: s.name,
          type: 'line',
          data: s.values,
          lineStyle: { color: t.c(s.color), width: w, type: t.dash(s.dash, w) },
          itemStyle: { color: t.c(s.color) },
          z: 3,
        };
      });
      var yAxis = t.vAxis({
        name: 'Depth of dispatched ESR (Total Accumulated Depth), ESR Capacity Credits and median depth (MW)',
        min: 800, max: 1800, interval: 100, format: fmt,
      });
      var lines = wrapName(yAxis, t);
      return {
        grid: { top: 40 + 15 * (lines - 1), right: 16, bottom: 30, left: 8, containLabel: true },
        tooltip: t.tooltipAxis({ format: fmt, unit: 'MW', pointer: 'shadow' }),
        // every year where it fits; on phones every second year (rotated labels would still collide)
        xAxis: t.cAxis({ data: d.categories, name: d.categoryTitle, interval: t.size === 'sm' ? 1 : 0 }),
        yAxis: yAxis,
        series: series,
      };
    },
  });
})();
