// Figure 34 (Ch5_F.34) — Modelled supply, demand profiles and expected unserved energy over two
// days in March 2027 (USE on Sun 21 Mar, weather reference year 2017-18) (MW).
// Picture-based: the register's chart is a pasted image; this is rebuilt from the sheet's
// half-hourly table (B27:S124, 97 points) with the picture as the design reference:
// - generation stacked bottom-up in the picture's legend order (Coal ... Unserved energy), then
//   Distributed PV, Headroom and Outages on top; ESR (charge) drawn below zero;
// - unscheduled operational demand (solid) and operational demand (dash-dot) lines;
// - ESR state of charge (%) dashed on the right axis, scaled as in the picture (0 % on 0 MW,
//   100 % on 8,000 MW, so the right axis runs -25..100 with the negative tick unlabelled);
// - x axis crosses at 0 MW with labels every 6 hours, as in the picture;
// - colours sampled from the picture (ESR (charge) is the ESR purple at 55 % opacity).
// Numbered callouts 1-4 sit where the picture has them (centres measured in the picture and
// converted to time and MW); the report text on pages 89-90 explains them.
(function () {
  var SOC_COL = 'ESR State of Charge (%)';
  var SOC = 'ESR SoC (%)'; // label in the picture's legend
  var PURPLE = '#A3519B';
  var STACK = [
    ['Coal', '#373A36'],
    ['Wind', '#A1D884'],
    ['Solar', '#FFB81C'],
    ['Distillate', '#E56A54'],
    ['Gas', '#40C1AC'],
    ['Waste', '#E3E48D'],
    ['ESR (discharge)', PURPLE],
    ['Demand-side participation', '#606EB2'],
    ['Unserved energy', '#9B2242'],
    ['Distributed PV', '#F8E08E'],
    ['Headroom', '#F3DCF4'],
    ['Outages', '#D3D3D3'],
  ];
  // [interval index, MW, number]
  var CALLOUTS = [[8, 3450, 1], [19, -430, 2], [87, 5100, 3], [93, 1050, 4]];
  var DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  var HEIGHT = { lg: 500, md: 470, sm: 420 };

  function stamp(t, iso) {
    var m = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}:\d{2})/.exec(iso);
    if (!m) return iso;
    var wd = DAYS[new Date(Date.UTC(+m[1], +m[2] - 1, +m[3])).getUTCDay()];
    return wd + ' ' + t.fmt.date(iso, 'd mmm yyyy') + ', ' + m[4];
  }

  // Axis tooltip: SoC, the demand lines, then the stack top-down and ESR (charge) last (series
  // order reversed); zero rows hidden. Same markup as t.tooltipAxis, but areas get square keys.
  function tooltip(t) {
    var tip = t.tooltipAxis({});
    tip.formatter = function (params) {
      params = [].concat(params || []);
      if (!params.length) return '';
      var esc = ESOO.esc;
      var html = '<div class="tt"><div class="tt-head">' + esc(stamp(t, params[0].axisValue)) + '</div>';
      params.slice().reverse().forEach(function (p) {
        var v = p.value;
        if (!p.seriesName || p.seriesName.charAt(0) === '_' || v == null || Number(v) === 0) return;
        var line = p.seriesName === SOC || /demand$/.test(p.seriesName);
        var val = p.seriesName === SOC ? t.fmt.num(v, 1) + '%' : t.fmt.num(v, 0) + ' MW';
        html += '<div class="tt-row"><span class="tt-key tt-key--' + (line ? 'line' : 'rect') + '" style="background:' + esc(p.color) + '"></span>' +
          '<b>' + esc(val) + '</b><span>' + esc(p.seriesName) + '</span></div>';
      });
      return html + '</div>';
    };
    return tip;
  }

  ESOO.register({
    id: 'Ch5_F.34',
    height: HEIGHT,
    legendOrder: STACK.map(function (s) { return s[0]; }).concat(['Unscheduled operational demand', 'Operational demand', 'ESR (charge)', SOC]),
    table: function (d) {
      return {
        columns: ['Date and time'].concat(d.series.map(function (s) { return s.name; })),
        rows: d.time.map(function (ts, i) {
          return [ts.replace('T', ' ')].concat(d.series.map(function (s) { return s.values[i]; }));
        }),
        decimals: [0].concat(d.series.map(function (s) { return s.name === SOC_COL ? 1 : 0; })),
        note: 'Values as in the register (MW; state of charge in %). ESR (charge) is listed as a positive number and drawn below zero.',
      };
    },
    option: function (d, t) {
      var col = {};
      d.series.forEach(function (s) { col[s.name] = s.values; });
      var black = t.c('#000000');
      var purple = t.c(PURPLE);
      var step = t.size === 'sm' ? 24 : 12; // label every 12 h on phones, every 6 h otherwise

      var series = [{
        name: 'ESR (charge)',
        type: 'line',
        stack: 'charge',
        legendShape: 'rect',
        data: col['ESR (charge)'].map(function (v) { return v ? -v : 0; }),
        lineStyle: { width: 1, color: t.alpha(purple, 0.7) },
        areaStyle: { color: t.alpha(purple, 0.55), opacity: 1 },
        itemStyle: { color: t.alpha(purple, 0.55), borderColor: t.alpha(purple, 0.7), borderWidth: 1 }, // border: legend swatch
        z: 2,
      }].concat(STACK.map(function (s) {
        var c = t.c(s[1]);
        return {
          name: s[0],
          type: 'line',
          stack: 'supply',
          data: col[s[0]],
          lineStyle: { width: 0, opacity: 0 },
          areaStyle: { color: c, opacity: 1 },
          itemStyle: { color: c },
          z: 2,
        };
      })).concat([{
        name: 'Unscheduled operational demand',
        type: 'line',
        data: col['Unscheduled operational demand'],
        lineStyle: { color: black, width: 2 },
        itemStyle: { color: black },
        z: 4,
      }, {
        name: 'Operational demand',
        type: 'line',
        data: col['Operational demand'],
        lineStyle: { color: black, width: 1.75, type: t.dash('dashDot', 1.75) },
        itemStyle: { color: black },
        z: 5,
      }, {
        name: SOC,
        type: 'line',
        yAxisIndex: 1,
        data: col[SOC_COL],
        lineStyle: { color: purple, width: 1.75, type: t.dash('dash', 1.75) },
        itemStyle: { color: purple },
        z: 6,
      }, {
        name: '_callouts',
        type: 'scatter',
        silent: true,
        symbolSize: t.pick({ lg: 22, md: 20, sm: 17 }),
        data: CALLOUTS.map(function (c) {
          // phones: callout 2 would sit on the "12:00" label, so it drops below the label row
          var y = t.size === 'sm' && c[2] === 2 ? -1150 : c[1];
          return { value: [c[0], y], label: { formatter: String(c[2]) } };
        }),
        itemStyle: { color: t.c('#6B3077'), opacity: 1 },
        label: { show: true, position: 'inside', color: '#ffffff', fontSize: t.size === 'sm' ? 10 : 12, fontWeight: 700 },
        labelLayout: { hideOverlap: false },
        z: 8,
      }]);

      // The picture's time axis crosses at 0 MW with its labels there, and "Date" under the plot.
      // ECharts' onZero moves only the axis line, so the plot height is fixed (containLabel off)
      // and the whole axis is shifted up to 0 MW with `offset`; nameGap puts the title back below.
      var grid = { top: 40, bottom: 30, left: t.pick({ lg: 52, md: 50, sm: 46 }), right: t.pick({ lg: 40, md: 38, sm: 34 }), containLabel: false };
      var zeroUp = (t.pick(HEIGHT) - grid.top - grid.bottom) * 2000 / 10000; // px from -2,000 to 0 MW
      var xAxis = t.cAxis({
        data: d.time,
        boundaryGap: false,
        name: 'Date',
        nameGap: zeroUp + 9,
        interval: function (i) { return i % step === 0; },
        format: function (v) { return /T00:00$/.test(v) ? t.fmt.date(v, 'mmm-dd') : v.slice(11, 16); },
      });
      xAxis.position = 'bottom';
      xAxis.offset = -zeroUp;

      return {
        grid: grid,
        tooltip: tooltip(t),
        xAxis: xAxis,
        yAxis: [
          t.vAxis({ name: 'Generation, ESR and demand (MW)', min: -2000, max: 8000, interval: 2000, numFmt: '#,##0' }),
          t.vAxis({
            name: 'SoC (%)', position: 'right', min: -25, max: 100, interval: 25, grid: false,
            format: function (v) { return v < 0 ? '' : t.fmt.num(v, 0); },
          }),
        ],
        series: series,
      };
    },
  });
})();
