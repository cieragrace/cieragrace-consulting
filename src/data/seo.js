/**
 * Single source of truth for per-route SEO meta.
 * Used by usePageMeta (client-side) and scripts/generate-route-html.mjs
 * (build-time static HTML per route).
 */
export const SITE_URL = 'https://cieragrace.com';

const seo = {
  '/': {
    title: 'Denver Web Design & Development — Ciera Grace Consulting',
    description:
      'Ciera Grace Consulting is a Denver, Colorado web design studio — custom, hand-coded websites, brand-aligned development, and conversion-focused digital experiences for considered businesses.',
  },
  '/about': {
    title: 'About — Ciera Grace Consulting | Denver Web Designer',
    description:
      'Ciera Grace Consulting is Ciera Muniz — a Denver, Colorado designer-developer running a one-woman web design studio, partnering with a small number of clients each year.',
  },
  '/contact': {
    title: 'Contact — Ciera Grace Consulting | Web Design in Denver, CO',
    description:
      'Share a little about your project and get a reply from Ciera Grace Consulting, a Denver web design studio, within one business day.',
  },
};

export default seo;
