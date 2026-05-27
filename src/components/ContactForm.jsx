import { useState } from 'react';
import { motion } from 'framer-motion';
import CTAButton from './CTAButton.jsx';

const initialState = {
  name: '',
  email: '',
  phone: '',
  message: '',
};

export default function ContactForm() {
  const [form, setForm] = useState(initialState);
  const [status, setStatus] = useState('idle'); // 'idle' | 'submitting' | 'success' | 'error'
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    if (!form.name.trim()) return 'Please enter your name.';
    if (!form.email.trim()) return 'Please enter your email.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      return 'Please enter a valid email address.';
    if (!form.message.trim()) return 'Please include a short message.';
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    const validationError = validate();
    if (validationError) {
      setStatus('error');
      setErrorMessage(validationError);
      return;
    }

    setStatus('submitting');

    try {
      // ============================================================
      // TODO: integrate email service
      // ------------------------------------------------------------
      // Swap this block for a real call when ready. Examples:
      //
      //   Formspree:
      //     await fetch('https://formspree.io/f/{your-id}', {
      //       method: 'POST',
      //       headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      //       body: JSON.stringify(form),
      //     });
      //
      //   Resend (via your own API route):
      //     await fetch('/api/contact', {
      //       method: 'POST',
      //       headers: { 'Content-Type': 'application/json' },
      //       body: JSON.stringify(form),
      //     });
      //
      // The payload shape (`form`) already matches what most services expect.
      // ============================================================
      console.log('[ContactForm] Submitted payload:', form);
      await new Promise((resolve) => setTimeout(resolve, 900));

      setStatus('success');
      setForm(initialState);
    } catch (err) {
      console.error('[ContactForm] Submission failed:', err);
      setStatus('error');
      setErrorMessage('Something went wrong. Please try again or email us directly.');
    }
  };

  const inputBase =
    'w-full px-4 py-3.5 bg-cream border border-copper-100 rounded-2xl text-ink placeholder:text-ink-400/60 focus:outline-none focus:border-copper-500 transition-colors duration-200';

  return (
    <motion.form
      onSubmit={handleSubmit}
      noValidate
      className="space-y-5"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <div>
        <label htmlFor="name" className="block text-sm text-ink mb-2">
          Name <span className="text-copper-600">*</span>
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          value={form.name}
          onChange={handleChange}
          placeholder="Your full name"
          className={inputBase}
          autoComplete="name"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm text-ink mb-2">
          Email <span className="text-copper-600">*</span>
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          value={form.email}
          onChange={handleChange}
          placeholder="you@domain.com"
          className={inputBase}
          autoComplete="email"
        />
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm text-ink mb-2">
          Phone <span className="text-ink-400 text-xs">(optional)</span>
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          value={form.phone}
          onChange={handleChange}
          placeholder="(555) 555-0100"
          className={inputBase}
          autoComplete="tel"
        />
      </div>

      <div>
        <label htmlFor="message" className="block text-sm text-ink mb-2">
          Message <span className="text-copper-600">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          value={form.message}
          onChange={handleChange}
          placeholder="Tell us a little about your project, timeline, and goals."
          className={`${inputBase} resize-y min-h-[140px]`}
        />
      </div>

      {status === 'error' && errorMessage && (
        <p role="alert" className="text-sm text-red-700">
          {errorMessage}
        </p>
      )}

      {status === 'success' && (
        <p role="status" className="text-sm text-ink">
          Thank you — your message is in. We'll reply within one business day.
        </p>
      )}

      <div className="pt-2">
        <CTAButton
          type="submit"
          variant="primary"
          onClick={undefined}
          disabled={status === 'submitting'}
          aria-busy={status === 'submitting'}
        >
          {status === 'submitting' ? 'Sending…' : 'Send Message'}
        </CTAButton>
      </div>
    </motion.form>
  );
}
