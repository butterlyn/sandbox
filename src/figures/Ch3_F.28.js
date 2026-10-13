// Figure 28 (Ch3_F.28) — Daily peak percentage of Capacity Credits on Forced Outage during Hot
// Season, 2020-21 to 2025-26 (%). Excel: one area series (no outline) over the sheet's 875 rows.
// Column B labels only the first day of each month, so Excel spaces the rows evenly as text
// categories: one slot per day, month labels (Dec-20 …) at month starts, and the blank rows
// between seasons (29-30 of them) leave the gaps between the six Hot Seasons. Same here: a
// category axis with one slot per sheet row; blank rows are null (Excel plots them as zero, which
// draws the same gap) so hovering a gap shows nothing. Axis ticks at season starts as in Excel.
// Dates per row come from the prep script (consecutive days from each 1 December). The y axis is
// Excel's automatic 0–30% in 5% steps. Zoom (slider, ctrl+wheel, pinch) added for the daily detail.
ESOO.register({
  id: 'Ch3_F.28',
  height: { lg: 470, md: 450, sm: 400 },
  legend: false,
  table: function (d, t) {
    var rows = [];
    d.dates.forEach(function (iso, i) {
      if (iso) rows.push([iso, d.values[i]]);
    });
    return {
      columns: ['Date', d.name],
      rows: rows,
      format: function (v) { return t.fmt.pct(v, 1); }, // display only; CSV keeps the sheet's fractions
    };
  },
  option: function (d, t) {
    var seasonOf = [];
    var seasonStart = {};
    d.seasons.forEach(function (s) {
      seasonStart[s.from] = true;
      for (var i = s.from; i <= s.to; i++) seasonOf[i] = s.label;
    });
    var monthStart = function (i) {
      var iso = d.dates[i];
      return !!iso && iso.slice(8, 10) === '01';
    };
    var xAxis = t.cAxis({
      data: d.dates.map(function (iso) { return iso || ''; }),
      boundaryGap: false, // Excel: axis crosses on tick marks
      rotate: 45,
      interval: function (i) { return monthStart(i); },
      format: function (v) { return v ? t.fmt.date(v, 'mmm-yy') : ''; },
    });
    xAxis.axisTick = { show: true, length: 4, interval: function (i) { return !!seasonStart[i]; }, lineStyle: { color: t.axis } };
    // keep Dec-20 when narrow screens thin the month labels (ECharts would otherwise drop the first)
    xAxis.axisLabel.showMinLabel = true;

    var tip = t.tooltipAxis({
      numFmt: '0.0%',
      header: function (p) { return t.fmt.date(p.axisValue, 'd mmm yyyy') + ' · ' + seasonOf[p.dataIndex] + ' Hot Season'; },
    });
    var base = tip.formatter;
    tip.formatter = function (params) {
      var p = Array.isArray(params) ? params[0] : params;
      // blank rows between seasons: no readout (an empty tooltip is not shown)
      if (!p || !d.dates[p.dataIndex]) return '';
      return base(params);
    };

    return {
      grid: { top: 40, right: 16, bottom: 44, left: 8, containLabel: true },
      tooltip: tip,
      xAxis: xAxis,
      yAxis: t.vAxis({ name: 'Capacity Credits on Outage (%)', min: 0, max: 0.3, interval: 0.05, numFmt: '0%' }),
      dataZoom: t.zoom({
        labelFormatter: function (i, s) { return s ? t.fmt.date(s, 'd mmm yy') : ''; },
      }),
      series: [
        {
          name: d.name,
          type: 'line',
          data: d.values,
          showSymbol: false,
          connectNulls: false,
          lineStyle: { width: 0, color: t.c(d.color) },
          itemStyle: { color: t.c(d.color) },
          areaStyle: { color: t.c(d.color), opacity: 1 },
        },
      ],
    };
  },
});
