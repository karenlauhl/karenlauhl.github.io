import './Ticker.css';

// A scrolling neon banner between sections. The text is repeated and the
// track holds two identical halves, so moving it by -50% loops seamlessly.
const Ticker = ({ items, color = 'cyan' }) => {
  const run = Array.from({ length: 4 }, () => items).flat();

  return (
    <div className={`ticker ticker--${color}`} aria-hidden="true">
      <div className="ticker-track">
        {[0, 1].map(half => (
          <span className="ticker-half" key={half}>
            {run.map((item, i) => (
              <span className="ticker-item" key={i}>{item} <span className="ticker-star">★</span></span>
            ))}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Ticker;
