// Figure 23 (Ch3_F.23) — Forecast peak capacity with and without Relevant Level Method uplift capacity,
// under three scenarios, 2026-27 to 2035-36 (MW). Excel: stacked columns in one colour told apart by
// pattern — existing (solid), committed (pct75 dots), RLM uplift (yellow), anticipated (narVert
// stripes), RLM uplift again — and a *stacked* line group, so each scenario line is the running total
// of the sheet's increments (values here are the plotted totals; as published, the two High lines sit
// on top of the first RLM uplift band too). y axis fixed 0–8,000, step 1,000. Legend as in Excel: the
// stack top-down with the second RLM entry deleted (one entry toggles both RLM bands), then the lines
// top-down. Legend and tooltip keys imitate the fill patterns.
(function () {
  var ID = 'Ch3_F.23';
  var esc = ESOO.esc;

  // CSS backgrounds for legend / tooltip keys, imitating Excel's pattern fills and dashes
  function fillCss(fg, prst, bg) {
    bg = bg || '#ffffff';
    if (prst === 'pct75' || prst === 'pct80') return 'radial-gradient(circle,' + bg + ' 0 0.9px,transparent 1.4px) 0 0/4px 4px,' + fg;
    if (prst === 'narVert') return 'repeating-linear-gradient(90deg,' + fg + ' 0 1.6px,' + bg + ' 1.6px 3px)';
    return fg;
  }
  function lineCss(c, dash) {
    if (dash === 'sysDash') return 'repeating-linear-gradient(90deg,' + c + ' 0 4px,transparent 4px 6px)';
    if (dash === 'dash') return 'repeating-linear-gradient(90deg,' + c + ' 0 6px,transparent 6px 9px)';
    return c;
  }

  ESOO.register({
    id: ID,
    height: { lg: 480, md: 460, sm: 420 },
    categoryLabel: 'Capacity year',
    // Excel's legend: bars top-down, keeping the lower of the two RLM entries, then lines top-down
    legendItems: function (d, t) {
      var seen = {}, bars = [];
      d.bars.forEach(function (b) {
        if (seen[b.name]) return;
        seen[b.name] = 1;
        bars.push({ name: b.name, color: fillCss(t.c(b.color), b.pattern, b.bg), shape: 'rect' });
      });
      return bars.reverse().concat(d.lines.slice().reverse().map(function (l) {
        return { name: l.name, color: lineCss(t.c(l.color), l.dash), shape: 'line' };
      }));
    },
    table: function (d) {
      var rows = d.bars.concat(d.lines).slice().sort(function (a, b) { return a.row - b.row; });
      return {
        columns: [d.header || 'Series'].concat(d.categories),
        rows: rows.map(function (r) { return [r.name].concat(r.values); }),
        note: 'Rows follow the register. Excel stacks the scenario lines, so their values are running totals of the rows above them (the plotted values).',
      };
    },
    option: function (d, t) {
      var fmt = t.fmt.excel('#,##0');
      var series = d.bars.map(function (b, i) {
        var st = { color: t.c(b.color) };
        if (b.pattern) st.decal = t.pattern(b.pattern, b.bg);
        return {
          id: 'bar' + i,
          name: b.name,
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
      // stack top-down (non-zero bands), then the scenario lines top-down
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
        yAxis: t.vAxis({ name: 'Forecast peak capacity (MW)', min: 0, max: 8000, interval: 1000, format: fmt }),
        series: series,
      };
    },
  });
})();
