import { motion } from 'framer-motion';

// Rotating pastel tints for the "fun but tasteful" feel.
// One effect per card (tinted bg) — no stacked shadow + ring + hover wash.
const tints = [
  { bg: 'bg-blush-50', border: 'border-blush-200', accent: 'text-copper-600' },
  { bg: 'bg-peach-50', border: 'border-peach-200', accent: 'text-copperDeep-500' },
  { bg: 'bg-mint-50', border: 'border-mint-200', accent: 'text-copper-600' },
  { bg: 'bg-lavender-50', border: 'border-lavender-200', accent: 'text-copperDeep-500' },
];

export default function ServiceCard({ title, description, index = 0 }) {
  const tint = tints[index % tints.length];

  return (
    <motion.article
      className={`${tint.bg} rounded-2xl p-8 md:p-10 border ${tint.border}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{
        duration: 0.55,
        ease: [0.22, 1, 0.36, 1],
        delay: index * 0.08,
      }}
    >
      <div className="flex items-baseline gap-3 mb-4">
        <span className={`font-serif text-sm ${tint.accent}`}>
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
