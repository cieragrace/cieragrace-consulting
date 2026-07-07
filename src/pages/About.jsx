import SectionWrapper from '../components/SectionWrapper.jsx';
import CTAButton from '../components/CTAButton.jsx';
import usePageMeta from '../hooks/usePageMeta.js';
import seo from '../data/seo.js';

export default function About() {
  usePageMeta(seo['/about'].title, seo['/about'].description);

  return (
    <>
      <section className="container-page pt-20 pb-12 md:pt-32 md:pb-16">
        <div className="max-w-3xl">
          <p className="eyebrow mb-6">About the Studio</p>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl leading-[1.05] text-ink">
            Quiet design.
            <br />
            <span className="italic text-copper-600">Deliberate work.</span>
          </h1>
          <p className="mt-8 text-lg md:text-xl text-ink-400 leading-relaxed">
            Ciera Grace Consulting LLC is a boutique web design and development
            studio. I partner with a small number of clients each year to
            create digital experiences that feel as considered as the businesses
            behind them.
          </p>
        </div>
      </section>

      <SectionWrapper
        id="who"
        eyebrow="Who You're Working With"
        title="I'm Ciera."
      >
        <div className="max-w-prose">
          <p className="mb-5">
            I run Ciera Grace Consulting from Denver, Colorado — a one-woman
            studio.
          </p>
          <p className="mb-5">
            Before this I went through Turing&apos;s software engineering
            program, and by day I&apos;m Director of Production at a Denver
            roofing company, where I built the internal software the whole
            operation runs on — scheduling, invoicing, job costing. That&apos;s
            the lens I bring to client work: websites aren&apos;t decoration,
            they&apos;re operations.
          </p>
          <p className="mb-5">
            When I take your project, I&apos;m the one who designs it, builds
            it, and answers your email.
          </p>
          <p>
            <a
              href="https://github.com/cieragrace"
              target="_blank"
              rel="noopener noreferrer"
              className="text-copper-700 hover:text-copper-800 underline underline-offset-4 decoration-copper-300"
            >
              See the code on GitHub ↗
            </a>
          </p>
        </div>
      </SectionWrapper>

      <SectionWrapper
        id="mission"
        eyebrow="The Mission"
        title="Design that respects the work."
        className="bg-cream-200/60"
      >
        <div className="max-w-prose">
          <p className="mb-5">
            Too many websites get in their own way — over-decorated, over-built,
            over-engineered for problems no one actually has. I take the
            opposite approach. My job is to make your work easier to find,
            easier to understand, and easier to choose.
          </p>
          <p>
            That means clean structure, honest typography, generous whitespace,
            and the discipline to leave things out. The result is a site that
            ages well — and one that you'll still be proud of in three years.
          </p>
        </div>
      </SectionWrapper>

      <SectionWrapper
        id="approach"
        eyebrow="The Approach"
        title="How I work."
        className="bg-lavender-50"
      >
        <div className="grid gap-10 md:gap-12 md:grid-cols-3 max-w-5xl">
          <div>
            <p className="font-serif text-sm text-copper-700 mb-3">01</p>
            <h3 className="font-serif text-2xl text-ink mb-3">Discover</h3>
            <p>
              It starts with a working session to understand your business, your
              audience, and what success actually looks like — beyond the brief.
            </p>
          </div>
          <div>
            <p className="font-serif text-sm text-copper-700 mb-3">02</p>
            <h3 className="font-serif text-2xl text-ink mb-3">Design</h3>
            <p>
              Layouts, type, and structure are designed in iterations — with
              real content, never lorem ipsum. You see the work as it forms.
            </p>
          </div>
          <div>
            <p className="font-serif text-sm text-copper-700 mb-3">03</p>
            <h3 className="font-serif text-2xl text-ink mb-3">Build & Launch</h3>
            <p>
              Hand-coded front-ends, accessible by default, fast on every
              device. After launch, I stick around to help it grow.
            </p>
          </div>
        </div>
      </SectionWrapper>

      <SectionWrapper
        id="different"
        eyebrow="What's Different"
        title="A small practice on purpose."
      >
        <div className="max-w-prose">
          <p className="mb-5">
            I don&apos;t run on velocity for its own sake. Each engagement gets
            direct attention from the person actually designing and building it
            — no handoffs, no account layers, no surprises.
          </p>
          <p className="mb-10">
            I also believe in proportion: not every business needs a
            full-blown commerce platform or custom CMS on day one. I&apos;ll
            tell you what you actually need, and I&apos;ll tell you what you
            don&apos;t.
          </p>

          <CTAButton to="/contact" variant="primary">
            Get in Touch
          </CTAButton>
        </div>
      </SectionWrapper>
    </>
  );
}
