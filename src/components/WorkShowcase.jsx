import { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import BrowserFrame from './BrowserFrame.jsx';

// Selected Work — media-first portfolio stage. The clip/poster sits inside a
// browser-chrome frame (~60% on desktop) with the project story alongside;
// named tabs + prev/next arrows drive navigation. Slides move by translate
// only (never opacity-0 initial states — crawlability rule).
export default function WorkShowcase({
  projects = [],
  eyebrow = 'Selected Work',
  title = "Things we've shipped.",
  intro = '',
}) {
  const reduceMotion = useReducedMotion();
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState(0); // 1 = next, -1 = prev
  const count = projects.length;

  const goTo = (next) => {
    const clamped = (next + count) % count;
    setDirection(clamped > active || (active === count - 1 && clamped === 0) ? 1 : -1);
    setActive(clamped);
  };
  const prev = () => goTo(active - 1);
  const next = () => goTo(active + 1);

  const onKeyDown = (e) => {
    if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      prev();
    } else if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      next();
    }
  };

  const project = projects[active];

  // Translate-only slide + settle. Never opacity — content stays crawlable.
  const slide = {
    enter: (dir) => ({ x: reduceMotion ? 0 : dir > 0 ? 64 : -64 }),
    center: { x: 0 },
    exit: (dir) => ({ x: reduceMotion ? 0 : dir > 0 ? -64 : 64 }),
  };

  return (
    <div>
      {/* Section header */}
      {eyebrow && <p className="eyebrow mb-4 !text-copper-700">{eyebrow}</p>}
      {title && (
        <h2 className="font-serif text-4xl leading-[1.1] text-ink md:text-5xl">{title}</h2>
      )}
      {intro && <p className="mt-5 max-w-2xl text-base text-ink-400 md:text-lg">{intro}</p>}

      {/* Carousel */}
      <div
        role="region"
        aria-roledescription="carousel"
        aria-label="Selected work"
        onKeyDown={onKeyDown}
        className="mt-12 md:mt-16"
      >
        <div className="overflow-hidden">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={active}
              custom={direction}
              variants={slide}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: reduceMotion ? 0 : 0.5, ease: [0.22, 1, 0.36, 1] }}
              drag={reduceMotion ? false : 'x'}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.12}
              onDragEnd={(_, info) => {
                const th = 50;
                if (info.offset.x < -th) next();
                else if (info.offset.x > th) prev();
              }}
              aria-live="polite"
              aria-roledescription="slide"
              aria-label={`${active + 1} of ${count}: ${project.title}`}
              className="grid items-start gap-10 lg:grid-cols-5 lg:items-center lg:gap-14"
            >
              {/* Stage — media is the hero (~60%) */}
              <div className="min-w-0 lg:col-span-3">
                <BrowserFrame project={project} reduceMotion={reduceMotion} />
              </div>

              {/* Story panel (~40%) */}
              <div className="min-w-0 lg:col-span-2">
                <div className="flex items-center gap-3">
                  <span className="eyebrow !text-copper-700">{project.category}</span>
                  {project.status !== 'live' && (
                    <span className="inline-flex items-center rounded-full border border-copper-100 bg-cream-200 px-3 py-1 text-[0.7rem] font-medium uppercase tracking-[0.14em] text-ink-400">
                      Coming soon
                    </span>
                  )}
                </div>

                <h3 className="mt-3 font-serif text-3xl leading-tight text-ink md:text-4xl">
                  {project.title}
                </h3>
                <p className="mt-4 leading-relaxed text-ink-400">{project.description}</p>

                {project.stack?.length > 0 && (
                  <ul className="mt-5 flex flex-wrap gap-2" aria-label="Tech stack">
                    {project.stack.map((tech) => (
                      <li
                        key={tech}
                        className="rounded-full bg-copper-50 px-3 py-1 text-xs font-medium text-copperDeep-600"
                      >
                        {tech}
                      </li>
                    ))}
                  </ul>
                )}

                {project.status === 'live' && (
                  <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-3">
                    <motion.a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                      className="inline-flex items-center justify-center gap-1.5 rounded-2xl bg-copperDeep-500 px-7 py-3.5 text-sm tracking-wide text-cream transition-colors duration-300 ease-out-soft hover:bg-copperDeep-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-copper-400"
                    >
                      View live
                      <span aria-hidden="true">↗</span>
                      <span className="sr-only">(opens in a new tab)</span>
                    </motion.a>
                    {project.repoUrl && (
                      <a
                        href={project.repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-md py-2 text-sm text-ink-400 transition-colors duration-200 hover:text-copper-700"
                      >
                        Code
                        <span aria-hidden="true">↗</span>
                        <span className="sr-only">repository (opens in a new tab)</span>
                      </a>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Named tabs + arrows */}
        <div className="mt-9 flex items-center gap-5 md:mt-12">
          <nav aria-label="Choose project" className="relative min-w-0 flex-1">
            <div className="flex items-end gap-6 overflow-x-auto whitespace-nowrap pb-px [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:gap-8">
              {projects.map((p, i) => {
                const isActive = i === active;
                return (
                  <button
                    key={`${p.title}-${i}`}
                    type="button"
                    onClick={() => goTo(i)}
                    aria-current={isActive ? 'true' : undefined}
                    className={[
                      'shrink-0 border-b-2 pb-2 text-[0.78rem] font-medium uppercase tracking-[0.14em] transition-colors duration-300 ease-out-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-copperDeep-500 focus-visible:ring-offset-2 focus-visible:ring-offset-cream',
                      isActive
                        ? 'border-copper-500 text-copper-700'
                        : 'border-transparent text-ink-400 hover:text-ink',
                    ].join(' ')}
                  >
                    {p.title}
                  </button>
                );
              })}
            </div>
            {/* Edge fades — mobile/tablet only, where the row scrolls */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-0 left-0 w-6 bg-gradient-to-r from-cream lg:hidden"
            />
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-0 right-0 w-6 bg-gradient-to-l from-cream lg:hidden"
            />
          </nav>

          <div className="flex shrink-0 gap-3">
            <NavArrow dir="prev" onClick={prev} />
            <NavArrow dir="next" onClick={next} />
          </div>
        </div>
      </div>
    </div>
  );
}

function NavArrow({ dir, onClick }) {
  const isPrev = dir === 'prev';
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={isPrev ? 'Previous project' : 'Next project'}
      className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-copper-200 bg-cream text-ink transition-colors duration-200 hover:bg-copper-50 hover:text-copper-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-copperDeep-500 focus-visible:ring-offset-2 focus-visible:ring-offset-cream"
    >
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        className={isPrev ? '' : 'rotate-180'}
      >
        <polyline points="15 18 9 12 15 6" />
      </svg>
    </button>
  );
}
