// Figure 47 (Ch7_F.47) — Forecast peak capacity for 2028-29 (MW).
// Excel: a waterfall made of stacked columns (gap width 30). An invisible base series ('Total', fill
// none) floats the Committed, RLM uplift and Anticipated columns on the running total; Capability
// Class 1, 2 and 3 stack on it. Labels as in the register: the first four columns carry their column
// total above the bar (Class 3 labels with "value from cells" text: 5,541, 889, 240, 622); the Total
// forecast available column labels each class inside the bar. The RCT is a dashed line on secondary
// axes with crossBetween=midCat, so it runs edge to edge: here a hidden second category axis with
// boundaryGap false. Annotations from the chart drawing: text box "RCT 6,323" over the start of the
// line, and a left brace beside the Total column from 0 to the top of Class 2 labelled 6,712
// (= Class 1 + Class 2, computed in the prep script). The value axis is auto in Excel; the 0-8,000
// range and 1,000 step of the published figure are pinned.
ESOO.register({
  id: 'Ch7_F.47',
  height: { lg: 460, md: 440, sm: 420 },
  categoryLabel: 'Capacity',
  option: function (d, t) {
    var fmt = t.fmt.excel('#,##0');
    var n = d.categories.length;
    var gap = 30 / 130; // Excel gap width 30 -> share of the category band left empty
    var C = ESOO.color;
    // labels inside a column: white or near-black, whichever reads better on that fill (Excel uses
    // white on Class 1 and dark text on Class 2 and 3)
    function inkOn(fill) {
      var rgb = C.parse(fill);
      if (!rgb) return t.text;
      return C.contrast(rgb, [255, 255, 255, 1]) >= C.contrast(rgb, [31, 26, 36, 1]) ? '#ffffff' : '#1f1a24';
    }
    var labelBase = { fontSize: 11, fontWeight: 500 };

    var series = [{
      name: '_base', // Excel 'Total' series with no fill: the running total under the floating columns
      type: 'bar',
      stack: 'capacity',
      barCategoryGap: (gap * 100).toFixed(1) + '%',
      data: d.base,
      itemStyle: { color: 'transparent' },
      silent: true,
      emphasis: { disabled: true },
    }];
    d.classes.forEach(function (s, k) {
      var col = t.c(s.color);
      var top = k === d.classes.length - 1; // Class 3 carries the column-total labels
      series.push({
        name: s.name,
        type: 'bar',
        stack: 'capacity',
        barCategoryGap: (gap * 100).toFixed(1) + '%',
        itemStyle: { color: col },
        data: s.values.map(function (v, i) {
          if (i === n - 1) {
            return { value: v, label: { show: true, position: 'inside', color: inkOn(col) } };
          }
          if (top && d.topLabels[i] != null) {
            return { value: v, label: { show: true, position: 'top', color: t.text2 } };
          }
          return { value: v };
        }),
        label: {
          show: false,
          fontSize: labelBase.fontSize,
          fontWeight: labelBase.fontWeight,
          formatter: function (p) {
            return p.dataIndex < n - 1 && top ? fmt(d.topLabels[p.dataIndex]) : fmt(p.value);
          },
        },
        labelLayout: { hideOverlap: false },
        z: 2,
      });
    });

    var w = t.lw(d.rct.width);
    var rctVal = d.rct.values[0];
    series.push({
      name: d.rct.name,
      type: 'line',
      xAxisIndex: 1,
      data: d.rct.values,
      lineStyle: { color: t.c(d.rct.color), width: w, type: t.dash(d.rct.dash, w) },
      itemStyle: { color: t.c(d.rct.color) },
      legendHidden: true, // Excel deletes this legend entry; the text box labels the line
      z: 4,
      // text box "RCT 6,323": label of an invisible mark line at the same height, at its left end
      markLine: {
        silent: true,
        symbol: 'none',
        lineStyle: { color: 'transparent' }, // not opacity: the label would inherit it
        emphasis: { disabled: true },
        label: {
          position: 'insideStartTop',
          formatter: d.rct.name + ' ' + fmt(rctVal),
          color: t.text,
          fontSize: 11,
          fontWeight: 700,
          distance: [2, 6],
        },
        data: [{ yAxis: rctVal }],
      },
    });

    // left brace beside the Total column, from 0 to the top of Class 2, with its value
    var braceColor = t.c(d.classes[0].color);
    series.push({
      name: '_brace',
      type: 'custom',
      silent: true,
      z: 5,
      data: [[d.brace.index, 0, d.brace.value]],
      encode: { x: 0, y: [1, 2] },
      renderItem: function (params, api) {
        var lo = api.coord([api.value(0), api.value(1)]);
        var hi = api.coord([api.value(0), api.value(2)]);
        var band = api.size([1, 0])[0];
        var x = lo[0] - (band * (1 - gap)) / 2 - 6; // 6px clear of the column's left edge
        var dx = 5; // depth of the brace
        var y0 = lo[1], y1 = hi[1], ym = (y0 + y1) / 2;
        var r = Math.max(2, Math.min(8, (y0 - y1) / 4));
        var path = [
          'M', x + dx, y1, 'Q', x, y1, x, y1 + r,
          'L', x, ym - r, 'Q', x, ym, x - dx, ym,
          'Q', x, ym, x, ym + r,
          'L', x, y0 - r, 'Q', x, y0, x + dx, y0,
        ].join(' ');
        return {
          type: 'group',
          children: [
            { type: 'path', shape: { pathData: path }, style: { stroke: braceColor, fill: 'none', lineWidth: 1.25 } },
            {
              type: 'text',
              style: {
                text: fmt(api.value(2)), x: x - dx - 4, y: ym, align: 'right', verticalAlign: 'middle',
                fill: t.text2, fontSize: 11, fontWeight: 500, fontFamily: t.font,
              },
            },
          ],
        };
      },
    });

    // category labels stay horizontal: on phones one word per line, otherwise wrap to the column band
    var xa = t.cAxis({
      data: d.categories,
      interval: 0,
      format: t.size === 'sm' ? function (v) { return String(v).replace(/ /g, '\n'); } : undefined,
    });
    xa.axisLabel.lineHeight = 14;
    if (t.size !== 'sm') {
      xa.axisLabel.width = Math.floor((t.width - 70) / n - 8);
      xa.axisLabel.overflow = 'break';
    }
    var xaRct = {
      type: 'category',
      data: d.categories,
      boundaryGap: false, // midCat: first and last points on the plot edges
      show: false,
      axisPointer: { type: 'none' },
    };
    return {
      grid: { top: 40, right: 16, bottom: 8, left: 8, containLabel: true },
      tooltip: t.tooltipAxis({
        format: fmt,
        unit: 'MW',
        reverse: true,
        hideZero: true,
        total: { label: 'Column total', filter: function (name) { return name !== d.rct.name; } },
      }),
      xAxis: [xa, xaRct],
      yAxis: t.vAxis({ name: 'Peak capacity (MW)', min: 0, max: 8000, interval: 1000, format: fmt }),
      series: series,
    };
  },
});
