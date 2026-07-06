import { useState } from 'react';
import { motion } from 'framer-motion';
import CTAButton from './CTAButton.jsx';

const initialState = {
  name: '',
  email: '',
  phone: '',
  message: '',
  botcheck: '', // honeypot — real users never fill this
};

export default function ContactForm() {
  const [form, setForm] = useState(initialState);
  const [status, setStatus] = useState('idle'); // 'idle' | 'submitting' | 'success' | 'error'
  const [errorMessage, setErrorMessage] = useState('');
  const [invalidField, setInvalidField] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    if (!form.name.trim()) return { field: 'name', message: 'Please enter your name.' };
    if (!form.email.trim()) return { field: 'email', message: 'Please enter your email.' };
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      return { field: 'email', message: 'Please enter a valid email address.' };
    if (!form.message.trim())
      return { field: 'message', message: 'Please include a short message.' };
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setInvalidField(null);

    const validationError = validate();
    if (validationError) {
      setStatus('error');
      setErrorMessage(validationError.message);
      setInvalidField(validationError.field);
      // Move focus to the first invalid field (WCAG 3.3.1)
      document.getElementById(validationError.field)?.focus();
      return;
    }

    setStatus('submitting');

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: 'e2565b2d-0a79-4a39-93dd-03ae015b9b48',
          subject: 'New inquiry — cieragrace.com',
          from_name: 'CGC Website',
          ...form,
        }),
      });
      const result = await response.json().catch(() => null);

      if (!response.ok || !result?.success) {
        throw new Error(result?.message || `Request failed with status ${response.status}`);
      }

      setStatus('success');
      setForm(initialState);
    } catch (err) {
      console.error('[ContactForm] Submission failed:', err);
      setStatus('error');
      setErrorMessage('Something went wrong sending your message — your note is still here below.');
    }
  };

  const inputBase =
    'w-full px-4 py-3.5 bg-cream border border-copper-100 rounded-2xl text-ink placeholder:text-ink-400 focus:outline-none focus:border-copper-500 focus:ring-2 focus:ring-copperDeep-500/40 transition-colors duration-200';

  return (
    <motion.form
      onSubmit={handleSubmit}
      noValidate
      className="space-y-5"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Honeypot (Web3Forms spam check) — hidden from real users */}
      <input
        type="text"
        name="botcheck"
        value={form.botcheck}
        onChange={handleChange}
        style={{ display: 'none' }}
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
      />

      <div>
        <label htmlFor="name" className="block text-sm text-ink mb-2">
          Name <span className="text-copper-700">*</span>
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
          aria-invalid={invalidField === 'name' ? 'true' : undefined}
          aria-describedby={invalidField === 'name' ? 'form-error' : undefined}
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm text-ink mb-2">
          Email <span className="text-copper-700">*</span>
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
          aria-invalid={invalidField === 'email' ? 'true' : undefined}
          aria-describedby={invalidField === 'email' ? 'form-error' : undefined}
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
          Message <span className="text-copper-700">*</span>
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
          aria-invalid={invalidField === 'message' ? 'true' : undefined}
          aria-describedby={invalidField === 'message' ? 'form-error' : undefined}
        />
      </div>

      {status === 'error' && errorMessage && (
        <p id="form-error" role="alert" className="text-sm text-red-700">
          {errorMessage}
          {!invalidField && (
            <>
              {' '}Please try again, or email{' '}
              <a href="mailto:cieragraceconsulting@gmail.com" className="underline">
                cieragraceconsulting@gmail.com
              </a>{' '}
              directly.
            </>
          )}
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
