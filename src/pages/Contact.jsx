import { motion } from 'framer-motion';
import ContactForm from '../components/ContactForm.jsx';

export default function Contact() {
  return (
    <section className="container-page pt-20 pb-24 md:pt-32 md:pb-32">
      <div className="grid gap-14 lg:gap-20 lg:grid-cols-2">
        {/* Left — copy + direct contact */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="eyebrow mb-6">Contact</p>
          <h1 className="font-serif text-5xl md:text-6xl leading-[1.05] text-ink">
            Let's talk about
            <br />
            <span className="italic text-copper-600">your project.</span>
          </h1>
          <p className="mt-8 text-lg text-ink-400 leading-relaxed max-w-md">
            Share a little about what you're building or rebuilding. I'll respond
            within one business day with next steps or a few questions.
          </p>

          <div className="mt-12 space-y-6">
            <div>
              <p className="eyebrow mb-2">Email</p>
              <a
                href="mailto:cieragraceconsulting@gmail.com"
                className="text-ink hover:text-copper-600 transition-colors"
              >
                cieragraceconsulting@gmail.com
              </a>
            </div>
            <div>
              <p className="eyebrow mb-2">Phone</p>
              <a
                href="tel:+13036567380"
                className="text-ink hover:text-copper-600 transition-colors"
              >
                (303) 656-7380
              </a>
            </div>
            <div>
              <p className="eyebrow mb-2">Where</p>
              <p className="text-ink">
                Colorado-based —{' '}
                <span className="italic text-copper-600">creating for you anywhere.</span>
              </p>
            </div>
            <div>
              <p className="eyebrow mb-2">Studio Hours</p>
              <p className="text-ink">Monday – Friday, 9am – 5pm MT</p>
            </div>
          </div>
        </motion.div>

        {/* Right — form */}
        <div className="bg-cream-50 rounded-2xl p-8 md:p-10 shadow-soft border border-copper-100">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
