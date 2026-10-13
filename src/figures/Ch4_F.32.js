// Figure 32 (Ch4_F.32) — Reference Demand Profiles for the four highest demand Capacity Years (MW):
// each year's half-hourly demand sorted from highest to lowest, against the Indicative DSP Dispatch
// Threshold. Excel: five lines over 17,569 Trading Intervals on a category axis of ranks 0, 1, 2, ...
// labelled every 2,000; y axis fixed 0 to 5,000.
// Here the ranks sit on a value axis (identical positions) so tick labels stay round when zoomed.
// Lines use LTTB sampling; the tooltip reads every visible series at the hovered rank from the full
// data (sampled points differ per series), and the table lists all 17,569 rows. 2020-21, 2021-22 and
// 2024-25 have 17,521 intervals; their blank tail is a gap, as in Excel.
(function () {
  'use strict';
  var ID = 'Ch4_F.32';

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
  // Value of a data-file series at rank i (the threshold is stored once as `constant`).
  function valueAt(s, i, n) {
    if (i < 0 || i >= n) return null;
    if (s.values) return s.values[i] == null ? null : s.values[i];
    return s.constant;
  }

  ESOO.register({
    id: ID,
    height: { lg: 480, md: 460, sm: 420 },
    table: function (d) {
      var rows = [];
      for (var i = 0; i < d.n; i++) {
        var row = [i];
        d.series.forEach(function (s) { row.push(valueAt(s, i, d.n)); });
        rows.push(row);
      }
      return { columns: ['Trading Interval'].concat(d.series.map(function (s) { return s.name; })), rows: rows };
    },
    option: function (d, t) {
      var fmt = t.fmt.excel('#,##0');
      var series = d.series.map(function (s) {
        var w = t.lw(s.width);
        var data = new Array(d.n);
        for (var i = 0; i < d.n; i++) data[i] = [i, valueAt(s, i, d.n)];
        return {
          name: s.name,
          type: 'line',
          data: data,
          sampling: 'lttb',
          showSymbol: false,
          connectNulls: false, // dispBlanksAs = gap
          lineStyle: { color: t.c(s.color), width: w, type: t.dash(s.dash, w) },
          itemStyle: { color: t.c(s.color) },
        };
      });

      // Tooltip: one readout at the hovered rank for every visible series, from the full data.
      var tip = t.tooltipAxis({
        format: fmt,
        unit: 'MW',
        header: function (p) { return 'Trading Interval ' + t.fmt.num(Math.round(p.axisValue)); },
      });
      var baseFormatter = tip.formatter;
      tip.formatter = function (params) {
        params = [].concat(params || []);
        if (!params.length) return '';
        var x = Math.round(params[0].axisValue);
        var L = ESOO.live && ESOO.live[ID];
        var hidden = (L && L.legendState) || {};
        var rows = [];
        series.forEach(function (s, k) {
          if (hidden[s.name] === false) return;
          rows.push({
            seriesName: s.name, seriesType: 'line', color: s.lineStyle.color,
            value: [x, valueAt(d.series[k], x, d.n)], axisValue: x,
          });
        });
        return rows.length ? baseFormatter(rows) : '';
      };

      // Ranks on a value axis: 0, 2,000, 4,000 … like Excel (every 4,000 on phones); finer when zoomed.
      var xAxis = t.cAxis({ name: 'Trading Interval' });
      xAxis.type = 'value';
      delete xAxis.data;
      delete xAxis.boundaryGap;
      delete xAxis.axisLabel.interval;
      xAxis.min = 0;
      xAxis.max = d.n - 1;
      xAxis.minInterval = 1;
      xAxis.splitNumber = t.size === 'sm' ? 4 : 5;
      xAxis.maxInterval = t.size === 'sm' ? 4000 : 2000;
      // The end ticks are the axis/zoom-window edges (17,568 or wherever the window starts and stops),
      // not round values: Excel labels only 0, 2,000 … so drop the last label and a first one other than 0.
      xAxis.axisLabel.showMaxLabel = false;
      xAxis.axisLabel.formatter = function (v, i) { return i === 0 && v !== 0 ? '' : fmt(v); };

      var yAxis = t.vAxis({ name: 'Demand (MW)', min: 0, max: 5000, interval: 500, format: fmt });
      var lines = wrapName(yAxis, t);
      // Workaround: the PNG export (common.js exportPNG) re-renders this option offscreen at another
      // width and draws its canvas legend at bottom 8, exactly where the zoom slider sits. That call is
      // the only one made while the on-page chart is alive at a different width, so leave zoom out then.
      var L = ESOO.live && ESOO.live[ID];
      var exporting = !!(L && L.chart && !L.chart.isDisposed() && L.width !== t.width);
      var opt = {
        grid: { top: 40 + 15 * (lines - 1), right: 16, bottom: exporting ? 30 : 60, left: 8, containLabel: true },
        tooltip: tip,
        xAxis: xAxis,
        yAxis: yAxis,
        series: series,
      };
      if (!exporting) opt.dataZoom = t.zoom({ labelFormatter: function (v) { return fmt(Math.round(v)); } });
      return opt;
    },
  });
})();
