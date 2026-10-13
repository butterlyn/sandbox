// Figure 11 (Ch2_F.11) — Forecast business underlying consumption by component, Expected
// scenario, 2025-26 to 2035-36 (TWh). Excel: seven stacked areas starting on the axis edge
// (crossBetween midCat): Business mass market, Large industrial loads, Data centres, New
// industries, Electric vehicles, Business electrification, and Energy efficiency on top in an
// ltDnDiag pattern; then Underlying (dashed) and Delivered (solid) lines in #424242. Underlying
// equals the first six areas, so the hatched band shows consumption avoided by energy efficiency
// above it. Areas stack as Excel draws them (plain running sum).
// Annotation from the chart's user shapes (drawing16.xml): a short white line across the gap
// between the Underlying and Delivered lines and a white arrow pointing to it from the text
// "Supplied by rooftop solar" in the Large industrial loads band. Excel places the gap line
// between 2034-35 and 2035-36; category axes snap to whole categories, so it is drawn at 2034-35
// with the label one category to the left, as in the register.
// Axis 0-25 with steps of 5 is where Excel's automatic scale lands; fixed so the browser matches.
// Tooltip lists the lines, then the stack top-down; no Total row, because the stack total
// (Underlying plus energy efficiency) is not a quantity the register reports.
(function () {
  ESOO.register({
    id: 'Ch2_F.11',
    height: { lg: 480, md: 460, sm: 400 },
    categoryLabel: 'Financial year',
    // Excel's legend order (the series below list Delivered before Underlying, see there)
    legendOrder: ['Business mass market', 'Large industrial loads', 'Data centres', 'New industries',
      'Electric vehicles', 'Business electrification', 'Energy efficiency', 'Underlying', 'Delivered'],
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
          z: s.name === 'Delivered' ? 4 : 3, // Excel draws Underlying, then Delivered on top
        };
      });
      // Excel's series order ends Underlying, Delivered; list Delivered first (as in Figure 10) so
      // the reversed tooltip reads top-down: Underlying above Delivered, then the stack
      var only = function (nm) { return series.filter(function (x) { return x.name === nm; }); };
      series = series.filter(function (x) { return x.name !== 'Delivered' && x.name !== 'Underlying'; })
        .concat(only('Delivered'), only('Underlying'));

      // annotation (Excel user shapes): short white line across the Underlying-Delivered gap, and a
      // white arrow to it from the label; the label hangs just below the arrow's start, inside the
      // Large industrial loads band (its top at the label's year less a margin)
      var a = d.annotation;
      var i = d.categories.indexOf(a.category);
      var j = d.categories.indexOf(a.labelCategory);
      var hi = byName[a.from].values[i];
      var lo = byName[a.to].values[i];
      var bandTop = byName['Business mass market'].values[j] + byName['Large industrial loads'].values[j];
      var start = bandTop - 0.9;
      var white = '#ffffff';
      series.push({
        name: '_annotation',
        type: 'line',
        data: [],
        silent: true,
        z: 5,
        markLine: {
          silent: true,
          symbol: ['none', 'triangle'],
          symbolSize: [8, 8],
          lineStyle: { color: white, width: 1.5, type: 'solid', opacity: 1 },
          emphasis: { disabled: true },
          label: { show: false },
          data: [
            [{ coord: [a.category, hi], symbol: 'none' }, { coord: [a.category, lo], symbol: 'none' }],
            [{ coord: [a.labelCategory, start] }, { coord: [a.category, (hi + lo) / 2] }],
          ],
        },
        markPoint: {
          silent: true,
          symbol: 'circle',
          symbolSize: 0,
          itemStyle: { color: 'transparent' },
          label: {
            show: true,
            position: 'bottom',
            distance: 4,
            align: 'center',
            formatter: a.text.join('\n'),
            color: white,
            fontSize: t.size === 'sm' ? 11 : 12,
            fontWeight: 600,
            lineHeight: t.size === 'sm' ? 14 : 16,
            textShadowColor: 'rgba(0,0,0,0.4)',
            textShadowBlur: 3,
          },
          data: [{ coord: [a.labelCategory, start] }],
        },
      });

      var tooltip = t.tooltipAxis({ format: twh, unit: 'TWh', reverse: true });
      swatchKeys(tooltip, d.series.filter(function (s) { return s.type === 'area'; }).map(function (s) { return s.name; }));
      return {
        // the first and last year labels sit on the plot edges; leave room for the last one
        grid: { right: rotate ? 16 : 30 },
        tooltip: tooltip,
        xAxis: t.cAxis({ data: d.categories, boundaryGap: false, rotate: rotate }),
        yAxis: t.vAxis({ name: 'Annual consumption (TWh)', min: 0, max: 25, interval: 5, numFmt: '#,##0' }),
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
