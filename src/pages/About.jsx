import SectionWrapper from '../components/SectionWrapper.jsx';
import CTAButton from '../components/CTAButton.jsx';

export default function About() {
  return (
    <>
      <section className="container-page pt-20 pb-12 md:pt-32 md:pb-16">
        <div className="max-w-3xl">
          <p className="eyebrow mb-6">About the Studio</p>
          <h1 className="font-serif text-5xl md:text-6xl leading-[1.05] text-ink">
            Quiet design.
            <br />
            <span className="italic text-copper-600">Deliberate work.</span>
          </h1>
          <p className="mt-8 text-lg md:text-xl text-ink-400 leading-relaxed">
            Ciera Grace Consulting LLC is a boutique web design and development
            studio. We partner with a small number of clients each year to
            create digital experiences that feel as considered as the businesses
            behind them.
          </p>
        </div>
      </section>

      <SectionWrapper
        id="mission"
        eyebrow="Our Mission"
        title="Design that respects the work."
      >
        <div className="max-w-prose">
          <p className="mb-5">
            Too many websites get in their own way — over-decorated, over-built,
            over-engineered for problems no one actually has. We take the
            opposite approach. Our job is to make your work easier to find,
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
        eyebrow="Our Approach"
        title="How we work."
        className="bg-lavender-50"
      >
        <div className="grid gap-10 md:gap-12 md:grid-cols-3 max-w-5xl">
          <div>
            <p className="font-serif text-sm text-copper-600 mb-3">01</p>
            <h3 className="font-serif text-2xl text-ink mb-3">Discover</h3>
            <p>
              We start with a working session to understand your business, your
              audience, and what success actually looks like — beyond the brief.
            </p>
          </div>
          <div>
            <p className="font-serif text-sm text-copper-600 mb-3">02</p>
            <h3 className="font-serif text-2xl text-ink mb-3">Design</h3>
            <p>
              Layouts, type, and structure are designed in iterations — with
              real content, never lorem ipsum. You see the work as it forms.
            </p>
          </div>
          <div>
            <p className="font-serif text-sm text-copper-600 mb-3">03</p>
            <h3 className="font-serif text-2xl text-ink mb-3">Build & Launch</h3>
            <p>
              Hand-coded front-ends, accessible by default, fast on every
              device. After launch, we stick around to help it grow.
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
            We don't run on velocity for its own sake. Each engagement gets
            direct attention from the person actually designing and building it
            — no handoffs, no account layers, no surprises.
          </p>
          <p className="mb-10">
            We also believe in proportion: not every business needs a
            full-blown commerce platform or custom CMS on day one. We'll tell
            you what you actually need, and we'll tell you what you don't.
          </p>

          <CTAButton to="/contact" variant="primary">
            Get in Touch
          </CTAButton>
        </div>
      </SectionWrapper>
    </>
  );
}
