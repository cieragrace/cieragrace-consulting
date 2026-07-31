import { motion } from 'framer-motion';

// One quiet treatment for every card — the numbered serif label carries the
// personality; no rotating tints, no stacked effects.
export default function ServiceCard({ title, description, index = 0 }) {
  return (
    <motion.article
      className="bg-cream-50 rounded-2xl p-8 md:p-10 border border-copper-100"
      initial={{ y: 16 }}
      whileInView={{ y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{
        duration: 0.55,
        ease: [0.22, 1, 0.36, 1],
        delay: index * 0.08,
      }}
    >
      <div className="flex items-baseline gap-3 mb-4">
        <span className="font-serif text-sm text-copper-700">
          0{index + 1}
        </span>
      </div>
      <h3 className="font-serif text-2xl md:text-[1.65rem] text-ink leading-tight mb-3">
        {title}
      </h3>
      <p className="text-ink-400 leading-relaxed">{description}</p>
    </motion.article>
  );
}
