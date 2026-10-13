// Appendix Figure 25 (A4_F.25) — Largest daily unserved energy events from each weather reference
// year, coloured according to system conditions, 2026-27 to 2029-30.
// The register holds this chart as a picture; it is rebuilt from the sheet's event table (Date,
// Operational demand, Unserved Energy, Cause) as the same bubble chart: x = event date (time axis
// Oct-26 to Oct-30, quarterly ticks), y = operational demand (MW), bubble area proportional to USE
// (MWh) with a minimum dot size (largest bubble about 4.2% of the plot width, as in the picture),
// colour = system conditions (legend colours sampled from the picture; 0.8 fill opacity like its
// bubbles, with a thin surface-coloured ring instead of its dark outline). Each condition is split
// into 2-px size bands (same series name, so the legend toggles them together; z rises as size
// falls) so large bubbles draw first and small ones stay on top across conditions.
// Data (see scripts/prep/A4_F.25.py): only the 22 events dated 2026-27 to 2029-30 are plotted (the
// sheet also lists 44 from 2030-31). The sheet's Cause column sits one row above the events it
// describes; it is re-aligned to match the published figure and the report's Figure 34 sample day,
// and the first event's condition, which falls outside the table, is read from the picture.
// The '850 MWh' callout marks 21 March 2027, the sample day in the report's Figure 34.
ESOO.register({
  id: 'A4_F.25',
  height: { lg: 480, md: 440, sm: 380 },
  table: function (d, t) {
    var rows = d.events
      .slice()
      .sort(function (a, b) { return a[0] < b[0] ? -1 : a[0] > b[0] ? 1 : b[2] - a[2]; })
      .map(function (e) { return [e[0], e[1], e[2], d.categories[e[3]].name + (e[4] ? ' *' : '')]; });
    return {
      columns: ['Date', 'Operational demand (MW)', 'Unserved energy (MWh)', 'Cause'],
      rows: rows,
      decimals: [null, 2, 2, null],
      note:
        'Events dated 1 October 2026 to 30 September 2030, as plotted; the sheet also lists ' + d.outside +
        ' events from 2030-31, outside this figure. In the sheet each Cause sits one row above the event it ' +
        'describes; causes are re-aligned here to match the published figure. * Not in the sheet (the shift ' +
        'leaves the first event without one): read from the published figure.',
    };
  },
  option: function (d, t) {
    var MON = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    var DAY = 864e5;
    var f2 = t.fmt.excel('#,##0.00');
    function ts(iso) { return Date.UTC(+iso.slice(0, 4), +iso.slice(5, 7) - 1, +iso.slice(8, 10)); }
    function isoOf(v) { return new Date(v).toISOString().slice(0, 10); }

    // bubble diameter: area proportional to USE; largest about 4.2% of the plot width, minimum dot
    var plotW = Math.max(260, t.width - 72);
    var maxUse = 0;
    d.events.forEach(function (e) { maxUse = Math.max(maxUse, e[2]); });
    var maxD = Math.min(48, Math.max(22, plotW * 0.042));
    var minD = Math.min(8, Math.max(5, plotW * 0.0075));
    function diam(use) { return Math.max(minD, maxD * Math.sqrt(use / maxUse)); }
    // draw order: 2-px diameter bands, largest first, so small bubbles stay on top across conditions
    var nTier = Math.floor((maxD - minD) / 2) + 1;
    function tier(use) { var s = diam(use); return s <= minD ? nTier : Math.floor((maxD - s) / 2); }

    // events arrive sorted by USE (largest first), so each band also draws large to small
    var bands = {};
    d.events.forEach(function (e) {
      var key = e[3] + ':' + tier(e[2]);
      (bands[key] = bands[key] || []).push([ts(e[0]), e[1], e[2], e[4] || 0]);
    });
    var series = [];
    d.categories.forEach(function (c, ci) {
      var col = t.c(c.color);
      for (var k = 0; k <= nTier; k++) {
        var data = bands[ci + ':' + k];
        if (!data) continue;
        series.push({
          name: c.name,
          type: 'scatter',
          z: 2 + k,
          data: data,
          symbolSize: function (v) { return diam(v[2]); },
          itemStyle: { color: col, opacity: 0.8, borderColor: t.surface, borderWidth: t.size === 'sm' ? 0.75 : 1 },
          emphasis: { focus: 'none', scale: 1.15, itemStyle: { color: col, opacity: 1, borderColor: t.text, borderWidth: 1.25 } },
        });
      }
    });

    // the picture's callout: a ring around the highlighted bubble, and a leader from its upper-right
    // edge to a boxed label
    var co = d.callout;
    var hit = d.events.filter(function (e) { return e[0] === co.date && e[1] === co.demand; })[0];
    series.push({
      name: d.categories[hit[3]].name, // hides with its condition when that is toggled off
      type: 'custom',
      silent: true,
      z: 60, // above every size band
      itemStyle: { color: t.c(d.categories[hit[3]].color) },
      data: [[ts(co.date), co.demand, hit[2]]],
      renderItem: function (params, api) {
        var p = api.coord([api.value(0), api.value(1)]);
        var r = diam(api.value(2)) / 2 + 1;
        var leg = t.pick({ lg: 40, md: 34, sm: 24 });
        var run = t.pick({ lg: 26, md: 22, sm: 14 });
        var fs = t.pick({ lg: 15, md: 14, sm: 12 });
        var a = [p[0] + (r + 1) * Math.SQRT1_2, p[1] - (r + 1) * Math.SQRT1_2];
        var b = [a[0] + leg, a[1] - leg];
        var c = [b[0] + run, b[1]];
        return {
          type: 'group',
          children: [
            { type: 'circle', shape: { cx: p[0], cy: p[1], r: r + 1 }, style: { stroke: t.text2, lineWidth: 1.25, fill: null } },
            { type: 'polyline', shape: { points: [a, b, c] }, style: { stroke: t.text2, lineWidth: 1.25, fill: null } },
            {
              type: 'text',
              x: c[0],
              y: c[1],
              style: {
                text: co.label, fill: t.text, font: '500 ' + fs + 'px ' + t.font, align: 'left', verticalAlign: 'middle',
                backgroundColor: t.grid, borderColor: t.text2, borderWidth: 1, padding: t.size === 'sm' ? [4, 8] : [6, 16],
              },
            },
          ],
        };
      },
    });

    return {
      useUTC: true,
      grid: { top: 40, right: t.size === 'sm' ? 14 : 24, bottom: 8, left: 8, containLabel: true },
      tooltip: t.tooltipItem({
        title: function (p) { return p.seriesName; },
        lines: function (p) {
          var v = p.value;
          var out = [
            ['Date', t.fmt.date(isoOf(v[0]), 'd mmm yyyy')],
            ['Operational demand', f2(v[1]) + ' MW'],
            ['Unserved energy', f2(v[2]) + ' MWh'],
          ];
          if (v[3]) out.push(['Cause read from the published figure (not in the sheet)', '']);
          return out;
        },
      }),
      xAxis: {
        type: 'time',
        min: ts(d.xMin),
        max: ts(d.xMax),
        // quarterly ticks like the picture (half-yearly on phones)
        minInterval: (t.size === 'sm' ? 170 : 85) * DAY,
        maxInterval: (t.size === 'sm' ? 182 : 92) * DAY,
        axisLine: { show: true, onZero: false, lineStyle: { color: t.axis } },
        axisTick: { show: true, length: 5, lineStyle: { color: t.axis } },
        splitLine: { show: false },
        axisLabel: {
          color: t.text2,
          fontSize: 12,
          hideOverlap: true,
          rotate: t.size === 'lg' ? 0 : 45,
          formatter: function (v) {
            var dt = new Date(v);
            return MON[dt.getUTCMonth()] + '-' + String(dt.getUTCFullYear()).slice(2);
          },
        },
      },
      yAxis: t.vAxis({ name: 'Operational demand (MW)', min: 3000, max: 5500, interval: 500, format: t.fmt.excel('#,##0') }),
      series: series,
    };
  },
});
