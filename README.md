# Ciera Grace Consulting — Demo Site

Portfolio/demo site for Ciera Grace Consulting LLC. React + Vite + Tailwind + Framer Motion.

## Run locally

```bash
npm install
npm run dev
```

Then open http://localhost:5173.

## Build

```bash
npm run build
npm run preview
```

## Project notes

- Routing: `/`, `/about`, `/contact` (React Router v6)
- Design system: `tailwind.config.js` (cream/charcoal/gold palette, Cormorant + Inter)
- Content data lives in `src/data/` — edit `services.js` and `premiumOptions.js` to update copy
- Contact form is fully wired for an email service swap — see the `TODO` in `src/components/ContactForm.jsx`
