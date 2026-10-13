// Figure 42 (Ch6_F.42) — Expected unserved energy at the Reference Node (System USE) compared to all
// other network sub-regions (Sub-regional USE), 2026-27 to 2035-36 (% annual consumption). The register
// holds this chart as a picture (paired box plots per Capacity Year with an inset zoomed into 2026-27 to
// 2030-31); it is rebuilt from the sheet's per-iteration values (about 1,710-1,730 iterations per year).
// scripts/prep/Ch6_F.42.py computes the boxes: Q1-Q3 from linearly interpolated percentiles, whiskers at
// the most extreme iteration within 1.5 x IQR of Q1/Q3 (Tukey; the whisker ends match the picture),
// dashed line = mean (teal in both boxes, as in the picture; no median line is drawn). Outliers are not
// drawn, as in the published figure; the table lists their count. The box glyphs are custom series so
// the black whiskers/caps, coloured box outlines and dashed means can be styled as in the picture.
// Dashed red line: reliability standard, 0.0002%. The inset is a second grid over the top-left of the
// plot; on phones it sits below the main plot.
(function () {
  var GROUPS = [
    { color: '#46c3ae', fillA: 0.42, borderA: 0.6, offset: -0.12 },  // System USE (teal)
    { color: '#4b59a6', fillA: 0.42, borderA: 0.53, offset: 0.12 },  // Sub-regional USE (lavender)
  ];
  var MEANC = '#46c3ae';  // mean line, both groups
  var RED = '#9f2c4a';    // reliability standard
  var RS = 0.0002;        // reliability standard, % of annual consumption
  var NI = 5;             // inset years: 2026-27 to 2030-31
  var YMAX = 2, IMAX = 0.04;
  var HEIGHT = { lg: 540, md: 500, sm: 660 };

  function sig(v) { // up to 4 significant digits, never exponent notation
    if (v == null || isNaN(v)) return '';
    return v === 0 ? '0' : Number(v).toLocaleString('en-AU', { maximumSignificantDigits: 4 });
  }
  function pctAxis(t) { return function (v) { return t.fmt.num(v, 3) + '%'; }; }
  function line(x1, y1, x2, y2, style) {
    return { type: 'line', shape: { x1: x1, y1: y1, x2: x2, y2: y2 }, style: style };
  }

  // Custom-series renderer: one box glyph per category, shifted by g.offset bands (dodge).
  // value = [category, lower whisker, Q1, median, Q3, upper whisker, mean]; widths are band fractions.
  function glyph(t, g, o) {
    var ink = t.dark ? t.text : '#000000'; // black whiskers/caps; ink colour in dark mode
    var base = t.c(g.color);
    return function (params, api) {
      var i = api.value(0);
      var band = api.size([1, 0])[0];
      var cx = api.coord([i, 0])[0] + g.offset * band;
      var bw = band * o.box, cw = band * o.cap;
      var y = function (k) { return api.coord([i, api.value(k)])[1]; };
      var yLo = y(1), yQ1 = y(2), yQ3 = y(4), yHi = y(5), ym = y(6);
      var h = Math.max(yQ1 - yQ3, 1);
      var hh = Math.max(yLo - yHi, 12); // hover target: whisker range, at least 12px tall
      var wl = function (w) { return { stroke: ink, lineWidth: w }; };
      return {
        type: 'group',
        children: [
          { type: 'rect', shape: { x: cx - bw / 2, y: (yLo + yHi - hh) / 2, width: bw, height: hh }, style: { fill: 'rgba(0,0,0,0)' } },
          line(cx, yQ3, cx, yHi, wl(o.whiskW)),
          line(cx, yQ1, cx, yLo, wl(o.whiskW)),
          line(cx - cw / 2, yHi, cx + cw / 2, yHi, wl(o.capW)),
          line(cx - cw / 2, yLo, cx + cw / 2, yLo, wl(o.capW)),
          {
            type: 'rect', shape: { x: cx - bw / 2, y: (yQ1 + yQ3 - h) / 2, width: bw, height: h },
            style: { fill: t.alpha(base, t.dark ? g.fillA + 0.15 : g.fillA), stroke: t.alpha(base, t.dark ? 0.9 : g.borderA), lineWidth: o.boxW },
          },
          line(cx - bw / 2 + 1, ym, cx + bw / 2 - 1, ym, { stroke: t.c(MEANC), lineWidth: o.meanW, lineDash: o.dash }),
        ],
      };
    };
  }

  function layout(t) {
    var H = HEIGHT[t.size];
    var pct = function (px) { return (px / t.width) * 100 + '%'; };
    if (t.size === 'sm') {
      // phones: the inset moves below the main plot (too small to read when overlaid)
      var mainH = 270, iTop = 40 + mainH + 8 + 78 + 40;
      return {
        stacked: true,
        main: { left: 54, right: 12, top: 40, height: mainH },
        inset: { left: 54, right: 12, top: iTop, height: H - iTop - 28 },
      };
    }
    var Hp = H - 40 - 64, plotW = t.width - 58 - 16;
    var yv = function (v) { return 40 + ((YMAX - v) / YMAX) * Hp; };
    // picture: inset frame from 6.9% to 46.8% of the plot width, between 1.58% and 0.615% on the y axis
    var left = Math.max(58 + 0.069 * plotW, 58 + 52), width = 0.4 * plotW;
    var top = Math.round(yv(1.58)), h = Math.round(yv(0.615) - yv(1.58));
    return {
      stacked: false,
      main: { left: 58, right: 16, top: 40, height: Hp },
      inset: { left: pct(left), width: pct(width), top: top, height: h },
      // backdrop that hides the main gridlines behind the inset and its labels
      bg: { left: pct(left - 50), width: pct(width + 52), top: top - 10, height: h + 10 + 26 },
    };
  }

  function boxData(stats, n, gi) {
    var out = [];
    for (var i = 0; i < n; i++) {
      var s = stats[i];
      out.push({ value: [i, s[1], s[2], s[3], s[4], s[5], s[7]], k: i, g: gi });
    }
    return out;
  }

  ESOO.register({
    id: 'Ch6_F.42',
    height: HEIGHT,
    legendItems: function (d, t) {
      return d.series.map(function (s, gi) {
        var g = GROUPS[gi], base = t.c(g.color);
        return { name: s.name, color: t.alpha(base, t.dark ? g.fillA + 0.15 : g.fillA), border: t.alpha(base, t.dark ? 0.9 : g.borderA), shape: 'rect' };
      });
    },
    table: function (d, t) {
      var rows = [];
      d.years.forEach(function (y, i) {
        d.series.forEach(function (s) {
          var st = s.stats[i];
          rows.push([y, s.name, st[0], st[1], st[2], st[3], st[7], st[4], st[5], st[6], st[8] + st[9], d.n[i]]);
        });
      });
      var nMin = Math.min.apply(null, d.n), nMax = Math.max.apply(null, d.n);
      return {
        columns: ['Capacity year', 'Series', 'Minimum (%)', 'Lower whisker (%)', 'Q1 (%)', 'Median (%)', 'Mean (%)', 'Q3 (%)', 'Upper whisker (%)', 'Maximum (%)', 'Outliers (not drawn)', 'Iterations'],
        rows: rows,
        format: function (v, i) { return i >= 10 ? t.fmt.num(v, 0) : sig(v); },
        note: 'Box statistics computed from every modelled iteration in the sheet (' + t.fmt.num(nMin, 0) + ' to ' + t.fmt.num(nMax, 0) +
          ' iterations per Capacity Year). Quartiles use linear interpolation; whiskers reach the most extreme iteration within ' +
          '1.5 × IQR of Q1 and Q3; outliers beyond the whiskers are not drawn, as in the published figure. The dashed line in ' +
          'each box is the mean. Values are % of annual consumption; the reliability standard is 0.0002%.',
      };
    },
    option: function (d, t) {
      var L = layout(t);
      var sm = t.size === 'sm';
      var n = d.years.length;
      var main = { box: 0.2, cap: 0.11, whiskW: 1.5, capW: 1.75, boxW: 1.5, meanW: 1.75, dash: [4, 3] };
      var ins = { box: 0.16, cap: 0.09, whiskW: 1.5, capW: 1.75, boxW: 1.25, meanW: 1.5, dash: [3, 3] };
      var series = [];
      [[0, main, n, 3], [1, ins, NI, 7]].forEach(function (c) { // [grid/axis index, sizes, years, z]
        d.series.forEach(function (s, gi) {
          var g = GROUPS[gi];
          series.push({
            name: s.name, type: 'custom', xAxisIndex: c[0], yAxisIndex: c[0], z: c[3], clip: c[0] !== 0,
            renderItem: glyph(t, g, c[1]),
            itemStyle: { color: t.c(g.color) },
            dimensions: ['year', 'lo', 'q1', 'median', 'q3', 'hi', 'mean'], encode: { x: 0, y: [1, 5] },
            data: boxData(s.stats, c[2], gi),
          });
        });
      });
      var rs = function (xi, yi, label, w) {
        var ml = t.markLine({ data: [{ yAxis: RS }], color: t.c(RED), width: w, dash: [7, 5], label: label });
        ml.z = 9;
        return { name: '_rs' + xi, type: 'line', xAxisIndex: xi, yAxisIndex: yi, data: [], markLine: ml };
      };
      series.push(rs(0, 0, { show: true, position: sm ? 'insideStartTop' : 'insideEndTop', formatter: '0.0002%', color: t.c(RED), fontWeight: 700, fontSize: sm ? 12 : 14, distance: [4, 6] }, 2));
      series.push(rs(1, 1, false, 1.75));

      var grids = [
        { left: L.main.left, right: L.main.right, top: L.main.top, height: L.main.height, containLabel: false },
        {
          left: L.inset.left, right: L.inset.right, width: L.inset.width, top: L.inset.top, height: L.inset.height, containLabel: false,
          show: true, backgroundColor: t.surface, borderColor: t.axis, borderWidth: 1.5, z: 4,
        },
      ];
      if (L.bg) grids.push({ left: L.bg.left, width: L.bg.width, top: L.bg.top, height: L.bg.height, containLabel: false, show: true, backgroundColor: t.surface, borderWidth: 0, z: 3 });

      var xMain = t.cAxis({ data: d.years, name: 'Capacity Year', rotate: sm ? 45 : 0, interval: 0 });
      xMain.offset = 8; // gap below the zero line, as in the picture
      var xIns = t.cAxis({ data: d.years.slice(0, NI), interval: 0 });
      xIns.gridIndex = 1;
      xIns.z = 5;
      xIns.axisLine.show = false;
      xIns.axisLabel.fontSize = 11;
      var yMain = t.vAxis({ name: 'Unserved Energy (%)', min: 0, max: YMAX, interval: 0.25, format: pctAxis(t) });
      var yIns = t.vAxis({ name: L.stacked ? 'Detail, 2026-27 to 2030-31 (%)' : '', min: 0, max: IMAX, interval: 0.01, format: pctAxis(t) });
      yIns.gridIndex = 1;
      yIns.z = 5;
      yIns.axisLabel.fontSize = 11;

      return {
        grid: grids,
        tooltip: t.tooltipItem({
          title: function (p) { return p.seriesName + ' · ' + d.years[p.value[0]]; },
          lines: function (p) {
            var s = d.series[p.data.g].stats[p.data.k];
            var pc = function (x) { return sig(x) + '%'; };
            return [
              ['Maximum', pc(s[6])], ['Upper whisker', pc(s[5])], ['Q3', pc(s[4])], ['Mean (dashed)', pc(s[7])],
              ['Median', pc(s[3])], ['Q1', pc(s[2])], ['Lower whisker', pc(s[1])], ['Minimum', pc(s[0])],
              ['Iterations', t.fmt.num(d.n[p.data.k], 0) + (s[8] + s[9] ? ' (' + t.fmt.num(s[8] + s[9], 0) + ' outliers, not drawn)' : '')],
            ];
          },
        }),
        xAxis: [xMain, xIns],
        yAxis: [yMain, yIns],
        series: series,
      };
    },
  });
})();
