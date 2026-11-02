let audioCtx = null;

const getContext = () => {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return null;
    audioCtx = new AudioContextClass();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
};

const VARIANTS = {
  primary: { start: 880, end: 440, type: 'square', duration: 0.09 },
  secondary: { start: 660, end: 990, type: 'triangle', duration: 0.07 },
  gameover: { start: 320, end: 90, type: 'square', duration: 0.45 },
  meow: { start: 1200, end: 520, type: 'triangle', duration: 0.32 }
};

export const playArcadeBlip = (variant = 'primary') => {
  const ctx = getContext();
  if (!ctx) return;

  const { start, end, type, duration } = VARIANTS[variant] || VARIANTS.primary;
  const now = ctx.currentTime;

  const oscillator = ctx.createOscillator();
  const gain = ctx.createGain();

  oscillator.type = type;
  oscillator.frequency.setValueAtTime(start, now);
  oscillator.frequency.exponentialRampToValueAtTime(end, now + duration);

  gain.gain.setValueAtTime(0.08, now);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

  oscillator.connect(gain);
  gain.connect(ctx.destination);

  oscillator.start(now);
  oscillator.stop(now + duration);
};
