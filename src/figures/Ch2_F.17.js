// Figure 17 (Ch2_F.17) — Actual and forecast 10% POE winter peak unscheduled operational demand under
// three scenarios, from 2025 and 2026 WEM ESOOs, 2019-20 to 2035-36 (MW). Excel: seven lines with diamond
// markers, gaps at blank cells. 2025 ESOO series are dotted with hollow (white-filled) diamonds (2025 Low
// is 2.0 pt, the rest 2.25 pt); actuals and 2026 ESOO series are solid with filled diamonds. Value axis
// min fixed at 2,000, auto max lands on 8,000 with 1,000 steps (reference page 47); points sit between
// tick marks (crossBetween between).
// Hollow markers: the white fill is drawn per point in the surface colour, so the series colour (legend,
// tooltip keys, PNG legend) stays the line colour. Dotted lines (sysDot) are drawn as round dots with an
// explicit dash array: the page forces round caps on lines, which closes up t.dash('sysDot') gaps.
ESOO.register({
  id: 'Ch2_F.17',
  height: { lg: 460, md: 440, sm: 400 },
  categoryLabel: 'Financial year',
  option: function (d, t) {
    var fmt = t.fmt.excel('#,##0');
    var keys = {};
    var series = d.series.map(function (s) {
      var w = t.lw(s.width);
      var col = t.c(s.color);
      if (s.alpha != null) col = t.alpha(col, s.alpha);
      var m = s.marker || {};
      var hollow = /^#?ffffff$/i.test(m.fill || '');
      var fill = hollow ? t.surface : t.c(m.fill || s.color);
      if (m.fillAlpha != null) fill = t.alpha(fill, m.fillAlpha);
      var edge = t.c(m.line || s.color);
      if (m.lineAlpha != null) edge = t.alpha(edge, m.lineAlpha);
      var dotted = s.dash === 'sysDot' || s.dash === 'dot';
      keys[s.name] = col;
      return {
        name: s.name,
        type: 'line',
        data: s.values.map(function (v) {
          return v == null || !hollow ? v : { value: v, itemStyle: { color: fill } };
        }),
        connectNulls: false, // dispBlanksAs = gap
        symbol: t.symbol(m.symbol || 'none'),
        symbolSize: (m.size || 5) * 1.3, // Excel size 5 (pt) diamonds
        showAllSymbol: true,
        lineStyle: { color: col, width: w, type: dotted ? [0.5, w * 2] : t.dash(s.dash, w), cap: 'round' },
        itemStyle: { color: hollow ? col : fill, borderColor: edge, borderWidth: 1 },
      };
    });
    var tip = t.tooltipAxis({ format: fmt, unit: d.unit });
    var base = tip.formatter;
    tip.formatter = function (ps) {
      ps = [].concat(ps);
      ps.forEach(function (p) { if (keys[p.seriesName]) p.color = keys[p.seriesName]; });
      return base(ps);
    };
    // Excel shows every year at -40°: keep labels flat when they fit, otherwise rotate
    var rot = (t.width - 70) / d.categories.length < 54 ? 45 : 0;
    return {
      tooltip: tip,
      xAxis: t.cAxis({ data: d.categories, rotate: rot }),
      yAxis: t.vAxis({ name: d.yTitle, min: 2000, max: 8000, interval: 1000, format: fmt }),
      series: series,
    };
  },
});
