import { motion } from 'framer-motion';
import CTAButton from './CTAButton.jsx';

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-br from-copper-100 via-blush-100 to-peach-100"
      />
      <div
        aria-hidden="true"
        className="absolute -top-32 -right-32 w-[40rem] h-[40rem] rounded-full bg-lavender-200/50 blur-3xl -z-10"
      />

      <div className="container-page pt-20 pb-24 md:pt-32 md:pb-36 lg:pt-40 lg:pb-44">
        <div className="max-w-4xl">
          <motion.p
            className="eyebrow mb-6"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            Colorado-based · Creating for you anywhere
          </motion.p>

          <motion.h1
            className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.05] text-ink"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
          >
            Thoughtful websites,
            <br />
            <span className="italic text-copper-600">crafted with intention.</span>
          </motion.h1>

          <motion.p
            className="mt-8 text-lg md:text-xl text-ink-400 max-w-2xl leading-relaxed"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
          >
            Ciera Grace Consulting designs and builds custom digital experiences
            for founders who care about how their work shows up — every pixel,
            every interaction, every word.
          </motion.p>

          <motion.div
            className="mt-10 flex flex-wrap gap-4"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.25 }}
          >
            <CTAButton to="/contact" variant="primary">
              Start Your Project
            </CTAButton>
            <CTAButton to="/about" variant="secondary">
              About the Studio
            </CTAButton>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
