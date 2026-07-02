import { useEffect, useRef, useState } from 'react';
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from 'framer-motion';
import ProjectCard from './ProjectCard.jsx';

// Responsive: 1 card per view on mobile, 2 from md up.
function usePerView() {
  const [perView, setPerView] = useState(1);
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)');
    const update = () => setPerView(mq.matches ? 2 : 1);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);
  return perView;
}

export default function ProjectsCarousel({ projects = [] }) {
  const reduceMotion = useReducedMotion();
  const perView = usePerView();
  const [page, setPage] = useState(0);
  const [direction, setDirection] = useState(0);
  const regionRef = useRef(null);

  const pageCount = Math.max(1, Math.ceil(projects.length / perView));

  // Clamp current page when perView (and therefore pageCount) changes.
  useEffect(() => {
    setPage((p) => Math.min(p, pageCount - 1));
  }, [pageCount]);

  const goTo = (next) => {
    const clamped = Math.max(0, Math.min(next, pageCount - 1));
    setDirection(clamped > page ? 1 : clamped < page ? -1 : 0);
    setPage(clamped);
  };
  const prev = () => goTo(page - 1);
  const next = () => goTo(page + 1);

  const onKeyDown = (e) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      prev();
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      next();
    }
  };

  const start = page * perView;
  const visible = projects.slice(start, start + perView);

  const slideVariants = {
    enter: (dir) => ({ opacity: 0, x: reduceMotion ? 0 : dir > 0 ? 48 : -48 }),
    center: { opacity: 1, x: 0 },
    exit: (dir) => ({ opacity: 0, x: reduceMotion ? 0 : dir > 0 ? -48 : 48 }),
  };

  const atStart = page === 0;
  const atEnd = page === pageCount - 1;

  return (
    <div
      ref={regionRef}
      role="region"
      aria-roledescription="carousel"
      aria-label="Selected work"
      onKeyDown={onKeyDown}
      className="relative"
    >
      <div className="overflow-hidden">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={page}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: reduceMotion ? 0 : 0.45, ease: [0.22, 1, 0.36, 1] }}
            drag={reduceMotion ? false : 'x'}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.12}
            onDragEnd={(_, info) => {
              const threshold = 60;
              if (info.offset.x < -threshold) next();
              else if (info.offset.x > threshold) prev();
            }}
            className="grid gap-6 md:gap-7 md:grid-cols-2"
            aria-live="polite"
          >
            {visible.map((project) => {
              const absoluteIndex = projects.indexOf(project);
              return (
                <div
                  key={`${project.title}-${absoluteIndex}`}
                  role="group"
                  aria-roledescription="slide"
                  aria-label={`${absoluteIndex + 1} of ${projects.length}`}
                  className="min-w-0"
                >
                  <ProjectCard project={project} index={absoluteIndex} />
                </div>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Controls */}
      <div className="mt-8 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={prev}
            disabled={atStart}
            aria-label="Previous projects"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-copper-200 bg-cream text-ink transition-colors duration-200 hover:bg-copper-50 hover:text-copper-700 disabled:opacity-35 disabled:pointer-events-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-copperDeep-500 focus-visible:ring-offset-2 focus-visible:ring-offset-cream"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
          <button
            type="button"
            onClick={next}
            disabled={atEnd}
            aria-label="Next projects"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-copper-200 bg-cream text-ink transition-colors duration-200 hover:bg-copper-50 hover:text-copper-700 disabled:opacity-35 disabled:pointer-events-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-copperDeep-500 focus-visible:ring-offset-2 focus-visible:ring-offset-cream"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>

        {/* Pagination dots */}
        <div className="flex items-center gap-2.5" aria-label="Choose slide">
          {Array.from({ length: pageCount }).map((_, i) => {
            const active = i === page;
            return (
              <button
                key={i}
                type="button"
                onClick={() => goTo(i)}
                aria-label={`Go to slide ${i + 1} of ${pageCount}`}
                aria-current={active ? 'true' : undefined}
                className="group flex h-11 min-w-[24px] items-center justify-center rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-copperDeep-500 focus-visible:ring-offset-2 focus-visible:ring-offset-cream"
              >
                <span
                  className={[
                    'h-2.5 rounded-full transition-all duration-300 ease-out-soft',
                    active ? 'w-7 bg-copper-500' : 'w-2.5 bg-copper-200 group-hover:bg-copper-300',
                  ].join(' ')}
                />
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
