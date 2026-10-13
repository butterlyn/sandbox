// Appendix Figure 23 (A4_F.23) — Depth of base and tranches, and the operational demand estimate, for
// the ESR Duration Requirement Uplift calculation, 2009-10 weather reference year (MW). Excel: stacked
// columns (Base at the bottom, Tranche 7 (6 Hour), then Tranche 6 … Tranche 1 on top; gap width 54;
// every column outlined) and a 2.25pt line with white-filled circle markers, over the 48 Trading
// Intervals the chart references (08:00 to 07:30 the next day). Y axis min fixed at 2,000; Excel's
// auto max lands on 5,500 with 500 steps. Base values below 2,000 fall under the axis, as in Excel.
// Excel's manual legend box cuts off the ninth entry (the line); it is listed here.
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
  // Outline width in px: Excel's 0.75pt hairline, thinner on phones where columns are ~4px wide.
  function outline(t, pt) { return t.size === 'sm' ? 0.5 : Math.max(0.75, pt * 1.1); }

  ESOO.register({
    id: 'A4_F.23',
    height: { lg: 500, md: 480, sm: 440 },
    categoryLabel: 'Trading Interval',
    // the line's markers are filled with the background colour, so give the legend its line colour
    legendItems: function (d, t) {
      return d.series.map(function (s) {
        return s.type === 'bar'
          ? { name: s.name, color: t.c(s.color), shape: 'rect', border: t.c(s.border) }
          : { name: s.name, color: t.c(s.color), shape: 'line' };
      });
    },
    option: function (d, t) {
      var fmt = t.fmt.excel('#,##0');
      var barNames = [], keyColor = {};
      var series = d.series.map(function (s) {
        if (s.type === 'bar') {
          barNames.push(s.name);
          return {
            name: s.name,
            type: 'bar',
            stack: 'depth',
            barCategoryGap: '35%', // Excel gap width 54, overlap 100
            itemStyle: { color: t.c(s.color), borderColor: t.c(s.border), borderWidth: outline(t, s.borderWidth) },
            // zero-depth segments would draw as a stray outline on top of the stack
            data: s.values.map(function (v) { return v === 0 ? { value: 0, itemStyle: { borderWidth: 0 } } : v; }),
          };
        }
        var w = t.lw(s.width);
        keyColor[s.name] = t.c(s.color);
        return {
          name: s.name,
          type: 'line',
          data: s.values,
          symbol: t.symbol(s.marker),
          symbolSize: t.size === 'sm' ? 4 : s.markerSize * 1.1,
          showSymbol: true,
          showAllSymbol: true, // every point has a marker in Excel (ECharts would thin them out on phones)
          lineStyle: { color: t.c(s.color), width: w, type: t.dash(s.dash, w) },
          // Excel fills the markers with the background colour ('bg1')
          itemStyle: { color: t.surface, borderColor: t.c(s.markerLine), borderWidth: Math.max(1, s.markerLineWidth * 1.1) },
          z: 3,
        };
      });
      var yAxis = t.vAxis({ name: 'Depth of base and tranches and operational demand estimate (MW)', min: 2000, max: 5500, interval: 500, format: fmt });
      var lines = wrapName(yAxis, t);
      var tooltip = t.tooltipAxis({
        format: fmt,
        unit: 'MW',
        reverse: true,
        hideZero: true,
        pointer: 'shadow',
        total: { label: 'Base and tranches', filter: function (n) { return barNames.indexOf(n) >= 0; } },
      });
      // the line's item colour is its marker fill (background), so key it with the line colour
      var baseFormatter = tooltip.formatter;
      tooltip.formatter = function (params) {
        return baseFormatter([].concat(params || []).map(function (p) {
          if (!keyColor[p.seriesName]) return p;
          var q = {};
          for (var k in p) q[k] = p[k];
          q.color = keyColor[p.seriesName];
          return q;
        }));
      };
      return {
        grid: { top: 40 + 15 * (lines - 1), right: 16, bottom: 30, left: 8, containLabel: true },
        tooltip: tooltip,
        xAxis: t.cAxis({ data: d.categories, name: 'Trading Interval', interval: hourInterval(t, d.categories.length) }),
        yAxis: yAxis,
        series: series,
      };
    },
  });
})();
