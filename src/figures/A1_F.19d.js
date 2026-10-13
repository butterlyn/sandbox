// Figure 19d (A1_F.19d) — Data centre forecasts methodology: Blending approaches - project based and
// economic based forecasts under three scenarios, 2026 WEM ESOO, 2019-20 to 2035-36 (TWh). Final
// panel of the Figure 19 diagram: the equal-weight blend (average) of 19b and 19c.
// Excel: four straight solid lines with filled 5 pt diamond markers. The sheet is in GWh and the value
// axis shows thousands, so the data file is in TWh. Excel fixes the axis maximum at 1.8 (1,800 GWh);
// ticks land on 0.2 steps, the same range as the other two panels (19b, 19c).
// The tooltip gives 3 decimals (whole GWh, the precision of the sheet's '#,##0' cells).
ESOO.register({
  id: 'A1_F.19d',
  height: { lg: 440, md: 420, sm: 380 },
  categoryLabel: 'Financial year',
  option: function (d, t) {
    var series = d.series.map(function (s) {
      var w = t.lw(s.width);
      var m = s.marker;
      return {
        name: s.name,
        type: 'line',
        data: s.values,
        symbol: t.symbol(m.symbol),
        symbolSize: m.size * 1.1,
        showAllSymbol: true,
        lineStyle: { color: t.c(s.color), width: w, type: t.dash(s.dash, w) },
        itemStyle: { color: t.c(m.fill), borderColor: t.c(m.border), borderWidth: 1 }, // 0.75 pt outline
        connectNulls: false, // dispBlanksAs = gap
      };
    });
    var fits = (t.width - 60) / d.categories.length >= 50; // horizontal year labels need ~50px each
    return {
      grid: { top: 40, right: 16, bottom: 8, left: 8, containLabel: true },
      tooltip: t.tooltipAxis({ format: function (v) { return t.fmt.num(v, 3); }, unit: 'TWh' }),
      xAxis: t.cAxis({ data: d.categories, rotate: fits ? 0 : 45 }),
      yAxis: t.vAxis({ name: d.yTitle, min: 0, max: d.yMax, interval: 0.2, numFmt: d.numFmt }),
      series: series,
    };
  },
});
