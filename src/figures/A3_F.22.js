// Appendix Figure 22 (A3_F.22) — Difference between forecast supply capacity and maximum quantity of
// power injectable to the SWIS, wind and solar generators, Expected scenario, 2026-27 to 2035-36 (MW).
// Excel: stacked columns — forecast capacity of wind and solar plus the estimated RLM uplift (solid),
// then the difference to the maximum injectable quantity for wind and solar (smCheck pattern) — and a
// *stacked* line group, so 'Maximum quantity of power injectable to the SWIS' is drawn on top of the
// Expected forecast line (values here are the plotted totals). The register labels both blocks 'Wind' /
// 'Solar'; the legend keeps those labels (with checked keys, as in Excel) while the tooltip and table
// name the patterned series '… – difference to maximum injectable'. y axis: auto in Excel, which lands
// on 0–4,500 with 500 steps (fixed here to match).
(function () {
  var ID = 'A3_F.22';
  var esc = ESOO.esc;
  var DIFF = ' – difference to maximum injectable';

  // CSS backgrounds for legend / tooltip keys, imitating Excel's pattern fill and dashes
  function fillCss(fg, prst, bg) {
    bg = bg || '#ffffff';
    if (prst === 'smCheck') return 'repeating-conic-gradient(' + fg + ' 0 25%,' + bg + ' 0 50%) 0 0/4px 4px';
    return fg;
  }
  function lineCss(c, dash) {
    if (dash === 'dashDot') return 'repeating-linear-gradient(90deg,' + c + ' 0 7px,transparent 7px 9px,' + c + ' 9px 11px,transparent 11px 13px)';
    return c;
  }
  function seriesName(b) {
    return b.kind === 'difference' ? b.name + DIFF : b.name;
  }

  ESOO.register({
    id: ID,
    height: { lg: 460, md: 440, sm: 400 },
    categoryLabel: 'Capacity year',
    // Excel's legend: the stack top-down, then the lines top-down; labels as in the register
    legendItems: function (d, t) {
      return d.bars.slice().reverse().map(function (b) {
        return { name: seriesName(b), label: b.name, color: fillCss(t.c(b.color), b.pattern, b.bg), shape: 'rect' };
      }).concat(d.lines.slice().reverse().map(function (l) {
        return { name: l.name, color: lineCss(t.c(l.color), l.dash), shape: 'line' };
      }));
    },
    table: function (d) {
      var rows = d.bars.map(function (b) { return { row: b.row, name: seriesName(b), values: b.values }; })
        .concat(d.lines).sort(function (a, b) { return a.row - b.row; });
      return {
        columns: [d.header || 'Series'].concat(d.categories),
        rows: rows.map(function (r) { return [r.name].concat(r.values); }),
        note: 'Rows follow the register. Excel stacks the two lines, so the maximum injectable quantity is plotted on top of the Expected forecast (the values shown are the plotted values).',
      };
    },
    option: function (d, t) {
      var fmt = t.fmt.excel('#,##0');
      var series = d.bars.map(function (b, i) {
        var st = { color: t.c(b.color) };
        if (b.pattern) st.decal = t.pattern(b.pattern, b.bg);
        return {
          id: 'bar' + i,
          name: seriesName(b),
          type: 'bar',
          stack: 'capacity',
          barCategoryGap: '23%', // Excel gap width 30
          itemStyle: st,
          data: b.values,
          keyCss: fillCss(t.c(b.color), b.pattern, b.bg),
          z: 1,
        };
      }).concat(d.lines.map(function (l, i) {
        var w = t.lw(l.width);
        return {
          id: 'line' + i,
          name: l.name,
          type: 'line',
          data: l.values,
          lineStyle: { color: t.c(l.color), width: w, type: t.dash(l.dash, w) },
          itemStyle: { color: t.c(l.color) },
          keyCss: lineCss(t.c(l.color), l.dash),
          connectNulls: false,
          z: 3,
        };
      }));
      var keys = series.map(function (s) { return s.keyCss; });
      var tooltip = t.tooltipAxis({ format: fmt, unit: 'MW', pointer: 'shadow' });
      // stack top-down (non-zero bands), then the two lines top-down
      tooltip.formatter = function (params) {
        params = [].concat(params || []);
        if (!params.length) return '';
        var row = function (p, extra) {
          var line = p.seriesType === 'line';
          return '<div class="tt-row' + (extra || '') + '"><span class="tt-key tt-key--' + (line ? 'line' : 'rect') + '" style="background:' + esc(keys[p.seriesIndex]) + '"></span>' +
            '<b>' + esc(fmt(p.value)) + ' MW</b><span>' + esc(p.seriesName) + '</span></div>';
        };
        var bars = params.filter(function (p) { return p.seriesType === 'bar' && p.value != null && Number(p.value) !== 0; }).reverse();
        var lines = params.filter(function (p) { return p.seriesType === 'line' && p.value != null; }).reverse();
        var html = '<div class="tt"><div class="tt-head">' + esc(params[0].axisValueLabel) + '</div>';
        bars.forEach(function (p) { html += row(p); });
        lines.forEach(function (p, i) { html += row(p, i === 0 && bars.length ? ' tt-total' : ''); });
        return html + '</div>';
      };
      return {
        tooltip: tooltip,
        xAxis: t.cAxis({ data: d.categories, rotate: t.size === 'sm' ? 45 : 0 }),
        yAxis: t.vAxis({ name: 'Capacity (MW)', min: 0, max: 4500, interval: 500, format: fmt }),
        series: series,
      };
    },
  });
})();
