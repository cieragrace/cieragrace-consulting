import { motion } from 'framer-motion';

// Mirrors ServiceCard's rotating pastel tints so cards feel native.
const tints = [
  { bg: 'bg-blush-50', border: 'border-blush-200', accent: 'text-copper-600', chip: 'bg-blush-100 text-copperDeep-600' },
  { bg: 'bg-peach-50', border: 'border-peach-200', accent: 'text-copperDeep-500', chip: 'bg-peach-100 text-copperDeep-600' },
  { bg: 'bg-mint-50', border: 'border-mint-200', accent: 'text-copper-600', chip: 'bg-mint-100 text-mint-800' },
  { bg: 'bg-lavender-50', border: 'border-lavender-200', accent: 'text-copperDeep-500', chip: 'bg-lavender-100 text-lavender-800' },
  { bg: 'bg-copper-50', border: 'border-copper-200', accent: 'text-copper-600', chip: 'bg-copper-100 text-copperDeep-600' },
];

export default function ProjectCard({ project, index = 0 }) {
  const tint = tints[index % tints.length];
  const isLive = project.status === 'live';

  return (
    <article
      className={`${tint.bg} h-full flex flex-col rounded-2xl p-8 md:p-10 border ${tint.border}`}
    >
      <div className="flex items-center justify-between gap-3 mb-4">
        <span className={`eyebrow ${tint.accent} !text-copper-600`}>
          {project.category}
        </span>
        {!isLive && (
          <span className="inline-flex items-center rounded-full bg-cream-200 border border-copper-100 px-3 py-1 text-[0.7rem] font-medium uppercase tracking-[0.14em] text-ink-400">
            Coming soon
          </span>
        )}
      </div>

      <h3 className="font-serif text-2xl md:text-[1.65rem] text-ink leading-tight mb-3">
        {project.title}
      </h3>

      <p className="text-ink-400 leading-relaxed">{project.description}</p>

      {project.stack?.length > 0 && (
        <ul className="mt-5 flex flex-wrap gap-2" aria-label="Tech stack">
          {project.stack.map((tech) => (
            <li
              key={tech}
              className={`rounded-full px-3 py-1 text-xs font-medium ${tint.chip}`}
            >
              {tech}
            </li>
          ))}
        </ul>
      )}

      <div className="mt-auto pt-7">
        {isLive ? (
          <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
            <motion.a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="inline-flex items-center justify-center gap-1.5 px-7 py-3.5 text-sm tracking-wide rounded-2xl bg-copper-500 text-cream transition-colors duration-300 ease-out-soft hover:bg-copperDeep-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-copperDeep-500 focus-visible:ring-offset-2 focus-visible:ring-offset-cream"
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
                className="inline-flex items-center gap-1.5 text-sm text-ink-400 hover:text-copper-600 transition-colors duration-200 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-copperDeep-500 focus-visible:ring-offset-2 focus-visible:ring-offset-cream"
              >
                Code
                <span aria-hidden="true">↗</span>
                <span className="sr-only">repository (opens in a new tab)</span>
              </a>
            )}
          </div>
        ) : (
          <p className="text-sm italic text-ink-400">In the workshop — check back soon.</p>
        )}
      </div>
    </article>
  );
}
