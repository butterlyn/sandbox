// Figure 1 (A1_F.1) — Forecast real economic growth, 2019-20 to 2057-58, financial years (real, %).
// Excel: three lines over 39 financial years (text categories, so one point per year): Baseline
// 2024 and 2025 dashed, Baseline 2026 solid, no markers. Value axis is automatic in Excel and
// lands on -1% to 5% in 1% steps (pinned here to match); category labels sit at the bottom.
ESOO.register({
  id: 'A1_F.1',
  height: { lg: 440, md: 420, sm: 380 },
  categoryLabel: 'Financial year',
  option: function (d, t) {
    // Excel draws these lines with round caps (cap="rnd"), as does the page. A round cap adds one line
    // width to every dash, which shortens the gaps of t.dash(), so take the cap back out of the
    // dashes and add it to the gaps: the dashes come out spaced as t.dash intends.
    function capDash(prst, w) {
      var a = t.dash(prst, w);
      return Array.isArray(a) ? a.map(function (v, i) { return i % 2 ? v + w : Math.max(0.01, v - w); }) : a;
    }
    return {
      tooltip: t.tooltipAxis({ numFmt: '0.00%' }),
      xAxis: t.cAxis({ data: d.categories, rotate: t.size === 'sm' ? 45 : 0 }),
      yAxis: t.vAxis({ name: 'GDP growth (real, %)', min: -0.01, max: 0.05, interval: 0.01, numFmt: '0%' }),
      series: d.series.map(function (s) {
        var w = t.lw(s.width);
        return {
          name: s.name,
          type: 'line',
          data: s.values,
          lineStyle: { color: t.c(s.color), width: w, type: capDash(s.dash, w), cap: 'round' },
          itemStyle: { color: t.c(s.color) },
          connectNulls: false, // dispBlanksAs = gap
        };
      }),
    };
  },
  // values are fractions (as in the register); show them as percentages, CSV keeps the raw values
  table: function (d, t) {
    return {
      columns: ['Financial year'].concat(d.series.map(function (s) { return s.name; })),
      rows: d.categories.map(function (c, i) {
        return [c].concat(d.series.map(function (s) { return s.values[i]; }));
      }),
      format: function (v) { return t.fmt.pct(v, 2); },
    };
  },
});
