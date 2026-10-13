// Appendix Figure 27 (A4_F.27) — Simulated unserved energy duration, magnitude and frequency for 2030-31.
// In the register this figure is a pasted picture; it is rebuilt from the sheet (B23:D63): one bubble per
// duration bin (0.5 h) and magnitude bin (2.5% of average unscheduled operational demand), bubble AREA
// proportional to frequency, as in the picture: diameter = 107 px * sqrt(frequency) on the picture's
// 640 x 352 px plot, scaled with the plot size here (at least 3 px). The zero point (0 h, 0%, 71%) is drawn
// not to scale, as the published figure notes. The shaded region "USE greater than the reliability
// standard" is not in the sheet: its boundary, magnitude (%) = 1.752 / duration (h), was fitted to the
// register picture (see scripts/prep/A4_F.27.py). The picture's size key (top right, boxed) is drawn in
// data coordinates so it stays inside the plot in the PNG export; the picture's in-plot label for the
// shaded region is an HTML legend entry here. An invisible '_hit' copy of the bubbles (at least 14 px)
// makes the smallest bubbles easy to hover.
(function () {
  var HEIGHT = { lg: 480, md: 460, sm: 420 };
  var REGION = 'USE greater than the reliability standard';
  var BUBBLES = 'Frequency (bubble area)';
  var XMAX = 6, YMAX = 30;

  function geom(t) {
    // approximate plot area (grid below, y labels ~30 px, x labels ~20 px)
    var H = t.pick(HEIGHT);
    return { w: Math.max(200, t.width - 8 - 16 - 30), h: Math.max(160, H - 40 - 28 - 20) };
  }
  function scale(t) {
    // the picture's plot is 640 x 352 px, with bubble diameter ~107 px * sqrt(f) and a ~56 px zero bubble;
    // scale both with the plot, limited by whichever side is relatively smaller
    var g = geom(t);
    var s = Math.min(g.w / 640, g.h / 352);
    return {
      size: function (f) { return Math.max(3, 107 * s * Math.sqrt(f)); },
      zero: Math.max(30, 56 * s), // not to scale
    };
  }
  function regionFill(t, d) { return t.dark ? t.alpha(d.colors.region, 0.2) : d.colors.region; }
  function isZero(v) { return v[0] === 0 && v[1] === 0; }
  function freqText(t, f) {
    var n = 1 / f;
    return t.fmt.auto(f * 100, 4) + '% (~1 in ' + (n >= 10 ? t.fmt.num(n, 0) : t.fmt.num(n, 1)) + ')';
  }

  ESOO.register({
    id: 'A4_F.27',
    height: HEIGHT,
    legendItems: function (d, t) {
      return [
        { name: BUBBLES, color: t.c(d.colors.bubble), shape: 'dot', also: ['_hit'] },
        { name: REGION, color: regionFill(t, d), shape: 'rect' },
      ];
    },
    table: function (d) {
      return {
        columns: ['Average duration (h)', '% of average unscheduled operational demand', 'Frequency (%)'],
        rows: d.points.map(function (p) { return [p[0], p[1], p[2] * 100]; }),
        decimals: [1, 1, 4],
        note: 'Bubble area is proportional to frequency; the frequencies of the ' + d.points.length + ' bins sum to 100%. ' +
          'The zero-point bubble (0 h, 0%) is not to scale. The shaded region is not in the sheet: its boundary, ' +
          'magnitude (%) = ' + d.boundary + ' / duration (h), was fitted to the chart picture in the register.',
      };
    },
    option: function (d, t) {
      var g = geom(t), sc = scale(t);
      var bubble = t.c(d.colors.bubble);
      var fill = regionFill(t, d);

      // boundary of the shaded region, from where it leaves the top of the plot to x = 6 h
      var c = d.boundary, x0 = c / YMAX, curve = [];
      for (var i = 0; i <= 200; i++) {
        var x = x0 * Math.pow(XMAX / x0, i / 200);
        curve.push([x, c / x]);
      }

      var bubbles = d.points.map(function (p) {
        var zero = isZero(p);
        var item = { value: p, symbolSize: zero ? sc.zero : sc.size(p[2]) };
        if (zero) {
          item.label = {
            show: true, position: 'inside', color: '#ffffff', fontWeight: 600, fontSize: t.size === 'sm' ? 11 : 14,
            formatter: function () { return Math.round(p[2] * 100) + '%'; },
          };
        }
        return item;
      });
      var hits = d.points.map(function (p) {
        return { value: p, symbolSize: Math.max(14, isZero(p) ? sc.zero : sc.size(p[2])) };
      });

      // size key of the picture (top right, boxed), placed in data units so it moves with the plot
      var hx = XMAX / g.w, py = YMAX / g.h;
      var pad = 8, rowH = 18, boxW = 204;
      var bx2 = XMAX - 8 * hx, bx1 = bx2 - boxW * hx;
      var by2 = YMAX - 8 * py, by1 = by2 - (2 * pad + 4 * rowH) * py;
      var keyData = [];
      d.key.forEach(function (k, i) {
        var yy = by2 - (pad + rowH * (i + 0.5)) * py;
        keyData.push({ value: [bx1 + (pad + 9) * hx, yy], symbolSize: sc.size(k[1]), itemStyle: { color: bubble } });
        keyData.push({
          value: [bx1 + (pad + 24) * hx, yy], symbolSize: 0,
          label: { show: true, position: 'right', distance: 0, color: t.text2, fontSize: 12, formatter: k[0] },
        });
      });
      keyData.push({
        value: [bx1 + pad * hx, by2 - (pad + rowH * 3.5) * py], symbolSize: 0,
        label: { show: true, position: 'right', distance: 0, color: t.muted, fontSize: 11, fontStyle: 'italic', formatter: 'Zero-point bubble is not to scale' },
      });

      var xAxis = {
        type: 'value', min: 0, max: XMAX, interval: 1,
        name: 'Average duration for events in simulation (hours)', nameLocation: 'middle', nameGap: 30,
        nameTextStyle: { color: t.text2, fontSize: 12, fontWeight: 600 },
        // the 0 labels sit under the zero-point bubble in the picture
        axisLabel: { color: t.text2, fontSize: 12, showMinLabel: false, formatter: function (v) { return v >= XMAX ? '≥ ' + XMAX : t.fmt.auto(v); } },
        axisLine: { show: true, onZero: false, lineStyle: { color: t.axis } },
        axisTick: { show: false },
        splitLine: { show: false },
      };
      return {
        grid: { top: 40, right: 16, bottom: 28, left: 8, containLabel: true },
        tooltip: t.tooltipItem({
          title: function (p) {
            var v = p.value;
            return isZero(v) ? 'No unserved energy (0 h, 0%)' : t.fmt.auto(v[0]) + ' h, ' + t.fmt.auto(v[1]) + '% of demand';
          },
          lines: function (p) {
            var v = p.value;
            var out = [
              ['Average duration of events', t.fmt.auto(v[0]) + ' h'],
              ['% of average unscheduled operational demand', t.fmt.auto(v[1]) + '%'],
              ['Frequency', freqText(t, v[2])],
            ];
            if (isZero(v)) out.push(['Bubble size', 'not to scale']);
            return out;
          },
        }),
        xAxis: xAxis,
        yAxis: (function () {
          var ya = t.vAxis({
            name: '% of Average Unscheduled Operational Demand', min: 0, max: YMAX, interval: 10, grid: false, axisLine: true,
            format: function (v) { return v + '%'; },
          });
          ya.axisLabel.showMinLabel = false;
          return ya;
        })(),
        series: [
          {
            name: REGION, type: 'line', data: curve, symbol: 'none', silent: true, z: 1,
            lineStyle: { color: t.c(d.colors.boundary), width: 1.25 },
            itemStyle: { color: fill },
            areaStyle: { color: fill, origin: 'end', opacity: 1 },
            tooltip: { show: false },
          },
          {
            name: '_hit', type: 'scatter', data: hits, clip: false, z: 2,
            itemStyle: { color: bubble, opacity: 0 }, emphasis: { disabled: true },
          },
          {
            name: BUBBLES, type: 'scatter', data: bubbles, clip: false, z: 3,
            itemStyle: { color: bubble, opacity: 1 },
          },
          {
            name: '_key', type: 'scatter', data: keyData, clip: false, silent: true, z: 5,
            tooltip: { show: false },
            itemStyle: { color: bubble },
          },
          {
            // the key's box (a custom series: a series markArea is always drawn at z 1, under the region)
            name: '_keybox', type: 'custom', silent: true, clip: false, z: 4,
            tooltip: { show: false },
            data: [[bx1, by1, bx2, by2]],
            encode: { x: [0, 2], y: [1, 3] },
            renderItem: function (params, api) {
              var a = api.coord([api.value(0), api.value(3)]);
              var b = api.coord([api.value(2), api.value(1)]);
              return {
                type: 'rect',
                shape: { x: Math.round(a[0]) + 0.5, y: Math.round(a[1]) + 0.5, width: Math.round(b[0] - a[0]), height: Math.round(b[1] - a[1]) },
                style: { fill: t.surface, stroke: t.c(d.colors.boundary), lineWidth: 1 },
              };
            },
          },
        ],
      };
    },
  });
})();
