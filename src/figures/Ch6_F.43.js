// Figure 43 (Ch6_F.43) — Expected unserved energy in the East, Metro North, Metro South and South
// sub-regions, 2026-27 to 2035-36 (% annual consumption). The register holds this chart as a picture:
// one box-plot panel per sub-region (North, Metro North, South, Metro South, East; the North panel is
// in the picture too) on a shared 0-0.3% axis. It is rebuilt from the sheet's per-iteration values
// (about 1,710-1,730 iterations per year). scripts/prep/Ch6_F.43.py computes the boxes: Q1-Q3 from
// linearly interpolated percentiles, whiskers at the most extreme iteration within 1.5 x IQR of Q1/Q3
// (Tukey; the whisker ends match the picture), outliers = iterations beyond the whiskers (open circles;
// identical values drawn once), dashed line = mean (no median line is drawn, as in the picture). The
// box glyphs are custom series so black whiskers/caps, coloured box outlines and the dashed mean can be
// styled as in the picture. Panel colours are sampled from the picture; North's boxes are flat at zero
// there, so its colour is not visible and a pastel blue is assumed. Dashed red line: reliability
// standard, 0.0002%. Panels: 2 columns on wide screens (as in the picture), 1 column on phones.
(function () {
  var COLORS = { North: '#8fb6dc', 'Metro North': '#b7e19f', South: '#f2cf5b', 'Metro South': '#e98978', East: '#c07dbb' };
  var MEANC = '#404040';  // mean line
  var OUTC = '#555555';   // outlier circles
  var RED = '#9f2c4a';    // reliability standard
  var RS = 0.0002;        // reliability standard, % of annual consumption
  var YMAX = 0.3;
  var BOX = 'Box and whiskers', MEAN = 'Average', OUT = 'Outliers';
  var TOP0 = 66, TITLE = 26, GAP = 12;
  var GEOM = { lg: { cols: 2, plotH: 160, lab: 48 }, md: { cols: 2, plotH: 150, lab: 48 }, sm: { cols: 1, plotH: 120, lab: 52 } };
  var HEIGHT = {};
  Object.keys(GEOM).forEach(function (k) {
    var g = GEOM[k];
    g.pitch = TITLE + g.plotH + g.lab + GAP;
    HEIGHT[k] = TOP0 + Math.ceil(5 / g.cols) * g.pitch - GAP - TITLE + 4;
  });

  function sig(v) { // up to 4 significant digits, never exponent notation
    if (v == null || isNaN(v)) return '';
    return v === 0 ? '0' : Number(v).toLocaleString('en-AU', { maximumSignificantDigits: 4 });
  }
  function line(x1, y1, x2, y2, style) {
    return { type: 'line', shape: { x1: x1, y1: y1, x2: x2, y2: y2 }, style: style };
  }

  // Custom-series renderers. value = [category, lower whisker, Q1, median, Q3, upper whisker, mean].
  function glyph(t, color) {
    var ink = t.dark ? t.text : '#000000'; // black whiskers/caps; ink colour in dark mode
    var base = t.c(color);
    return function (params, api) {
      var i = api.value(0);
      var band = api.size([1, 0])[0];
      var cx = api.coord([i, 0])[0];
      var bw = band * 0.6, cw = band * 0.33;
      var y = function (k) { return api.coord([i, api.value(k)])[1]; };
      var yLo = y(1), yQ1 = y(2), yQ3 = y(4), yHi = y(5);
      var h = Math.max(yQ1 - yQ3, 1);
      var hh = Math.max(yLo - yHi, 12); // hover target: whisker range, at least 12px tall
      var wl = function (w) { return { stroke: ink, lineWidth: w }; };
      return {
        type: 'group',
        children: [
          { type: 'rect', shape: { x: cx - bw / 2, y: (yLo + yHi - hh) / 2, width: bw, height: hh }, style: { fill: 'rgba(0,0,0,0)' } },
          line(cx, yQ3, cx, yHi, wl(1.5)),
          line(cx, yQ1, cx, yLo, wl(1.5)),
          line(cx - cw / 2, yHi, cx + cw / 2, yHi, wl(1.75)),
          line(cx - cw / 2, yLo, cx + cw / 2, yLo, wl(1.75)),
          {
            type: 'rect', shape: { x: cx - bw / 2, y: (yQ1 + yQ3 - h) / 2, width: bw, height: h },
            style: { fill: t.alpha(base, t.dark ? 0.6 : 0.5), stroke: t.alpha(base, t.dark ? 0.95 : 0.8), lineWidth: 1.25 },
          },
        ],
      };
    };
  }
  function meanGlyph(t) {
    return function (params, api) {
      var i = api.value(0);
      var band = api.size([1, 0])[0];
      var cx = api.coord([i, 0])[0], ym = api.coord([i, api.value(6)])[1];
      var bw = band * 0.6;
      return line(cx - bw / 2 + 1, ym, cx + bw / 2 - 1, ym, { stroke: t.c(MEANC), lineWidth: 1.75, lineDash: [4, 3] });
    };
  }

  function layout(t) {
    var g = GEOM[t.size];
    var pct = function (px) { return (px / t.width) * 100 + '%'; };
    var left = t.size === 'sm' ? 52 : 54, right = t.size === 'sm' ? 12 : 16, gap = 66;
    var colW = g.cols === 2 ? (t.width - left - right - gap) / 2 : t.width - left - right;
    return [0, 1, 2, 3, 4].map(function (p) {
      var row = Math.floor(p / g.cols), col = p % g.cols;
      return { left: pct(left + col * (colW + gap)), width: pct(colW), top: TOP0 + row * g.pitch, height: g.plotH, containLabel: false };
    });
  }

  ESOO.register({
    id: 'Ch6_F.43',
    height: HEIGHT,
    legendItems: function (d, t) {
      return [
        { name: BOX, color: t.text2, shape: 'box' },
        { name: MEAN, color: t.c(MEANC), shape: 'line', dash: true },
        { name: OUT, color: t.c(OUTC), shape: 'dot' },
      ];
    },
    table: function (d, t) {
      var rows = [];
      d.regions.forEach(function (r) {
        d.years.forEach(function (y, i) {
          var s = r.stats[i];
          rows.push([r.name, y, s[0], s[1], s[2], s[3], s[7], s[4], s[5], s[6], s[8] + s[9], d.n[i]]);
        });
      });
      var nMin = Math.min.apply(null, d.n), nMax = Math.max.apply(null, d.n);
      return {
        columns: ['Sub-region', 'Capacity year', 'Minimum (%)', 'Lower whisker (%)', 'Q1 (%)', 'Median (%)', 'Mean (%)', 'Q3 (%)', 'Upper whisker (%)', 'Maximum (%)', 'Outliers', 'Iterations'],
        rows: rows,
        format: function (v, i) { return i >= 10 ? t.fmt.num(v, 0) : sig(v); },
        note: 'Box statistics computed from every modelled iteration in the sheet (' + t.fmt.num(nMin, 0) + ' to ' + t.fmt.num(nMax, 0) +
          ' iterations per Capacity Year). Quartiles use linear interpolation; whiskers reach the most extreme iteration within ' +
          '1.5 × IQR of Q1 and Q3; outliers are iterations beyond the whiskers. The dashed line in each box is the mean. Values ' +
          'are % of annual consumption; the reliability standard is 0.0002%. One sheet cell (Metro South, 2026-27) stores its ' +
          'value as text and is read as a number.',
      };
    },
    option: function (d, t) {
      var sm = t.size === 'sm';
      var grids = layout(t);
      var xAxes = [], yAxes = [], series = [];
      var fmtAxis = function (v) { return t.fmt.num(v, 3) + '%'; };
      d.regions.forEach(function (r, p) {
        var color = COLORS[r.name] || '#999999';
        var xa = t.cAxis({ data: d.years, rotate: sm ? 45 : 30, interval: 0 });
        xa.gridIndex = p;
        xa.offset = 6;
        xa.axisLabel.fontSize = 11;
        xAxes.push(xa);
        // panel title, as the name of an otherwise hidden top axis (moves with its grid)
        xAxes.push({
          type: 'category', gridIndex: p, position: 'top', data: [''], name: r.name, nameLocation: 'middle', nameGap: 10,
          nameTextStyle: { color: t.text, fontSize: 13, fontWeight: 600 },
          axisLine: { show: false }, axisTick: { show: false }, axisLabel: { show: false }, splitLine: { show: false },
        });
        var ya = t.vAxis({ name: p === 0 ? 'Unserved Energy (% of annual consumption)' : '', min: 0, max: YMAX, interval: 0.1, format: fmtAxis });
        ya.gridIndex = p;
        if (p === 0) ya.nameGap = TITLE + 14;
        yAxes.push(ya);

        var boxes = r.stats.map(function (s, i) { return { value: [i, s[1], s[2], s[3], s[4], s[5], s[7]], k: i, r: p }; });
        var custom = function (name, render, z, key) {
          return {
            name: name, type: 'custom', xAxisIndex: 2 * p, yAxisIndex: p, z: z, clip: true, renderItem: render,
            itemStyle: { color: key }, // legend/tooltip key colour; the glyph colours are set in the renderers
            dimensions: ['year', 'lo', 'q1', 'median', 'q3', 'hi', 'mean'], encode: { x: 0, y: [1, 5] }, data: boxes,
          };
        };
        series.push(custom(BOX, glyph(t, color), 3, t.text2));
        series.push(custom(MEAN, meanGlyph(t), 4, t.c(MEANC)));
        var outs = [];
        r.out.forEach(function (list, i) { list.forEach(function (o) { outs.push([i, o[0], o[1], p]); }); });
        series.push({
          name: OUT, type: 'scatter', xAxisIndex: 2 * p, yAxisIndex: p, z: 5, clip: false, symbolSize: sm ? 4.5 : 5,
          itemStyle: { color: 'rgba(0,0,0,0)', borderColor: t.c(OUTC), borderWidth: 1 }, data: outs,
        });
        var ml = t.markLine({ data: [{ yAxis: RS }], color: t.c(RED), width: 1.25, dash: [6, 4], label: false });
        ml.z = 6;
        series.push({ name: '_rs' + p, type: 'line', xAxisIndex: 2 * p, yAxisIndex: p, data: [], markLine: ml });
      });

      return {
        grid: grids,
        tooltip: t.tooltipItem({
          title: function (p) {
            var r = p.seriesType === 'scatter' ? p.value[3] : p.data.r;
            return d.regions[r].name + ' · ' + d.years[p.value[0]];
          },
          lines: function (p) {
            if (p.seriesType === 'scatter') {
              return [['Outlier', sig(p.value[1]) + '%'], ['Iterations at this value', t.fmt.num(p.value[2], 0)]];
            }
            var s = d.regions[p.data.r].stats[p.data.k];
            var pc = function (x) { return sig(x) + '%'; };
            return [
              ['Maximum', pc(s[6])], ['Upper whisker', pc(s[5])], ['Q3', pc(s[4])], ['Mean (dashed)', pc(s[7])],
              ['Median', pc(s[3])], ['Q1', pc(s[2])], ['Lower whisker', pc(s[1])], ['Minimum', pc(s[0])],
              ['Iterations', t.fmt.num(d.n[p.data.k], 0) + (s[8] + s[9] ? ' (' + t.fmt.num(s[8] + s[9], 0) + ' outliers)' : '')],
            ];
          },
        }),
        xAxis: xAxes,
        yAxis: yAxes,
        series: series,
      };
    },
  });
})();
