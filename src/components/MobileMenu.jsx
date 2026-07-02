import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';

export default function MobileMenu({ links, onClose, triggerRef }) {
  const panelRef = useRef(null);
  const firstLinkRef = useRef(null);

  // Move focus into the panel on mount; restore to the hamburger trigger on unmount.
  useEffect(() => {
    firstLinkRef.current?.focus();
    // Lock background scroll while the menu is open.
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previousOverflow;
      triggerRef?.current?.focus();
    };
  }, [triggerRef]);

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      e.stopPropagation();
      onClose();
      return;
    }
    if (e.key !== 'Tab') return;

    const focusable = panelRef.current?.querySelectorAll(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
    );
    if (!focusable || focusable.length === 0) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  };

  return (
    <motion.div
      ref={panelRef}
      id="mobile-menu"
      role="dialog"
      aria-modal="true"
      aria-label="Menu"
      onKeyDown={handleKeyDown}
      className="fixed inset-0 z-30 md:hidden bg-cream overflow-y-auto"
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="container-page pt-24 pb-12 landscape:pt-16 min-h-[100dvh] flex flex-col">
        <nav aria-label="Mobile">
        <ul className="flex flex-col gap-6 landscape:gap-4">
          {links.map((link, i) => (
            <motion.li
              key={link.to}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.05 + i * 0.05 }}
            >
              <NavLink
                ref={i === 0 ? firstLinkRef : undefined}
                to={link.to}
                end={link.to === '/'}
                onClick={onClose}
                className={({ isActive }) =>
                  [
                    'block font-serif text-4xl landscape:text-3xl tracking-tightish transition-colors',
                    isActive ? 'text-ink' : 'text-ink-400',
                  ].join(' ')
                }
              >
                {link.label}
              </NavLink>
            </motion.li>
          ))}
        </ul>
        </nav>

        <div className="mt-auto pt-12 border-t border-copper-100">
          <p className="text-sm text-ink-400">Ciera Grace Consulting LLC</p>
          <a
            href="mailto:cieragraceconsulting@gmail.com"
            className="text-sm text-ink hover:text-copper-600 transition-colors flex items-center min-h-[44px]"
          >
            cieragraceconsulting@gmail.com
          </a>
          <a
            href="tel:+13036567380"
            className="text-sm text-ink hover:text-copper-600 transition-colors flex items-center min-h-[44px]"
          >
            (303) 656-7380
          </a>
          <p className="text-xs text-ink-400 mt-3 italic">
            Colorado-based · creating for clients anywhere.
          </p>
        </div>
      </div>
    </motion.div>
  );
}
