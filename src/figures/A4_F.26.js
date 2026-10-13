// Appendix Figure 26 (A4_F.26) — Largest daily unserved energy events from each weather reference
// year, coloured according to system conditions, 2031-32 to 2034-35.
// The register holds this chart as a picture; it is rebuilt from the sheet's 3,486 events (Date,
// Operational demand, Unserved Energy, Cause) as the same bubble chart: x = event date (time axis
// Oct-31 to Oct-35, quarterly ticks), y = operational demand (MW), bubble area proportional to USE
// (MWh) with a minimum dot size (largest bubble about 4% of the plot width, as in the picture),
// colour = system conditions (legend colours sampled from the picture; 0.8 fill opacity like its
// bubbles, with a thin surface-coloured ring instead of its dark outline). Each condition is split
// into 2-px size bands (same series name, so the legend toggles them together; z rises as size
// falls) so large bubbles draw first and small ones stay on top across conditions.
// Data (see scripts/prep/A4_F.26.py): the sheet labels every event with more than one driver
// 'All three drivers'; the picture splits those into its four combination colours (mostly Low
// Battery SoC and Low Renewables), which the sheet cannot reproduce, so the chart follows the sheet.
// Annotations from the picture: the callout points at the same event (11 Feb 2032, 5,693 MW) but
// shows the sheet's value, 3,750 MWh to 3 significant figures (the picture's '1,560 MWh' matches
// neither the sheet nor its own bubble size); the four numbered cluster outlines are digitised from
// the picture in data coordinates, and each badge's tooltip quotes the appendix bullet it illustrates.
ESOO.register({
  id: 'A4_F.26',
  height: { lg: 540, md: 500, sm: 440 },
  table: function (d, t) {
    var rows = d.events
      .slice()
      .sort(function (a, b) { return a[0] < b[0] ? -1 : a[0] > b[0] ? 1 : b[2] - a[2]; })
      .map(function (e) { return [e[0], e[1], e[2], d.categories[e[3]].name]; });
    return {
      columns: ['Date', 'Operational demand (MW)', 'Unserved energy (MWh)', 'Cause'],
      rows: rows,
      decimals: [null, 2, 2, null],
      note:
        'The sheet labels every event with more than one driver ‘All three drivers’; the published figure ' +
        'colours most of them as two-driver combinations (mainly Low Battery SoC and Low Renewables), which the ' +
        'sheet does not record. The callout marks the ' + t.fmt.date(d.callout.date, 'd mmm yyyy') + ' event, ' +
        'labelled ' + d.callout.published + ' in the published figure; the sheet gives ' +
        t.fmt.excel('#,##0.00')(d.events.filter(function (e) { return e[0] === d.callout.date && e[1] === d.callout.demand; })[0][2]) +
        ' MWh.',
    };
  },
  option: function (d, t) {
    var MON = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    var DAY = 864e5;
    var f2 = t.fmt.excel('#,##0.00');
    function ts(iso) { return Date.UTC(+iso.slice(0, 4), +iso.slice(5, 7) - 1, +iso.slice(8, 10)); }
    function isoOf(v) { return new Date(v).toISOString().slice(0, 10); }

    // bubble diameter: area proportional to USE; largest about 4% of the plot width, minimum dot
    var plotW = Math.max(260, t.width - 72);
    var maxUse = 0;
    d.events.forEach(function (e) { maxUse = Math.max(maxUse, e[2]); });
    var maxD = Math.min(46, Math.max(20, plotW * 0.04));
    var minD = Math.min(9, Math.max(4.5, plotW * 0.0085));
    function diam(use) { return Math.max(minD, maxD * Math.sqrt(use / maxUse)); }
    // draw order: 2-px diameter bands, largest first, so small bubbles stay on top across conditions
    var nTier = Math.floor((maxD - minD) / 2) + 1;
    function tier(use) { var s = diam(use); return s <= minD ? nTier : Math.floor((maxD - s) / 2); }

    var co = d.callout;
    // events arrive sorted by USE (largest first), so each band also draws large to small
    var bands = {};
    var hit = null;
    d.events.forEach(function (e) {
      var isCallout = e[0] === co.date && e[1] === co.demand;
      if (isCallout) hit = e;
      var key = e[3] + ':' + tier(e[2]);
      (bands[key] = bands[key] || []).push([ts(e[0]), e[1], e[2], isCallout ? 1 : 0]);
    });

    var series = [];
    // cluster fills under the bubbles (outlines and badges are drawn above them, further down)
    function outline(cl, api) { return cl.outline.map(function (q) { return api.coord([ts(q[0]), q[1]]); }); }
    var clusterData = d.clusters.map(function (cl) { return [ts(cl.badge[0]), cl.badge[1]]; });
    series.push({
      name: '_cluster fills',
      type: 'custom',
      silent: true,
      z: 1,
      data: clusterData,
      renderItem: function (params, api) {
        return {
          type: 'polygon',
          shape: { points: outline(d.clusters[params.dataIndex], api), smooth: 0.3 },
          style: { fill: t.alpha(t.accent, t.dark ? 0.1 : 0.06), stroke: null },
        };
      },
    });

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
          itemStyle: { color: col, opacity: 0.8, borderColor: t.surface, borderWidth: t.size === 'sm' ? 0.6 : 0.8 },
          emphasis: { focus: 'none', scale: 1.15, itemStyle: { color: col, opacity: 1, borderColor: t.text, borderWidth: 1.25 } },
        });
      }
    });

    // numbered cluster outlines and badges (badges are hoverable: their tooltip quotes the appendix)
    var badgeCol = t.c('#6b3077');
    var br = t.pick({ lg: 13, md: 11, sm: 8 });
    series.push({
      name: '_clusters',
      type: 'custom',
      z: 40,
      itemStyle: { color: badgeCol },
      data: clusterData,
      renderItem: function (params, api) {
        var cl = d.clusters[params.dataIndex];
        var b = api.coord([api.value(0), api.value(1)]);
        return {
          type: 'group',
          children: [
            {
              type: 'polygon',
              silent: true,
              shape: { points: outline(cl, api), smooth: 0.3 },
              style: { fill: null, stroke: t.c('#290e2e'), lineWidth: t.size === 'sm' ? 1 : 1.25 },
            },
            {
              // one element (number on a round background) so ECharts' hover layer redraws it whole
              type: 'text',
              x: b[0],
              y: b[1],
              style: {
                text: String(cl.n), fill: '#ffffff', font: '700 ' + (br + 3) + 'px ' + t.font, align: 'center', verticalAlign: 'middle',
                width: 2 * br, height: 2 * br, lineHeight: 2 * br, backgroundColor: badgeCol, borderRadius: br,
                borderColor: t.surface, borderWidth: 1.5,
              },
            },
          ],
        };
      },
    });

    // the picture's callout: a ring around the event, and a leader from its upper-right edge to a box
    series.push({
      name: d.categories[hit[3]].name, // hides with its condition when that is toggled off
      type: 'custom',
      silent: true,
      z: 60,
      itemStyle: { color: t.c(d.categories[hit[3]].color) },
      data: [[ts(co.date), co.demand, hit[2]]],
      renderItem: function (params, api) {
        var p = api.coord([api.value(0), api.value(1)]);
        var r = diam(api.value(2)) / 2 + 2; // ring just outside the bubble
        var leg = t.pick({ lg: 40, md: 34, sm: 24 });
        var run = t.pick({ lg: 26, md: 22, sm: 14 });
        var fs = t.pick({ lg: 15, md: 14, sm: 12 });
        var a = [p[0] + r * Math.SQRT1_2, p[1] - r * Math.SQRT1_2];
        var b = [a[0] + leg, a[1] - leg];
        var c = [b[0] + run, b[1]];
        return {
          type: 'group',
          children: [
            { type: 'circle', shape: { cx: p[0], cy: p[1], r: r }, style: { stroke: t.text2, lineWidth: 1.25, fill: null } },
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
        title: function (p) {
          return p.seriesName === '_clusters' ? 'Cluster ' + d.clusters[p.dataIndex].n : p.seriesName;
        },
        lines: function (p) {
          if (p.seriesName === '_clusters') return [[d.clusters[p.dataIndex].text, '']];
          var v = p.value;
          var out = [
            ['Date', t.fmt.date(isoOf(v[0]), 'd mmm yyyy')],
            ['Operational demand', f2(v[1]) + ' MW'],
            ['Unserved energy', f2(v[2]) + ' MWh'],
          ];
          if (v[3]) out.push(['Labelled ' + co.published + ' in the published figure', '']);
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
      yAxis: t.vAxis({ name: 'Operational demand (MW)', min: 2000, max: 6500, interval: 500, format: t.fmt.excel('#,##0') }),
      series: series,
    };
  },
});
