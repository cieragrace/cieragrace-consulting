// Selected Work — designed for 5 slots (owner will end with 5).
// status: 'live' (full data) | 'soon' (graceful placeholder, no fake links).
const projects = [
  {
    title: 'AP Tracker',
    category: 'Full-Stack Web App',
    description:
      'An accounts-payable tracker that turns invoice chaos into one clean dashboard — add and track invoices, mark-as-paid with confirmation, and watch live totals update.',
    stack: ['Next.js', 'TypeScript', 'Tailwind', 'Drizzle', 'Turso'],
    liveUrl: 'https://ap-tracker-three.vercel.app',
    repoUrl: 'https://github.com/cieragrace/ap-tracker',
    status: 'live',
  },
  {
    title: 'Inked Colorado',
    category: 'Full-Stack Directory',
    description:
      'A searchable directory of real Colorado tattoo studios — filter artists by style and city, all wrapped in a moody, dark gothic theme.',
    stack: ['Next.js', 'TypeScript', 'Tailwind', 'Drizzle', 'Turso'],
    liveUrl: 'https://ink-colorado.vercel.app',
    repoUrl: 'https://github.com/cieragrace/inked-colorado',
    status: 'live',
  },
  {
    title: 'Garden Grow',
    category: 'Interactive Web App',
    description:
      'A planting companion that turns your zip code into a USDA growing zone, then recommends what to plant — with companion-planting guidance and a to-scale bed designer.',
    stack: ['Next.js', 'TypeScript', 'Tailwind'],
    liveUrl: 'https://garden-grow-sable.vercel.app',
    repoUrl: 'https://github.com/cieragrace/garden-grow',
    status: 'live',
  },
  {
    title: 'Ironside Barber Co.',
    category: 'Client Site',
    description:
      'A polished portfolio site for a Denver barbershop — service menu, barber lineup, and an effortless booking inquiry flow, built to feel sharp and trustworthy.',
    stack: ['Astro', 'Tailwind'],
    liveUrl: 'https://ironside-barber.vercel.app',
    repoUrl: 'https://github.com/cieragrace/ironside-barber',
    status: 'live',
  },
  {
    title: 'Coming Soon',
    category: 'Scheduling Platform',
    description:
      'A white-label booking experience in progress — smart waitlists and own-domain scheduling, built to feel calm and effortless.',
    stack: [],
    liveUrl: null,
    repoUrl: null,
    status: 'soon',
  },
];

export default projects;
