import { Link } from 'react-router-dom';
import LogoMark from './LogoMark.jsx';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-copper-100 bg-cream">
      <div className="container-page py-12 md:py-16">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-2.5">
              <LogoMark className="h-7 w-auto shrink-0" />
              <p className="font-serif text-xl text-ink">
                Ciera Grace <span className="text-copper-600">Consulting</span>
              </p>
            </div>
            <p className="mt-3 text-sm text-ink-400 max-w-xs">
              Web design and digital strategy for considered businesses.
            </p>
          </div>

          <div>
            <p className="eyebrow mb-4">Pages</p>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="inline-block py-1.5 text-ink-400 hover:text-copper-700 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="inline-block py-1.5 text-ink-400 hover:text-copper-700 transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link to="/contact" className="inline-block py-1.5 text-ink-400 hover:text-copper-700 transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="eyebrow mb-4">Contact</p>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="mailto:cieragraceconsulting@gmail.com"
                  className="inline-block py-1.5 text-ink-400 hover:text-copper-700 transition-colors"
                >
                  cieragraceconsulting@gmail.com
                </a>
              </li>
              <li>
                <a
                  href="tel:+13036567380"
                  className="inline-block py-1.5 text-ink-400 hover:text-copper-700 transition-colors"
                >
                  (303) 656-7380
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/cieragrace"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block py-1.5 text-ink-400 hover:text-copper-700 transition-colors"
                >
                  GitHub ↗
                </a>
              </li>
              <li className="text-ink-400 pt-1">Based in Colorado · building beautifully, anywhere.</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-copper-100 flex flex-col md:flex-row justify-between gap-2 text-xs text-ink-400">
          <p>© {year} Ciera Grace Consulting LLC. All rights reserved.</p>
          <p>Designed and built in-house.</p>
        </div>
      </div>
    </footer>
  );
}
