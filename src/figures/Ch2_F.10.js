// Figure 10 (Ch2_F.10) — Forecast underlying residential consumption by component, Expected
// scenario, 2025-26 to 2035-36 (TWh). Excel: four stacked areas starting on the axis edge
// (crossBetween midCat): Lighting and appliances, Electric vehicles, Electrification, and Energy
// efficiency on top in an ltDnDiag pattern; then Delivered (solid) and Underlying (dashed) lines
// in #424242. Underlying equals the first three areas, so the hatched band shows consumption
// avoided by energy efficiency above it. Areas stack as Excel draws them (plain running sum).
// The white double-headed arrow and "Supplied by rooftop solar" label are the chart's own user
// shapes (drawing14.xml), redrawn at 2033-34 between the Underlying and Delivered lines (the label
// moves to the left of the arrow when there is no room on the right, e.g. on phones).
// Axis 0-12 with steps of 2 is where Excel's automatic scale lands; fixed so the browser matches.
// Tooltip lists the lines, then the stack top-down; no Total row, because the stack total
// (Underlying plus energy efficiency) is not a quantity the register reports.
(function () {
  ESOO.register({
    id: 'Ch2_F.10',
    height: { lg: 480, md: 460, sm: 400 },
    categoryLabel: 'Financial year',
    option: function (d, t) {
      var twh = function (v) { return t.fmt.num(v, 2); };
      var n = d.categories.length;
      var plotW = t.width - 70; // approximate plot width (y-axis labels and padding removed)
      var rotate = plotW / n < 48 ? 45 : 0;
      var byName = {};
      d.series.forEach(function (s) { byName[s.name] = s; });

      var series = d.series.map(function (s) {
        if (s.type === 'area') {
          var fill = t.c(s.color);
          // pattern background is the chart background (white in the register)
          var decal = s.pattern ? t.pattern(s.pattern, t.dark ? t.surface : s.patternBg) : undefined;
          return {
            name: s.name,
            type: 'line',
            stack: 'components',
            stackStrategy: 'all', // Excel stacked areas add values as they come, sign included
            data: s.values,
            showSymbol: false,
            // line series take their decal from lineStyle; itemStyle.decal marks the legend key as hatched
            lineStyle: { width: 0, decal: decal },
            itemStyle: { color: fill, decal: decal },
            areaStyle: { color: fill, opacity: 1 },
            // keep the workbook colours while hovering (the axis pointer would otherwise lift every area)
            emphasis: { disabled: true },
            z: 2,
          };
        }
        var w = t.lw(s.width);
        return {
          name: s.name,
          type: 'line',
          data: s.values,
          lineStyle: { color: t.c(s.color), width: w, type: t.dash(s.dash, w) },
          itemStyle: { color: t.c(s.color) },
          z: 3,
        };
      });

      // annotation (Excel user shapes): white double-headed arrow across the gap between the
      // Underlying and Delivered lines, white text beside it
      var a = d.annotation;
      var i = d.categories.indexOf(a.category);
      var hi = byName[a.from].values[i];
      var lo = byName[a.to].values[i];
      var white = '#ffffff';
      var roomRight = (plotW * (n - 1 - i)) / (n - 1);
      var labelSide = roomRight < 100 ? 'left' : 'right';
      series.push({
        name: '_annotation',
        type: 'line',
        data: [],
        silent: true,
        z: 5,
        markLine: {
          silent: true,
          symbol: ['triangle', 'triangle'],
          symbolSize: [8, 8],
          lineStyle: { color: white, width: 1.5, type: 'solid', opacity: 1 },
          emphasis: { disabled: true },
          label: { show: false },
          data: [[{ coord: [a.category, hi] }, { coord: [a.category, lo] }]],
        },
        markPoint: {
          silent: true,
          symbol: 'circle',
          symbolSize: 0,
          itemStyle: { color: 'transparent' },
          label: {
            show: true,
            position: labelSide,
            distance: 9,
            align: labelSide === 'left' ? 'right' : 'left',
            formatter: a.text.join('\n'),
            color: white,
            fontSize: t.size === 'sm' ? 11 : 12,
            fontWeight: 600,
            lineHeight: t.size === 'sm' ? 14 : 16,
            textShadowColor: 'rgba(0,0,0,0.4)',
            textShadowBlur: 3,
          },
          data: [{ coord: [a.category, (hi + lo) / 2] }],
        },
      });

      var tooltip = t.tooltipAxis({ format: twh, unit: 'TWh', reverse: true });
      swatchKeys(tooltip, d.series.filter(function (s) { return s.type === 'area'; }).map(function (s) { return s.name; }));
      return {
        // the first and last year labels sit on the plot edges; leave room for the last one
        grid: { right: rotate ? 16 : 30 },
        tooltip: tooltip,
        xAxis: t.cAxis({ data: d.categories, boundaryGap: false, rotate: rotate }),
        yAxis: t.vAxis({ name: 'Annual consumption (TWh)', min: 0, max: 12, interval: 2, numFmt: '#,##0' }),
        series: series,
      };
    },
  });

  // The shared axis tooltip keys every line-type series as a line, but stacked areas are swatches
  // in the legend; swap the key of those rows to a swatch. Leaves the HTML untouched if its
  // markup ever changes.
  function swatchKeys(tooltip, names) {
    var base = tooltip.formatter;
    var tags = names.map(function (nm) { return '<span>' + ESOO.esc(nm) + '</span>'; });
    tooltip.formatter = function (params) {
      return base(params).split('<div class="tt-row">').map(function (row, k) {
        if (!k) return row;
        var isArea = tags.some(function (tag) { return row.indexOf(tag) >= 0; });
        return isArea ? row.replace('tt-key--line', 'tt-key--rect') : row;
      }).join('<div class="tt-row">');
    };
    return tooltip;
  }
})();
