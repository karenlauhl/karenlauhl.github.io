// Shapes of the content in src/data/.

export interface Project {
  id: string;
  title: string;
  tagline: string;
  highlights: string[];
  tech: string[];
  links: {
    live?: string;
    code?: string;
  };
  /** Shown instead of a Code link, e.g. for private repos. */
  codeNote?: string;
}

export interface Job {
  id: string;
  org: string;
  role: string;
  team?: string;
  location: string;
  dates: string;
  points: string[];
  tech: string[];
}

export interface Education {
  id: string;
  school: string;
  degree: string;
  dates: string;
  detail: string;
}

export type NeonColor = 'cyan' | 'magenta' | 'yellow' | 'green';

/** Apps shown on the arcade cabinet's screen. */
export type ScreenApp = 'flights' | 'game';

export type SectionId = 'experience' | 'projects' | 'about' | 'contact';

export interface Stage {
  id: SectionId;
  nav: string;
  label: string;
  score: number;
  color: NeonColor;
}
