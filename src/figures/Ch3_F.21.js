// Figure 21 (Ch3_F.21) — Forecast proportion of new capacity by technology type, 2035-36 (%).
// Picture-based: the register's figure is an infographic (a pipeline of committed, anticipated and
// proposed capacity with percentage call-outs per technology). Rebuilt from the sheet's table
// (B23:N26) as one 100% stacked horizontal bar per capacity status, top to bottom in the picture's
// left-to-right order, each row labelled with the picture's status note ('Likely to proceed', …).
// Segments follow the table's technology order (ESR, Wind, Gas, Solar, Waste, DSP, Distillate; the
// all-zero Coal, Hydro and ESR/DSP columns are not drawn) in the register's technology colours.
// The picture groups Waste, DSP and Distillate as 'Other' (9%); here they stay separate, as in the
// table. Segment labels use the sheet's 0% format and appear only where the segment can hold them;
// the readout gives one decimal. The x-axis title is the picture's subtitle.
ESOO.register({
  id: 'Ch3_F.21',
  height: { lg: 330, md: 330, sm: 380 },
  categoryLabel: 'Capacity',
  table: function (d) {
    return {
      columns: ['Capacity'].concat(d.technologies.map(function (n) { return n + ' (%)'; }), ['Total (%)']),
      rows: d.categories.map(function (c, i) {
        var r = d.shares[i].map(function (v) { return v * 100; });
        return [c].concat(r, [r.reduce(function (a, b) { return a + b; }, 0)]);
      }),
      decimals: 1,
      note: 'Coal, Hydro and ESR/DSP are 0% in every row and are not drawn.',
    };
  },
  option: function (d, t) {
    var sm = t.size === 'sm';
    var pct0 = t.fmt.excel('0%');
    var pct1 = t.fmt.excel('0.0%');
    // label a segment only when it is wide enough for "100%" (plot width estimated from the
    // container: row labels take ~95px on phones, ~150px otherwise)
    var plotW = Math.max(120, t.width - (sm ? 95 : 150) - 32);
    var minShare = (sm ? 30 : 34) / plotW;
    var C = ESOO.color;
    var ink = function (fill) { // label text: white or dark ink, whichever reads better on the fill
      var f = C.parse(fill);
      return C.contrast(f, C.parse('#ffffff')) >= C.contrast(f, C.parse('#1f1a24')) ? '#ffffff' : '#1f1a24';
    };
    var yAxis = t.cAxis({
      data: d.categories,
      inverse: true,
      format: function (v, i) {
        var name = sm ? v.replace(' ', '\n') : v;
        return name.split('\n').map(function (p) { return '{a|' + p + '}'; }).join('\n') + '\n{b|' + d.notes[i] + '}';
      },
    });
    yAxis.axisLabel.rich = {
      a: { color: t.text, fontSize: sm ? 12 : 13, fontWeight: 600, lineHeight: sm ? 15 : 17, align: 'right' },
      b: { color: t.muted, fontSize: sm ? 10.5 : 11.5, lineHeight: sm ? 14 : 16, align: 'right' },
    };
    yAxis.axisLabel.margin = 10;
    yAxis.axisLine.show = false;
    var xAxis = t.vAxis({ min: 0, max: 1, interval: sm ? 0.25 : 0.2, format: pct0 });
    xAxis.position = 'bottom';
    xAxis.name = sm ? '% of new available capacity\nby technology type' : '% of new available capacity by technology type';
    xAxis.nameLocation = 'middle';
    xAxis.nameGap = sm ? 36 : 28;
    xAxis.nameTextStyle = { color: t.text2, fontSize: 12, fontWeight: 600, lineHeight: 15 };
    return {
      grid: { top: 8, right: 20, bottom: sm ? 50 : 34, left: 8, containLabel: true },
      tooltip: t.tooltipAxis({ format: pct1, hideZero: true, pointer: 'shadow' }),
      yAxis: yAxis,
      xAxis: xAxis,
      series: d.series.map(function (s) {
        var fill = t.c(s.color);
        return {
          name: s.name,
          type: 'bar',
          stack: 'share',
          barCategoryGap: '36%',
          itemStyle: { color: fill },
          label: {
            show: true,
            position: 'inside',
            color: ink(fill),
            fontSize: sm ? 11 : 12,
            fontWeight: 600,
            formatter: function (p) { return p.value >= minShare ? pct0(p.value) : ''; },
          },
          data: s.values,
        };
      }),
    };
  },
});
