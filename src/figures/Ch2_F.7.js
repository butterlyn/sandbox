// Figure 7 (Ch2_F.7) — Actual and forecast underlying consumption under three scenarios from 2025 and
// 2026 WEM ESOOs, 2019-20 to 2035-36 (TWh). Excel: eight lines with diamond markers, gaps at blank
// cells. 2025 ESOO series are dotted with hollow (white-filled) diamonds; actuals and 2026 ESOO series
// are solid with filled diamonds. The sheet holds GWh and Excel shows the axis in display units of
// thousands (major unit 5,000, auto max 45,000), so the prep script converts to TWh: axis 0-45, step 5.
// Lines start on the tick marks (crossBetween midCat), so boundaryGap is off.
// Hollow markers: the white fill is drawn per point in the surface colour, so the series colour (legend,
// tooltip keys, PNG legend) stays the line colour. Dotted lines (sysDot) are drawn as round dots with an
// explicit dash array: the page forces round caps on lines, which closes up t.dash('sysDot') gaps.
ESOO.register({
  id: 'Ch2_F.7',
  height: { lg: 460, md: 440, sm: 400 },
  categoryLabel: 'Financial year',
  table: function (d) {
    return {
      columns: ['Financial year'].concat(d.series.map(function (s) { return s.name; })),
      rows: d.categories.map(function (c, i) {
        return [c].concat(d.series.map(function (s) { return s.values[i]; }));
      }),
      decimals: 3,
      note: 'Underlying consumption in TWh (the register lists GWh).',
    };
  },
  option: function (d, t) {
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
    var tip = t.tooltipAxis({ format: function (v) { return t.fmt.num(v, 2); }, unit: d.unit });
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
      xAxis: t.cAxis({ data: d.categories, boundaryGap: false, rotate: rot }),
      yAxis: t.vAxis({ name: d.yTitle, min: 0, max: 45, interval: 5, format: t.fmt.excel('#,##0') }),
      series: series,
    };
  },
});
