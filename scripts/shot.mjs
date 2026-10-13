#!/usr/bin/env node
// Screenshot a built page with headless Chromium and report console/page errors.
//
//   node scripts/shot.mjs <page.html> <out.png> [--width 1180] [--theme light|dark]
//        [--full] [--fig <id>] [--hover 0.6,0.4] [--table] [--timeout 20000]
//
// --fig <id>     screenshot only that figure card (default: whole viewport, or full page with --full)
// --hover fx,fy  move the pointer to that fraction of the figure's chart area first (tooltip check)
// --table        open the figure's data table before the screenshot
// Exit code 1 when the page logs errors, a chart fails to render, or a module is missing.
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
const pos = argv.filter((a, i) => !a.startsWith('--') && !(argv[i - 1] || '').match(/^--(width|theme|fig|hover|timeout|height)$/));
const opt = (name, dflt) => {
  const i = argv.indexOf('--' + name);
  return i >= 0 ? argv[i + 1] : dflt;
};
const flag = (name) => argv.includes('--' + name);
const [input, output] = pos;
if (!input || !output) {
  console.error('usage: node scripts/shot.mjs <page.html> <out.png> [--width N] [--theme light|dark] [--full] [--fig id] [--hover fx,fy] [--table]');
  process.exit(2);
}
const width = parseInt(opt('width', '1180'), 10);
const height = parseInt(opt('height', '900'), 10);
const theme = opt('theme', 'light');
const fig = opt('fig', null);
const hover = opt('hover', null);
const timeout = parseInt(opt('timeout', '20000'), 10);

const browser = await chromium.launch({
  executablePath: fs.existsSync('/opt/pw-browsers/chromium') ? undefined : undefined,
});
const ctx = await browser.newContext({
  viewport: { width, height },
  deviceScaleFactor: 1,
  colorScheme: theme === 'dark' ? 'dark' : 'light',
  reducedMotion: 'reduce',
});
const page = await ctx.newPage();
const problems = [];
page.on('console', (m) => {
  if (m.type() === 'error' || m.type() === 'warning') problems.push(`console.${m.type()}: ${m.text()}`);
});
page.on('pageerror', (err) => problems.push(`pageerror: ${err.message}`));
page.on('requestfailed', (r) => {
  const u = r.url();
  if (!u.startsWith('https://fonts.')) problems.push(`requestfailed: ${u}`);
});

const url = 'file://' + path.resolve(input) + '?eager';
await page.goto(url, { waitUntil: 'load', timeout });
// wait until every chart card has rendered or errored
const deadline = Date.now() + timeout;
let state;
while (Date.now() < deadline) {
  state = await page.evaluate(() => {
    const cards = [...document.querySelectorAll('.fig[data-kind="chart"]')];
    const pending = cards.filter((c) => c.dataset.rendered !== '1' && !c.querySelector('.fig-chart.is-error'));
    return {
      total: cards.length,
      pending: pending.map((c) => c.dataset.fig),
      errors: (window.ESOO && window.ESOO.errors) || [],
      failed: cards.filter((c) => c.querySelector('.fig-chart.is-error')).map((c) => c.dataset.fig + ': ' + c.querySelector('.fig-chart').textContent),
    };
  });
  if (!state.pending.length) break;
  await page.evaluate(() => window.ESOO && window.ESOO.renderAll && window.ESOO.renderAll());
  await page.waitForTimeout(250);
}
await page.waitForTimeout(400);

let target = null;
if (fig) {
  target = await page.$(`#fig-${fig.replace(/\./g, '\\.')}`);
  if (!target) {
    console.error(`figure ${fig} not found`);
    process.exit(2);
  }
  if (flag('table')) {
    await target.$eval('[data-act="table"]', (b) => b.click());
    await page.waitForTimeout(200);
  }
  await target.scrollIntoViewIfNeeded();
  if (hover) {
    const [fx, fy] = hover.split(',').map(Number);
    const chart = await target.$('.fig-chart');
    const box = await chart.boundingBox();
    await page.mouse.move(box.x + box.width * fx, box.y + box.height * fy, { steps: 4 });
    await page.waitForTimeout(350);
  }
}
if (target) {
  await target.screenshot({ path: output });
} else {
  await page.screenshot({ path: output, fullPage: flag('full') });
}

for (const e of state.errors) problems.push(`ESOO error ${e.id}: ${e.error.split('\n')[0]}`);
for (const f of state.failed) problems.push(`not rendered: ${f}`);
if (state.pending.length) problems.push(`still pending after ${timeout}ms: ${state.pending.join(', ')}`);
console.log(`screenshot: ${output}  (${state.total} chart card(s), theme=${theme}, width=${width})`);
if (problems.length) {
  console.log('PROBLEMS:\n  ' + problems.join('\n  '));
}
await browser.close();
process.exit(problems.length ? 1 : 0);
