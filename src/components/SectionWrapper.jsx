import { motion } from 'framer-motion';

export default function SectionWrapper({
  id,
  eyebrow,
  title,
  intro,
  children,
  className = '',
  align = 'left',
}) {
  const headerAlign =
    align === 'center' ? 'text-center mx-auto max-w-2xl' : 'max-w-2xl';

  return (
    <section id={id} className={`py-20 md:py-28 ${className}`}>
      <div className="container-page">
        {(eyebrow || title || intro) && (
          <motion.div
            className={`mb-12 md:mb-16 ${headerAlign}`}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            {eyebrow && <p className="eyebrow mb-4">{eyebrow}</p>}
            {title && (
              <h2 className="font-serif text-4xl md:text-5xl leading-[1.1] text-ink">
                {title}
              </h2>
            )}
            {intro && <p className="mt-5 text-base md:text-lg text-ink-400">{intro}</p>}
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          {children}
        </motion.div>
      </div>
    </section>
  );
}
