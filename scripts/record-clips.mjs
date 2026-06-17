// Record a short key-interaction clip of each live site, trim the final
// ~5.5s (the interaction) and convert to a clean looping mp4.
// Records at 16:10 to match the card stage. Run: node scripts/record-clips.mjs [slug]
import { chromium } from '/Users/cieragrace/DEVELOPMENT/landscaper-sites/node_modules/playwright/index.mjs';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(__dirname, '..', 'public', 'work');
const TMP = fs.mkdtempSync(path.join(os.tmpdir(), 'cgc-clips-'));
const W = 1280, H = 800;
const only = process.argv[2];

const wait = (p, ms) => p.waitForTimeout(ms);
const tryStep = async (label, fn) => {
  try { await fn(); } catch (e) { console.log(`  · skipped ${label}: ${e.message.split('\n')[0]}`); }
};

const sites = [
  {
    slug: 'ap-tracker',
    url: 'https://ap-tracker-three.vercel.app',
    async act(page) {
      await wait(page, 1200);
      await tryStep('expand vendor', async () => {
        await page.getByRole('button', { name: /Brightleaf Office Supplies/i }).click();
        await wait(page, 1500);
      });
      await tryStep('expand 2nd vendor', async () => {
        await page.getByRole('button', { name: /Northwind Logistics/i }).click();
        await wait(page, 1500);
      });
      await tryStep('add invoice', async () => {
        await page.getByRole('button', { name: /^Add invoice$/i }).click();
        await wait(page, 2000);
      });
      await wait(page, 600);
    },
  },
  {
    slug: 'inked-colorado',
    url: 'https://ink-colorado.vercel.app',
    async act(page) {
      await wait(page, 1200);
      const style = page.locator('select[name="style"]');
      // Filter by a well-populated style only (leave city open) so results fill the grid.
      await tryStep('select style', async () => {
        try { await style.selectOption({ label: 'Black & Grey' }); }
        catch { await style.selectOption({ index: 3 }); }
        await wait(page, 1100);
      });
      await tryStep('search', async () => {
        await page.getByRole('button', { name: /search/i }).click();
        await page.waitForLoadState('networkidle', { timeout: 15000 });
        await wait(page, 1800);
      });
      await wait(page, 600);
    },
  },
  {
    slug: 'garden-grow',
    url: 'https://garden-grow-sable.vercel.app',
    async act(page) {
      await wait(page, 1200);
      await tryStep('type zip', async () => {
        const zip = page.locator('input[type="text"]').first();
        await zip.click();
        await zip.pressSequentially('80205', { delay: 180 });
        await wait(page, 700);
      });
      await tryStep('submit zip', async () => {
        await page.getByRole('button', { name: /see what i can grow/i }).click();
        await wait(page, 2600);
      });
      await wait(page, 700);
    },
  },
  {
    slug: 'ironside-barber',
    url: 'https://ironside-barber.vercel.app',
    async act(page) {
      await wait(page, 1000);
      for (const name of ['Services', 'Barbers', 'Gallery']) {
        await tryStep(`nav ${name}`, async () => {
          await page.getByRole('link', { name: new RegExp(`^${name}$`, 'i') }).first().click();
          await wait(page, 1700);
        });
      }
      await wait(page, 600);
    },
  },
];

const browser = await chromium.launch();

for (const site of sites) {
  if (only && site.slug !== only) continue;
  console.log(`recording ${site.slug}…`);
  const ctx = await browser.newContext({
    viewport: { width: W, height: H },
    deviceScaleFactor: 1,
    recordVideo: { dir: TMP, size: { width: W, height: H } },
  });
  const page = await ctx.newPage();
  try {
    await page.goto(site.url, { waitUntil: 'networkidle', timeout: 45000 });
    await wait(page, 1500);
    await site.act(page);
  } catch (e) {
    console.error(`  ! ${site.slug} error: ${e.message.split('\n')[0]}`);
  }
  const video = page.video();
  await page.close();
  await ctx.close(); // flush video
  const raw = await video.path();

  // Trim final 5.5s (the interaction), scale, h264, web-friendly loop.
  const mp4 = path.join(OUT, `${site.slug}.mp4`);
  execFileSync('ffmpeg', [
    '-y', '-sseof', '-5.5', '-i', raw,
    '-vf', `scale=${W}:${H}:force_original_aspect_ratio=increase,crop=${W}:${H},fps=30`,
    '-an', '-c:v', 'libx264', '-pix_fmt', 'yuv420p', '-profile:v', 'high',
    '-crf', '24', '-movflags', '+faststart', mp4,
  ], { stdio: 'pipe' });
  const kb = Math.round(fs.statSync(mp4).size / 1024);
  console.log(`  -> ${path.basename(mp4)} (${kb} KB)`);
}

await browser.close();
fs.rmSync(TMP, { recursive: true, force: true });
console.log('done');
