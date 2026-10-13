// Appendix Figure 21 (A2_F.21) — Changes in assigned Peak Capacity Credits to Facilities, 2026-27
// and 2027-28 (MW). Excel: two clustered column series (gap width 30, no overlap setting, so the
// pair of bars touch) over 39 Facilities; y axis is Excel's automatic 0–350 in 50s, format 0.
// Bar spacing for two clustered series: barCategoryGap = 0.30 / (2 + 0.30) = 13% of the category.
// Facility codes are long: labels rotated 45° as in Excel when every label fits, else 90°; on
// phones some labels are dropped rather than overlapped, and the readout always names the Facility.
ESOO.register({
  id: 'A2_F.21',
  height: { lg: 500, md: 520, sm: 500 },
  categoryLabel: 'Facility',
  option: function (d, t) {
    // 45° (as in Excel) while each category is wide enough for every label, otherwise vertical
    var per = (t.width - 60) / d.categories.length;
    var xAxis = t.cAxis({ data: d.categories, rotate: per >= 17 ? 45 : 90, interval: 0 });
    if (t.size !== 'lg') xAxis.axisLabel.fontSize = t.size === 'sm' ? 10 : 11;
    return {
      tooltip: t.tooltipAxis({ format: t.fmt.excel('#,##0.0'), unit: 'MW', pointer: 'shadow' }),
      xAxis: xAxis,
      yAxis: t.vAxis({ name: 'Capacity Credit (MW)', min: 0, max: 350, interval: 50, numFmt: '0' }),
      series: d.series.map(function (s) {
        return {
          name: s.name,
          type: 'bar',
          barGap: '0%', // Excel default overlap 0: bars in a pair touch
          barCategoryGap: '13%', // Excel gap width 30 with two series
          itemStyle: { color: t.c(s.color) },
          data: s.values,
        };
      }),
    };
  },
});
