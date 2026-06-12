import { Link } from 'react-router-dom';
import Hero from '../components/Hero.jsx';
import SectionWrapper from '../components/SectionWrapper.jsx';
import ServiceCard from '../components/ServiceCard.jsx';
import ProjectsCarousel from '../components/ProjectsCarousel.jsx';
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
        title="What we build."
        intro="A focused set of services — designed to do a few things exceptionally well rather than everything at once."
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
      <SectionWrapper
        id="work"
        eyebrow="Selected Work"
        title="Things we've shipped."
        intro="A small, growing shelf of real builds — full-stack apps and considered client sites."
      >
        <ProjectsCarousel projects={projects} />
      </SectionWrapper>

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
