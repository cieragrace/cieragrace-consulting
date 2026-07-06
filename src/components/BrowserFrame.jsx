// BrowserFrame — presents a project's clip/poster inside a subtle browser-chrome
// frame: slim top bar (three muted dots + URL pill with the project's real domain)
// above the media stage. Premium and quiet, not skeuomorphic-heavy.

function domainFor(project) {
  if (!project.liveUrl) return null;
  try {
    return new URL(project.liveUrl).hostname.replace(/^www\./, '');
  } catch {
    return null;
  }
}

// One descriptive line per project, derived from its description
// ("AP Tracker — an accounts-payable tracker that turns invoice chaos into one clean dashboard").
function altLine(project) {
  const d = project.description || '';
  const cuts = [' — ', '. ']
    .map((s) => d.indexOf(s))
    .filter((i) => i !== -1);
  const clause = d.slice(0, cuts.length ? Math.min(...cuts) : d.length).trim().replace(/[.,;]$/, '');
  if (!clause) return project.title;
  return `${project.title} — ${clause.charAt(0).toLowerCase()}${clause.slice(1)}`;
}

function Preview({ project, reduceMotion }) {
  const description = altLine(project);

  if (project.status !== 'live' || (!project.clip && !project.poster)) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-cream-200 to-copper-50 text-copperDeep-600">
        <span className="font-serif text-2xl italic">In the workshop</span>
      </div>
    );
  }

  if (!project.clip) {
    return (
      <img
        src={project.poster}
        alt={description}
        loading="lazy"
        className="h-full w-full object-cover object-top"
      />
    );
  }

  return (
    <video
      key={project.clip}
      aria-label={description}
      className="h-full w-full object-cover object-top"
      poster={project.poster || undefined}
      autoPlay={!reduceMotion}
      loop
      muted
      playsInline
      preload="metadata"
    >
      <source src={project.clip} type="video/mp4" />
    </video>
  );
}

export default function BrowserFrame({ project, reduceMotion }) {
  const domain = domainFor(project);

  return (
    <figure className="overflow-hidden rounded-2xl border border-copper-100 bg-cream-50 shadow-soft">
      {/* Chrome bar */}
      <div className="flex items-center gap-3 border-b border-copper-100 bg-ink-50/70 px-4 py-2.5">
        <span className="flex shrink-0 gap-1.5" aria-hidden="true">
          <span className="h-2.5 w-2.5 rounded-full bg-ink-200" />
          <span className="h-2.5 w-2.5 rounded-full bg-ink-200" />
          <span className="h-2.5 w-2.5 rounded-full bg-ink-200" />
        </span>
        <span className="flex min-w-0 flex-1 justify-center">
          <span
            className={[
              'max-w-full truncate rounded-full border border-copper-100/80 bg-cream-50 px-4 py-1 text-xs tracking-wide',
              domain ? 'text-ink-400' : 'italic text-ink-300',
            ].join(' ')}
          >
            {domain || 'a new address, soon'}
          </span>
        </span>
        <span className="hidden w-[38px] shrink-0 sm:block" aria-hidden="true" />
      </div>

      {/* Media stage */}
      <div className="aspect-[16/10] bg-ink">
        <Preview project={project} reduceMotion={reduceMotion} />
      </div>
    </figure>
  );
}
