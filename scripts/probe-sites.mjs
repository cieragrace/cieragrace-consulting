import { chromium } from '/Users/cieragrace/DEVELOPMENT/landscaper-sites/node_modules/playwright/index.mjs';

const sites = [
  { slug: 'ap-tracker', url: 'https://ap-tracker-three.vercel.app' },
  { slug: 'inked-colorado', url: 'https://ink-colorado.vercel.app' },
  { slug: 'garden-grow', url: 'https://garden-grow-sable.vercel.app' },
  { slug: 'ironside-barber', url: 'https://ironside-barber.vercel.app' },
];

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });

for (const { slug, url } of sites) {
  const page = await ctx.newPage();
  await page.goto(url, { waitUntil: 'networkidle', timeout: 45000 });
  await page.waitForTimeout(1500);
  const data = await page.evaluate(() => {
    const txt = (el) => (el.innerText || el.value || el.placeholder || '').trim().replace(/\s+/g, ' ').slice(0, 40);
    const grab = (sel) => [...document.querySelectorAll(sel)].map(txt).filter(Boolean).slice(0, 25);
    return {
      title: document.title,
      buttons: grab('button'),
      links: grab('a'),
      inputs: [...document.querySelectorAll('input,select,textarea')].map((e) => `${e.tagName}[${e.type || ''}] ${e.placeholder || e.name || ''}`.trim()).slice(0, 20),
      headings: grab('h1,h2'),
    };
  });
  console.log('\n===== ' + slug + ' (' + url + ') =====');
  console.log(JSON.stringify(data, null, 1));
  await page.close();
}
await browser.close();
