// Figure 2 (ES_F.2) — Forecast peak capacity by technology type, under three scenarios, 2026-27 to
// 2035-36 (MW). Excel: one stacked column per capacity year holding existing Facilities (solid fills),
// then committed (pct80 dot pattern), then anticipated (narVert line pattern), each split by
// technology type, plus a *stacked* line group, so the Low / Expected / High lines trace the running
// totals existing / + committed / + anticipated (the values here are those plotted totals). The three
// scenarios are therefore the three stack levels of every column; the register labels them with grey
// call-out boxes and elbow arrows (chart text boxes + sheet connectors), redrawn by the custom series.
// Fills are the workbook's, including a few off-palette ones on committed/anticipated series that are
// zero or a few MW. y axis: min 0, step 1,000, max auto (Excel lands on 8,000). Legend as in Excel:
// the nine existing technology types top-down and the three lines; each technology entry also toggles
// its committed and anticipated segments. Three #REF! leftover series (a cached 1 MW in 2026-27,
// legend entries deleted) are omitted.
(function () {
  var ID = 'ES_F.2';
  var STATUS = ['existing', 'committed', 'anticipated'];
  var STATUS_LABEL = { existing: 'Existing', committed: 'Committed', anticipated: 'Anticipated' };
  var BLOCK_LABEL = { existing: 'Existing', committed: 'Existing + committed', anticipated: 'Existing + committed + anticipated' };
  // call-out boxes, top to bottom: the scenario line each arrow points at, between categories at and at+1
  var CALLOUTS = [
    { text: 'Existing, committed and anticipated Facilities', line: 2, at: 2, fill: '#E6E6E6', mix: 0.1 },
    { text: 'Existing and committed Facilities', line: 1, at: 4, fill: '#BFBFBF', mix: 0.2 },
    { text: 'Existing Facilities', line: 0, at: 6, fill: '#999999', mix: 0.32 },
  ];
  var esc = ESOO.esc;
  var measureCtx = null;

  function textWidth(text, font) {
    if (!measureCtx) measureCtx = document.createElement('canvas').getContext('2d');
    measureCtx.font = font;
    return measureCtx.measureText(text).width;
  }
  function mix(a, b, f) {
    var x = ESOO.color.parse(a) || [27, 24, 32, 1], y = ESOO.color.parse(b) || [255, 255, 255, 1];
    return ESOO.color.toHex([0, 1, 2].map(function (i) { return x[i] + (y[i] - x[i]) * f; }));
  }
  function seriesName(b) {
    return b.status === 'existing' ? b.tech : b.tech + ' – ' + b.status;
  }
  // technology types top-down (reverse of the existing stack), with their existing (solid) colour
  function techs(d) {
    return d.bars.filter(function (b) { return b.status === 'existing'; }).reverse()
      .map(function (b) { return { name: b.tech, color: b.color }; });
  }
  // the page draws lines with round caps; shift Excel's dash arrays so dots and gaps survive the caps
  function lineType(t, dash, w) {
    var a = t.dash(dash, w);
    if (!Array.isArray(a)) return a;
    return a.map(function (v, i) { return i % 2 ? v + w : Math.max(0.01, v - w); });
  }
  // CSS background for legend / tooltip line keys, imitating the dash
  function keyCss(c, dash) {
    if (dash === 'sysDot') return 'repeating-linear-gradient(90deg,' + c + ' 0 2.5px,transparent 2.5px 5px)';
    if (dash === 'dash') return 'repeating-linear-gradient(90deg,' + c + ' 0 6px,transparent 6px 9px)';
    return c;
  }

  function tooltip(d, t, fmt) {
    var tk = techs(d);
    var base = t.tooltipAxis({ format: fmt, unit: 'MW', pointer: 'shadow' });
    base.formatter = function (params) {
      params = [].concat(params || []);
      if (!params.length) return '';
      var cells = {}, lines = {};
      params.forEach(function (p) {
        var id = String(p.seriesId || '').split('|');
        if (id[0] === 'bar') (cells[id[2]] = cells[id[2]] || {})[id[1]] = p.value;
        else if (id[0] === 'line') lines[id[1]] = p;
      });
      var num = 'text-align:right;padding:1px 0 1px 12px;white-space:nowrap;';
      var dim = 'color:var(--ink-3);';
      var cell = function (v) { return v ? '<td style="' + num + 'color:var(--ink);font-weight:600">' + esc(fmt(v)) + '</td>' : '<td style="' + num + dim + '">–</td>'; };
      var sum = { existing: 0, committed: 0, anticipated: 0 };
      var body = '';
      tk.forEach(function (k) {
        var c = cells[k.name];
        if (!c || !STATUS.some(function (s) { return c[s]; })) return;
        STATUS.forEach(function (s) { sum[s] += Number(c[s]) || 0; });
        body += '<tr><td style="padding:1px 6px 1px 0"><span class="tt-key tt-key--rect" style="display:block;background:' + esc(t.c(k.color)) + '"></span></td>' +
          '<td style="padding:1px 0;color:var(--ink-2)">' + esc(k.name) + '</td>' + STATUS.map(function (s) { return cell(c[s]); }).join('') + '</tr>';
      });
      var html = '<div class="tt" style="max-width:none"><div class="tt-head">' + esc(params[0].axisValueLabel) + ' <span style="font-weight:400;color:var(--ink-3)">MW</span></div>';
      if (body) {
        html += '<table style="border-collapse:collapse;font-variant-numeric:tabular-nums;margin-bottom:4px"><thead><tr><th></th><th></th>' +
          STATUS.map(function (s) { return '<th style="' + num + dim + 'font-weight:600">' + STATUS_LABEL[s] + '</th>'; }).join('') + '</tr></thead><tbody>' + body +
          '<tr style="border-top:1px solid var(--line)"><td></td><td style="padding:3px 0 1px;color:var(--ink-2)">Total</td>' +
          STATUS.map(function (s) { return cell(sum[s]).replace('padding:1px', 'padding:3px'); }).join('') + '</tr></tbody></table>';
      }
      d.lines.slice().reverse().forEach(function (l) {
        var p = lines[l.name];
        if (!p || p.value == null) return;
        html += '<div class="tt-row tt-total" style="margin-top:0;border-top:0;padding-top:1px"><span class="tt-key tt-key--line" style="background:' + esc(keyCss(t.c(l.color), l.dash)) + '"></span>' +
          '<b>' + esc(fmt(p.value)) + ' MW</b><span>' + esc(l.name) + '</span></div>';
      });
      return html + '</div>';
    };
    return base;
  }

  function callouts(d, t) {
    var fs = t.size === 'sm' ? 11 : 12;
    var font = '500 ' + fs + 'px ' + t.font;
    var padX = t.size === 'sm' ? 5 : 8;
    var h = fs + 9;
    var ink = t.dark ? t.text : '#1f1a24';
    var arrow = t.dark ? t.text2 : '#424242';
    return {
      name: '_callouts',
      type: 'custom',
      silent: true,
      z: 6,
      clip: false,
      tooltip: { show: false },
      data: [[0, 0]],
      renderItem: function (params, api) {
        var cs = params.coordSys;
        var right = cs.x + cs.width - 1, top = cs.y + 3;
        var kids = [];
        CALLOUTS.forEach(function (co, k) {
          var w = Math.ceil(textWidth(co.text, font)) + 2 * padX;
          var x0 = right - w, y0 = top + k * h, ym = y0 + h / 2;
          var vals = d.lines[co.line].values;
          var v = (vals[co.at] + vals[co.at + 1]) / 2; // the line is straight between the two points
          var pa = api.coord([co.at, v]), pb = api.coord([co.at + 1, v]);
          var ax = Math.round((pa[0] + pb[0]) / 2) + 0.5, tip = pa[1] - 3;
          kids.push({ type: 'rect', shape: { x: x0, y: y0, width: w, height: h }, style: { fill: t.dark ? mix(t.surface, '#ffffff', co.mix) : co.fill } });
          kids.push({ type: 'text', style: { x: x0 + w / 2, y: ym, text: co.text, font: font, fill: ink, align: 'center', verticalAlign: 'middle' } });
          var pts = ax < x0 - 6 ? [[x0, ym], [ax, ym], [ax, tip - 6]] : [[ax, y0 + h], [ax, tip - 6]];
          kids.push({ type: 'polyline', shape: { points: pts }, style: { stroke: arrow, lineWidth: 1.25, fill: 'none' } });
          kids.push({ type: 'polygon', shape: { points: [[ax - 3.5, tip - 7], [ax + 3.5, tip - 7], [ax, tip]] }, style: { fill: arrow } });
        });
        return { type: 'group', children: kids };
      },
    };
  }

  ESOO.register({
    id: ID,
    height: { lg: 500, md: 480, sm: 440 },
    categoryLabel: 'Capacity year',
    legendItems: function (d, t) {
      var items = techs(d).map(function (k) {
        return {
          name: k.name, color: t.c(k.color), shape: 'rect',
          also: d.bars.filter(function (b) { return b.tech === k.name && b.status !== 'existing'; }).map(seriesName),
        };
      });
      return items.concat(d.lines.slice().reverse().map(function (l) {
        return { name: l.name, color: keyCss(t.c(l.color), l.dash), shape: 'line' };
      }));
    },
    table: function (d) {
      var rows = d.bars.map(function (b) { return { row: b.row, cells: [b.tech, STATUS_LABEL[b.status]].concat(b.values) }; })
        .concat(d.lines.map(function (l, i) { return { row: l.row, cells: [l.name, BLOCK_LABEL[STATUS[i]]].concat(l.values) }; }));
      rows.sort(function (a, b) { return a.row - b.row; });
      return {
        columns: [d.header || 'Series', 'Facilities'].concat(d.categories),
        rows: rows.map(function (r) { return r.cells; }),
        note: 'Rows follow the register. Excel stacks the three scenario lines, so their values are running totals of the blocks above them (the plotted values).',
      };
    },
    option: function (d, t) {
      var fmt = t.fmt.excel('#,##0');
      var series = d.bars.map(function (b) {
        var st = { color: t.c(b.color) };
        if (b.pattern) st.decal = t.pattern(b.pattern, b.bg);
        return {
          id: 'bar|' + b.status + '|' + b.tech,
          name: seriesName(b),
          type: 'bar',
          stack: 'capacity',
          barCategoryGap: '23%', // Excel gap width 30
          itemStyle: st,
          data: b.values,
          z: 1,
        };
      }).concat(d.lines.map(function (l) {
        var w = t.lw(l.width);
        return {
          id: 'line|' + l.name,
          name: l.name,
          type: 'line',
          data: l.values,
          lineStyle: { color: t.c(l.color), width: w, type: lineType(t, l.dash, w) },
          itemStyle: { color: t.c(l.color) },
          connectNulls: false,
          z: 3,
        };
      }));
      series.push(callouts(d, t));
      return {
        tooltip: tooltip(d, t, fmt),
        xAxis: t.cAxis({ data: d.categories, rotate: t.size === 'sm' ? 45 : 0 }),
        yAxis: t.vAxis({ name: 'Forecast peak capacity (MW)', min: 0, max: 8000, interval: 1000, format: fmt }),
        series: series,
      };
    },
  });
})();
