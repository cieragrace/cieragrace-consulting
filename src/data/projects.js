// Selected Work — the list grows as projects ship; order = display order.
// status: 'live' (full data) | 'soon' (graceful placeholder, no fake links).
// kind: 'app' (product/engineering builds) | 'client' (client sites) — drives
//   the two sections on /work.
// featured: appears in the home-page band. spotlight: gets the dark feature
//   panel at the top of /work.
// preview: { poster } static fallback image, { clip } short looping interaction video.
const projects = [
  {
    title: 'Neon Grid Arcade',
    category: 'Browser Game Arcade',
    description:
      'A synthwave hall of five playable browser games — Snake, Pong, Breakout, Simon, and an unbeatable Tic Tac Toe — every cabinet hand-written in strict TypeScript with no game engine or canvas library. Each game ships from its own branch through an append-only registry, so the arcade grows without merge conflicts.',
    stack: ['Next.js', 'TypeScript', 'Tailwind', 'Canvas 2D'],
    liveUrl: 'https://neon-grid-arcade.vercel.app',
    repoUrl: 'https://github.com/cieragrace/neon-grid-arcade',
    poster: '/work/neon-grid-arcade.jpg',
    clip: null,
    status: 'live',
    kind: 'app',
    featured: true,
    spotlight: true,
  },
  {
    title: 'AP Tracker',
    category: 'Full-Stack Web App',
    description:
      'An accounts-payable tracker that turns invoice chaos into one clean dashboard — add and track invoices, mark-as-paid with confirmation, and watch live totals update.',
    stack: ['Next.js', 'TypeScript', 'Tailwind', 'Drizzle', 'Turso'],
    liveUrl: 'https://ap-tracker-three.vercel.app',
    repoUrl: 'https://github.com/cieragrace/ap-tracker',
    poster: '/work/ap-tracker.jpg',
    clip: '/work/ap-tracker.mp4',
    status: 'live',
    kind: 'app',
    featured: true,
  },
  {
    title: 'Inked Colorado',
    category: 'Full-Stack Directory',
    description:
      'A searchable directory of real Colorado tattoo studios — filter artists by style and city, all wrapped in a moody, dark gothic theme.',
    stack: ['Next.js', 'TypeScript', 'Tailwind', 'Drizzle', 'Turso'],
    liveUrl: 'https://ink-colorado.vercel.app',
    repoUrl: 'https://github.com/cieragrace/inked-colorado',
    poster: '/work/inked-colorado.jpg',
    clip: '/work/inked-colorado.mp4',
    status: 'live',
    kind: 'app',
  },
  {
    title: 'Garden Grow',
    category: 'Interactive Web App',
    description:
      'A planting companion that turns your zip code into a USDA growing zone, then recommends what to plant — with companion-planting guidance and a to-scale bed designer. Started as a group capstone at Turing, then rebuilt and expanded solo.',
    stack: ['Next.js', 'TypeScript', 'Tailwind'],
    liveUrl: 'https://garden-grow-sable.vercel.app',
    repoUrl: 'https://github.com/cieragrace/garden-grow',
    poster: '/work/garden-grow.jpg',
    clip: '/work/garden-grow.mp4',
    status: 'live',
    kind: 'app',
  },
  {
    title: 'Ironside Barber Co.',
    category: 'Client Site',
    description:
      'A polished portfolio site for a Denver barbershop — service menu, barber lineup, and an effortless booking inquiry flow, built to feel sharp and trustworthy.',
    stack: ['Astro', 'Tailwind'],
    liveUrl: 'https://ironside-barber.vercel.app',
    repoUrl: 'https://github.com/cieragrace/ironside-barber',
    poster: '/work/ironside-barber.jpg',
    clip: '/work/ironside-barber.mp4',
    status: 'live',
    kind: 'client',
    featured: true,
  },
  {
    title: "Mimi's Chocolate Bites",
    category: 'Client Site',
    description:
      'A warm, moody landing page for a home chocolatier — handcrafted-treat branding, a one-screen hero, and an inquiry form that routes custom orders straight to her inbox.',
    stack: ['Astro', 'Tailwind'],
    liveUrl: 'https://mimischocolatebites.com',
    repoUrl: 'https://github.com/cieragrace/mimis-chocolate-bites',
    poster: '/work/mimis-chocolate-bites.jpg',
    clip: null,
    status: 'live',
    kind: 'client',
  },
  {
    title: 'Coming Soon',
    category: 'Scheduling Platform',
    description:
      'A white-label booking experience in progress — smart waitlists and own-domain scheduling, built to feel calm and effortless.',
    stack: [],
    liveUrl: null,
    repoUrl: null,
    poster: null,
    clip: null,
    status: 'soon',
    kind: 'app',
  },
];

export default projects;
