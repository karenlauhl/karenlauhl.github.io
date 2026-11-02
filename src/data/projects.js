// The projects shown in the Projects section, in display order.
// To add one, copy an entry. Leave `code` out for private repos (visitors would
// get a 404) and set `codeNote` instead.
const projects = [
  {
    id: 'tts-deck-forge',
    title: 'TTS Deck Forge',
    tagline: 'A browser app that turns card lists into ready-to-spawn Tabletop Simulator decks.',
    highlights: [
      'Imports CSV, XLSX, JSON or TXT, validates every row, and renders cards on canvas with auto-fit text.',
      'Exports zipped 10 × 7 PNG sheets plus a spawnable saved object. Works offline (PWA) with autosave.',
      'Built with Claude Code over 9 staged pull requests, each gated by GitHub Actions CI (type-check, 14 Vitest test files, build) and deployed to GitHub Pages.'
    ],
    tech: ['TypeScript', 'React', 'Vite', 'Vitest', 'PWA', 'Canvas API'],
    links: {
      live: 'https://karenlauhl.github.io/TTS-Deck-Forge/',
      code: 'https://github.com/karenlauhl/TTS-Deck-Forge'
    }
  },
  {
    id: 'stock-trader',
    title: 'Stock Trading Simulator',
    tagline: 'A full-stack trading app with live WebSocket prices, built in a team of 3 over 3 weeks (Citi graduate training, Sep 2025).',
    highlights: [
      'Wrote buy and sell order placement, the balance service, the MySQL schema and global exception handling; moved money from float to BigDecimal.',
      'Wrote about 80% of the test code: Mockito service tests, MockMvc controller tests and repository tests on in-memory SQLite, with JaCoCo coverage reports.',
      'Connected live WebSocket prices to the Angular portfolio chart.'
    ],
    tech: ['Java 21', 'Spring Boot', 'Angular', 'MySQL', 'WebSockets'],
    links: {},
    codeNote: 'Private repo · code on request'
  },
  {
    id: 'airport',
    title: 'When should I leave for the airport?',
    tagline: 'An installable, offline-ready calculator for when to leave for any UK airport or Dublin.',
    highlights: [
      "Applies Nate Silver's arrival-time model, calibrated per airport, with a strategy that works back from gate closing.",
      '"Use my location" finds the airports you can actually drive to and estimates the drive, all on-device.',
      'Links each region\'s official journey planner and exports the trip to Apple, Outlook or Google Calendar.'
    ],
    tech: ['JavaScript', 'HTML', 'CSS', 'PWA', 'Geolocation'],
    links: {
      live: 'https://karenlauhl.github.io/airport-arrival-calculator/',
      code: 'https://github.com/karenlauhl/airport-arrival-calculator'
    }
  },
  {
    id: 'cloud-editor',
    title: 'Cloud text editor',
    tagline: 'A text editor built from independent microservices, each in its own repo and language.',
    highlights: [
      'Nine services (word, character, vowel and comma counts, average word length, a Shakespeare translator, saving) behind a routing proxy.',
      'Written across Python, Java, PHP and JavaScript, with a monitoring service watching the others.',
      'Built for the CSC3065 Cloud Computing module.'
    ],
    tech: ['Microservices', 'Python', 'Java', 'PHP', 'JavaScript'],
    links: {},
    codeNote: 'Coursework · code on request'
  },
  {
    id: 'mc-panel',
    title: 'mc-panel',
    tagline: 'A web control panel for a Minecraft server running on Oracle Cloud.',
    highlights: [
      'Start, stop and restart the server, check players, TPS, RAM, CPU and disk.',
      'Streams the live server console to the browser over Server-Sent Events, with a command box.',
      'Drives the existing systemd service, tmux console and backup script. Listens on localhost only, reached over SSH.'
    ],
    tech: ['Python', 'Linux', 'systemd', 'Server-Sent Events', 'Oracle Cloud'],
    links: {},
    codeNote: 'Private repo · code on request'
  },
  {
    id: 'leave-board',
    title: 'Joint Leave Board',
    tagline: 'A drag-to-mark timeline that finds the longest holiday window everyone can take together.',
    highlights: [
      'One swimlane per person plus an automatic "All free" row across any range of months.',
      'Tracks each person\'s balance, accrual, carry-over, bank holidays and workplace closures, and refuses leave that would go negative.',
      'Runs entirely in the browser; data stays in local storage.'
    ],
    tech: ['JavaScript', 'HTML', 'CSS', 'localStorage'],
    links: {
      live: 'https://karenlauhl.github.io/holiday-scheduler-2026/'
    },
    codeNote: 'Private repo · code on request'
  }
];

export default projects;
