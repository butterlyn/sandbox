// Figure 15 (Ch2_F.15) — Modelled behaviour and impact of passive distributed batteries and the VPP
// on SWIS peak unscheduled operational demand, 2028-29 (MW). The sheet's two native charts become two
// stacked grids sharing the half-hourly trading-interval axis (144 intervals, Day 1-3), with one
// linked axis pointer and tooltip:
//   top    (chart12): 'Demand before distributed batteries' area + two demand lines (the dashed
//          'after passive batteries' line drawn over the solid 'after VPP' line); 0-5,500 MW, step 500.
//   bottom (chart11): stacked columns, passive batteries then VPP charging (+) / discharging (-),
//          gap width 30; -400 to 200 MW, step 100.
// Excel's two-level category axis (hh:mm above Day 1/2/3, with separators between days) is an hh:mm
// axis plus a second category axis holding the Day labels. Time labels are horizontal every 4-6 hours
// (12 on phones) rather than Excel's vertical 2-hourly labels. In dark mode the grey area is drawn
// translucent so it stays a backdrop.
(function () {
  var HEIGHT = { lg: 700, md: 660, sm: 600 };
  var LEFT = 50, RIGHT = 16, TOP = 36, LABELS = 44, GAP = 10, NAME = 30, BOTTOM = 4;

  /** Axis tooltip listing every series at the hovered interval, one block per panel. */
  function tooltip(t, fmt, unit, rectNames) {
    var tt = t.tooltipAxis({ format: fmt, unit: unit });
    var esc = ESOO.esc;
    tt.formatter = function (params) {
      params = [].concat(params || []);
      if (!params.length) return '';
      // top panel first whichever panel is hovered (the hovered axis comes first in params)
      params.sort(function (a, b) { return a.axisIndex - b.axisIndex || a.seriesIndex - b.seriesIndex; });
      var html = '<div class="tt"><div class="tt-head">' + esc(params[0].axisValueLabel) + '</div>';
      var last = null;
      params.forEach(function (p) {
        var v = p.value;
        if (!p.seriesName || p.seriesName.charAt(0) === '_' || v == null || v === '' || isNaN(v)) return;
        var sep = last !== null && p.axisIndex !== last;
        last = p.axisIndex;
        var shape = p.seriesType === 'bar' || rectNames.indexOf(p.seriesName) >= 0 ? 'rect' : 'line';
        html += '<div class="tt-row"' + (sep ? ' style="border-top:1px solid ' + t.line + ';margin-top:3px;padding-top:4px"' : '') + '>' +
          '<span class="tt-key tt-key--' + shape + '" style="background:' + esc(p.color) + '"></span>' +
          '<b>' + esc(fmt(v)) + ' ' + esc(unit) + '</b><span>' + esc(p.seriesName) + '</span></div>';
      });
      return html + '</div>';
    };
    return tt;
  }

  ESOO.register({
    id: 'Ch2_F.15',
    height: HEIGHT,
    categoryLabel: 'Trading interval',
    option: function (d, t) {
      var fmt = t.fmt.excel('#,##0');
      var H = HEIGHT[t.size] || HEIGHT.lg;
      var plot = Math.floor((H - TOP - LABELS - GAP - NAME - LABELS - BOTTOM) / 2);
      var tops = [TOP, TOP + plot + LABELS + GAP + NAME];
      var step = t.pick({ lg: 8, md: 12, sm: 24 }); // time label every 4 h (wide), 6 h, or 12 h (phones)
      var grid = [], xAxis = [], yAxis = [], series = [], areas = [];

      d.panels.forEach(function (p, gi) {
        grid.push({ left: LEFT, right: RIGHT, top: tops[gi], height: plot, containLabel: false });
        // inner level of the category axis: hh:mm
        var xa = t.cAxis({
          data: d.categories,
          boundaryGap: true,
          interval: function (i) { return i % step === 0; },
          format: function (v) { return String(v).slice(-5); },
        });
        xa.gridIndex = gi;
        xAxis.push(xa);
        // outer level: Day labels centred under each day, separators between days
        xAxis.push({
          type: 'category',
          gridIndex: gi,
          position: 'bottom',
          offset: 22,
          data: d.groups.map(function (g) { return g.label; }),
          boundaryGap: true,
          silent: true,
          axisLine: { show: false, onZero: false },
          axisTick: { show: true, alignWithLabel: false, interval: 0, length: 22, lineStyle: { color: t.axis } },
          axisLabel: { color: t.text2, fontSize: 12, margin: 6, interval: 0 },
          axisPointer: { show: false },
          splitLine: { show: false },
        });
        var ax = p.axes.left;
        var ya = t.vAxis({
          name: String(ax.title).replace(/\s*\n\s*/g, ' '),
          min: ax.min,
          max: ax.max,
          interval: ax.majorUnit,
          numFmt: ax.numFmt,
        });
        ya.gridIndex = gi;
        yAxis.push(ya);

        var gap = p.gapWidth != null ? (p.gapWidth / (100 + p.gapWidth)) * 100 : 20;
        p.series.forEach(function (s) {
          var c = t.c(s.color);
          var base = { name: s.name, xAxisIndex: gi * 2, yAxisIndex: gi, data: s.values };
          if (s.type === 'bar') {
            series.push(ESOO.util.defaults({
              type: 'bar',
              stack: s.stack ? 'panel' + gi : undefined,
              barCategoryGap: gap + '%',
              itemStyle: { color: c },
              z: 2,
            }, base));
          } else if (s.type === 'area') {
            var fill = t.dark ? t.alpha(c, 0.3) : c;
            areas.push(s.name);
            series.push(ESOO.util.defaults({
              type: 'line',
              lineStyle: { width: 0 },
              itemStyle: { color: fill },
              areaStyle: { color: fill, opacity: 1 },
              legendShape: 'rect',
              z: 1,
            }, base));
          } else {
            var w = t.lw(s.width);
            series.push(ESOO.util.defaults({
              type: 'line',
              lineStyle: { color: c, width: w, type: t.dash(s.dash, w) },
              itemStyle: { color: c },
              connectNulls: false, // dispBlanksAs = gap
              z: 3,
            }, base));
          }
        });
      });

      return {
        grid: grid,
        axisPointer: { link: [{ xAxisIndex: [0, 2] }] },
        tooltip: tooltip(t, fmt, 'MW', areas),
        xAxis: xAxis,
        yAxis: yAxis,
        series: series,
      };
    },
  });
})();
