// Figure 33 (Ch5_F.33) — Boxplot of annual unserved energy for 2026-27 to 2035-36, by iteration and
// reference years (% of annual consumption). The register holds this chart as a picture (box plots with
// every iteration drawn as a dot, plus an inset zoomed into 2026-27 to 2030-31); it is rebuilt from the
// sheet's 1,600 ranked iterations per Capacity Year. scripts/prep/Ch5_F.33.py computes the boxes:
// Q1-Q3 from linearly interpolated percentiles, whiskers at the most extreme iteration within
// 1.5 x IQR of Q1/Q3 (Tukey, as the sheet note says), dashed line = mean (the picture draws no median
// line). Iterations are grey dots, jittered sideways in the main plot (deterministic jitter) and in a
// single column in the inset, as in the picture. Dashed red line: reliability standard, 0.0002%.
// The box glyphs are custom series so whiskers, black caps and the dashed mean can be styled as in
// the picture. The inset is a second grid over the top-left of the plot; on phones it sits below.
(function () {
  var PURPLE = '#6c3078'; // box fill (40% alpha), whiskers (60%), mean line
  var GREY = '#a9a9a9';   // iterations
  var RED = '#9f2c4a';    // reliability standard
  var BLACK = '#000000';  // whisker caps
  var RS = 0.0002;        // reliability standard, % of annual consumption
  var NI = 5;             // inset years: 2026-27 to 2030-31
  var YMAX = 1.4, IMAX = 0.002;
  var HEIGHT = { lg: 520, md: 480, sm: 620 };
  var BOX = 'Box and whiskers', MEAN = 'Average', DOTS = 'Individual iterations';

  function sig(v) { // up to 4 significant digits, never exponent notation
    if (v == null || isNaN(v)) return '';
    return v === 0 ? '0' : Number(v).toLocaleString('en-AU', { maximumSignificantDigits: 4 });
  }
  function jitter(k) { // deterministic pseudo-random in [0, 1)
    var x = Math.sin(k * 12.9898 + 78.233) * 43758.5453;
    return x - Math.floor(x);
  }
  function line(x1, y1, x2, y2, style) {
    return { type: 'line', shape: { x1: x1, y1: y1, x2: x2, y2: y2 }, style: style };
  }

  // Custom-series renderer for one part of a box glyph ('box' | 'lines' | 'mean').
  // value = [category, lower whisker, Q1, median, Q3, upper whisker, mean]; widths are band fractions.
  function glyph(t, part, o) {
    return function (params, api) {
      var i = api.value(0);
      var band = api.size([1, 0])[0];
      var cx = api.coord([i, 0])[0];
      var bw = band * o.box, cw = band * o.cap;
      var y = function (k) { return api.coord([i, api.value(k)])[1]; };
      var yLo = y(1), yQ1 = y(2), yQ3 = y(4), yHi = y(5);
      if (part === 'box') {
        var h = Math.max(yQ1 - yQ3, 1.5);
        return { type: 'rect', shape: { x: cx - bw / 2, y: (yQ1 + yQ3 - h) / 2, width: bw, height: h }, style: { fill: t.alpha(t.c(PURPLE), t.dark ? 0.6 : 0.4) } };
      }
      if (part === 'mean') {
        var ym = y(6);
        return line(cx - bw / 2, ym, cx + bw / 2, ym, { stroke: t.c(PURPLE), lineWidth: o.meanW, lineDash: o.dash });
      }
      var hh = Math.max(yLo - yHi, 12); // hover target: whisker range, at least 12px tall
      var wl = function () { return { stroke: t.alpha(t.c(PURPLE), 0.6), lineWidth: o.whiskW }; };
      // black caps; in dark mode the ink colour (black lifted to 2.4:1 vanishes in the grey dot cloud)
      var cl = function () { return { stroke: t.dark ? t.text : BLACK, lineWidth: o.capW }; };
      return {
        type: 'group',
        children: [
          { type: 'rect', shape: { x: cx - bw / 2, y: (yLo + yHi - hh) / 2, width: bw, height: hh }, style: { fill: 'rgba(0,0,0,0)' } },
          line(cx, yQ3, cx, yHi, wl()),
          line(cx, yQ1, cx, yLo, wl()),
          line(cx - cw / 2, yHi, cx + cw / 2, yHi, cl()),
          line(cx - cw / 2, yLo, cx + cw / 2, yLo, cl()),
        ],
      };
    };
  }

  function layout(t) {
    var H = HEIGHT[t.size];
    var pct = function (px) { return (px / t.width) * 100 + '%'; };
    if (t.size === 'sm') {
      // phones: the inset moves below the main plot (too small to read when overlaid)
      var mainH = 280, iTop = 40 + mainH + 52 + 40;
      return {
        stacked: true,
        main: { left: 46, right: 12, top: 40, height: mainH },
        inset: { left: 52, right: 12, top: iTop, height: H - iTop - 28 },
      };
    }
    var Hp = H - 40 - 30, plotW = t.width - 52 - 16;
    // picture: inset frame from 8.1% to 57.8% of the plot width, 4.6% to 66% of its height
    var left = Math.max(52 + 0.081 * plotW, 52 + 50), width = 0.497 * plotW;
    var top = 40 + Math.round(0.046 * Hp), h = Math.round(0.6 * Hp);
    return {
      stacked: false,
      main: { left: 52, right: 16, top: 40, height: Hp },
      inset: { left: pct(left), width: pct(width), top: top, height: h },
      // backdrop that hides the main gridlines behind the inset and its labels
      bg: { left: pct(left - 48), width: pct(width + 50), top: top - 10, height: h + 10 + 26 },
    };
  }

  function boxData(d, n) {
    var out = [];
    for (var i = 0; i < n; i++) {
      var s = d.stats[i];
      out.push({ value: [i, s[1], s[2], s[3], s[4], s[5], s[7]], k: i });
    }
    return out;
  }

  ESOO.register({
    id: 'Ch5_F.33',
    height: HEIGHT,
    legendItems: function (d, t) {
      return [
        { name: BOX, color: t.alpha(t.c(PURPLE), t.dark ? 0.6 : 0.45), shape: 'rect' },
        { name: MEAN, color: t.c(PURPLE), shape: 'line', dash: true },
        { name: DOTS, color: t.c(GREY), shape: 'dot' },
      ];
    },
    table: function (d, t) {
      return {
        columns: ['Capacity year', 'Minimum (%)', 'Lower whisker (%)', 'Q1 (%)', 'Median (%)', 'Mean (%)', 'Q3 (%)', 'Upper whisker (%)', 'Maximum (%)', 'Outliers', 'Iterations'],
        rows: d.years.map(function (y, i) {
          var s = d.stats[i];
          return [y, s[0], s[1], s[2], s[3], s[7], s[4], s[5], s[6], s[8] + s[9], d.n[i]];
        }),
        format: function (v, i) { return i >= 9 ? t.fmt.num(v, 0) : sig(v); },
        note: 'Box statistics computed from the sheet’s ' + t.fmt.num(d.n[0], 0) + ' modelled iterations per Capacity Year ' +
          '(16 weather reference years × 100 forced-outage iterations). Quartiles use linear interpolation; whiskers reach the ' +
          'most extreme iteration within 1.5 × IQR of Q1 and Q3; outliers are iterations beyond the whiskers. Values are % of ' +
          'annual consumption; the reliability standard is 0.0002%.',
      };
    },
    option: function (d, t) {
      var L = layout(t);
      var sm = t.size === 'sm';
      var n = d.years.length;

      // every iteration as a dot: jittered in the main plot, rank = position in the ascending list
      var dots = [], k = 0;
      d.years.forEach(function (yr, i) {
        var z = d.zeros[i];
        for (var j = 0; j < z; j++) dots.push([i + (jitter(k++) - 0.5) * 0.2, 0, i, 0]);
        d.points[i].forEach(function (v, j) { dots.push([i + (jitter(k++) - 0.5) * 0.2, v, i, z + j + 1]); });
      });
      // inset: one column per year, identical values drawn once (with their count)
      var idots = [];
      for (var i = 0; i < NI; i++) {
        if (d.zeros[i]) idots.push([i, 0, d.zeros[i]]);
        var pv = d.points[i], j = 0;
        while (j < pv.length && pv[j] <= IMAX * 1.05) {
          var v = pv[j], c = 0;
          while (j < pv.length && pv[j] === v) { c++; j++; }
          idots.push([i, v, c]);
        }
      }

      var main = { box: 0.53, cap: 0.27, whiskW: 2.5, capW: 2, meanW: sm ? 2.5 : 3, dash: [7, 4] };
      var ins = { box: 0.5, cap: 0.25, whiskW: 2, capW: 1.75, meanW: 2, dash: [6, 4] };
      var custom = function (name, part, o, xi, yi, z, n0) {
        return {
          name: name, type: 'custom', xAxisIndex: xi, yAxisIndex: yi, z: z, clip: xi !== 0,
          // series colour = legend/tooltip key colour (the glyph colours are set in glyph())
          renderItem: glyph(t, part, o), itemStyle: { color: part === 'box' ? t.alpha(t.c(PURPLE), t.dark ? 0.6 : 0.45) : t.c(PURPLE) },
          dimensions: ['year', 'lo', 'q1', 'median', 'q3', 'hi', 'mean'], encode: { x: 0, y: [1, 5] },
          data: boxData(d, n0),
        };
      };
      var rsLabel = { show: true, position: sm ? 'insideStartTop' : 'insideEndTop', formatter: '0.0002%', color: t.c(RED), fontWeight: 700, fontSize: sm ? 12 : 14, distance: [4, 6] };
      var rs = function (xi, yi, label, w) {
        var ml = t.markLine({ data: [{ yAxis: RS }], color: t.c(RED), width: w, dash: [7, 5], label: label });
        ml.z = 9;
        return { name: '_rs' + xi, type: 'line', xAxisIndex: xi, yAxisIndex: yi, data: [], markLine: ml };
      };
      var series = [
        custom(BOX, 'box', main, 0, 0, 2, n),
        {
          id: 'dots', name: DOTS, type: 'scatter', xAxisIndex: 1, yAxisIndex: 0, z: 3, clip: false,
          large: true, largeThreshold: 2000, progressive: 0, symbolSize: sm ? 3.5 : 5, // progressive: 0 so PNG export gets every dot
          itemStyle: { color: t.c(GREY), opacity: t.dark ? 0.35 : 0.45 }, data: dots,
        },
        custom(BOX, 'lines', main, 0, 0, 4, n),
        custom(MEAN, 'mean', main, 0, 0, 4, n),
        rs(0, 0, rsLabel, 2),
        custom(BOX, 'box', ins, 2, 1, 6, NI),
        {
          id: 'idots', name: DOTS, type: 'scatter', xAxisIndex: 2, yAxisIndex: 1, z: 7, clip: true,
          symbolSize: sm ? 3.5 : 4, itemStyle: { color: t.c(GREY), opacity: 0.3 }, data: idots,
        },
        custom(BOX, 'lines', ins, 2, 1, 8, NI),
        custom(MEAN, 'mean', ins, 2, 1, 8, NI),
        rs(2, 1, false, 1.75),
      ];

      var grids = [
        { left: L.main.left, right: L.main.right, top: L.main.top, height: L.main.height, containLabel: false },
        {
          left: L.inset.left, right: L.inset.right, width: L.inset.width, top: L.inset.top, height: L.inset.height, containLabel: false,
          show: true, backgroundColor: t.surface, borderColor: t.axis, borderWidth: 1.5, z: 4,
        },
      ];
      if (L.bg) grids.push({ left: L.bg.left, width: L.bg.width, top: L.bg.top, height: L.bg.height, containLabel: false, show: true, backgroundColor: t.surface, borderWidth: 0, z: 3 });

      var xMain = t.cAxis({ data: d.years, rotate: sm ? 45 : 0, interval: 0 });
      var xJit = { type: 'value', gridIndex: 0, min: -0.5, max: n - 0.5, show: false };
      var xIns = t.cAxis({ data: d.years.slice(0, NI), interval: 0 });
      xIns.gridIndex = 1;
      xIns.z = 5;
      xIns.axisLine.show = false;
      xIns.axisLabel.fontSize = 11;
      xMain.offset = 8; // gap below the zero line, as in the picture
      var yMain = t.vAxis({ name: 'Unserved Energy (%)', min: 0, max: YMAX, interval: 0.2, decimals: 3 });
      var yIns = t.vAxis({ name: L.stacked ? 'Detail, 2026-27 to 2030-31 (%)' : '', min: 0, max: IMAX, interval: 0.0005, decimals: 4 });
      yIns.gridIndex = 1;
      yIns.z = 5;
      yIns.axisLabel.fontSize = 11;

      return {
        grid: grids,
        tooltip: t.tooltipItem({
          title: function (p) {
            var yi = p.seriesId === 'dots' ? p.value[2] : p.value[0];
            return d.years[yi] + (p.seriesType === 'scatter' ? ' · iteration' : '');
          },
          lines: function (p) {
            if (p.seriesId === 'dots') {
              var yi = p.value[2], v = p.value[1];
              if (v === 0) return [['Annual USE', '0%'], ['Iterations at 0%', t.fmt.num(d.zeros[yi], 0) + ' of ' + t.fmt.num(d.n[yi], 0)]];
              return [['Annual USE', sig(v) + '%'], ['Rank (ascending)', t.fmt.num(p.value[3], 0) + ' of ' + t.fmt.num(d.n[yi], 0)]];
            }
            if (p.seriesId === 'idots') {
              return [['Annual USE', sig(p.value[1]) + '%'], ['Iterations at this value', t.fmt.num(p.value[2], 0) + ' of ' + t.fmt.num(d.n[p.value[0]], 0)]];
            }
            var s = d.stats[p.data.k];
            var pc = function (x) { return sig(x) + '%'; };
            return [
              ['Maximum', pc(s[6])], ['Upper whisker', pc(s[5])], ['Q3', pc(s[4])], ['Mean (dashed)', pc(s[7])],
              ['Median', pc(s[3])], ['Q1', pc(s[2])], ['Lower whisker', pc(s[1])], ['Minimum', pc(s[0])],
              ['Iterations', t.fmt.num(d.n[p.data.k], 0) + (s[8] + s[9] ? ' (' + t.fmt.num(s[8] + s[9], 0) + ' outliers)' : '')],
            ];
          },
        }),
        xAxis: [xMain, xJit, xIns],
        yAxis: [yMain, yIns],
        series: series,
      };
    },
  });
})();
