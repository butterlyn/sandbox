// Figure 29 (Ch3_F.29) — Outage rate (%) and maximum assigned Capacity Credits (MW) by Facility for
// the 36 months as of 26 April 2026. Excel: columns (maximum assigned Capacity Credits, gap width 30)
// on the right-hand MW axis, drawn behind a marker-only line (Forced Outage rate: circles, no
// connecting line) on the left-hand % axis. Both axes are Excel's automatic scales as printed in the
// PDF: 0–45% in 5% steps (gridlines) and 0–350 MW in 50s (no gridlines). The marker-only line is an
// ECharts scatter on the category axis (same look, dot legend key). Facility codes are long, so the
// labels are rotated (45°, or 90° when narrow) and every one is kept; the readout names the Facility.
ESOO.register({
  id: 'Ch3_F.29',
  height: { lg: 520, md: 520, sm: 520 },
  table: function (d, t) {
    var pct = t.fmt.excel('0.0%');
    var mw = t.fmt.excel('#,##0.0');
    return {
      columns: ['Facility', d.rate.name, d.bar.name], // sheet column order
      rows: d.categories.map(function (c, i) { return [c, d.rate.values[i], d.bar.values[i]]; }),
      format: function (v, i) { return i === 1 ? pct(v) : mw(v); }, // display only; CSV keeps raw values
    };
  },
  option: function (d, t) {
    var pct = t.fmt.excel('0.0%');
    var mw = t.fmt.excel('#,##0.0');
    // 45° (Excel uses 40°) while each category is wide enough for every label, otherwise vertical
    var per = (t.width - 110) / d.categories.length;
    var xAxis = t.cAxis({ data: d.categories, rotate: per >= 17 ? 45 : 90, interval: 0 });
    if (t.size === 'sm') xAxis.axisLabel.fontSize = 11;
    return {
      grid: { top: 40, right: 8, bottom: 8, left: 8, containLabel: true },
      tooltip: t.tooltipAxis({
        pointer: 'shadow',
        format: function (v, name) { return name === d.rate.name ? pct(v) : mw(v) + ' MW'; },
      }),
      xAxis: xAxis,
      yAxis: [
        t.vAxis({ name: 'Outage rate (%)', min: 0, max: 0.45, interval: 0.05, numFmt: '0%' }),
        t.vAxis({ name: 'Capacity Credits (MW)', position: 'right', min: 0, max: 350, interval: 50, numFmt: '0', grid: false }),
      ],
      series: [
        {
          name: d.bar.name,
          type: 'bar',
          yAxisIndex: 1,
          barCategoryGap: '23%', // Excel gap width 30
          itemStyle: { color: t.c(d.bar.color) },
          data: d.bar.values,
          z: 1,
        },
        {
          name: d.rate.name,
          type: 'scatter',
          yAxisIndex: 0,
          symbol: t.symbol(d.rate.symbol),
          symbolSize: 7, // Excel marker size 5; a little over 5 x 1.1 to keep the PDF's dot-to-column proportion
          itemStyle: { color: t.c(d.rate.color) },
          data: d.rate.values,
          z: 3,
        },
      ],
    };
  },
});
