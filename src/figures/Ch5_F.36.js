// Figure 36 (Ch5_F.36) — Modelled time-of-day distribution of unserved energy across the period from
// 2032-33 to 2035-36 (MWh). In the register this figure is a pasted picture; it is rebuilt here from the
// sheet table B23:N74 (average USE in each half-hour trading interval of the day, by capacity year and
// season). As in the picture: small multiples, one panel per capacity year (2 x 2; one column on phones),
// lines for Summer, Shoulder and Winter, every panel on the same y range (0 to 140 MWh, ticks every 40),
// time labels every four hours. Colours were sampled from the picture.
(function () {
  var HEIGHT = { lg: 500, md: 480, sm: 800 };

  function fmtUse(t, v) {
    if (v == null || isNaN(v)) return '';
    var a = Math.abs(v);
    if (a >= 100) return t.fmt.num(v, 0);
    if (a >= 10) return t.fmt.num(v, 1);
    if (a >= 1) return t.fmt.num(v, 2);
    if (a === 0) return '0';
    return String(Number(v.toPrecision(2)));
  }

  ESOO.register({
    id: 'Ch5_F.36',
    height: HEIGHT,
    table: function (d) {
      var cols = ['Time'];
      d.years.forEach(function (y) {
        d.seasons.forEach(function (s) { cols.push(y + ' ' + s); });
      });
      var rows = d.times.map(function (tm, i) {
        var r = [tm];
        d.years.forEach(function (y) {
          d.seasons.forEach(function (s) { r.push(d.values[y][s][i]); });
        });
        return r;
      });
      return {
        columns: cols,
        rows: rows,
        decimals: 3,
        note: 'Average unserved energy (MWh) in each half-hour trading interval of the day (start time), by capacity year and season. The sheet labels these values EUE (MWh).',
      };
    },
    option: function (d, t) {
      var H = t.pick(HEIGHT);
      var cols = t.size === 'sm' ? 1 : 2;
      var nRows = d.years.length / cols;
      var left = 8, right = 16, colGap = cols > 1 ? 40 : 0;
      var colW = (t.width - left - right - colGap * (cols - 1)) / cols;
      var topPad = 58;   // shared y-axis title, then the first row of panel titles
      var titleH = 44;   // space for the panel titles of the later rows
      var labH = 22;     // time labels
      var nameH = 26;    // "Time" under the bottom panels
      function showLab(r) { return cols === 1 || r === nRows - 1; }
      var nLab = 0;
      for (var r = 0; r < nRows; r++) if (showLab(r)) nLab++;
      var plotH = (H - topPad - titleH * (nRows - 1) - labH * nLab - nameH) / nRows;
      var fmtAxis = t.fmt.excel('#,##0');

      var grids = [], xAxes = [], yAxes = [], titleAxes = [], series = [];
      var y = topPad;
      d.years.forEach(function (year, i) {
        var row = Math.floor(i / cols), col = i % cols;
        if (col === 0 && row > 0) y += plotH + (showLab(row - 1) ? labH : 0) + titleH;
        var lab = showLab(row);
        var bottomRow = row === nRows - 1;
        grids.push({ left: left + col * (colW + colGap), top: y, width: colW, height: plotH + (lab ? labH : 0), containLabel: true });

        var xa = t.cAxis({ data: d.times, boundaryGap: false, interval: 7, name: bottomRow ? 'Time' : '', nameGap: 30 });
        xa.gridIndex = i;
        xa.axisLabel.show = lab;
        xAxes.push(xa);

        var ya = t.vAxis({ min: 0, max: 140, interval: 40, format: fmtAxis, name: i === 0 ? 'Average USE (MWh)' : '' });
        ya.gridIndex = i;
        ya.nameGap = 34;
        ya.axisLabel.showMaxLabel = false; // 140 is only the top of the range: no label or grid line, as in the picture
        ya.splitLine.showMaxLine = false;
        yAxes.push(ya);

        // panel title: the name of an empty axis on top of the panel, so it moves with its grid
        titleAxes.push({
          type: 'value', gridIndex: i, position: 'top', min: 0, max: 1, silent: true,
          name: year, nameLocation: 'middle', nameGap: 10,
          nameTextStyle: { color: t.text, fontSize: 13, fontWeight: 700 },
          axisLine: { show: false }, axisTick: { show: false }, axisLabel: { show: false },
          splitLine: { show: false }, axisPointer: { show: false },
        });

        d.seasons.forEach(function (s, k) {
          var c = t.c(d.colors[s]);
          series.push({
            name: s,
            type: 'line',
            xAxisIndex: i,
            yAxisIndex: i,
            data: d.values[year][s],
            lineStyle: { color: c, width: 2 },
            itemStyle: { color: c },
            z: 2 + k,
          });
        });
      });

      return {
        grid: grids,
        tooltip: t.tooltipAxis({
          format: function (v) { return fmtUse(t, v); },
          unit: 'MWh',
          header: function (p0) { return d.years[Math.floor(p0.seriesIndex / d.seasons.length)] + ', ' + p0.axisValueLabel; },
        }),
        xAxis: xAxes.concat(titleAxes),
        yAxis: yAxes,
        series: series,
      };
    },
  });
})();
