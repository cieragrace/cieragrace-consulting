import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import MobileMenu from './MobileMenu.jsx';

const links = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  return (
    <>
      <header
        className={[
          'sticky top-0 z-40 w-full transition-all duration-300 ease-out-soft',
          'backdrop-blur-md bg-cream/80',
          scrolled ? 'border-b border-copper-100' : 'border-b border-transparent',
        ].join(' ')}
      >
        <nav className="container-page flex items-center justify-between h-16 md:h-20">
          <Link
            to="/"
            className="font-serif text-xl md:text-2xl tracking-tightish text-ink"
            aria-label="Ciera Grace Consulting — home"
          >
            Ciera Grace <span className="text-copper-600">Consulting</span>
          </Link>

          <ul className="hidden md:flex items-center gap-10">
            {links.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  end={link.to === '/'}
                  className={({ isActive }) =>
                    [
                      'text-sm tracking-wide transition-colors duration-200',
                      isActive ? 'text-ink' : 'text-ink-400 hover:text-copper-600',
                    ].join(' ')
                  }
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>

          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            className="md:hidden inline-flex items-center justify-center w-10 h-10 text-ink"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            <span className="sr-only">Toggle menu</span>
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            >
              {menuOpen ? (
                <>
                  <line x1="6" y1="6" x2="18" y2="18" />
                  <line x1="18" y1="6" x2="6" y2="18" />
                </>
              ) : (
                <>
                  <line x1="4" y1="8" x2="20" y2="8" />
                  <line x1="4" y1="16" x2="20" y2="16" />
                </>
              )}
            </svg>
          </button>
        </nav>
      </header>

      <AnimatePresence>
        {menuOpen && <MobileMenu links={links} onClose={() => setMenuOpen(false)} />}
      </AnimatePresence>
    </>
  );
}
