/*
 * ESOO figure runtime.
 *
 * Every figure module calls ESOO.register({...}); the page shell (built by scripts/build.py)
 * already contains a static card for each figure. This runtime renders charts lazily as cards
 * approach the viewport, builds the HTML legend, tooltips, data table, copy/download actions,
 * and re-renders on theme or width changes.
 *
 * Figure module contract (see docs/FIGURE_GUIDE.md):
 *   ESOO.register({
 *     id: 'Ch2_F.7',                 // matches src/data/<id>.json and the card id
 *     height: 460 | {lg, md, sm},    // plot height in px (optional)
 *     option(d, t) { return echartsOption },   // d = parsed data JSON, t = theme helper
 *     legendItems(d, t) { ... },     // optional: override derived legend items
 *     legendOrder: ['name', ...],    // optional: order of legend items
 *     legend: false,                 // optional: no HTML legend
 *     table(d, t) { return {columns, rows, note} },  // optional: data table override
 *     after(chart, d, t) { ... },    // optional hook after setOption
 *   });
 */
(function () {
  'use strict';

  var ESOO = (window.ESOO = window.ESOO || {});
  var BUILD = window.ESOO_BUILD || {};
  var registry = {};
  var order = [];
  var dataCache = {};
  var live = {}; // id -> {chart, fig, card, sizeKey, theme}
  ESOO.figures = registry;
  ESOO.live = live;
  ESOO.errors = [];
  ESOO.canDownload = BUILD.downloads !== false;
  ESOO.decals = false;

  ESOO.register = function (fig) {
    if (!fig || !fig.id) throw new Error('ESOO.register: figure needs an id');
    if (!registry[fig.id]) order.push(fig.id);
    registry[fig.id] = fig;
  };

  // ------------------------------------------------------------------ utilities
  function isObj(x) {
    return x !== null && typeof x === 'object' && !Array.isArray(x);
  }
  function clone(x) {
    if (Array.isArray(x)) return x.map(clone);
    if (isObj(x) && x.constructor === Object) {
      var o = {};
      for (var k in x) o[k] = clone(x[k]);
      return o;
    }
    return x;
  }
  /** Fill missing keys of target from defaults (deep for plain objects). */
  function defaults(target, src) {
    if (!isObj(target)) return target;
    for (var k in src) {
      if (target[k] === undefined) target[k] = clone(src[k]);
      else if (isObj(target[k]) && isObj(src[k])) defaults(target[k], src[k]);
    }
    return target;
  }
  function asArray(x) {
    return x == null ? [] : Array.isArray(x) ? x : [x];
  }
  var ESC = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return ESC[c];
    });
  }
  ESOO.esc = esc;
  ESOO.util = { defaults: defaults, clone: clone, asArray: asArray, esc: esc };

  // ------------------------------------------------------------------ colour
  function parseColor(c) {
    if (typeof c !== 'string') return null;
    c = c.trim();
    var m = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.exec(c);
    if (m) {
      var h = m[1];
      if (h.length === 3) h = h[0] + h[0] + h[1] + h[1] + h[2] + h[2];
      return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16), 1];
    }
    m = /^rgba?\(([^)]+)\)$/i.exec(c);
    if (m) {
      var p = m[1].split(',').map(function (s) {
        return parseFloat(s);
      });
      return [p[0], p[1], p[2], p.length > 3 ? p[3] : 1];
    }
    return null;
  }
  function toHex(rgb) {
    return (
      '#' +
      rgb
        .slice(0, 3)
        .map(function (v) {
          var s = Math.round(Math.max(0, Math.min(255, v))).toString(16);
          return s.length === 1 ? '0' + s : s;
        })
        .join('')
    );
  }
  function lum(rgb) {
    var a = rgb.slice(0, 3).map(function (v) {
      v /= 255;
      return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * a[0] + 0.7152 * a[1] + 0.0722 * a[2];
  }
  function contrast(a, b) {
    var l1 = lum(a),
      l2 = lum(b);
    return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
  }
  function rgbToHsl(r, g, b) {
    r /= 255; g /= 255; b /= 255;
    var max = Math.max(r, g, b), min = Math.min(r, g, b), h, s, l = (max + min) / 2;
    if (max === min) { h = s = 0; } else {
      var d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      h = max === r ? (g - b) / d + (g < b ? 6 : 0) : max === g ? (b - r) / d + 2 : (r - g) / d + 4;
      h /= 6;
    }
    return [h, s, l];
  }
  function hslToRgb(h, s, l) {
    function f(p, q, t) {
      if (t < 0) t += 1; if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    }
    if (s === 0) return [l * 255, l * 255, l * 255];
    var q = l < 0.5 ? l * (1 + s) : l + s - l * s, p = 2 * l - q;
    return [f(p, q, h + 1 / 3) * 255, f(p, q, h) * 255, f(p, q, h - 1 / 3) * 255];
  }
  /**
   * Theme-adapt a series colour. Light theme: unchanged (the workbook's own colour).
   * Dark theme: colours that would nearly vanish on the dark surface (coal black, deep purple)
   * are lightened in HSL until they reach a 2.4:1 contrast, keeping their hue.
   */
  function adaptColor(c, dark, surface) {
    var rgb = parseColor(c);
    if (!rgb || !dark) return c;
    var bg = parseColor(surface) || [27, 24, 32, 1];
    if (contrast(rgb, bg) >= 2.4) return c;
    var hsl = rgbToHsl(rgb[0], rgb[1], rgb[2]);
    var out = rgb;
    for (var l = hsl[2]; l <= 0.92; l += 0.02) {
      out = hslToRgb(hsl[0], hsl[1], l);
      if (contrast(out, bg) >= 2.4) break;
    }
    var hex = toHex(out);
    if (rgb[3] < 1) {
      var o = parseColor(hex);
      return 'rgba(' + o[0] + ',' + o[1] + ',' + o[2] + ',' + rgb[3] + ')';
    }
    return hex;
  }
  /** hex + alpha -> rgba() string */
  function alpha(c, a) {
    var rgb = parseColor(c);
    if (!rgb) return c;
    return 'rgba(' + rgb[0] + ',' + rgb[1] + ',' + rgb[2] + ',' + a + ')';
  }
  ESOO.color = { parse: parseColor, contrast: contrast, adapt: adaptColor, alpha: alpha, toHex: toHex };

  // ------------------------------------------------------------------ number formats
  var NF = {};
  function groupNum(x, dp, grouping) {
    return x.toLocaleString('en-AU', {
      minimumFractionDigits: dp,
      maximumFractionDigits: dp,
      useGrouping: grouping !== false,
    });
  }
  /** Format a number with fixed decimals and thousands separators: num(1234.5, 1) -> "1,234.5" */
  NF.num = function (v, dp, grouping) {
    if (v == null || v === '' || isNaN(v)) return '';
    dp = dp == null ? 0 : dp;
    var s = groupNum(Number(v), dp, grouping);
    return s === '-0' || /^-0[.,]?0*$/.test(s) ? s.slice(1) : s;
  };
  /** Percent from a fraction: pct(0.123, 1) -> "12.3%" */
  NF.pct = function (v, dp) {
    if (v == null || v === '' || isNaN(v)) return '';
    return NF.num(Number(v) * 100, dp == null ? 0 : dp) + '%';
  };
  /** Compact axis ticks: 1,000 -> "1,000"; keeps up to `dp` decimals but trims trailing zeros. */
  NF.auto = function (v, maxDp) {
    if (v == null || v === '' || isNaN(v)) return v == null ? '' : String(v);
    v = Number(v);
    maxDp = maxDp == null ? (Math.abs(v) >= 100 ? 0 : Math.abs(v) >= 10 ? 1 : Math.abs(v) >= 1 ? 2 : 3) : maxDp;
    var s = v.toLocaleString('en-AU', { maximumFractionDigits: maxDp, useGrouping: true });
    return s === '-0' ? '0' : s;
  };
  function splitSections(code) {
    var out = [], cur = '', q = false;
    for (var i = 0; i < code.length; i++) {
      var ch = code[i];
      if (ch === '"') q = !q;
      if (ch === '\\' && !q) { cur += ch + (code[i + 1] || ''); i++; continue; }
      if (ch === ';' && !q) { out.push(cur); cur = ''; continue; }
      cur += ch;
    }
    out.push(cur);
    return out;
  }
  function parseSection(s) {
    // strip colours/locales/conditions, alignment spaces (_x) and fill chars (*x)
    s = s.replace(/\[[^\]]*\]/g, '').replace(/_./g, ' ').replace(/\*./g, '');
    var prefix = '', suffix = '', num = '', state = 0, i = 0;
    while (i < s.length) {
      var ch = s[i];
      if (ch === '"') {
        var j = s.indexOf('"', i + 1);
        if (j < 0) j = s.length;
        var lit = s.slice(i + 1, j);
        if (state === 0) prefix += lit; else { suffix += lit; state = 2; }
        i = j + 1; continue;
      }
      if (ch === '\\') { if (state === 0) prefix += s[i + 1] || ''; else { suffix += s[i + 1] || ''; state = 2; } i += 2; continue; }
      if (/[0#?.,]/.test(ch) && state < 2) { num += ch; state = 1; i++; continue; }
      if (ch === '%') { suffix += '%'; if (state === 1) state = 2; i++; continue; }
      if (state === 0) prefix += ch; else { suffix += ch; state = 2; }
      i++;
    }
    var intPart = num.split('.')[0] || '';
    var decPart = num.indexOf('.') >= 0 ? num.split('.')[1] : '';
    var trailingCommas = (intPart.match(/,+$/) || [''])[0].length;
    return {
      prefix: prefix,
      suffix: suffix,
      dp: (decPart.match(/[0#?]/g) || []).length,
      minDp: (decPart.match(/0/g) || []).length,
      grouping: /[0#?],[0#?]/.test(intPart),
      percent: /%/.test(suffix),
      scale: Math.pow(1000, trailingCommas),
      hasNum: num.length > 0,
    };
  }
  function renderSection(sec, v) {
    if (!sec.hasNum) return sec.prefix + sec.suffix;
    var x = (v * (sec.percent ? 100 : 1)) / sec.scale;
    var s = x.toLocaleString('en-AU', {
      minimumFractionDigits: sec.minDp,
      maximumFractionDigits: sec.dp,
      useGrouping: sec.grouping,
    });
    return sec.prefix + s + sec.suffix;
  }
  /** Build a formatter from an Excel number format code ('#,##0', '0.0%', '#,##0;(#,##0)', 'General'). */
  NF.excel = function (code) {
    if (!code || /^general$/i.test(code)) return function (v) { return NF.auto(v); };
    var secs = splitSections(code).map(parseSection);
    return function (v) {
      if (v == null || v === '' || isNaN(v)) return v == null ? '' : String(v);
      v = Number(v);
      if (v === 0 && secs[2]) return renderSection(secs[2], 0);
      if (v < 0 && secs[1]) return renderSection(secs[1], -v);
      var s = renderSection(secs[0], Math.abs(v));
      return (v < 0 && !/^0(\.0*)?%?$/.test(s.replace(/[^0-9.%]/g, '')) ? '-' : '') + s;
    };
  };
  var MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  function pad(n) { return (n < 10 ? '0' : '') + n; }
  /**
   * Format an ISO date/time string ('2026-03-16' or '2026-03-16T13:30:00') with a small
   * Excel-like pattern: 'mmm-yy', 'mmm yyyy', 'd mmm', 'dd/mm/yyyy', 'h:mm', 'hh:mm', 'd mmm h:mm'.
   */
  NF.date = function (iso, pattern) {
    if (iso == null) return '';
    var m = /^(\d{4})-(\d{2})-(\d{2})(?:[T ](\d{2}):(\d{2})(?::(\d{2}))?)?/.exec(String(iso));
    if (!m) return String(iso);
    var Y = +m[1], M = +m[2], D = +m[3], h = +(m[4] || 0), mi = +(m[5] || 0);
    var map = {
      yyyy: String(Y), yy: String(Y).slice(2), mmm: MONTHS[M - 1], mm: pad(M), dd: pad(D), d: String(D),
      hh: pad(h), h: String(h), MM: pad(mi),
    };
    return (pattern || 'dd/mm/yyyy')
      .replace(/(h{1,2}):mm/g, function (_, H) { return map[H] + ':' + map.MM; })
      .replace(/yyyy|yy|mmm|mm|dd|d/g, function (k) { return map[k]; });
  };
  ESOO.fmt = NF;

  // ------------------------------------------------------------------ theme
  var FONT = "'Source Sans 3', 'Source Sans Pro', 'Segoe UI', 'Helvetica Neue', Arial, sans-serif";
  function cssVar(name, fallback) {
    var v = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
    return v || fallback;
  }
  function isDark() {
    var t = document.documentElement.getAttribute('data-theme');
    if (t === 'dark') return true;
    if (t === 'light') return false;
    return !!(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches);
  }
  function sizeKey(w) {
    return w < 560 ? 'sm' : w < 860 ? 'md' : 'lg';
  }
  ESOO.reducedMotion = !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);

  /** Build the theme helper passed to option(d, t). */
  function makeTheme(width) {
    var dark = isDark();
    var t = {
      dark: dark,
      width: width,
      size: sizeKey(width),
      font: FONT,
      text: cssVar('--ink', dark ? '#ece8f0' : '#1f1a24'),
      text2: cssVar('--ink-2', dark ? '#bdb6c6' : '#4f4857'),
      muted: cssVar('--ink-3', dark ? '#8f8899' : '#7b7484'),
      grid: cssVar('--chart-grid', dark ? '#2c2832' : '#e6e3ea'),
      axis: cssVar('--chart-axis', dark ? '#4a4452' : '#bfb9c6'),
      surface: cssVar('--surface', dark ? '#1b1820' : '#ffffff'),
      accent: cssVar('--accent', dark ? '#c79bd2' : '#6b3077'),
      line: cssVar('--line', dark ? '#2e2934' : '#e4e0e8'),
    };
    /** theme-adapted series colour (use for every series colour taken from the workbook) */
    t.c = function (hex) { return adaptColor(hex, dark, t.surface); };
    t.alpha = alpha;
    t.fmt = NF;
    t.vAxis = function (o) { return valueAxis(t, o || {}); };
    t.cAxis = function (o) { return categoryAxis(t, o || {}); };
    t.tooltipAxis = function (o) { return axisTooltip(t, o || {}); };
    t.tooltipItem = function (o) { return itemTooltip(t, o || {}); };
    t.zoom = function (o) { return zoom(t, o || {}); };
    t.label = function (o) { return dataLabel(t, o || {}); };
    t.markLine = function (o) { return markLine(t, o || {}); };
    t.pick = function (o) { return o[t.size] !== undefined ? o[t.size] : o.lg !== undefined ? o.lg : o.md; };
    t.lw = lineWidth;
    t.dash = dashType;
    t.symbol = excelSymbol;
    t.pattern = function (prst, bg) { return patternDecal(prst, bg, t); };
    return t;
  }

  // ------------------------------------------------------------------ Excel style mapping
  /** Excel line width (pt) -> screen px. 2.25pt (Excel default) -> 2.5px; never below 1.25px. */
  function lineWidth(pt) {
    if (pt == null) return 2.5;
    return Math.max(1.25, Math.round(pt * 1.1 * 4) / 4);
  }
  /** Excel prstDash -> ECharts lineStyle.type (dash arrays scale with line width). */
  function dashType(prst, w) {
    w = w || 2;
    var u = Math.max(1.5, w);
    switch (prst) {
      case undefined: case null: case 'solid': return 'solid';
      case 'sysDot': return [u * 0.9, u * 1.1];
      case 'dot': return [u, u * 2.5];
      case 'sysDash': return [u * 2.6, u * 1.4];
      case 'dash': return [u * 3.5, u * 2.5];
      case 'lgDash': return [u * 7, u * 2.5];
      case 'sysDashDot': case 'dashDot': return [u * 3.5, u * 2, u, u * 2];
      case 'lgDashDot': return [u * 7, u * 2, u, u * 2];
      case 'sysDashDotDot': case 'lgDashDotDot': return [u * 6, u * 2, u, u * 2, u, u * 2];
      default: return [u * 3, u * 2];
    }
  }
  /** Excel marker symbol -> ECharts symbol name. */
  function excelSymbol(sym) {
    return ({
      none: 'none', circle: 'circle', square: 'rect', diamond: 'diamond', triangle: 'triangle',
      dash: 'path://M0,4L10,4L10,6L0,6Z', dot: 'circle', plus: 'path://M4,0H6V4H10V6H6V10H4V6H0V4H4Z',
      x: 'path://M1,0L5,4L9,0L10,1L6,5L10,9L9,10L5,6L1,10L0,9L4,5L0,1Z', star: 'path://M5,0L6.2,3.6H10L7,5.8L8.1,9.5L5,7.2L1.9,9.5L3,5.8L0,3.6H3.8Z',
      picture: 'rect', auto: 'circle',
    })[sym] || 'circle';
  }
  /**
   * Excel pattern fill (pattFill prst) -> ECharts decal drawn over the series colour.
   * Use as itemStyle: {color: <foreground hex>, decal: t.pattern('pct80', '#ffffff')}.
   * The decal paints the pattern's *background* colour (bg, usually white) over the
   * foreground fill, which is how Excel's light patterns read.
   */
  function patternDecal(prst, bg, t) {
    var c = bg || t.surface;
    var dots = function (gap, size) { return { symbol: 'circle', symbolSize: size, color: c, dashArrayX: [1, gap], dashArrayY: [1, gap], symbolKeepAspect: true, maxTileWidth: 256, maxTileHeight: 256 }; };
    var stripes = function (on, off, rot) { return { symbol: 'rect', symbolSize: 1, color: c, dashArrayX: [on, off], dashArrayY: [1, 0], rotation: rot || 0, maxTileWidth: 256, maxTileHeight: 256 }; };
    switch (prst) {
      case 'pct5': case 'pct10': case 'pct20': case 'pct25': return dots(2.4, 1);
      case 'pct30': case 'pct40': case 'pct50': return dots(2, 1);
      case 'pct60': case 'pct70': case 'pct75': return dots(2.2, 1);
      case 'pct80': case 'pct90': return dots(3, 1);
      case 'narVert': case 'ltVert': case 'dkVert': return stripes(2, 2.2, 0);
      case 'wdVert': return stripes(3, 3, 0);
      case 'narHorz': case 'ltHorz': case 'dkHorz': return stripes(2, 2.2, Math.PI / 2);
      case 'wdHorz': return stripes(3, 3, Math.PI / 2);
      case 'ltDnDiag': case 'dkDnDiag': case 'dnDiag': return stripes(2.2, 2.2, -Math.PI / 4);
      case 'wdDnDiag': return stripes(3.5, 3.5, -Math.PI / 4);
      case 'ltUpDiag': case 'dkUpDiag': case 'upDiag': return stripes(2.2, 2.2, Math.PI / 4);
      case 'wdUpDiag': return stripes(3.5, 3.5, Math.PI / 4);
      case 'smCheck': case 'lgCheck': case 'smGrid': case 'lgGrid':
        return { symbol: 'rect', symbolSize: 1, color: c, dashArrayX: [[3, 3], [0, 3, 3, 0]], dashArrayY: [3, 0], maxTileWidth: 256, maxTileHeight: 256 };
      default: return dots(2.4, 1);
    }
  }
  ESOO.theme = makeTheme;

  // ------------------------------------------------------------------ option helpers
  /**
   * Value axis. Axis title sits horizontally above the axis (left axis: left-aligned,
   * right axis: right-aligned) so it never collides with tick labels at any width.
   * o: {name, min, max, interval, format(v) | numFmt:'#,##0' | decimals, position:'left'|'right',
   *     inverse, grid:true|false, scale, splitNumber, type:'value'|'log', logBase}
   */
  function valueAxis(t, o) {
    var fmt = o.format || (o.numFmt ? NF.excel(o.numFmt) : o.decimals != null ? function (v) { return NF.num(v, o.decimals); } : function (v) { return NF.auto(v); });
    var right = o.position === 'right';
    var ax = {
      type: o.type || 'value',
      position: right ? 'right' : 'left',
      name: o.name || '',
      nameLocation: 'end',
      nameGap: 14,
      nameTextStyle: {
        color: t.text2,
        fontSize: 12,
        fontWeight: 600,
        align: right ? 'right' : 'left',
        padding: right ? [0, -4, 0, 0] : [0, 0, 0, -4],
      },
      min: o.min,
      max: o.max,
      interval: o.interval,
      splitNumber: o.splitNumber,
      inverse: o.inverse,
      scale: o.scale,
      logBase: o.logBase,
      axisLabel: { formatter: fmt, color: t.text2, fontSize: 12, hideOverlap: true },
      splitLine: { show: o.grid !== false, lineStyle: { color: t.grid, width: 1 } },
      axisLine: { show: !!o.axisLine, lineStyle: { color: t.axis } },
      axisTick: { show: false },
    };
    if (o.extra) defaults(o.extra, ax), (ax = o.extra);
    Object.keys(ax).forEach(function (k) { if (ax[k] === undefined) delete ax[k]; });
    return ax;
  }
  /**
   * Category axis. o: {data, name, rotate (deg, positive = anticlockwise like ECharts),
   * interval (label interval), format(v), boundaryGap (true for bars, false for lines/areas),
   * position:'bottom'|'top', inverse}
   */
  function categoryAxis(t, o) {
    var ax = {
      type: 'category',
      data: o.data,
      name: o.name || '',
      nameLocation: 'middle',
      nameGap: o.nameGap || (o.rotate ? 52 : 30),
      nameTextStyle: { color: t.text2, fontSize: 12, fontWeight: 600 },
      boundaryGap: o.boundaryGap !== undefined ? o.boundaryGap : true,
      position: o.position,
      inverse: o.inverse,
      axisLabel: {
        color: t.text2,
        fontSize: 12,
        rotate: o.rotate || 0,
        interval: o.interval !== undefined ? o.interval : 'auto',
        hideOverlap: true,
        formatter: o.format,
      },
      axisLine: { show: true, onZero: o.onZero !== undefined ? o.onZero : false, lineStyle: { color: t.axis } },
      axisTick: { show: false, alignWithLabel: true },
      splitLine: { show: false },
    };
    if (!o.format) delete ax.axisLabel.formatter;
    Object.keys(ax).forEach(function (k) { if (ax[k] === undefined) delete ax[k]; });
    return ax;
  }
  function seriesColor(s) {
    var c = (s.itemStyle && s.itemStyle.color) || (s.lineStyle && s.lineStyle.color) || s.color || (s.areaStyle && s.areaStyle.color);
    if (c && typeof c === 'object' && c.colorStops) c = c.colorStops[0].color;
    return c;
  }
  function paramColor(p) {
    var c = p.color;
    if (c && typeof c === 'object' && c.colorStops) c = c.colorStops[0].color;
    return c || '#888';
  }
  function paramValue(p) {
    var v = p.value;
    if (Array.isArray(v)) {
      var enc = p.encode && p.encode.y ? p.encode.y[0] : v.length - 1;
      return v[enc];
    }
    if (isObj(v)) return v.value;
    return v;
  }
  function keyHtml(color, shape) {
    var st = 'background:' + esc(color) + ';';
    var cls = 'tt-key tt-key--' + (shape || 'line');
    return '<span class="' + cls + '" style="' + st + '"></span>';
  }
  /**
   * Axis-trigger tooltip: one readout listing every series at the hovered category/time.
   * o: {format(v, seriesName) | numFmt | decimals, unit, header(p0) -> string,
   *     reverse:true (list stacked series top-down), hideZero, hideNull (default true),
   *     total: 'Total' | {label, filter(seriesName)}, pointer: 'line'|'shadow'|'cross',
   *     exclude: [names] | fn(name), sortByValue}
   */
  function axisTooltip(t, o) {
    var fmt = o.format || (o.numFmt ? NF.excel(o.numFmt) : function (v) { return NF.num(v, o.decimals != null ? o.decimals : 0); });
    var exclude = typeof o.exclude === 'function' ? o.exclude : function (n) { return (o.exclude || []).indexOf(n) >= 0; };
    return {
      _esoo: o, // applyBase records which line series are filled areas here (swatch keys)
      trigger: 'axis',
      confine: true,
      axisPointer: {
        type: o.pointer || 'line',
        lineStyle: { color: t.axis, width: 1 },
        shadowStyle: { color: t.alpha(t.text, t.dark ? 0.08 : 0.05) },
        label: { show: false },
      },
      formatter: function (params) {
        params = asArray(params);
        if (!params.length) return '';
        var head = o.header ? o.header(params[0]) : params[0].axisValueLabel;
        var seen = {};
        var rows = params.filter(function (p) {
          var v = paramValue(p);
          if (!p.seriesName || p.seriesName.charAt(0) === '_' || exclude(p.seriesName)) return false;
          if ((v == null || v === '' || (typeof v === 'number' && isNaN(v))) && o.hideNull !== false) return false;
          if (o.hideZero && Number(v) === 0) return false;
          var key = p.seriesName + '|' + v;
          if (o.dedupe !== false && seen[key]) return false;
          seen[key] = 1;
          return true;
        });
        if (o.reverse) rows.reverse();
        if (o.sortByValue) rows.sort(function (a, b) { return paramValue(b) - paramValue(a); });
        var html = '<div class="tt"><div class="tt-head">' + esc(head) + '</div>';
        rows.forEach(function (p) {
          var shape = p.seriesType === 'line' ? (o._areas && o._areas[p.seriesName] ? 'rect' : 'line') : p.seriesType === 'scatter' ? 'dot' : 'rect';
          html += '<div class="tt-row">' + keyHtml(paramColor(p), shape) + '<b>' + esc(fmt(paramValue(p), p.seriesName)) + (o.unit ? ' ' + esc(o.unit) : '') + '</b><span>' + esc(p.seriesName) + '</span></div>';
        });
        if (o.total) {
          var lab = typeof o.total === 'string' ? o.total : o.total.label || 'Total';
          var filt = isObj(o.total) && o.total.filter ? o.total.filter : function () { return true; };
          var sum = 0, any = false;
          params.forEach(function (p) {
            var v = Number(paramValue(p));
            if (p.seriesName && p.seriesName.charAt(0) !== '_' && !isNaN(v) && filt(p.seriesName)) { sum += v; any = true; }
          });
          if (any) html += '<div class="tt-row tt-total"><span class="tt-key tt-key--none"></span><b>' + esc(fmt(sum)) + (o.unit ? ' ' + esc(o.unit) : '') + '</b><span>' + esc(lab) + '</span></div>';
        }
        return html + '</div>';
      },
    };
  }
  /**
   * Item-trigger tooltip for scatter/box/bubble/pie marks.
   * o: {lines(p) -> [[label, value], ...], title(p) -> string}
   */
  function itemTooltip(t, o) {
    return {
      trigger: 'item',
      confine: true,
      formatter: function (p) {
        var title = o.title ? o.title(p) : p.seriesName;
        var html = '<div class="tt"><div class="tt-head">' + keyHtml(paramColor(p), p.seriesType === 'line' ? 'line' : p.seriesType === 'scatter' ? 'dot' : 'rect') + esc(title) + '</div>';
        var lines = o.lines ? o.lines(p) : [[p.name, NF.auto(paramValue(p))]];
        lines.forEach(function (l) {
          if (!l) return;
          html += '<div class="tt-row tt-kv"><span>' + esc(l[0]) + '</span><b>' + esc(l[1]) + '</b></div>';
        });
        return html + '</div>';
      },
    };
  }
  /** Inside (wheel/pinch/drag) + slider zoom on an x axis. o: {xAxisIndex, start, end, slider:true} */
  function zoom(t, o) {
    var idx = o.xAxisIndex != null ? o.xAxisIndex : 0;
    var z = [{ type: 'inside', xAxisIndex: idx, start: o.start, end: o.end, zoomOnMouseWheel: 'ctrl', moveOnMouseWheel: false, moveOnMouseMove: true }];
    if (o.slider !== false)
      z.push({
        type: 'slider', xAxisIndex: idx, start: o.start, end: o.end, height: 22, bottom: 8,
        borderColor: t.line, backgroundColor: 'transparent', fillerColor: t.alpha(t.accent, 0.12),
        dataBackground: { lineStyle: { color: t.axis }, areaStyle: { color: t.alpha(t.axis, 0.35) } },
        selectedDataBackground: { lineStyle: { color: t.accent }, areaStyle: { color: t.alpha(t.accent, 0.25) } },
        handleStyle: { color: t.surface, borderColor: t.accent }, moveHandleStyle: { color: t.alpha(t.accent, 0.5) },
        textStyle: { color: t.muted, fontSize: 11 }, labelFormatter: o.labelFormatter, brushSelect: false,
      });
    return z;
  }
  /** Data label in text tokens. o: {position, format(v)|numFmt|decimals, fontSize, color, inside:true} */
  function dataLabel(t, o) {
    var fmt = o.format || (o.numFmt ? NF.excel(o.numFmt) : function (v) { return NF.num(v, o.decimals || 0); });
    return {
      show: true,
      position: o.position || 'top',
      color: o.color || t.text2,
      fontSize: o.fontSize || 11,
      fontWeight: o.fontWeight || 500,
      formatter: function (p) { return fmt(paramValue(p)); },
    };
  }
  /** Reference line(s) in chart furniture colours. o: {data, color, dash, label} */
  function markLine(t, o) {
    return {
      silent: o.silent !== false,
      symbol: 'none',
      precision: o.precision != null ? o.precision : 10,
      lineStyle: { color: o.color || t.text2, type: o.dash || 'dashed', width: o.width || 1.5 },
      label: o.label === false ? { show: false } : defaults(o.label || {}, { color: t.text2, fontSize: 11 }),
      data: o.data || [],
    };
  }

  // ------------------------------------------------------------------ base option
  function applyBase(opt, t) {
    opt.backgroundColor = opt.backgroundColor || 'transparent';
    opt.textStyle = defaults(opt.textStyle || {}, { fontFamily: t.font, color: t.text2, fontSize: 12 });
    if (opt.animation === undefined) opt.animation = !ESOO.reducedMotion;
    if (opt.animationDuration === undefined) opt.animationDuration = 450;
    if (!opt.legend) opt.legend = { show: false };
    else asArray(opt.legend).forEach(function (l) { defaults(l, { textStyle: { color: t.text2 }, inactiveColor: t.muted }); });
    var axisDefaults = {
      axisLabel: { color: t.text2 },
      axisLine: { lineStyle: { color: t.axis } },
      splitLine: { lineStyle: { color: t.grid } },
      nameTextStyle: { color: t.text2 },
    };
    ['xAxis', 'yAxis', 'singleAxis', 'radiusAxis', 'angleAxis'].forEach(function (k) {
      asArray(opt[k]).forEach(function (ax) { defaults(ax, axisDefaults); });
    });
    // lines that start and end on the plot edges: keep the last category label inside the chart
    asArray(opt.xAxis).forEach(function (ax) {
      if (ax.type === 'category' && ax.boundaryGap === false && ax.axisLabel && !ax.axisLabel.rotate && ax.axisLabel.alignMaxLabel === undefined) {
        ax.axisLabel.alignMaxLabel = 'right';
      }
    });
    asArray(opt.tooltip).forEach(function (tt) {
      if (tt._esoo) {
        var areas = {};
        asArray(opt.series).forEach(function (s) { if (s.type === 'line' && s.areaStyle) areas[s.name] = 1; });
        tt._esoo._areas = areas;
      }
      defaults(tt, {
        backgroundColor: t.surface,
        borderColor: t.line,
        borderWidth: 1,
        padding: [8, 10],
        textStyle: { color: t.text, fontFamily: t.font, fontSize: 12 },
        extraCssText: 'box-shadow:0 6px 24px rgba(0,0,0,' + (t.dark ? 0.45 : 0.12) + ');border-radius:6px;',
        confine: true,
      });
    });
    if (opt.grid === undefined) opt.grid = {};
    asArray(opt.grid).forEach(function (g) {
      defaults(g, { left: 8, right: 16, top: 36, bottom: opt.dataZoom ? 44 : 8, containLabel: true });
    });
    asArray(opt.series).forEach(function (s) {
      if (s.type === 'line' && s.symbol === undefined) s.symbol = 'none';
      if (s.type === 'line' && s.areaStyle && s.emphasis === undefined) s.emphasis = { disabled: true }; // no colour lift on filled areas
      if ((s.type === 'line' || s.type === 'scatter') && s.emphasis === undefined) s.emphasis = { focus: 'none' };
      if (s.type === 'bar' && s.emphasis === undefined) s.emphasis = { focus: 'none' };
      if (s.type === 'line' && s.lineStyle && s.lineStyle.cap === undefined) {
        // round caps would swallow the gaps of t.dash() patterns, so dashed lines keep butt caps
        var ty = s.lineStyle.type;
        s.lineStyle.cap = Array.isArray(ty) || ty === 'dashed' || ty === 'dotted' ? 'butt' : 'round';
      }
      if (s.label && s.label.show && s.label.color === undefined) s.label.color = t.text2;
      if (s.label && s.label.show && s.labelLayout === undefined) s.labelLayout = { hideOverlap: true };
    });
    if (ESOO.decals) opt.aria = defaults(opt.aria || {}, { enabled: true, decal: { show: true } });
    else if (!opt.aria) opt.aria = { enabled: true, label: { enabled: true } };
    return opt;
  }
  ESOO.applyBase = applyBase;

  // ------------------------------------------------------------------ data
  function getData(id) {
    if (dataCache[id] !== undefined) return dataCache[id];
    var el = document.getElementById('d-' + id);
    dataCache[id] = el ? JSON.parse(el.textContent) : null;
    return dataCache[id];
  }
  ESOO.data = getData;

  // ------------------------------------------------------------------ legend
  function deriveLegend(opt) {
    var items = [], seen = {};
    asArray(opt.series).forEach(function (s) {
      if (!s.name || String(s.name).charAt(0) === '_' || s.legendHidden || seen[s.name]) return;
      seen[s.name] = 1;
      var shape = s.type === 'line' ? (s.areaStyle && !s.stack ? 'line' : s.areaStyle ? 'rect' : 'line') : s.type === 'scatter' || s.type === 'effectScatter' ? 'dot' : s.type === 'boxplot' ? 'box' : 'rect';
      if (s.legendShape) shape = s.legendShape;
      items.push({
        name: s.name,
        color: seriesColor(s) || '#888',
        shape: shape,
        dash: s.lineStyle && s.lineStyle.type && s.lineStyle.type !== 'solid' ? s.lineStyle.type : null,
        decal: s.itemStyle && s.itemStyle.decal ? true : false,
        border: s.itemStyle && s.itemStyle.borderColor && s.itemStyle.borderWidth ? s.itemStyle.borderColor : null,
      });
    });
    return items;
  }
  function legendKey(item) {
    var span = document.createElement('span');
    span.className = 'lg-key lg-key--' + (item.shape || 'rect') + (item.dash ? ' lg-key--dash' : '') + (item.decal ? ' lg-key--decal' : '');
    span.style.setProperty('--k', item.color);
    if (item.border) span.style.setProperty('--kb', item.border);
    span.setAttribute('aria-hidden', 'true');
    return span;
  }
  function buildLegend(card, chart, items) {
    var host = card.querySelector('.fig-legend');
    if (!host) return;
    host.textContent = '';
    if (!items || items.length < 2) { host.hidden = true; return; }
    host.hidden = false;
    var state = live[card.dataset.fig] && live[card.dataset.fig].legendState || {};
    var showAll = document.createElement('button');
    showAll.type = 'button';
    showAll.className = 'lg-reset';
    showAll.textContent = 'Show all';
    function refresh() {
      var anyOff = items.some(function (it) { return state[it.name] === false; });
      showAll.hidden = !anyOff;
      host.querySelectorAll('.lg-item').forEach(function (b) {
        b.setAttribute('aria-pressed', state[b.dataset.name] === false ? 'false' : 'true');
      });
    }
    items.forEach(function (it) {
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'lg-item';
      b.dataset.name = it.name;
      b.title = 'Click to show or hide. Double-click to show only this series.';
      b.appendChild(legendKey(it));
      var label = document.createElement('span');
      label.className = 'lg-label';
      label.textContent = it.label || it.name;
      b.appendChild(label);
      b.addEventListener('click', function (e) {
        if (e.detail > 1) return;
        state[it.name] = state[it.name] === false;
        chart.dispatchAction({ type: state[it.name] === false ? 'legendUnSelect' : 'legendSelect', name: it.name });
        (it.also || []).forEach(function (n) { chart.dispatchAction({ type: state[it.name] === false ? 'legendUnSelect' : 'legendSelect', name: n }); });
        refresh();
      });
      b.addEventListener('dblclick', function () {
        items.forEach(function (o) {
          var on = o.name === it.name;
          state[o.name] = on;
          chart.dispatchAction({ type: on ? 'legendSelect' : 'legendUnSelect', name: o.name });
          (o.also || []).forEach(function (n) { chart.dispatchAction({ type: on ? 'legendSelect' : 'legendUnSelect', name: n }); });
        });
        refresh();
      });
      b.addEventListener('mouseenter', function () { if (state[it.name] !== false) chart.dispatchAction({ type: 'highlight', seriesName: it.name }); });
      b.addEventListener('mouseleave', function () { chart.dispatchAction({ type: 'downplay', seriesName: it.name }); });
      host.appendChild(b);
    });
    showAll.addEventListener('click', function () {
      items.forEach(function (o) {
        state[o.name] = true;
        chart.dispatchAction({ type: 'legendSelect', name: o.name });
        (o.also || []).forEach(function (n) { chart.dispatchAction({ type: 'legendSelect', name: n }); });
      });
      refresh();
    });
    host.appendChild(showAll);
    // re-apply remembered state after a re-render
    items.forEach(function (o) {
      if (state[o.name] === false) {
        chart.dispatchAction({ type: 'legendUnSelect', name: o.name });
        (o.also || []).forEach(function (n) { chart.dispatchAction({ type: 'legendUnSelect', name: n }); });
      }
    });
    refresh();
    return state;
  }

  // ------------------------------------------------------------------ table
  function cellText(v) {
    if (v == null) return '';
    if (typeof v === 'number') return NF.auto(v, Math.abs(v) >= 100 ? 1 : Math.abs(v) >= 1 ? 3 : 4);
    return String(v);
  }
  function deriveTable(opt, fig) {
    var xa = asArray(opt.xAxis)[0], ya = asArray(opt.yAxis)[0];
    var cat = xa && xa.type === 'category' && xa.data ? xa : ya && ya.type === 'category' && ya.data ? ya : null;
    var series = asArray(opt.series).filter(function (s) { return s.name && String(s.name).charAt(0) !== '_' && !s.tableHidden && Array.isArray(s.data); });
    if (cat) {
      var cols = [(fig && fig.categoryLabel) || cat.name || 'Category'].concat(series.map(function (s) { return s.name; }));
      var rows = cat.data.map(function (c, i) {
        return [isObj(c) ? c.value : c].concat(series.map(function (s) {
          var p = s.data[i];
          return isObj(p) ? p.value : Array.isArray(p) ? p[p.length - 1] : p;
        }));
      });
      return { columns: cols, rows: rows };
    }
    var rowsL = [];
    series.forEach(function (s) {
      s.data.forEach(function (p) {
        var v = isObj(p) ? p.value : p;
        rowsL.push([s.name].concat(Array.isArray(v) ? v : [v]));
      });
    });
    var w = rowsL.reduce(function (m, r) { return Math.max(m, r.length); }, 0);
    var colsL = ['Series'];
    for (var i = 1; i < w; i++) colsL.push(i === 1 ? 'x' : i === 2 ? 'y' : 'v' + i);
    return { columns: colsL, rows: rowsL };
  }
  var MAX_ROWS = 1000;
  function renderTable(card, tbl) {
    var host = card.querySelector('.fig-table');
    host.textContent = '';
    var wrap = document.createElement('div');
    wrap.className = 'tbl-wrap';
    var table = document.createElement('table');
    var thead = document.createElement('thead');
    var tr = document.createElement('tr');
    tbl.columns.forEach(function (c) {
      var th = document.createElement('th');
      th.scope = 'col';
      th.textContent = c;
      tr.appendChild(th);
    });
    thead.appendChild(tr);
    table.appendChild(thead);
    var tb = document.createElement('tbody');
    // one number of decimals per column, chosen from the column's magnitude (override with tbl.decimals)
    var colDp = tbl.columns.map(function (c, i) {
      if (Array.isArray(tbl.decimals)) return tbl.decimals[i];
      if (typeof tbl.decimals === 'number') return tbl.decimals;
      var max = 0, allInt = true;
      tbl.rows.forEach(function (r) {
        var v = r[i];
        if (typeof v === 'number' && isFinite(v)) { max = Math.max(max, Math.abs(v)); if (!Number.isInteger(v)) allInt = false; }
      });
      if (allInt) return 0;
      return max >= 1000 ? 0 : max >= 100 ? 1 : max >= 1 ? 2 : max >= 0.01 ? 3 : 4;
    });
    var fmt = tbl.format || function (v, i) { return colDp[i] == null ? cellText(v) : NF.num(v, colDp[i]); };
    tbl.rows.slice(0, MAX_ROWS).forEach(function (r) {
      var row = document.createElement('tr');
      r.forEach(function (v, i) {
        var td = document.createElement(i === 0 ? 'th' : 'td');
        if (i === 0) td.scope = 'row';
        td.textContent = typeof v === 'number' ? fmt(v, i) : v == null ? '' : String(v);
        if (typeof v === 'number') td.className = 'num';
        row.appendChild(td);
      });
      tb.appendChild(row);
    });
    table.appendChild(tb);
    wrap.appendChild(table);
    host.appendChild(wrap);
    var notes = [];
    if (tbl.rows.length > MAX_ROWS) notes.push('Showing the first ' + MAX_ROWS.toLocaleString('en-AU') + ' of ' + tbl.rows.length.toLocaleString('en-AU') + ' rows. Copy or download the CSV for every row.');
    if (tbl.note) notes.push(tbl.note);
    if (notes.length) {
      var p = document.createElement('p');
      p.className = 'tbl-note';
      p.textContent = notes.join(' ');
      host.appendChild(p);
    }
  }
  function toCSV(tbl) {
    function q(v) {
      if (v == null) return '';
      var s = String(v);
      return /[",\n]/.test(s) ? '"' + s.replace(/"/g, '""') + '"' : s;
    }
    return [tbl.columns.map(q).join(',')].concat(tbl.rows.map(function (r) { return r.map(q).join(','); })).join('\n');
  }
  function tableFor(id) {
    var L = live[id];
    var fig = registry[id];
    if (L && L.table) return L.table;
    var d = getData(id);
    var t = makeTheme(L ? L.width : 900);
    var tbl = fig.table ? fig.table(d, t) : deriveTable(fig.option(d, t), fig);
    if (L) L.table = tbl;
    return tbl;
  }

  // ------------------------------------------------------------------ downloads / clipboard
  function flash(btn, text) {
    var old = btn.dataset.label || btn.textContent;
    btn.dataset.label = old;
    btn.textContent = text;
    setTimeout(function () { btn.textContent = old; }, 1600);
  }
  function copyText(text, btn) {
    function fallback() {
      var ta = document.createElement('textarea');
      ta.value = text;
      ta.setAttribute('readonly', '');
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      var ok = false;
      try { ok = document.execCommand('copy'); } catch (e) { ok = false; }
      document.body.removeChild(ta);
      flash(btn, ok ? 'Copied' : 'Copy failed');
    }
    try {
      navigator.clipboard.writeText(text).then(function () { flash(btn, 'Copied'); }, fallback);
    } catch (e) {
      fallback();
    }
  }
  function download(name, href) {
    var a = document.createElement('a');
    a.href = href;
    a.download = name;
    document.body.appendChild(a);
    a.click();
    setTimeout(function () { document.body.removeChild(a); if (href.indexOf('blob:') === 0) URL.revokeObjectURL(href); }, 500);
  }
  function fileBase(id) {
    return '2026-wem-esoo-' + id.replace(/[^A-Za-z0-9._-]+/g, '_');
  }
  /**
   * Export a PNG: the plot is rendered offscreen at a fixed width with the figure's own option
   * (zoom sliders removed, current legend selection applied), then the eyebrow, title, the same
   * legend as the page and a source line are drawn around it on one canvas.
   */
  function firstColor(c) {
    if (typeof c !== 'string') return '#888888';
    if (/^(#|rgb|hsl)/i.test(c.trim())) return c;
    var m = /#[0-9a-f]{3,8}\b|rgba?\([^)]+\)/i.exec(c);
    return m ? m[0] : '#888888';
  }
  function wrapText(ctx, text, maxW) {
    var words = String(text).split(/\s+/), lines = [], cur = '';
    words.forEach(function (w) {
      var tryLine = cur ? cur + ' ' + w : w;
      if (ctx.measureText(tryLine).width > maxW && cur) { lines.push(cur); cur = w; } else cur = tryLine;
    });
    if (cur) lines.push(cur);
    return lines;
  }
  function exportPNG(id) {
    var fig = registry[id], d = getData(id), card = document.getElementById('fig-' + id);
    var W = 1200, PR = 2, PAD = 28;
    var t = makeTheme(W);
    var opt = fig.option(d, t);
    opt.dataZoom = asArray(opt.dataZoom).filter(function (z) { return z.type === 'inside'; });
    applyBase(opt, t);
    opt.animation = false;
    asArray(opt.series).forEach(function (sr) { sr.progressive = 0; }); // large series otherwise render over several frames
    var state = (live[id] && live[id].legendState) || {};
    var items = fig.legend === false ? [] : fig.legendItems ? fig.legendItems(d, t) : deriveLegend(opt);
    if (fig.legendOrder) items = sortItems(items, fig.legendOrder);
    items = items.filter(function (it) { return state[it.name] !== false; });
    var Hc = heightFor(fig, W);
    var div = document.createElement('div');
    div.style.cssText = 'position:fixed;left:-99999px;top:0;width:' + W + 'px;height:' + Hc + 'px;';
    document.body.appendChild(div);
    var c = echarts.init(div, null, { renderer: 'canvas', width: W, height: Hc, devicePixelRatio: PR });
    c.setOption(opt, true);
    Object.keys(state).forEach(function (name) {
      if (state[name] === false) c.dispatchAction({ type: 'legendUnSelect', name: name });
    });
    var url = c.getDataURL({ type: 'png', pixelRatio: PR, backgroundColor: t.surface });
    c.dispose();
    document.body.removeChild(div);

    var num = card.querySelector('.fig-num'), sec = card.querySelector('.fig-eyebrow span:not(.fig-num):not(.badge)');
    var eyebrow = ((num ? num.textContent : id) + (sec ? '  ·  ' + sec.textContent : '')).toUpperCase();
    var title = (card.querySelector('.fig-title') || {}).textContent || '';
    var srcEl = card.querySelector('.fig-src');
    var source = 'Source: AEMO, 2026 WEM ESOO. ' + (srcEl ? srcEl.textContent : '');
    var serif = "'Source Serif 4', Georgia, serif";
    var measure = document.createElement('canvas').getContext('2d');
    measure.font = '600 22px ' + serif;
    var titleLines = wrapText(measure, title, W - 2 * PAD);
    measure.font = '13px ' + t.font;
    // legend layout: rows of [key 22px + 7px + label], 20px apart
    var rows = [[]], x = 0, maxW = W - 2 * PAD;
    items.forEach(function (it) {
      var label = it.label || it.name;
      var w = 22 + 7 + Math.min(measure.measureText(label).width, maxW - 40) + 20;
      if (x + w > maxW && rows[rows.length - 1].length) { rows.push([]); x = 0; }
      rows[rows.length - 1].push({ it: it, label: label, x: x });
      x += w;
    });
    var legendH = items.length > 1 ? rows.length * 22 + 8 : 0;
    var headH = PAD + 18 + titleLines.length * 29 + 10 + legendH;
    var footH = 36;
    var H = headH + Hc + footH;
    var cv = document.createElement('canvas');
    cv.width = W * PR;
    cv.height = H * PR;
    var g = cv.getContext('2d');
    g.scale(PR, PR);
    g.fillStyle = t.surface;
    g.fillRect(0, 0, W, H);
    g.textBaseline = 'alphabetic';
    g.fillStyle = t.muted;
    g.font = '600 12px ' + t.font;
    g.fillText(eyebrow, PAD, PAD + 8);
    g.fillStyle = t.text;
    g.font = '600 22px ' + serif;
    titleLines.forEach(function (ln, i) { g.fillText(ln, PAD, PAD + 38 + i * 29); });
    if (items.length > 1) {
      var y0 = PAD + 18 + titleLines.length * 29 + 14;
      g.font = '13px ' + t.font;
      rows.forEach(function (row, r) {
        var yc = y0 + r * 22 + 7;
        row.forEach(function (cell) {
          var it = cell.it, kx = PAD + cell.x, col = firstColor(it.color);
          g.save();
          g.fillStyle = col;
          g.strokeStyle = col;
          if (it.shape === 'line') {
            g.lineWidth = 3;
            g.setLineDash(it.dash ? [5, 3.5] : []);
            g.beginPath(); g.moveTo(kx, yc); g.lineTo(kx + 22, yc); g.stroke();
          } else if (it.shape === 'dot') {
            g.beginPath(); g.arc(kx + 11, yc, 5, 0, Math.PI * 2); g.fill();
          } else if (it.shape === 'box') {
            g.lineWidth = 2; g.strokeRect(kx + 5, yc - 6, 12, 12);
          } else {
            g.fillRect(kx + 5, yc - 6, 12, 12);
            if (it.decal) {
              g.strokeStyle = t.surface; g.lineWidth = 1.5;
              for (var k = -12; k < 12; k += 4) { g.beginPath(); g.moveTo(kx + 5 + k, yc + 6); g.lineTo(kx + 17 + k, yc - 6); g.stroke(); }
              g.strokeStyle = col; g.strokeRect(kx + 5.5, yc - 5.5, 11, 11);
            }
          }
          g.restore();
          g.fillStyle = t.text2;
          g.fillText(cell.label, kx + 29, yc + 4.5, maxW - cell.x - 29);
        });
      });
    }
    var img = new Image();
    img.onload = function () {
      g.drawImage(img, 0, headH, W, Hc);
      g.fillStyle = t.muted;
      g.font = '12px ' + t.font;
      g.fillText(source, PAD, headH + Hc + 22, W - 2 * PAD);
      download(fileBase(id) + '.png', cv.toDataURL('image/png'));
    };
    img.src = url;
  }

  // ------------------------------------------------------------------ rendering
  function heightFor(fig, width) {
    var h = fig.height;
    var k = sizeKey(width);
    if (isObj(h)) return h[k] || h.lg || h.md || 460;
    var base = h || 460;
    return k === 'sm' ? Math.round(Math.min(base, Math.max(320, base * 0.82))) : base;
  }
  function sortItems(items, order) {
    return items.slice().sort(function (a, b) {
      var ia = order.indexOf(a.name), ib = order.indexOf(b.name);
      return (ia < 0 ? 999 : ia) - (ib < 0 ? 999 : ib);
    });
  }
  function showError(card, err) {
    var host = card.querySelector('.fig-chart');
    host.classList.add('is-error');
    host.textContent = 'This chart could not be drawn: ' + (err && err.message ? err.message : String(err));
    ESOO.errors.push({ id: card.dataset.fig, error: String(err && err.stack ? err.stack : err) });
    if (window.console) console.error('[ESOO] ' + card.dataset.fig, err);
  }
  function render(card) {
    var id = card.dataset.fig;
    var fig = registry[id];
    if (!fig || card.dataset.kind === 'image') return;
    var host = card.querySelector('.fig-chart');
    var prev = live[id];
    if (prev && prev.chart) { prev.chart.dispose(); }
    var width = host.clientWidth || card.clientWidth || 900;
    host.style.height = heightFor(fig, width) + 'px';
    var t = makeTheme(width);
    var d = getData(id);
    var opt, chart;
    try {
      opt = fig.option(d, t);
      applyBase(opt, t);
      chart = echarts.init(host, null, { renderer: 'canvas' });
      chart.setOption(opt, true);
    } catch (err) {
      if (chart) chart.dispose();
      showError(card, err);
      return;
    }
    var L = (live[id] = {
      chart: chart, fig: fig, card: card, width: width, sizeKey: sizeKey(width), dark: t.dark, decals: ESOO.decals,
      legendState: prev ? prev.legendState : {}, table: null,
    });
    if (fig.legend !== false) {
      var items = fig.legendItems ? fig.legendItems(d, t) : deriveLegend(opt);
      if (fig.legendOrder) items = sortItems(items, fig.legendOrder);
      L.legendState = buildLegend(card, chart, items) || L.legendState;
    } else {
      var lg = card.querySelector('.fig-legend');
      if (lg) lg.hidden = true;
    }
    var zoomBtn = card.querySelector('[data-act="zoom"]');
    if (zoomBtn) zoomBtn.hidden = !asArray(opt.dataZoom).length;
    if (fig.after) {
      try { fig.after(chart, d, t); } catch (err) { showError(card, err); return; }
    }
    card.dataset.rendered = '1';
    host.setAttribute('aria-busy', 'false');
    var tbl = card.querySelector('.fig-table');
    if (tbl && !tbl.hidden) renderTable(card, tableFor(id));
  }
  ESOO.render = function (id) {
    var card = document.getElementById('fig-' + id);
    if (card) render(card);
  };
  function dispose(id) {
    var L = live[id];
    if (!L || !L.chart) return;
    L.chart.dispose();
    L.chart = null;
    L.card.dataset.rendered = '';
  }
  function rerenderAll() {
    Object.keys(live).forEach(function (id) {
      if (live[id].chart) render(live[id].card);
    });
  }
  ESOO.rerenderAll = rerenderAll;
  /** Render every chart now (used by screenshots / QA). */
  ESOO.renderAll = function () {
    document.querySelectorAll('.fig[data-fig]').forEach(function (card) {
      if (!card.hidden && card.dataset.rendered !== '1') render(card);
    });
  };

  // ------------------------------------------------------------------ actions
  function onAction(e) {
    var btn = e.target.closest('[data-act]');
    if (!btn) return;
    var card = btn.closest('.fig');
    var id = card.dataset.fig;
    var act = btn.dataset.act;
    if (act === 'table') {
      var host = card.querySelector('.fig-table');
      var open = host.hidden;
      if (open) renderTable(card, tableFor(id));
      host.hidden = !open;
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
      btn.textContent = open ? 'Hide data' : 'Show data';
    } else if (act === 'copy') {
      copyText(toCSV(tableFor(id)), btn);
    } else if (act === 'csv') {
      var blob = new Blob([toCSV(tableFor(id))], { type: 'text/csv;charset=utf-8' });
      download(fileBase(id) + '.csv', URL.createObjectURL(blob));
    } else if (act === 'png') {
      exportPNG(id);
    } else if (act === 'zoom') {
      var L = live[id];
      if (L && L.chart) {
        asArray(L.chart.getOption().dataZoom).forEach(function (z, i) {
          L.chart.dispatchAction({ type: 'dataZoom', dataZoomIndex: i, start: 0, end: 100 });
        });
      }
    } else if (act === 'link') {
      var url = location.href.split('#')[0] + '#fig-' + id;
      copyText(url, btn);
    }
  }

  // ------------------------------------------------------------------ filter
  function norm(s) {
    return String(s || '').toLowerCase().replace(/\s+/g, ' ');
  }
  function applyFilter(q) {
    q = norm(q).trim();
    var terms = q ? q.split(' ') : [];
    var shown = 0;
    document.querySelectorAll('.fig[data-fig]').forEach(function (card) {
      var hay = card.dataset.search || (card.dataset.search = norm(card.textContent + ' ' + card.dataset.fig));
      var ok = terms.every(function (w) { return hay.indexOf(w) >= 0; });
      card.hidden = !ok;
      if (ok) shown++;
      var link = document.querySelector('.toc a[href="#fig-' + CSS.escape(card.dataset.fig) + '"]');
      if (link) link.parentElement.hidden = !ok;
    });
    document.querySelectorAll('.sec').forEach(function (sec) {
      sec.hidden = !sec.querySelector('.fig:not([hidden])');
    });
    document.querySelectorAll('.toc-sec').forEach(function (g) {
      g.hidden = !g.querySelector('li:not([hidden])');
    });
    var count = document.getElementById('filter-count');
    if (count) count.textContent = q ? shown + ' of ' + document.querySelectorAll('.fig[data-fig]').length + ' figures' : '';
    var empty = document.getElementById('filter-empty');
    if (empty) empty.hidden = shown !== 0;
  }

  // ------------------------------------------------------------------ boot
  ESOO.boot = function () {
    if (!window.echarts) {
      document.querySelectorAll('.fig[data-kind="chart"] .fig-chart').forEach(function (h) {
        h.classList.add('is-error');
        h.textContent = 'The charting library did not load, so charts cannot be drawn. The data tables still work.';
      });
    }
    document.querySelectorAll('.fig[data-fig]').forEach(function (card) {
      if (!registry[card.dataset.fig] && card.dataset.kind === 'chart') {
        var host = card.querySelector('.fig-chart');
        host.classList.add('is-error');
        host.textContent = 'Figure module missing for ' + card.dataset.fig + '.';
        ESOO.errors.push({ id: card.dataset.fig, error: 'module missing' });
      }
    });
    document.addEventListener('click', function (e) {
      if (e.target.closest('.fig [data-act]')) onAction(e);
    });
    var eager = BUILD.eager || /[?&]eager\b/.test(location.search);
    var cards = Array.prototype.slice.call(document.querySelectorAll('.fig[data-kind="chart"]'));
    if (!window.echarts) return;
    var start = function () {
      if (eager || !('IntersectionObserver' in window)) {
        cards.forEach(render);
      } else {
        var near = new IntersectionObserver(function (entries) {
          entries.forEach(function (en) {
            var id = en.target.dataset.fig;
            if (en.isIntersecting && en.target.dataset.rendered !== '1' && !en.target.hidden) render(en.target);
          });
        }, { rootMargin: '700px 0px' });
        var far = new IntersectionObserver(function (entries) {
          entries.forEach(function (en) {
            if (!en.isIntersecting) dispose(en.target.dataset.fig);
          });
        }, { rootMargin: '3200px 0px' });
        cards.forEach(function (c) { near.observe(c); far.observe(c); });
      }
    };
    if (document.fonts && document.fonts.ready) {
      var done = false;
      document.fonts.ready.then(function () { if (!done) { done = true; start(); } });
      setTimeout(function () { if (!done) { done = true; start(); } }, 1200);
    } else start();

    // width changes: re-render when the size bucket changes, otherwise resize
    if ('ResizeObserver' in window) {
      var ro = new ResizeObserver(function (entries) {
        entries.forEach(function (en) {
          var card = en.target.closest('.fig');
          var L = live[card.dataset.fig];
          if (!L || !L.chart) return;
          var w = en.contentRect.width;
          if (sizeKey(w) !== L.sizeKey) render(card);
          else L.chart.resize();
        });
      });
      cards.forEach(function (c) { ro.observe(c.querySelector('.fig-chart')); });
    }
    // theme changes (system or explicit)
    var themeNow = isDark();
    function themeChanged() {
      var d = isDark();
      if (d === themeNow) return;
      themeNow = d;
      rerenderAll();
    }
    if (window.matchMedia) {
      var mq = window.matchMedia('(prefers-color-scheme: dark)');
      if (mq.addEventListener) mq.addEventListener('change', themeChanged);
    }
    new MutationObserver(themeChanged).observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

    // header controls
    var q = document.getElementById('filter');
    if (q) q.addEventListener('input', function () { applyFilter(q.value); });
    var themeBtn = document.getElementById('theme-toggle');
    if (themeBtn) {
      var label = function () {
        var cur = document.documentElement.getAttribute('data-theme');
        themeBtn.textContent = cur === 'dark' ? 'Theme: dark' : cur === 'light' ? 'Theme: light' : 'Theme: system';
      };
      try {
        var saved = localStorage.getItem('esoo-theme');
        if (saved === 'dark' || saved === 'light') document.documentElement.setAttribute('data-theme', saved);
      } catch (e) { /* storage unavailable */ }
      label();
      themeBtn.addEventListener('click', function () {
        var cur = document.documentElement.getAttribute('data-theme');
        var next = cur === null ? 'light' : cur === 'light' ? 'dark' : null;
        if (next) document.documentElement.setAttribute('data-theme', next);
        else document.documentElement.removeAttribute('data-theme');
        try { if (next) localStorage.setItem('esoo-theme', next); else localStorage.removeItem('esoo-theme'); } catch (e) { /* ignore */ }
        label();
      });
    }
    var decalBtn = document.getElementById('decal-toggle');
    if (decalBtn) {
      decalBtn.addEventListener('click', function () {
        ESOO.decals = !ESOO.decals;
        decalBtn.setAttribute('aria-pressed', ESOO.decals ? 'true' : 'false');
        rerenderAll();
      });
    }
    if (!ESOO.canDownload) document.querySelectorAll('[data-act="csv"],[data-act="png"]').forEach(function (b) { b.hidden = true; });
    if (BUILD.links === false) document.querySelectorAll('[data-act="link"]').forEach(function (b) { b.hidden = true; });
    // contents rail: mark the figure nearest the top of the viewport
    if ('IntersectionObserver' in window && document.querySelector('.toc')) {
      var current = null;
      var visible = {};
      var spy = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) { visible[en.target.id] = en.isIntersecting ? en.boundingClientRect.top : undefined; });
        var best = null, bestTop = Infinity;
        Object.keys(visible).forEach(function (k) {
          if (visible[k] !== undefined && visible[k] < bestTop) { bestTop = visible[k]; best = k; }
        });
        if (best && best !== current) {
          if (current) {
            var old = document.querySelector('.toc a[href="#' + CSS.escape(current) + '"]');
            if (old) old.classList.remove('is-current');
          }
          var link = document.querySelector('.toc a[href="#' + CSS.escape(best) + '"]');
          if (link) link.classList.add('is-current');
          current = best;
        }
      }, { rootMargin: '-80px 0px -55% 0px' });
      document.querySelectorAll('.fig[data-fig]').forEach(function (c) { spy.observe(c); });
    }
  };
})();
