import { Link } from 'react-router-dom';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-copper-100 bg-cream">
      <div className="container-page py-12 md:py-16">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <p className="font-serif text-xl text-ink">
              Ciera Grace <span className="text-copper-600">Consulting</span>
            </p>
            <p className="mt-3 text-sm text-ink-400 max-w-xs">
              Web design and digital strategy for considered businesses.
            </p>
          </div>

          <div>
            <p className="eyebrow mb-4">Pages</p>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="text-ink-400 hover:text-copper-600 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-ink-400 hover:text-copper-600 transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-ink-400 hover:text-copper-600 transition-colors">
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
                  className="text-ink-400 hover:text-copper-600 transition-colors"
                >
                  cieragraceconsulting@gmail.com
                </a>
              </li>
              <li>
                <a
                  href="tel:+13036567380"
                  className="text-ink-400 hover:text-copper-600 transition-colors"
                >
                  (303) 656-7380
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
