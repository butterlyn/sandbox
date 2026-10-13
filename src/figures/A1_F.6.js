// Appendix Figure 6 (A1_F.6) — Forecast delivered consumption resulting from electrification under three
// scenarios, 2025 and 2026 WEM ESOOs (TWh). Excel: six lines with size-5 diamond markers; 2025 ESOO dotted
// (sysDot) with hollow markers (white bg1 fill, 0.75 pt series-colour outline), 2026 ESOO solid with filled
// markers; blank cells are gaps. The sheet is in GWh and the value axis shows display units of thousands, so
// the prep script writes TWh (GWh / 1,000). Axis 0-8 in steps of 1 is the automatic scale Excel drew.
// The tooltip gives 3 decimals (whole GWh, the precision of the sheet's '#,##0' cells).
ESOO.register({
  id: 'A1_F.6',
  height: { lg: 440, md: 420, sm: 380 },
  categoryLabel: 'Financial year',
  table: function (d) {
    return {
      columns: ['Financial year'].concat(d.series.map(function (s) { return s.name; })),
      rows: d.categories.map(function (c, i) {
        return [c].concat(d.series.map(function (s) { return s.values[i]; }));
      }),
      decimals: 3,
      note: 'Values in TWh. The data register lists GWh; the chart shows them in thousands (TWh).',
    };
  },
  option: function (d, t) {
    // Excel draws these lines with round caps (cap="rnd"), as does the page. A round cap adds one line
    // width to every dash, which closes the gaps of t.dash('sysDot'), so take the cap back out of the
    // dashes and add it to the gaps: the dots come out round, spaced as t.dash intends.
    function capDash(prst, w) {
      var a = t.dash(prst, w);
      return Array.isArray(a) ? a.map(function (v, i) { return i % 2 ? v + w : Math.max(0.01, v - w); }) : a;
    }
    var lineColor = {};
    var series = d.series.map(function (s) {
      var c = t.c(s.color);
      var w = t.lw(s.width);
      var m = s.marker;
      lineColor[s.name] = c;
      // Hollow markers: the fill (workbook background, bg1) is set per point so the series colour still
      // drives the legend key and PNG export; the card surface stands in for white, so they stay open in dark mode.
      var data = m.hollow
        ? s.values.map(function (v) { return v == null ? null : { value: v, itemStyle: { color: t.surface } }; })
        : s.values;
      return {
        name: s.name,
        type: 'line',
        data: data,
        symbol: t.symbol(m.symbol),
        symbolSize: m.size * 1.1,
        showAllSymbol: true,
        lineStyle: { color: c, width: w, type: capDash(s.dash, w), cap: 'round' },
        itemStyle: { color: m.hollow ? c : t.c(m.fill), borderColor: t.c(m.line), borderWidth: 1 }, // 0.75 pt outline
        connectNulls: false, // dispBlanksAs = gap
      };
    });
    var tip = t.tooltipAxis({ format: function (v) { return t.fmt.num(v, 3); }, unit: 'TWh' });
    var readout = tip.formatter;
    tip.formatter = function (params) {
      // a hollow marker's point colour is the surface; key each row by the series' line colour
      return readout([].concat(params).map(function (p) {
        var q = {};
        for (var k in p) q[k] = p[k];
        q.color = lineColor[p.seriesName] || p.color;
        return q;
      }));
    };
    var fits = (t.width - 60) / d.categories.length >= 50; // horizontal year labels need ~50px each (Excel: -40°)
    return {
      grid: { top: 40, right: 16, bottom: 8, left: 8, containLabel: true },
      tooltip: tip,
      xAxis: t.cAxis({ data: d.categories, rotate: fits ? 0 : 45 }),
      yAxis: t.vAxis({ name: 'Delivered consumption (TWh)', min: 0, max: 8, interval: 1, numFmt: '#,##0' }),
      series: series,
    };
  },
});
