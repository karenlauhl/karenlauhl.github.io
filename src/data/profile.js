// Experience, education and achievements, from Karen_Lau_Software_Engineer_CV.pdf.
// Kept public-safe: no phone number, no internal model names, no job-search lines.

export const experience = [
  {
    id: 'citi-swe',
    org: 'Citi',
    role: 'Technology Analyst (Software Engineer)',
    team: 'Equities Cash & Derivatives Technology',
    location: 'United Kingdom',
    dates: 'Jul 2026 – Present',
    points: [
      'Develop low-latency Java microservices for an equities liquidity platform.',
      'Moving 2 legacy repositories from TeamCity to an OpenShift-based build platform: wrote new CI pipelines in YAML and Ansible configuration for the Linux servers. Snapshot builds now run on the new pipelines; release migration in progress.',
      'Built 8 AutoSys jobs in UAT for two new features, an order management system and a data transformation service; all run daily.',
      'Fixed a failing compliance check configuration, updating it to current requirements and verifying it across DEV, UAT and PROD.',
      'Mentor 4 junior colleagues (2 new graduates, 2 placement students).'
    ],
    tech: ['Java', 'OpenShift', 'CI/CD (YAML)', 'Ansible', 'AutoSys', 'TeamCity']
  },
  {
    id: 'citi-ds',
    org: 'Citi',
    role: 'Technology Analyst (Data Scientist)',
    team: 'Markets Trade Surveillance, Core Compliance Technology',
    location: 'Belfast',
    dates: 'Sep 2025 – Jul 2026',
    points: [
      'Wrote PySpark jobs processing historical trading data (1k–100k rows per surveillance) for three surveillance models.',
      'Tuned parameter combinations for a trade surveillance model to find the best-performing settings. Learned the approach from a New York colleague and brought it to the Belfast team as the local point of contact.',
      'Caught a random seed variance issue in a new model, which led to an immediate fix and more reliable test results.',
      'Wrote 5 reproducible scripts in Python, Pandas, PySpark and SQL that pull data from an Oracle database to rerun model tuning and generate output reports; adopted by the team.',
      "Formed a team of 4 for Citi's Global Technology Analyst Challenge 2025 and built a full-stack Confluence AI chatbot and quiz prototype: wrote the Java backend and the first Vertex AI integration. Global Top 3 of 50+."
    ],
    tech: ['PySpark', 'Python', 'Pandas', 'SQL', 'Oracle', 'Vertex AI']
  },
  {
    id: 'citi-placement',
    org: 'Citi',
    role: 'Technology Placement Analyst (Software Engineer)',
    team: 'Year-long placement',
    location: 'Belfast',
    dates: 'Jun 2023 – May 2024',
    points: [
      'Shipped about 20 Java and SQL changes from development through DEV and UAT to weekend production releases.',
      'Wrote about 10 SQL scripts for a Sybase to MSSQL Server migration, reproducing legacy logic and verifying both versions matched.',
      'Wrote Mockito unit tests and integration tests for a trade exception program, reaching approximately 80% code coverage.',
      'Fixed a double-to-integer casting bug in a Java data flow, and added security status and stale/duplicate row filtering to a SQL report.'
    ],
    tech: ['Java', 'SQL', 'MSSQL Server', 'Sybase', 'Mockito']
  }
];

export const education = [
  {
    id: 'qub',
    school: "Queen's University Belfast",
    degree: 'BSc Computer Science with Professional Experience · 2:1',
    dates: '2021 – 2025',
    detail: 'Upper Second-Class Honours, including a year-long software engineering placement at Citi.'
  }
];

export const achievements = [
  "Global Top 3 of 50+ teams, Citi's Global Technology Analyst Challenge 2025",
  'Winner, UKSEDS Olympus Rover Trials 2024 (software lead, team of 8)',
  'Class Representative, Citi graduate programme'
];

export const spokenLanguages = ['English', 'Cantonese (native)', 'Mandarin', 'Japanese (limited working)'];
