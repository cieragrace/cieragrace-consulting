// Capture top-fold poster screenshots of each live project site.
// Uses the Playwright install from landscaper-sites (no local dep needed).
// Run: node scripts/capture-previews.mjs
import { chromium } from '/Users/cieragrace/DEVELOPMENT/landscaper-sites/node_modules/playwright/index.mjs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(__dirname, '..', 'public', 'work');

const sites = [
  { slug: 'ap-tracker', url: 'https://ap-tracker-three.vercel.app' },
  { slug: 'inked-colorado', url: 'https://ink-colorado.vercel.app' },
  { slug: 'garden-grow', url: 'https://garden-grow-sable.vercel.app' },
  { slug: 'ironside-barber', url: 'https://ironside-barber.vercel.app' },
];

const browser = await chromium.launch();
const ctx = await browser.newContext({
  viewport: { width: 1440, height: 900 }, // 16:10
  deviceScaleFactor: 2,
});

for (const { slug, url } of sites) {
  const page = await ctx.newPage();
  try {
    await page.goto(url, { waitUntil: 'networkidle', timeout: 45000 });
    await page.waitForTimeout(2500); // let fonts/animations settle
    const file = path.join(OUT, `${slug}.png`);
    await page.screenshot({ path: file }); // viewport only = top fold
    console.log('captured', slug, '->', file);
  } catch (e) {
    console.error('FAILED', slug, e.message);
  } finally {
    await page.close();
  }
}

await browser.close();
console.log('done');
