// Figure 17 (A1_F.17) — Actual and forecast new industries delivered electricity consumption under
// three scenarios, from 2025 and 2026 WEM ESOOs, 2019-20 to 2035-36 (TWh).
// Excel: eight straight lines with 5 pt diamond markers, in plot order. 2025 ESOO series: round-dot
// (sysDot) lines with open markers (filled with the chart background; here the card surface, so they
// stay open in dark mode). 2026 ESOO series: solid lines with filled markers. Blank cells are gaps.
// The sheet is in GWh and the value axis shows thousands, so the data file is in TWh. Excel
// auto-scales the axis to 0.0–5.0 in 0.5 steps. The tooltip gives 3 decimals (whole GWh, the
// precision of the sheet's '#,##0' cells); most values are well under 1 TWh.
ESOO.register({
  id: 'A1_F.17',
  height: { lg: 440, md: 420, sm: 380 },
  categoryLabel: 'Financial year',
  option: function (d, t) {
    // Excel draws these lines with round caps (round dots for sysDot), as does the page, but t.dash()
    // gives on/off lengths for flat ends: a round cap adds half the width to each end of every dash and
    // closes the gaps. Shorten each dash and lengthen each gap by the width to compensate.
    function roundDash(prst, w) {
      var a = t.dash(prst, w);
      return Array.isArray(a) ? a.map(function (v, i) { return i % 2 ? v + w : Math.max(0.01, v - w); }) : a;
    }
    var lineColor = {};
    var series = d.series.map(function (s) {
      var c = t.c(s.color);
      var w = t.lw(s.width);
      var m = s.marker;
      lineColor[s.name] = c;
      return {
        name: s.name,
        type: 'line',
        // an open marker's fill goes on each point, so the series colour (legend, PNG export) stays
        // the line colour
        data: m.hollow ? s.values.map(function (v) { return v == null ? v : { value: v, itemStyle: { color: t.surface } }; }) : s.values,
        symbol: t.symbol(m.symbol),
        symbolSize: m.size * 1.1,
        showAllSymbol: true,
        lineStyle: { color: c, width: w, type: roundDash(s.dash, w), cap: 'round' },
        itemStyle: { color: m.hollow ? c : t.c(m.fill), borderColor: t.c(m.border), borderWidth: 1 }, // 0.75 pt outline
        connectNulls: false, // dispBlanksAs = gap
      };
    });
    var tooltip = t.tooltipAxis({ format: function (v) { return t.fmt.num(v, 3); }, unit: 'TWh' });
    var readout = tooltip.formatter;
    tooltip.formatter = function (params) {
      // an open marker's point colour is the surface: key each row by the line colour
      return readout([].concat(params).map(function (p) {
        var q = {};
        for (var k in p) q[k] = p[k];
        q.color = lineColor[p.seriesName] || p.color;
        return q;
      }));
    };
    var fits = (t.width - 60) / d.categories.length >= 50; // horizontal year labels need ~50px each
    return {
      grid: { top: 40, right: 16, bottom: 8, left: 8, containLabel: true },
      tooltip: tooltip,
      xAxis: t.cAxis({ data: d.categories, rotate: fits ? 0 : 45 }),
      yAxis: t.vAxis({ name: d.yTitle, min: 0, max: 5, interval: 0.5, numFmt: d.numFmt }),
      series: series,
    };
  },
});
