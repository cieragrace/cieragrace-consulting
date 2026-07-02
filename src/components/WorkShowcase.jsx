import { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';

// Clean page-only preview: shows the looping interaction clip, falling back to
// the static poster screenshot, falling back to a soft placeholder.
function Preview({ project, placeholderClass, reduceMotion }) {
  const isLive = project.status === 'live';

  if (!isLive || (!project.clip && !project.poster)) {
    return (
      <div className={`flex h-full w-full items-center justify-center bg-gradient-to-br ${placeholderClass}`}>
        <span className="font-serif text-2xl italic">In the workshop</span>
      </div>
    );
  }

  return (
    <video
      key={project.clip || project.poster}
      aria-label={`Preview of ${project.title}`}
      className="h-full w-full object-cover object-top"
      poster={project.poster || undefined}
      autoPlay={!reduceMotion}
      loop
      muted
      playsInline
      preload="metadata"
    >
      {project.clip && <source src={project.clip} type="video/mp4" />}
    </video>
  );
}

export default function WorkShowcase({
  projects = [],
  eyebrow = 'Selected Work',
  title = "Things we've shipped.",
  intro = '',
  dark = false,
}) {
  const reduceMotion = useReducedMotion();
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState(0); // 1 = down/next, -1 = up/prev
  const count = projects.length;

  // Theme tokens — light (default) vs moody dark treatment.
  const t = dark
    ? {
        eyebrow: '!text-copper-300',
        title: 'text-cream',
        intro: 'text-ink-100',
        navIdleText: 'text-ink-200 group-hover:text-cream',
        navActiveText: 'text-cream',
        navActiveLine: 'bg-copper-400',
        navIdleLine: 'bg-copper-800 group-hover:bg-copper-600',
        stageBorder: 'border-ink-600 shadow-[0_20px_60px_rgba(0,0,0,0.45)]',
        metaDesc: 'text-ink-100',
        chip: 'bg-ink-700 text-copper-200',
        codeLink: 'text-ink-200 hover:text-copper-300',
        soonChip: 'bg-ink-700 border-ink-600 text-ink-200',
        arrow:
          'border-ink-600 bg-ink-700 text-cream hover:bg-ink-600 hover:text-copper-300 focus-visible:ring-offset-ink-800',
        placeholder: 'from-ink-700 to-ink-800 text-copper-300/80',
      }
    : {
        eyebrow: '!text-copper-700',
        title: 'text-ink',
        intro: 'text-ink-400',
        navIdleText: 'text-ink-400 group-hover:text-ink',
        navActiveText: 'text-ink',
        navActiveLine: 'bg-copper-500',
        navIdleLine: 'bg-copper-200 group-hover:bg-copper-300',
        stageBorder: 'border-copper-100 shadow-soft',
        metaDesc: 'text-ink-400',
        chip: 'bg-copper-50 text-copperDeep-600',
        codeLink: 'text-ink-400 hover:text-copper-600',
        soonChip: 'bg-cream-200 border-copper-100 text-ink-400',
        arrow:
          'border-copper-200 bg-cream text-ink hover:bg-copper-50 hover:text-copper-700 focus-visible:ring-offset-cream',
        placeholder: 'from-cream-200 to-copper-50 text-copperDeep-600',
      };

  const goTo = (next) => {
    const clamped = (next + count) % count;
    setDirection(clamped > active || (active === count - 1 && clamped === 0) ? 1 : -1);
    setActive(clamped);
  };
  const prev = () => goTo(active - 1);
  const next = () => goTo(active + 1);

  const onKeyDown = (e) => {
    if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
      e.preventDefault();
      prev();
    } else if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
      e.preventDefault();
      next();
    }
  };

  const project = projects[active];

  const slide = {
    enter: (dir) => ({ opacity: 0, y: reduceMotion ? 0 : dir > 0 ? 40 : -40 }),
    center: { opacity: 1, y: 0 },
    exit: (dir) => ({ opacity: 0, y: reduceMotion ? 0 : dir > 0 ? -40 : 40 }),
  };

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label="Selected work"
      onKeyDown={onKeyDown}
      className="grid items-start gap-12 lg:grid-cols-12 lg:gap-16"
    >
      {/* RIGHT — header + vertical project nav (source-order first for heading order) */}
      <div className="order-1 lg:order-2 lg:col-span-5 lg:sticky lg:top-28 lg:max-h-[calc(100dvh-8rem)] lg:overflow-y-auto">
        {eyebrow && <p className={`eyebrow mb-4 ${t.eyebrow}`}>{eyebrow}</p>}
        {title && (
          <h2 className={`font-serif text-4xl leading-[1.1] md:text-5xl ${t.title}`}>{title}</h2>
        )}
        {intro && <p className={`mt-5 text-base md:text-lg ${t.intro}`}>{intro}</p>}

        <ul className="mt-9 hidden flex-col lg:flex" aria-label="Choose project">
          {projects.map((p, i) => {
            const isActive = i === active;
            return (
              <li key={`${p.title}-${i}`}>
                <button
                  type="button"
                  onClick={() => goTo(i)}
                  aria-current={isActive ? 'true' : undefined}
                  className="group flex w-full items-center gap-4 py-3 text-left focus-visible:outline-none"
                >
                  <span
                    className={[
                      'h-px w-8 shrink-0 transition-all duration-300 ease-out-soft',
                      isActive ? `w-12 ${t.navActiveLine}` : t.navIdleLine,
                    ].join(' ')}
                  />
                  <span
                    className={[
                      'font-serif text-xl transition-colors duration-300 ease-out-soft',
                      isActive ? t.navActiveText : t.navIdleText,
                    ].join(' ')}
                  >
                    {p.title}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      {/* LEFT — vertical clip carousel */}
      <div className="order-2 lg:order-1 lg:col-span-7">
        <div className="flex items-stretch gap-4">
          {/* Up / down controls (desktop) */}
          <div className="hidden shrink-0 flex-col justify-center gap-3 lg:flex">
            <NavArrow dir="up" onClick={prev} cls={t.arrow} />
            <NavArrow dir="down" onClick={next} cls={t.arrow} />
          </div>

          <div className="min-w-0 flex-1">
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
                  drag={reduceMotion ? false : 'y'}
                  dragConstraints={{ top: 0, bottom: 0 }}
                  dragElastic={0.12}
                  onDragEnd={(_, info) => {
                    const th = 50;
                    if (info.offset.y < -th) next();
                    else if (info.offset.y > th) prev();
                  }}
                  aria-live="polite"
                >
                  {/* Clip stage */}
                  <div className={`aspect-[16/10] overflow-hidden rounded-3xl border bg-ink ${t.stageBorder}`}>
                    <Preview project={project} placeholderClass={t.placeholder} reduceMotion={reduceMotion} />
                  </div>

                  {/* Meta */}
                  <div className="mt-7">
                    <div className="flex items-center gap-3">
                      <span className={`eyebrow ${t.eyebrow}`}>{project.category}</span>
                      {project.status !== 'live' && (
                        <span className={`inline-flex items-center rounded-full border px-3 py-1 text-[0.7rem] font-medium uppercase tracking-[0.14em] ${t.soonChip}`}>
                          Coming soon
                        </span>
                      )}
                    </div>

                    <h3 className={`mt-3 font-serif text-3xl leading-tight md:text-4xl ${t.title}`}>
                      {project.title}
                    </h3>
                    <p className={`mt-3 max-w-xl leading-relaxed ${t.metaDesc}`}>
                      {project.description}
                    </p>

                    {project.stack?.length > 0 && (
                      <ul className="mt-5 flex flex-wrap gap-2" aria-label="Tech stack">
                        {project.stack.map((tech) => (
                          <li key={tech} className={`rounded-full px-3 py-1 text-xs font-medium ${t.chip}`}>
                            {tech}
                          </li>
                        ))}
                      </ul>
                    )}

                    {project.status === 'live' && (
                      <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3">
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
                            className={`inline-flex items-center gap-1.5 rounded-md py-2 text-sm transition-colors duration-200 ${t.codeLink}`}
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

            {/* Mobile controls */}
            <div className="mt-7 flex items-center gap-4 lg:hidden">
              <NavArrow dir="up" onClick={prev} cls={t.arrow} label="Previous project" />
              <NavArrow dir="down" onClick={next} cls={t.arrow} label="Next project" />
              <span className={`text-sm ${t.metaDesc}`}>
                {active + 1} / {count}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function NavArrow({ dir, onClick, label, cls }) {
  const isUp = dir === 'up';
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label || (isUp ? 'Previous project' : 'Next project')}
      className={`inline-flex h-11 w-11 items-center justify-center rounded-full border transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-copperDeep-500 focus-visible:ring-offset-2 ${cls}`}
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
        className={isUp ? '' : 'rotate-180'}
      >
        <polyline points="18 15 12 9 6 15" />
      </svg>
    </button>
  );
}
