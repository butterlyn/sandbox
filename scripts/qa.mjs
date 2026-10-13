#!/usr/bin/env node
// Render the combined page once, screenshot every figure card, and report problems.
//
//   node scripts/qa.mjs <page.html> <out-dir> [--theme light|dark] [--width 1180]
//
// Writes <out-dir>/<id>.png per figure and <out-dir>/report.json; exits 1 on any problem
// (console errors, page errors, charts that failed to render, missing modules, horizontal overflow).
import { createRequire } from 'module';
import path from 'path';
import fs from 'fs';

const require = createRequire(import.meta.url);
let chromium;
try {
  ({ chromium } = require('playwright'));
} catch {
  ({ chromium } = require('/opt/node22/lib/node_modules/playwright'));
}
const argv = process.argv.slice(2);
const opt = (n, d) => (argv.indexOf('--' + n) >= 0 ? argv[argv.indexOf('--' + n) + 1] : d);
const [input, outDir] = argv.filter((a, i) => !a.startsWith('--') && !(argv[i - 1] || '').startsWith('--'));
const theme = opt('theme', 'light');
const width = parseInt(opt('width', '1180'), 10);
fs.mkdirSync(outDir, { recursive: true });

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width, height: 1000 }, colorScheme: theme, reducedMotion: 'reduce' });
const page = await ctx.newPage();
const problems = [];
page.on('console', (m) => { if (m.type() === 'error' || m.type() === 'warning') problems.push(`console.${m.type()}: ${m.text()}`); });
page.on('pageerror', (e) => problems.push(`pageerror: ${e.message}`));
const t0 = Date.now();
await page.goto('file://' + path.resolve(input) + '?eager', { waitUntil: 'load', timeout: 120000 });
const loadMs = Date.now() - t0;
let state;
for (let i = 0; i < 240; i++) {
  state = await page.evaluate(() => {
    const cards = [...document.querySelectorAll('.fig[data-kind="chart"]')];
    return {
      total: cards.length,
      rendered: cards.filter((c) => c.dataset.rendered === '1').length,
      failed: cards.filter((c) => c.querySelector('.fig-chart.is-error')).map((c) => c.dataset.fig + ': ' + c.querySelector('.fig-chart').textContent),
      errors: (window.ESOO && window.ESOO.errors) || [],
    };
  });
  if (state.rendered + state.failed.length >= state.total) break;
  await page.waitForTimeout(250);
}
const renderMs = Date.now() - t0;
await page.waitForTimeout(500);
const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
if (overflow > 1) problems.push(`page scrolls horizontally by ${overflow}px at width ${width}`);
const ids = await page.$$eval('.fig[data-fig]', (els) => els.map((e) => e.dataset.fig));
for (const id of ids) {
  const el = await page.$(`#fig-${id.replace(/\./g, '\\.')}`);
  await el.scrollIntoViewIfNeeded();
  await el.screenshot({ path: path.join(outDir, id + '.png') });
}
for (const e of state.errors) problems.push(`ESOO error ${e.id}: ${String(e.error).split('\n')[0]}`);
for (const f of state.failed) problems.push(`not rendered: ${f}`);
const report = { input, theme, width, loadMs, renderMs, charts: state.total, rendered: state.rendered, figures: ids.length, problems };
fs.writeFileSync(path.join(outDir, 'report.json'), JSON.stringify(report, null, 1));
console.log(JSON.stringify({ ...report, problems: problems.length }, null, 1));
if (problems.length) console.log('PROBLEMS:\n  ' + problems.join('\n  '));
await browser.close();
process.exit(problems.length ? 1 : 0);
