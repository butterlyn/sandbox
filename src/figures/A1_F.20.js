// Appendix Figure 20 (A1_F.20) — Illustration of the approach to modelling the impact of the virtual
// power plant on peak demand (MW). The sheet's two native charts become two stacked grids with one
// linked axis pointer and tooltip. Both use the day's 48 half-hourly intervals as categories; the
// bottom grid's axis is limited (min/max) to 14:00-23:30, the range its Excel chart plots, so it
// keeps Excel's zoomed-in scale while the pointer links by interval.
//   top    (chart64): 'VPP-capable capacity (passive operation)' columns (gap width 25) on the right
//          axis, -200 to 550 MW step 50 (no gridlines); 'Pre-VPP demand' and 'Adjusted demand (peak
//          periods in summer)' lines on the left axis, min 0 step 500. Excel fixes only the minimum;
//          its automatic maximum lands on 5,500 (reference image), used here.
//   bottom (chart63): stacked columns (passive operation, coordinated) and the dotted 'Passive
//          operation (pre-VPP modelling)' line on the right axis, -200 to 550 step 50; 'Adjusted
//          demand' and 'Post-VPP demand' lines on the left axis, 3,000-5,250 step 250.
// Time labels are horizontal (thinned to fit the width) instead of Excel's 45-degree labels. The data
// table lists the sheet's columns E-L; the series name used in both panels gets the panel added to
// its column header.
(function () {
  var HEIGHT = { lg: 700, md: 660, sm: 640 };
  var LEFT = 50, RIGHT = 44, LABELS = 24, GAP = 12, BOTTOM = 4;
  var AUTO_MAX = 5500; // Excel's automatic maximum of the top panel's demand axis

  /** values of a panel series placed on the full category list (null outside the panel's range) */
  function pad(vals, start, len) {
    var out = [];
    for (var i = 0; i < len; i++) {
      var j = i - start;
      out.push(j >= 0 && j < vals.length ? vals[j] : null);
    }
    return out;
  }

  /** Axis tooltip listing every series at the hovered interval, one block per panel (top first). */
  function tooltip(t, fmt, unit) {
    var tt = t.tooltipAxis({ format: fmt, unit: unit });
    var esc = ESOO.esc;
    tt.formatter = function (params) {
      params = [].concat(params || []);
      if (!params.length) return '';
      params.sort(function (a, b) { return a.axisIndex - b.axisIndex || a.seriesIndex - b.seriesIndex; });
      var html = '<div class="tt"><div class="tt-head">' + esc(params[0].axisValueLabel) + '</div>';
      var last = null;
      params.forEach(function (p) {
        var v = p.value;
        if (!p.seriesName || p.seriesName.charAt(0) === '_' || v == null || v === '' || isNaN(v)) return;
        var sep = last !== null && p.axisIndex !== last;
        last = p.axisIndex;
        var shape = p.seriesType === 'bar' ? 'rect' : 'line';
        html += '<div class="tt-row"' + (sep ? ' style="border-top:1px solid ' + t.line + ';margin-top:3px;padding-top:4px"' : '') + '>' +
          '<span class="tt-key tt-key--' + shape + '" style="background:' + esc(p.color) + '"></span>' +
          '<b>' + esc(fmt(v)) + ' ' + esc(unit) + '</b><span>' + esc(p.seriesName) + '</span></div>';
      });
      return html + '</div>';
    };
    return tt;
  }

  ESOO.register({
    id: 'A1_F.20',
    height: HEIGHT,
    categoryLabel: 'Trading interval',
    table: function (d) {
      var cols = [], count = {};
      d.panels.forEach(function (p, pi) {
        p.series.forEach(function (s) {
          cols.push({ s: s, p: p, pi: pi });
          count[s.name] = (count[s.name] || 0) + 1;
        });
      });
      // sheet column order (E-L)
      cols.sort(function (a, b) { return a.s.col.length - b.s.col.length || (a.s.col < b.s.col ? -1 : a.s.col > b.s.col ? 1 : 0); });
      var bottom = d.panels[1];
      var n = bottom.series[0].values.length;
      return {
        columns: ['Trading interval'].concat(cols.map(function (c) {
          return count[c.s.name] > 1 ? c.s.name + ' – ' + (c.pi === 0 ? 'top panel' : 'bottom panel') : c.s.name;
        })),
        rows: d.categories.map(function (cat, i) {
          return [cat].concat(cols.map(function (c) {
            var j = i - c.p.start;
            return j >= 0 && j < c.s.values.length ? c.s.values[j] : null;
          }));
        }),
        note: 'The top panel covers the whole day. The bottom panel covers ' + d.categories[bottom.start] + '–' +
          d.categories[bottom.start + n - 1] + ', the range the register plots, so its columns are blank before then.',
      };
    },
    option: function (d, t) {
      var fmt = t.fmt.excel('#,##0');
      var sm = t.size === 'sm';
      var H = HEIGHT[t.size] || HEIGHT.lg;
      var NAME = sm ? 50 : 36; // room above each panel for the axis titles (two lines on phones)
      var plot = Math.floor((H - NAME - LABELS - GAP - NAME - LABELS - BOTTOM) / 2);
      var tops = [NAME, NAME + plot + LABELS + GAP + NAME];
      var len = d.categories.length;
      var grid = [], xAxis = [], yAxis = [], series = [];

      d.panels.forEach(function (p, gi) {
        var n = p.series[0].values.length;
        grid.push({ left: LEFT, right: RIGHT, top: tops[gi], height: plot, containLabel: false });
        // top: label hourly when wide, else every 2 h (4 h on phones); bottom: every interval when
        // wide, else hourly (2-hourly on phones)
        var step = gi === 0 ? t.pick({ lg: 2, md: 4, sm: 8 }) : t.pick({ lg: 1, md: 2, sm: 4 });
        var xa = t.cAxis({ data: d.categories, boundaryGap: true, interval: function (i) { return i % step === 0; } });
        xa.gridIndex = gi;
        if (p.start > 0 || n < len) {
          xa.min = p.start;
          xa.max = p.start + n - 1;
        }
        xAxis.push(xa);

        var L = p.axes.left, R = p.axes.right;
        var yl = t.vAxis({ name: L.title, min: L.min, max: L.max != null ? L.max : AUTO_MAX, interval: L.majorUnit, numFmt: L.numFmt });
        var rTitle = String(R.title).replace(/\s*\n\s*/g, ' ');
        if (sm) rTitle = rTitle.replace(' discharging', '\ndischarging'); // same words, wrapped to fit
        var yr = t.vAxis({ name: rTitle, min: R.min, max: R.max, interval: R.majorUnit, numFmt: R.numFmt, position: 'right', grid: false });
        yl.gridIndex = gi;
        yr.gridIndex = gi;
        yAxis.push(yl, yr);

        var gap = p.gapWidth != null ? (p.gapWidth / (100 + p.gapWidth)) * 100 : 20;
        p.series.forEach(function (s) {
          var c = t.c(s.color);
          var base = { name: s.name, xAxisIndex: gi, yAxisIndex: gi * 2 + (s.axis === 'right' ? 1 : 0), data: pad(s.values, p.start, len) };
          if (s.type === 'bar') {
            series.push(ESOO.util.defaults({
              type: 'bar',
              stack: s.stack ? 'panel' + gi : undefined,
              barCategoryGap: gap + '%',
              itemStyle: { color: c },
              z: 2,
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
        axisPointer: { link: [{ xAxisIndex: 'all' }] },
        tooltip: tooltip(t, fmt, 'MW'),
        xAxis: xAxis,
        yAxis: yAxis,
        series: series,
      };
    },
  });
})();
