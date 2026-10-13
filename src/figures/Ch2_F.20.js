// Figure 20 (Ch2_F.20) — Minimum operational demand forecast and committed Electric Storage Resource
// entry, 90% POE Expected scenario, 2017-18 to 2035-36 (MW). Excel combo (chart18), drawn in the
// order Excel paints it: all areas, then columns, then the secondary column, then lines.
//  - Stacked areas: operational demand (grey) under PV and PVNSG (actuals) / PV (forecast). Excel
//    stacks areas algebraically with blanks as zero (stackStrategy 'all') and, as the published
//    figure shows, fills them down to the axis minimum (-500). Their legend entries are deleted in
//    Excel; the chart's own text boxes label them instead (reproduced as in-plot labels).
//  - Secondary areas: the 550 MW management minimum and 300 MW technical envelope bands, also filled
//    from -500. The register's third band (row 61, -500 MW) has zero height there and is omitted.
//  - ESR columns float on the forecast demand (invisible base, gap width 30). Excel builds the
//    2031-32 to 2035-36 bars from two 'Construction' rows (59 and 60) with the same span; here each
//    bar is one segment carrying the register's ESR value (row 55), so the tooltip shows ESR itself.
//  - NCESS (2025-26) on the secondary axis: narrower (gap width 100), wide downward-diagonal pattern,
//    stacked on the same invisible base.
//  - Lines with diamond markers: actual (black) and forecast 90% POE (purple) unscheduled demand.
// Points sit on tick marks (Excel 'midCat'); the unlabeled 20th category (sheet column W) only
// extends the areas past the last bar, as in Excel. Both value axes run -500 to 3,500 by 500.
ESOO.register({
  id: 'Ch2_F.20',
  height: { lg: 500, md: 470, sm: 480 },
  categoryLabel: 'Financial year',
  table: function (d) {
    var a = d.areas, l = d.lines;
    var cols = [l[0], l[1], a[1], a[2], d.esr, d.ncess, d.bands[0], d.bands[1]];
    return {
      columns: ['Financial year'].concat(cols.map(function (s) { return s.name + ' (MW)'; })),
      rows: d.categories.map(function (c, i) {
        return [c].concat(cols.map(function (s) { return s.values[i]; }));
      }),
      decimals: 0,
      note: 'ESR and NCESS columns start at the forecast 90% POE unscheduled operational demand.',
    };
  },
  option: function (d, t) {
    var fmt = t.fmt.excel('#,##0');
    var nYears = d.categories.length;
    var cats = d.categories.slice();
    while (cats.length < d.n) cats.push(''); // sheet column W: no label in Excel either
    var zero = function (v) { return v == null ? 0 : v; }; // stacked areas plot blanks as zero
    var tint = function (s) { return s.alpha < 1 ? t.alpha(t.c(s.color), s.alpha) : t.c(s.color); };
    var rot = (t.width - 90) / (d.n - 1) < 50 ? 45 : 0;
    // the chart's two text boxes, placed where they sit in the register (data coordinates)
    var note = function (text, x, y, size, left, color) {
      return {
        silent: true,
        symbol: 'circle',
        symbolSize: 1,
        itemStyle: { color: 'transparent' },
        animation: false,
        tooltip: { show: false },
        label: {
          show: true, position: 'inside', color: color || t.text2, fontSize: size, lineHeight: Math.round(size * 1.25),
          align: left ? 'left' : 'center', padding: left ? [0, 0, 0, 3] : 0, formatter: text,
        },
        data: [{ coord: [x, y] }],
      };
    };
    var sm = t.size === 'sm';
    var grey = d.areas[0], pvActual = d.areas[1], pvForecast = d.areas[2];
    var stacked = function (name, s, values) {
      return {
        name: name,
        type: 'line',
        stack: 'demand',
        stackStrategy: 'all', // Excel adds stacked area values algebraically
        data: values.map(zero),
        symbol: 'none',
        lineStyle: { width: 0 },
        itemStyle: { color: tint(s) },
        areaStyle: { color: tint(s), opacity: 1, origin: 'start' },
        emphasis: { disabled: true },
        silent: true,
        z: 1,
      };
    };
    // the grey area repeats the two demand lines, so it stays out of the readout and table
    var greyArea = stacked('_' + grey.name, grey, grey.values);
    var onGrey = t.dark ? t.surface : t.text2; // the grey fill stays light in dark mode
    greyArea.markPoint = sm ? note('Operational\ndemand', 0, 570, 9, true, onGrey) : note('Operational demand', 2, 700, 12, false, onGrey);
    // PV and PVNSG (actuals) and PV (forecast) share one colour and never overlap: one polygon,
    // so no anti-aliased seam shows where one hands over to the other
    var pvArea = stacked('_PV area', pvForecast, pvActual.values.map(function (v, i) { return v != null ? v : pvForecast.values[i]; }));
    pvArea.markPoint = sm
      ? note('Demand met by\ndistributed PV\nand PV Non Scheduled\nGeneration', 14, 2150, 10)
      : note('Demand met by\ndistributed PV and PV\nNon Scheduled\nGeneration', 16, 2070, 12);
    // the two PV series themselves: invisible, for the readout (legend entries deleted in Excel)
    var pvSeries = [pvActual, pvForecast].map(function (s) {
      return {
        name: s.name, type: 'line', legendHidden: true, data: s.values, symbol: 'none', silent: true,
        lineStyle: { width: 0 }, itemStyle: { color: tint(s) }, emphasis: { disabled: true }, z: 1,
      };
    });
    var areas = [greyArea, pvArea].concat(pvSeries);
    var bands = d.bands.map(function (s) {
      return {
        name: s.name,
        type: 'line',
        xAxisIndex: 1,
        yAxisIndex: 1,
        legendShape: 'rect',
        data: s.values,
        symbol: 'none',
        lineStyle: { width: 0 },
        itemStyle: { color: tint(s) },
        areaStyle: { color: tint(s), opacity: 1, origin: 'start' },
        emphasis: { disabled: true },
        z: 1,
      };
    });
    var floating = function (s, o) {
      return [
        {
          name: '_' + s.name + ' base',
          type: 'bar',
          stack: o.stack,
          stackStrategy: 'all',
          xAxisIndex: o.axis,
          yAxisIndex: o.axis,
          barCategoryGap: o.gap,
          data: s.base,
          itemStyle: { color: 'transparent' },
          silent: true,
          z: o.z,
        },
        {
          name: s.name,
          type: 'bar',
          stack: o.stack,
          stackStrategy: 'all',
          xAxisIndex: o.axis,
          yAxisIndex: o.axis,
          barCategoryGap: o.gap,
          data: s.values,
          itemStyle: o.style,
          z: o.z,
        },
      ];
    };
    var esr = floating(d.esr, { stack: 'esr', axis: 0, gap: '23%', z: 2, style: { color: tint(d.esr) } }); // gap width 30
    var ncess = floating(d.ncess, {
      stack: 'ncess', axis: 1, gap: '50%', z: 3, // gap width 100
      style: { color: t.c(d.ncess.color), decal: t.pattern(d.ncess.pattern, t.dark ? t.surface : d.ncess.patternBg) },
    });
    var lines = d.lines.map(function (s) {
      var w = t.lw(s.width);
      return {
        name: s.name,
        type: 'line',
        data: s.values,
        lineStyle: { color: t.c(s.color), width: w, type: t.dash(s.dash, w) },
        itemStyle: { color: t.c(s.color) },
        symbol: t.symbol(s.symbol),
        symbolSize: s.symbolSize * 1.1,
        showSymbol: true,
        connectNulls: false, // dispBlanksAs = gap
        z: 4,
      };
    });
    // readout: demand lines first, then ESR, NCESS, PV and the two thresholds
    var first = [d.lines[0].name, d.lines[1].name, d.esr.name, d.ncess.name, d.areas[1].name, d.areas[2].name];
    var tip = t.tooltipAxis({ format: fmt, unit: 'MW', hideZero: true });
    var listAll = tip.formatter;
    tip.formatter = function (params) {
      params = [].concat(params);
      if (!params.length || params[0].dataIndex >= nYears) return ''; // column W
      var rank = function (p) { var r = first.indexOf(p.seriesName); return r < 0 ? first.length + p.seriesIndex : r; };
      return listAll(params.slice().sort(function (a, b) { return rank(a) - rank(b); }));
    };
    var xAxis = t.cAxis({ data: cats, boundaryGap: false, rotate: rot });
    xAxis.splitLine = { show: true, interval: 0, lineStyle: { color: t.grid } }; // Excel's vertical gridlines
    var xAxis2 = t.cAxis({ data: cats, boundaryGap: false });
    xAxis2.show = false;
    var yAxis2 = t.vAxis({ min: -500, max: 3500, interval: 500, grid: false, position: 'right' });
    yAxis2.show = false; // Excel's secondary axis is deleted; same -500 to 3,500 scale
    return {
      grid: { top: 40, right: 16, bottom: 8, left: 8, containLabel: true },
      tooltip: tip,
      axisPointer: { link: [{ xAxisIndex: 'all' }] },
      xAxis: [xAxis, xAxis2],
      yAxis: [t.vAxis({ name: 'Demand (MW)', min: -500, max: 3500, interval: 500, format: fmt }), yAxis2],
      series: areas.concat(bands, esr, ncess, lines),
    };
  },
});
