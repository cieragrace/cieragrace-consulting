/**
 * Post-build: write a static index.html per route with that route's
 * title / description / canonical / Open Graph tags baked in, so crawlers
 * and social scrapers (which don't run JS) see correct per-page meta.
 *
 * Pure Node — no browser — so it runs fine in Vercel's build environment.
 * Vercel serves matching static files before applying rewrites, so
 * /about hits dist/about/index.html instead of the SPA fallback.
 */
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

import seo, { SITE_URL } from '../src/data/seo.js';

const dist = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'dist');
const template = await readFile(path.join(dist, 'index.html'), 'utf8');

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');

for (const [route, { title, description }] of Object.entries(seo)) {
  const url = SITE_URL + (route === '/' ? '/' : route);
  const html = template
    .replace(/<title>[^<]*<\/title>/, `<title>${esc(title)}</title>`)
    .replace(
      /(<meta\s+name="description"\s+content=")[^"]*(")/,
      `$1${esc(description)}$2`
    )
    .replace(
      /(<link\s+rel="canonical"\s+href=")[^"]*(")/,
      `$1${url}$2`
    )
    .replace(
      /(<meta\s+property="og:title"\s+content=")[^"]*(")/,
      `$1${esc(title)}$2`
    )
    .replace(
      /(<meta\s+property="og:description"\s+content=")[^"]*(")/,
      `$1${esc(description)}$2`
    )
    .replace(
      /(<meta\s+property="og:url"\s+content=")[^"]*(")/,
      `$1${url}$2`
    )
    .replace(
      /(<meta\s+name="twitter:title"\s+content=")[^"]*(")/,
      `$1${esc(title)}$2`
    )
    .replace(
      /(<meta\s+name="twitter:description"\s+content=")[^"]*(")/,
      `$1${esc(description)}$2`
    );

  const outDir = route === '/' ? dist : path.join(dist, route.slice(1));
  await mkdir(outDir, { recursive: true });
  await writeFile(path.join(outDir, 'index.html'), html);
  console.log(`  ✓ ${route} → ${path.relative(dist, path.join(outDir, 'index.html'))}`);
}

console.log('Per-route HTML generated.');
