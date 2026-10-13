// Figure 3 (A1_F.3) — Actual and forecast SWIS residential connections under three scenarios, from
// the 2025 and 2026 WEM ESOOs, 2019-20 to 2035-36. Excel: seven lines over 204 months (Oct 2019 to
// Sep 2036); the category axis is the capacity-year column, labelled once per 12 months
// (tickLblSkip 12), so the axis shows capacity years while the tooltip names the month. 2025 ESOO
// scenarios dotted (sysDot), Actual and 2026 ESOO scenarios solid; no markers. Value axis min fixed
// at 1,000,000 (Excel lands on 1,300,000 in 50,000 steps).
ESOO.register({
  id: 'A1_F.3',
  height: { lg: 440, md: 420, sm: 380 },
  option: function (d, t) {
    // Excel draws these lines with round caps (cap="rnd"), as does the page. A round cap adds one line
    // width to every dash, which closes the gaps of t.dash('sysDot'), so take the cap back out of the
    // dashes and add it to the gaps: the dots come out round, spaced as t.dash intends.
    function capDash(prst, w) {
      var a = t.dash(prst, w);
      return Array.isArray(a) ? a.map(function (v, i) { return i % 2 ? v + w : Math.max(0.01, v - w); }) : a;
    }
    var fmt = t.fmt.excel('#,##0');
    var yearOf = {};
    d.dates.forEach(function (x, i) { yearOf[x] = d.years[i]; });
    // one label per capacity year (Excel tickLblSkip 12); every second year on phones
    var step = t.size === 'sm' ? 24 : 12;
    return {
      tooltip: t.tooltipAxis({
        format: fmt,
        header: function (p) { return t.fmt.date(p.axisValue, 'mmm yyyy') + ' (' + yearOf[p.axisValue] + ')'; },
      }),
      xAxis: t.cAxis({
        data: d.dates,
        format: function (v) { return yearOf[v]; },
        interval: step - 1,
        rotate: t.size === 'lg' ? 0 : 45,
      }),
      yAxis: t.vAxis({ name: 'Number of residential connections', min: 1000000, max: 1300000, interval: 50000, format: fmt }),
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
  table: function (d) {
    return {
      columns: ['Capacity year', 'Date'].concat(d.series.map(function (s) { return s.name; })),
      rows: d.dates.map(function (x, i) {
        return [d.years[i], x].concat(d.series.map(function (s) { return s.values[i]; }));
      }),
    };
  },
});
