// Figure 40 (Ch5_F.40) — Availability Curve, 2027-28 and 2028-29 (MW). In the register this figure is a
// pasted picture; it is rebuilt from the sheet (B23:E280346). For each capacity year the curve is the
// ranked (descending) demand of 280,320 trading intervals plus the sheet's constant "Reserve margin,
// Intermittent Load allowance, Regulation Raise, and ESROD Uplift" column (1,243 MW in 2027-28, 1,386 MW
// in 2028-29); that sum reproduces the picture (6,244 / 6,522 MW at the top, 1,613 / 1,706 MW at the end).
// Lines with a 20% area fill in the line colour, as in the picture (colours sampled from it). The picture
// has no x tick labels; here the x axis is the share of trading intervals (rank / 280,320) so the curve can
// be read and zoomed.
// Downsampled in scripts/prep/Ch5_F.40.py to 1,504 of the 280,320 ranks (the same ranks for both years):
// full resolution for the steep head (ranks 1-150) and tail (last 50 ranks), steps growing by x1.05 up to
// every 250th rank, then even steps across the flat middle. Linear interpolation between the kept points
// stays within ~4 MW of every original value.
ESOO.register({
  id: 'Ch5_F.40',
  height: { lg: 440, md: 420, sm: 380 },
  table: function (d) {
    var N = d.n;
    var cols = ['Rank (of ' + N.toLocaleString('en-AU') + ')', 'Share of intervals (%)'].concat(d.years.map(function (y) { return y.name + ' (MW)'; }));
    var rows = d.ranks.map(function (r, i) {
      return [r, (r / N) * 100].concat(d.years.map(function (y) { return y.values[i]; }));
    });
    var res = d.years.map(function (y) { return y.name + ': ' + y.reserve.toLocaleString('en-AU') + ' MW'; }).join(', ');
    return {
      columns: cols,
      rows: rows,
      decimals: [0, 4, 1, 1],
      note: 'Availability curve = demand ranked in descending order + reserve margin, Intermittent Load allowance, Regulation Raise and ESROD Uplift (' + res + '). ' +
        rows.length.toLocaleString('en-AU') + ' of ' + N.toLocaleString('en-AU') + ' ranked trading intervals are kept: every rank in the first ' + d.note.head +
        ' and last ' + d.note.tail + ', then steps growing by ×' + d.note.ratio + ' up to every ' + d.note.step + 'th rank across the flat middle (within about 4 MW of the full curve).',
    };
  },
  option: function (d, t) {
    var N = d.n;
    var fmt = t.fmt.excel('#,##0');
    var axisPct = function (v) { return t.fmt.auto(v) + '%'; };
    var share = function (r) {
      var v = (r / N) * 100;
      return (v >= 10 ? t.fmt.num(v, 1) : v >= 1 ? t.fmt.num(v, 2) : String(Number(v.toPrecision(2)))) + '%';
    };
    var series = d.years.map(function (y, k) {
      var c = t.c(y.color);
      return {
        name: y.name,
        type: 'line',
        data: d.ranks.map(function (r, i) { return [(r / N) * 100, y.values[i], r]; }),
        showSymbol: false,
        lineStyle: { color: c, width: 2 },
        itemStyle: { color: c },
        areaStyle: { color: t.alpha(c, 0.2) },
        z: 3 - k, // 2027-28 (the lower curve) drawn over 2028-29, as in the picture
      };
    });
    return {
      grid: { top: 40, right: 16, bottom: 60, left: 8, containLabel: true },
      tooltip: t.tooltipAxis({
        format: fmt,
        unit: 'MW',
        header: function (p0) {
          var r = p0.value[2];
          return 'Rank ' + t.fmt.num(r, 0) + ' of ' + t.fmt.num(N, 0) + ' (' + share(r) + ' of intervals)';
        },
      }),
      xAxis: {
        type: 'value',
        min: 0,
        max: 100,
        name: 'Trading intervals ranked (descending demand)',
        nameLocation: 'middle',
        nameGap: 28,
        nameTextStyle: { color: t.text2, fontSize: 12, fontWeight: 600 },
        axisLabel: { color: t.text2, fontSize: 12, formatter: axisPct, hideOverlap: true },
        axisLine: { show: true, onZero: false, lineStyle: { color: t.axis } },
        axisTick: { show: false },
        splitLine: { show: false },
      },
      yAxis: t.vAxis({ name: '(MW)', min: 0, max: 7000, interval: 1000, format: fmt, grid: false }), // no gridlines, as in the picture
      dataZoom: t.zoom({ labelFormatter: function (v) { return axisPct(Math.round(v * 1000) / 1000); } }),
      series: series,
    };
  },
});
