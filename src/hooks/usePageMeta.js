import { useEffect } from 'react';

/**
 * Sets document.title and the meta[name="description"] content for a page.
 * SPA-simple: every page sets its own meta on mount, so no restore is needed.
 */
export default function usePageMeta(title, description) {
  useEffect(() => {
    if (title) document.title = title;
    if (description) {
      const meta = document.querySelector('meta[name="description"]');
      if (meta) meta.setAttribute('content', description);
    }
  }, [title, description]);
}
