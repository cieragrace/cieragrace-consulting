import SectionWrapper from '../components/SectionWrapper.jsx';
import CTAButton from '../components/CTAButton.jsx';
import ProjectCard from '../components/ProjectCard.jsx';
import projects from '../data/projects.js';
import usePageMeta from '../hooks/usePageMeta.js';
import seo, { SITE_URL } from '../data/seo.js';

// Structured data for the portfolio: a CollectionPage whose ItemList carries
// every live project with its real URL, repo, and image. Rendered client-side,
// which Google's crawler executes; social scrapers get the static OG tags baked
// at build time by generate-route-html.mjs.
function schemaTypeFor(project) {
  if (project.spotlight) return 'VideoGame';
  return project.kind === 'client' ? 'WebSite' : 'WebApplication';
}

function buildJsonLd(live) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': `${SITE_URL}/work`,
    url: `${SITE_URL}/work`,
    name: seo['/work'].title,
    description: seo['/work'].description,
    author: { '@id': `${SITE_URL}/#person` },
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: live.map((p, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        item: {
          '@type': schemaTypeFor(p),
          name: p.title,
          url: p.liveUrl,
          description: p.description,
          image: p.poster ? SITE_URL + p.poster : undefined,
          author: { '@id': `${SITE_URL}/#person` },
          sameAs: p.repoUrl || undefined,
        },
      })),
    },
  };
}

function ArcadeSpotlight({ project }) {
  return (
    <article
      aria-label={`Featured project: ${project.title}`}
      className="overflow-hidden rounded-3xl bg-ink"
    >
      <div className="grid lg:grid-cols-2">
        <a
          href={project.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Play ${project.title} (opens in a new tab)`}
          className="block"
        >
          <img
            src={project.poster}
            alt={`${project.title} — the arcade hub, five neon game cabinets ready to play`}
            loading="lazy"
            className="h-full w-full object-cover object-top"
          />
        </a>

        <div className="flex flex-col justify-center p-8 md:p-12">
          <p className="text-[0.78rem] font-medium uppercase tracking-[0.14em]">
            <span className="bg-gradient-to-r from-fuchsia-400 to-cyan-300 bg-clip-text text-transparent">
              Featured · {project.category}
            </span>
          </p>
          <h2 className="mt-3 font-serif text-3xl leading-tight text-cream md:text-4xl">
            {project.title}
          </h2>
          <p className="mt-4 leading-relaxed text-cream/70">{project.description}</p>

          <ul className="mt-5 flex flex-wrap gap-2" aria-label="Tech stack">
            {project.stack.map((tech) => (
              <li
                key={tech}
                className="rounded-full bg-cream/10 px-3 py-1 text-xs font-medium text-cream/80"
              >
                {tech}
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3">
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-1.5 rounded-2xl bg-cream px-7 py-3.5 text-sm tracking-wide text-ink transition-colors duration-300 ease-out-soft hover:bg-cream-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
            >
              Play the arcade
              <span aria-hidden="true">↗</span>
              <span className="sr-only">(opens in a new tab)</span>
            </a>
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 py-2 text-sm text-cream/60 transition-colors duration-200 hover:text-cream"
            >
              View the code
              <span aria-hidden="true">↗</span>
              <span className="sr-only">repository (opens in a new tab)</span>
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}

export default function Work() {
  usePageMeta(seo['/work'].title, seo['/work'].description);

  const spotlight = projects.find((p) => p.spotlight);
  const apps = projects.filter((p) => p.kind === 'app' && !p.spotlight);
  const clientSites = projects.filter((p) => p.kind === 'client');
  const live = projects.filter((p) => p.status === 'live');

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildJsonLd(live)) }}
      />

      {/* Page header */}
      <section className="container-page pt-20 pb-12 md:pt-32 md:pb-16">
        <div className="max-w-3xl">
          <p className="eyebrow mb-6">Portfolio</p>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl leading-[1.05] text-ink">
            Work that ships.
            <br />
            <span className="italic text-copper-600">Live, with the code to prove it.</span>
          </h1>
          <p className="mt-8 text-lg md:text-xl text-ink-400 leading-relaxed">
            Full-stack web apps, hand-built browser games, and crafted client
            sites — designed, coded, and deployed end to end by Ciera Muniz, a
            Denver, Colorado designer-developer working in React, Next.js,
            TypeScript, and Astro. Every live project links to its source on
            GitHub.
          </p>
        </div>
      </section>

      {/* Featured: Neon Grid Arcade */}
      {spotlight && (
        <section className="container-page pb-8 md:pb-12" aria-label="Featured project">
          <ArcadeSpotlight project={spotlight} />
        </section>
      )}

      {/* Apps & product builds */}
      <SectionWrapper
        id="apps"
        eyebrow="Product Engineering"
        title="Apps &amp; product builds."
        intro="Software built from scratch — databases, APIs, and interfaces working as one thing. The kind of work that starts with an empty repository."
      >
        <div className="grid gap-10 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {apps.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </div>
      </SectionWrapper>

      {/* Client sites */}
      <SectionWrapper
        id="client-sites"
        eyebrow="Client Work"
        title="Client sites."
        intro="Hand-coded sites for real businesses — no page builders, no templates. Designed around each client's brand and built to convert."
        className="bg-mint-50"
      >
        <div className="grid gap-10 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {clientSites.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </div>
      </SectionWrapper>

      {/* Contact CTA */}
      <SectionWrapper id="work-cta" align="center">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow mb-4">Get In Touch</p>
          <h2 className="font-serif text-4xl md:text-5xl text-ink leading-[1.1]">
            Like what you see?
          </h2>
          <p className="mt-5 text-ink-400 text-lg">
            Whether you need a site like these or want to talk shop about how
            one was built — I answer every note personally.
          </p>
          <div className="mt-8 flex flex-col items-center gap-3">
            <CTAButton to="/contact" variant="primary">
              Start the Conversation
            </CTAButton>
            <a
              href="https://github.com/cieragrace"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-ink-400 transition-colors hover:text-copper-700"
            >
              Browse everything on GitHub ↗
            </a>
          </div>
        </div>
      </SectionWrapper>
    </>
  );
}
