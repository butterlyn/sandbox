// Appendix Figure 28 (A4_F.28) — Modelled outcomes across a two-day period capturing an unserved
// energy event (top), battery utilisation (middle) and gas utilisation (bottom), 1-3 July 2032 (MW).
// Picture-based: the register holds two pasted images (dispatch panel; battery and gas panels)
// and the half-hourly table B43:AB140 (97 points). Rebuilt as one option with three grids that
// share the time axis (axisPointer linked); the tooltip lists the panel under the pointer.
// - Top: as Figure 35 (same data) plus an "Essential System Services" band between Distributed PV
//   and Thermal headroom. The register has no column for it; the prep script computes it as
//   Gas Regulation Raise + Gas Contingency Reserve Raise + ESR Regulation Raise + ESR Contingency
//   Reserve Raise, which reproduces the band in the picture. Legend labels as in the picture
//   (Headroom = Thermal headroom, Outages = Forced outages, ESR (charge) = ESR Withdrawal, drawn
//   below zero). SoC (%) on the right, 0 % on 0 MW and 100 % on 8,000 MW as in the picture; the
//   time axis crosses at 0 MW.
// - Middle (battery): Injection = ESR (discharge), Regulation Raise, Contingency Reserve Raise,
//   Planned Outage = ESR Maintenance, Forced Outage = ESR Forced Outage (both zero throughout),
//   Withdrawal = ESR (charge) below zero; Available Capacity = ESR Available Capacity (it equals
//   injection + the two raise services); SoC (%) dashed on the right axis (0-100).
// - Bottom (gas): Generation = Gas, Regulation Raise, Contingency Reserve Raise, Headroom = Gas
//   Headroom, Forced Outage = Outages (gas available capacity + outages is constant at 2,921 MW,
//   the band's flat top in the picture); Available Capacity = Gas Available Capacity. The
//   picture's "Planned Outage" entry for gas has no data in the register and is left out.
// Colours sampled from the pictures (Injection and Generation are the ESR purple and gas teal at
// 85 % opacity; withdrawal is the ESR purple at 55 %).
(function () {
  var PURPLE = '#A3519B';
  var SOC_COL = 'ESR State of Charge (%)';
  var SOC = 'ESR SoC (%)';
  var HEIGHT = { lg: 1080, md: 1020, sm: 940 };
  var PANELS = ['Modelled outcomes', 'Battery utilisation', 'Gas utilisation'];
  var LINES = { 'Unscheduled operational demand': 1, 'Operational demand': 1, 'ESR SoC (%)': 1, 'Available Capacity': 1 };
  // [sheet column, legend label, colour], each panel's stack bottom-up
  var TOP = [
    ['Wind', 'Wind', '#A1D884'],
    ['Solar', 'Solar', '#FFB81C'],
    ['Distillate', 'Distillate', '#E56A54'],
    ['Gas', 'Gas', '#40C1AC'],
    ['Waste', 'Waste', '#E3E48D'],
    ['ESR (discharge)', 'ESR (discharge)', PURPLE],
    ['Demand-side participation', 'Demand-side participation', '#606EB2'],
    ['Unserved Energy', 'Unserved Energy', '#9B2242'],
    ['Distributed PV', 'Distributed PV', '#F8E08E'],
    ['Essential System Services', 'Essential System Services', '#E3F4F8'],
    ['Headroom', 'Thermal headroom', '#F5E3F6'],
    ['Outages', 'Forced outages', '#C5C5C5'],
  ];
  var BATTERY = [
    ['ESR (discharge)', 'Injection', '#B16CAA'],
    ['ESR Regulation Raise', 'Regulation Raise', '#C8CCE4'],
    ['ESR Contingency Reserve Raise', 'Contingency Reserve Raise', '#DFF2F7'],
    ['ESR Maintenance', 'Planned Outage', '#B9B9B9'],
    ['ESR Forced Outage', 'Forced Outage', '#DCDCDC'],
  ];
  var GAS = [
    ['Gas', 'Generation', '#5DCAB9'],
    ['Gas Regulation Raise', 'Regulation Raise', '#C8CCE4'],
    ['Gas Contingency Reserve Raise', 'Contingency Reserve Raise', '#DFF2F7'],
    ['Gas Headroom', 'Headroom', '#F3DDF4'],
    ['Outages', 'Forced Outage', '#DCDCDC'],
  ];
  var DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  var hover = { grid: 0 }; // grid under the pointer, kept up to date by after()

  function stamp(t, iso) {
    var m = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}:\d{2})/.exec(iso);
    if (!m) return iso;
    var wd = DAYS[new Date(Date.UTC(+m[1], +m[2] - 1, +m[3])).getUTCDay()];
    return wd + ' ' + t.fmt.date(iso, 'd mmm yyyy') + ', ' + m[4];
  }
  function neg(v) { return v ? -v : 0; }

  ESOO.register({
    id: 'A4_F.28',
    height: HEIGHT,
    legendOrder: TOP.map(function (s) { return s[1]; }).concat([
      'Unscheduled operational demand', 'Operational demand', 'ESR Withdrawal', SOC,
      'Injection', 'Regulation Raise', 'Contingency Reserve Raise', 'Planned Outage', 'Forced Outage', 'Withdrawal',
      'Available Capacity', 'Generation', 'Headroom',
    ]),
    table: function (d) {
      var all = d.series.concat(d.derived.map(function (s) { return { name: s.name + ' (derived)', values: s.values }; }));
      return {
        columns: ['Date and time'].concat(all.map(function (s) { return s.name; })),
        rows: d.time.map(function (ts, i) {
          return [ts.replace('T', ' ')].concat(all.map(function (s) { return s.values[i]; }));
        }),
        decimals: [0].concat(all.map(function (s) { return s.name === SOC_COL ? 1 : 0; })),
        note: 'Columns as in the register (MW; state of charge in %); ESR (charge) is positive here and drawn below zero. ' +
          'Essential System Services (derived) = Gas Regulation Raise + Gas Contingency Reserve Raise + ESR Regulation Raise + ESR Contingency Reserve Raise. ' +
          'Legend names: top panel Headroom = Thermal headroom, Outages = Forced outages, ESR (charge) = ESR Withdrawal; ' +
          'battery panel Injection = ESR (discharge), Withdrawal = ESR (charge), Planned Outage = ESR Maintenance; gas panel Generation = Gas, Forced Outage = Outages.',
      };
    },
    option: function (d, t) {
      var col = {};
      d.series.concat(d.derived).forEach(function (s) { col[s.name] = s.values; });
      var black = t.c('#000000');
      var purple = t.c(PURPLE);
      var step = t.size === 'sm' ? 24 : 12; // label every 12 h on phones, every 6 h otherwise

      // Layout: three plots of fixed height (containLabel off so their time axes line up).
      // Above each plot: room for the axis titles; below: the "Date" title (top panel, whose
      // labels sit on 0 MW) or the labels and "Date" (battery and gas panels).
      var H = t.pick(HEIGHT);
      var left = t.pick({ lg: 56, md: 54, sm: 48 });
      var right = t.pick({ lg: 40, md: 38, sm: 34 });
      var TITLE = 36, DATE0 = 30, DATE = 50, GAP = 14;
      var avail = H - 3 * TITLE - DATE0 - 2 * DATE - 2 * GAP;
      var h = [Math.round(avail * 0.5), Math.round(avail * 0.27)];
      h.push(avail - h[0] - h[1]);
      var top = [TITLE, TITLE + h[0] + DATE0 + GAP + TITLE];
      top.push(top[1] + h[1] + DATE + GAP + TITLE);
      var grid = [0, 1, 2].map(function (i) {
        return { left: left, right: right, top: top[i], height: h[i], bottom: H - top[i] - h[i], containLabel: false };
      });
      var zeroUp = h[0] * 2000 / 10000; // top panel: px from -2,000 to 0 MW

      var series = [];
      var gridOf = []; // seriesIndex -> panel
      function add(s, g) {
        s.xAxisIndex = g;
        gridOf.push(g);
        series.push(s);
      }
      function area(spec, stack, g, y) {
        var c = t.c(spec[2]);
        add({
          name: spec[1], type: 'line', stack: stack, yAxisIndex: y, data: col[spec[0]],
          lineStyle: { width: 0, opacity: 0 }, areaStyle: { color: c, opacity: 1 }, itemStyle: { color: c }, z: 2,
        }, g);
      }
      function withdrawal(name, g, y) {
        add({
          name: name, type: 'line', stack: 'withdrawal' + g, legendShape: 'rect', yAxisIndex: y,
          data: col['ESR (charge)'].map(neg),
          lineStyle: { width: 1, color: t.alpha(purple, 0.7) },
          areaStyle: { color: t.alpha(purple, 0.55), opacity: 1 },
          itemStyle: { color: t.alpha(purple, 0.55) }, z: 2,
        }, g);
      }
      function line(name, data, color, width, dash, g, y, z) {
        add({
          name: name, type: 'line', yAxisIndex: y, data: data,
          lineStyle: { color: color, width: width, type: dash ? t.dash(dash, width) : 'solid' },
          itemStyle: { color: color }, z: z,
        }, g);
      }

      // top: supply, demand and USE
      withdrawal('ESR Withdrawal', 0, 0);
      TOP.forEach(function (s) { area(s, 'supply', 0, 0); });
      line('Unscheduled operational demand', col['Unscheduled operational demand'], black, 2, null, 0, 0, 4);
      line('Operational demand', col['Operational demand'], black, 1.75, 'dashDot', 0, 0, 5);
      line(SOC, col[SOC_COL], purple, 1.75, 'dash', 0, 1, 6);
      // middle: battery
      withdrawal('Withdrawal', 1, 2);
      BATTERY.forEach(function (s) { area(s, 'battery', 1, 2); });
      line('Available Capacity', col['ESR Available Capacity'], black, 2, null, 1, 2, 4);
      line(SOC, col[SOC_COL], purple, 1.75, 'dash', 1, 3, 6);
      // bottom: gas
      GAS.forEach(function (s) { area(s, 'gas', 2, 4); });
      line('Available Capacity', col['Gas Available Capacity'], black, 2, null, 2, 4, 4);

      var xAxis = [0, 1, 2].map(function (g) {
        var ax = t.cAxis({
          data: d.time,
          boundaryGap: false,
          name: 'Date',
          nameGap: g === 0 ? zeroUp + 9 : 28,
          interval: function (i) { return i % step === 0; },
          format: function (v) { return /T00:00$/.test(v) ? t.fmt.date(v, 'mmm-dd') : v.slice(11, 16); },
        });
        ax.gridIndex = g;
        ax.position = 'bottom';
        // top panel: the axis (labels included) sits on 0 MW as in the picture; onZero would move
        // only the line, so the axis is shifted up by the plot's -2,000..0 MW height instead
        if (g === 0) ax.offset = -zeroUp;
        return ax;
      });
      function y(g, o) {
        var ax = t.vAxis(o);
        ax.gridIndex = g;
        return ax;
      }
      // battery MW axis: the picture autoscales to about -1,160..1,410 with ticks at multiples of
      // 500; ECharts steps a fixed interval from min, so the range is widened to -1,500..1,500
      var battery = y(1, { name: 'MW', min: -1500, max: 1500, interval: 500, numFmt: '#,##0' });

      var tip = t.tooltipAxis({});
      tip.formatter = function (params) {
        params = [].concat(params || []);
        if (!params.length) return '';
        var g = hover.grid;
        var rows = params.filter(function (p) { return gridOf[p.seriesIndex] === g; });
        if (!rows.length) {
          g = gridOf[params[0].seriesIndex];
          rows = params.filter(function (p) { return gridOf[p.seriesIndex] === g; });
        }
        var esc = ESOO.esc;
        var html = '<div class="tt"><div class="tt-head">' + esc(stamp(t, params[0].axisValue)) + '</div>' +
          '<div class="tt-row tt-kv"><span>' + esc(PANELS[g]) + '</span></div>';
        rows.reverse().forEach(function (p) {
          var v = p.value;
          if (!p.seriesName || p.seriesName.charAt(0) === '_' || v == null || Number(v) === 0) return;
          var val = p.seriesName === SOC ? t.fmt.num(v, 1) + '%' : t.fmt.num(v, 0) + ' MW';
          html += '<div class="tt-row"><span class="tt-key tt-key--' + (LINES[p.seriesName] ? 'line' : 'rect') + '" style="background:' + esc(p.color) + '"></span>' +
            '<b>' + esc(val) + '</b><span>' + esc(p.seriesName) + '</span></div>';
        });
        return html + '</div>';
      };

      return {
        grid: grid,
        axisPointer: { link: [{ xAxisIndex: 'all' }] },
        tooltip: tip,
        xAxis: xAxis,
        yAxis: [
          y(0, { name: 'Generation, ESR and demand (MW)', min: -2000, max: 8000, interval: 2000, numFmt: '#,##0' }),
          y(0, {
            name: 'SoC (%)', position: 'right', min: -25, max: 100, interval: 25, grid: false,
            format: function (v) { return v < 0 ? '' : t.fmt.num(v, 0); },
          }),
          battery,
          y(1, { name: 'SoC (%)', position: 'right', min: 0, max: 100, interval: 20, grid: false }),
          y(2, { name: 'MW', min: 0, max: 3000, interval: 1000, numFmt: '#,##0' }),
        ],
        series: series,
      };
    },
    // Track which plot the pointer is over (capture phase, so it runs before ECharts updates the
    // tooltip) so the shared tooltip lists only that panel's series.
    after: function (chart) {
      var dom = chart.getDom();
      var events = ['pointerdown', 'pointermove', 'mousemove'];
      if (dom.__a4f28) events.forEach(function (e) { dom.removeEventListener(e, dom.__a4f28, true); });
      dom.__a4f28 = function (e) {
        if (chart.isDisposed()) return;
        var r = dom.getBoundingClientRect();
        var xy = [e.clientX - r.left, e.clientY - r.top];
        for (var g = 0; g < 3; g++) {
          if (chart.containPixel({ gridIndex: g }, xy)) { hover.grid = g; return; }
        }
      };
      events.forEach(function (e) { dom.addEventListener(e, dom.__a4f28, { capture: true, passive: true }); });
    },
  });
})();
