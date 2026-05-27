import { motion } from 'framer-motion';
import { NavLink } from 'react-router-dom';

export default function MobileMenu({ links, onClose }) {
  return (
    <motion.div
      className="fixed inset-0 z-30 md:hidden bg-cream"
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="container-page pt-24 pb-12 h-full flex flex-col">
        <ul className="flex flex-col gap-8">
          {links.map((link, i) => (
            <motion.li
              key={link.to}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.05 + i * 0.05 }}
            >
              <NavLink
                to={link.to}
                end={link.to === '/'}
                onClick={onClose}
                className={({ isActive }) =>
                  [
                    'block font-serif text-4xl tracking-tightish transition-colors',
                    isActive ? 'text-ink' : 'text-ink-400',
                  ].join(' ')
                }
              >
                {link.label}
              </NavLink>
            </motion.li>
          ))}
        </ul>

        <div className="mt-auto pt-12 border-t border-copper-100">
          <p className="text-sm text-ink-400">Ciera Grace Consulting LLC</p>
          <a
            href="mailto:cieragraceconsulting@gmail.com"
            className="text-sm text-ink hover:text-copper-600 transition-colors block"
          >
            cieragraceconsulting@gmail.com
          </a>
          <a
            href="tel:+13036567380"
            className="text-sm text-ink hover:text-copper-600 transition-colors block mt-1"
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
