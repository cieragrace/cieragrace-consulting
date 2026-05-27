import { motion } from 'framer-motion';
import SectionWrapper from './SectionWrapper.jsx';
import premiumOptions from '../data/premiumOptions.js';

export default function PremiumTierSection() {
  return (
    <SectionWrapper
      id="premium"
      eyebrow="Premium Build Options"
      title="Upgrades for when the standard build isn't enough."
      intro="Every project starts with a strong foundation. When the work calls for more — commerce, authentication, recurring revenue, real-time data — these are the systems we layer in."
      className="bg-blush-50"
    >
      <div className="grid gap-5 md:gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {premiumOptions.map((option, i) => (
          <motion.div
            key={option.title}
            className="bg-cream rounded-2xl p-7 md:p-8 border border-copper-100"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{
              duration: 0.5,
              ease: [0.22, 1, 0.36, 1],
              delay: i * 0.06,
            }}
          >
            <h3 className="font-serif text-xl md:text-2xl text-ink mb-2">
              {option.title}
            </h3>
            <p className="text-sm md:text-base text-ink-400 leading-relaxed">
              {option.description}
            </p>
          </motion.div>
        ))}
      </div>

      <p className="mt-12 text-sm text-ink-400 max-w-xl">
        Premium options are scoped on a per-project basis. Reach out and we'll
        walk through what fits your roadmap.
      </p>
    </SectionWrapper>
  );
}
