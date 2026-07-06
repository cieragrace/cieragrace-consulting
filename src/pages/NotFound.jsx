import CTAButton from '../components/CTAButton.jsx';
import usePageMeta from '../hooks/usePageMeta.js';

export default function NotFound() {
  usePageMeta(
    'Page not found — Ciera Grace Consulting',
    "That page doesn't exist. Head back to the Ciera Grace Consulting homepage."
  );

  return (
    <section className="container-page pt-24 pb-32 md:pt-36 md:pb-40">
      <div className="max-w-2xl">
        <p className="eyebrow mb-6">404 — Page Not Found</p>
        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl leading-[1.05] text-ink">
          This page seems to have
          <br />
          <span className="italic text-copper-600">wandered off.</span>
        </h1>
        <p className="mt-8 text-lg text-ink-400 leading-relaxed max-w-md">
          The address you followed doesn't exist — or doesn't anymore.
          Everything worth seeing is just a step away.
        </p>
        <div className="mt-10">
          <CTAButton to="/" variant="primary">
            Back to Home
          </CTAButton>
        </div>
      </div>
    </section>
  );
}
