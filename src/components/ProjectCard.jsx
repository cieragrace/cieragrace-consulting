// ProjectCard — one project in the /work grids. Everything a skimming reader
// needs is visible without interaction: poster, category, title, story, stack,
// live + code links. Semantic <article> so the whole grid stays crawlable.

export default function ProjectCard({ project }) {
  const isLive = project.status === 'live';

  return (
    <article className="flex h-full flex-col">
      <div className="aspect-[16/10] overflow-hidden rounded-2xl border border-copper-100 bg-ink">
        {project.poster ? (
          <img
            src={project.poster}
            alt={`${project.title} — ${project.category.toLowerCase()}`}
            loading="lazy"
            className="h-full w-full object-cover object-top"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-cream-200 to-copper-50 text-copperDeep-600">
            <span className="font-serif text-xl italic">In the workshop</span>
          </div>
        )}
      </div>

      <div className="mt-5 flex flex-1 flex-col">
        <p className="eyebrow !text-copper-700">{project.category}</p>
        <h3 className="mt-2 font-serif text-2xl leading-tight text-ink">
          {project.title}
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-ink-400">
          {project.description}
        </p>

        {project.stack?.length > 0 && (
          <ul className="mt-4 flex flex-wrap gap-2" aria-label="Tech stack">
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

        {isLive && (
          <div className="mt-auto flex items-center gap-5 pt-5 text-sm">
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-copper-700 transition-colors duration-200 hover:text-copper-800"
            >
              View live <span aria-hidden="true">↗</span>
              <span className="sr-only">(opens in a new tab)</span>
            </a>
            {project.repoUrl && (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-ink-400 transition-colors duration-200 hover:text-copper-700"
              >
                Code <span aria-hidden="true">↗</span>
                <span className="sr-only">repository (opens in a new tab)</span>
              </a>
            )}
          </div>
        )}
      </div>
    </article>
  );
}
