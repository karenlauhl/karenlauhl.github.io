// Decorative neon line-art that drifts in the empty gutters beside the
// cabinet on wide screens. Positions are biased to the left/right thirds so
// the art stays in the gutters instead of hiding behind the machine.
const doodles = [
  {
    top: '12%', left: '5%', size: 84, duration: 21, delay: 0,
    path: <path d="M4 32c8-20 20-20 28 0s20 20 28 0" />
  },
  {
    top: '34%', left: '11%', size: 62, duration: 17, delay: 2.5, alt: true,
    path: <path d="M32 4 39 25l22 0-18 13 7 21-18-13-18 13 7-21-18-13 22 0z" />
  },
  {
    top: '58%', left: '4%', size: 96, duration: 24, delay: 1.2,
    path: <path d="M32 32m-4 0a4 4 0 108 0a4 4 0 10-8 0M32 32m-14 0a14 14 0 1028 0a14 14 0 10-28 0M32 32m-25 0a25 25 0 1050 0a25 25 0 10-50 0" />
  },
  {
    top: '78%', left: '13%', size: 58, duration: 19, delay: 3.4, alt: true,
    path: <path d="M6 46 20 14l12 22 12-22 14 32" />
  },
  {
    top: '22%', left: '86%', size: 74, duration: 23, delay: 1.8, alt: true,
    path: <path d="M32 6 58 52H6z" />
  },
  {
    top: '46%', left: '92%', size: 54, duration: 15, delay: 0.6,
    path: <path d="M32 8v48M8 32h48M15 15l34 34M49 15 15 49" />
  },
  {
    top: '66%', left: '85%', size: 88, duration: 26, delay: 2.9,
    path: <path d="M8 44c6-8 10-8 16 0s10 8 16 0 10-8 16 0" />
  },
  {
    top: '86%', left: '91%', size: 50, duration: 18, delay: 4.1, alt: true,
    path: <path d="M16 16h32v32H16zM24 24h16v16H24z" />
  },
  {
    top: '6%', left: '78%', size: 46, duration: 20, delay: 3.1,
    path: <path d="M32 10a22 22 0 1022 22" />
  },
  {
    top: '50%', left: '2%', size: 44, duration: 16, delay: 4.8, alt: true,
    path: <path d="M12 52 52 12M52 12h-16M52 12v16" />
  }
];

const Doodles = () => (
  <>
    {doodles.map((doodle, i) => (
      <span
        key={i}
        className={`doodle ${doodle.alt ? 'doodle--alt' : ''}`}
        style={{
          top: doodle.top,
          left: doodle.left,
          width: `${doodle.size}px`,
          height: `${doodle.size}px`,
          animationDuration: `${doodle.duration}s`,
          animationDelay: `${doodle.delay}s`
        }}
      >
        <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          {doodle.path}
        </svg>
      </span>
    ))}
  </>
);

export default Doodles;
