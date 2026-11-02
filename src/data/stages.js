// One entry per page section. The stage-clear strip before each section shows
// `label` and `score`, and the top bar's 1UP score switches to it once you
// reach that section.
const stages = [
  { id: 'experience', nav: 'Experience', label: 'Player 1 start', score: 0, color: 'cyan' },
  { id: 'projects', nav: 'Projects', label: 'Stage 01 clear', score: 1000, color: 'magenta' },
  { id: 'about', nav: 'About', label: 'Stage 02 clear', score: 2500, color: 'yellow' },
  { id: 'contact', nav: 'Contact', label: 'Stage 03 clear', score: 4000, color: 'green' }
];

export const stageById = id => stages.find(stage => stage.id === id);

export default stages;
