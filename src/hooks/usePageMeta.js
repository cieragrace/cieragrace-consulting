import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { SITE_URL } from '../data/seo.js';

function setMeta(selector, content) {
  const el = document.querySelector(selector);
  if (el) el.setAttribute('content', content);
}

/**
 * Sets document.title, meta description, canonical URL, and Open Graph /
 * Twitter tags for a page. SPA-simple: every page sets its own meta on
 * mount, so no restore is needed.
 */
export default function usePageMeta(title, description) {
  const { pathname } = useLocation();

  useEffect(() => {
    const url = SITE_URL + (pathname === '/' ? '/' : pathname);

    if (title) {
      document.title = title;
      setMeta('meta[property="og:title"]', title);
      setMeta('meta[name="twitter:title"]', title);
    }
    if (description) {
      setMeta('meta[name="description"]', description);
      setMeta('meta[property="og:description"]', description);
      setMeta('meta[name="twitter:description"]', description);
    }
    setMeta('meta[property="og:url"]', url);

    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) canonical.setAttribute('href', url);
  }, [title, description, pathname]);
}
