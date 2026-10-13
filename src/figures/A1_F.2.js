// Figure 2 (A1_F.2) — Actual and forecast WA dwellings under three scenarios, from the 2025 and
// 2026 WEM ESOOs, 2019-20 to 2035-36. Excel: eight lines with size-5 diamond markers over 17
// financial years. 2025 ESOO series: dotted (sysDot) with hollow markers (white bg1 fill,
// series-colour 0.75 pt outline); 2026 ESOO series: solid with filled markers. Blank cells are gaps,
// so actuals and forecasts do not join. Value axis automatic in Excel (0 to 25,000 in 5,000 steps;
// pinned here).
ESOO.register({
  id: 'A1_F.2',
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
    var fmt = t.fmt.excel('#,##0');
    var lineColor = {};
    var series = d.series.map(function (s) {
      var w = t.lw(s.width);
      var m = s.marker;
      var c = t.c(s.color);
      lineColor[s.name] = c;
      // Hollow markers: the fill (workbook background, bg1) is set per point so the series colour
      // still drives the legend key; the card surface stands in for white, so they stay open in dark mode.
      var data = m.hollow
        ? s.values.map(function (v) { return v == null ? null : { value: v, itemStyle: { color: t.surface } }; })
        : s.values;
      return {
        name: s.name,
        type: 'line',
        data: data,
        symbol: t.symbol(m.symbol),
        symbolSize: m.size * 1.1,
        showSymbol: true,
        showAllSymbol: true,
        lineStyle: { color: c, width: w, type: capDash(s.dash, w), cap: 'round' },
        itemStyle: { color: m.hollow ? c : t.c(m.fill), borderColor: t.c(m.lineColor), borderWidth: 1 }, // 0.75 pt outline
        connectNulls: false, // dispBlanksAs = gap
      };
    });
    var tip = t.tooltipAxis({ format: fmt });
    var readout = tip.formatter;
    tip.formatter = function (params) {
      // hollow points carry the surface colour as their fill; key the readout by the line colour
      (Array.isArray(params) ? params : [params]).forEach(function (p) {
        if (lineColor[p.seriesName]) p.color = lineColor[p.seriesName];
      });
      return readout(params);
    };
    return {
      tooltip: tip,
      xAxis: t.cAxis({ data: d.categories, rotate: t.size === 'lg' ? 0 : 45 }),
      yAxis: t.vAxis({ name: 'Number of additional dwellings', min: 0, max: 25000, interval: 5000, format: fmt }),
      series: series,
    };
  },
});
