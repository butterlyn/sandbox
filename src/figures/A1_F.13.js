// Figure 13 (A1_F.13) — Actual and forecast business mass market underlying electricity consumption
// under three scenarios, 2025 and 2026 WEM ESOOs, 2019-20 to 2035-36 (TWh). Excel: eight lines in plot
// order; the 2025 ESOO series are dotted (sysDot) with hollow diamonds, the 2026 ESOO series solid with
// filled diamonds; blank cells are gaps. The sheet is in GWh and the value axis shows display units of
// thousands, so the prep script writes TWh (GWh / 1,000). Axis 0–14 in steps of 2 is the automatic
// scale Excel drew in the published figure.
// The tooltip gives 3 decimals (whole GWh, the precision of the sheet's '#,##0' cells).
ESOO.register({
  id: 'A1_F.13',
  height: { lg: 440, md: 420, sm: 380 },
  categoryLabel: 'Financial year',
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
      // 'bg' = Excel bg1 marker fill (white), i.e. a hollow marker: fill it with the chart surface.
      // The fill goes on each point so the series colour (legend, PNG export) stays the line colour.
      var fill = m.fill === 'bg' ? t.surface : t.c(m.fill);
      lineColor[s.name] = c;
      return {
        name: s.name,
        type: 'line',
        data: fill === c ? s.values : s.values.map(function (v) { return v == null ? v : { value: v, itemStyle: { color: fill } }; }),
        connectNulls: false, // dispBlanksAs = gap
        symbol: t.symbol(m.symbol),
        symbolSize: m.size * 1.1,
        showAllSymbol: true,
        lineStyle: { color: c, width: w, type: capDash(s.dash, w), cap: 'round' },
        itemStyle: { color: c, borderColor: t.c(m.line), borderWidth: 1 }, // 0.75pt marker outline
      };
    });
    var tip = t.tooltipAxis({ format: function (v) { return t.fmt.num(v, 3); }, unit: d.unit });
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
      yAxis: t.vAxis({ name: 'Underlying consumption (TWh)', min: 0, max: 14, interval: 2, numFmt: '#,##0' }),
      series: series,
    };
  },
});
