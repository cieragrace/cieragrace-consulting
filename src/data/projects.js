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
    title: 'Coming Soon',
    category: 'Scheduling Platform',
    description:
      'A white-label booking experience in progress — smart waitlists and own-domain scheduling, built to feel calm and effortless.',
    stack: [],
    liveUrl: null,
    repoUrl: null,
    status: 'soon',
  },
  {
    title: 'Coming Soon',
    category: 'Operations Portal',
    description:
      'A focused internal portal that turns day-to-day operations into a single, considered workflow. Currently in the workshop.',
    stack: [],
    liveUrl: null,
    repoUrl: null,
    status: 'soon',
  },
  {
    title: 'Coming Soon',
    category: 'Client Site',
    description:
      'A custom brand site for a service-led business — hand-built, fast, and unmistakably theirs. Coming soon to this shelf.',
    stack: [],
    liveUrl: null,
    repoUrl: null,
    status: 'soon',
  },
];

export default projects;
