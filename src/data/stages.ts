// One entry per page section. The stage-clear strip before each section shows
// `label` and `score`, and the top bar's 1UP score switches to it once you
// reach that section.
import type { SectionId, Stage } from '../types';

const stages: Stage[] = [
  { id: 'experience', nav: 'Experience', label: 'Player 1 start', score: 0, color: 'cyan' },
  { id: 'projects', nav: 'Projects', label: 'Stage 01 clear', score: 1000, color: 'magenta' },
  { id: 'about', nav: 'About', label: 'Stage 02 clear', score: 2500, color: 'yellow' },
  { id: 'contact', nav: 'Contact', label: 'Stage 03 clear', score: 4000, color: 'green' }
];

// Every SectionId has a stage, so this never returns undefined for a valid id.
export const stageById = (id: SectionId): Stage => {
  const stage = stages.find(s => s.id === id);
  if (!stage) throw new Error(`No stage for section "${id}"`);
  return stage;
};

export default stages;
