import { chromium } from '/Users/cieragrace/DEVELOPMENT/landscaper-sites/node_modules/playwright/index.mjs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const width = Number(process.argv[2] || 1440);
const out = path.join(__dirname, '..', `_devshot-${width}.png`);

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width, height: 1000 }, deviceScaleFactor: 1 });
await page.goto('http://localhost:5173/', { waitUntil: 'networkidle' });
await page.waitForTimeout(800);
await page.locator('#work').scrollIntoViewIfNeeded();
await page.waitForTimeout(1200);
await page.screenshot({ path: out });
console.log('shot', out);
await browser.close();
