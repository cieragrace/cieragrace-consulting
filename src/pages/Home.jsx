import { Link } from 'react-router-dom';
import Hero from '../components/Hero.jsx';
import SectionWrapper from '../components/SectionWrapper.jsx';
import ServiceCard from '../components/ServiceCard.jsx';
import WorkShowcase from '../components/WorkShowcase.jsx';
import PremiumTierSection from '../components/PremiumTierSection.jsx';
import CTAButton from '../components/CTAButton.jsx';
import services from '../data/services.js';
import projects from '../data/projects.js';

export default function Home() {
  return (
    <>
      <Hero />

      {/* About preview */}
      <SectionWrapper
        id="about-preview"
        eyebrow="The Studio"
        title="A small studio with a focused practice."
        intro="Ciera Grace Consulting LLC is a one-woman web design studio working with founders, creatives, and service-led businesses who want their digital presence to match the quality of their work."
      >
        <Link
          to="/about"
          className="inline-flex items-center gap-2 text-sm text-ink hover:text-copper-600 transition-colors duration-200"
        >
          Read more about the studio
          <span aria-hidden="true">→</span>
        </Link>
      </SectionWrapper>

      {/* Services */}
      <SectionWrapper
        id="services"
        eyebrow="Services"
        title="What we do."
        intro="From your website to your logo, your strategy to your documents — a connected set of services that keep your business looking and working its best."
        className="bg-mint-50"
      >
        <div className="grid gap-6 md:gap-7 sm:grid-cols-2">
          {services.map((service, i) => (
            <ServiceCard
              key={service.title}
              title={service.title}
              description={service.description}
              index={i}
            />
          ))}
        </div>
      </SectionWrapper>

      {/* Selected Work */}
      <section id="work" className="py-20 md:py-28">
        <div className="container-page">
          <WorkShowcase
            projects={projects}
            eyebrow="Selected Work"
            title="Things we've shipped."
            intro="A small, growing shelf of real builds — full-stack apps and hand-crafted client sites."
          />
        </div>
      </section>

      {/* Premium Build Options */}
      <PremiumTierSection />

      {/* Contact CTA */}
      <SectionWrapper id="contact-cta" align="center">
        <div className="max-w-2xl mx-auto text-center">
          <p className="eyebrow mb-4">Get In Touch</p>
          <h2 className="font-serif text-4xl md:text-5xl text-ink leading-[1.1]">
            Have a project in mind?
          </h2>
          <p className="mt-5 text-ink-400 text-lg">
            We're currently booking new engagements. Send a note with a little
            about your work and we'll be in touch within one business day.
          </p>

          <div className="mt-8 flex flex-col items-center gap-3">
            <CTAButton to="/contact" variant="primary">
              Start the Conversation
            </CTAButton>
            <a
              href="mailto:cieragraceconsulting@gmail.com"
              className="text-sm text-ink-400 hover:text-ink transition-colors"
            >
              or email cieragraceconsulting@gmail.com
            </a>
            <p className="text-xs text-ink-400 italic mt-2">
              Colorado-based · creating beautifully for clients anywhere.
            </p>
          </div>
        </div>
      </SectionWrapper>
    </>
  );
}
