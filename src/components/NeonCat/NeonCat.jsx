import { useEffect, useRef, useState } from 'react';
import { playArcadeBlip } from '../../utils/sound';
import { CAT_BONUS, useBonus } from '../../contexts/BonusContext';
import './NeonCat.css';

// Shown in turn, each with the bonus added to the top bar's 1UP score.
const MESSAGES = ['MEOW! ★ SECRET FOUND', 'CAT BONUS', 'PURR… KEEP SCROLLING', 'MEOW? (THAT TICKLES)'];

// Easter egg: a pixel neon cat peeking over the footer. Each pet adds
// CAT_BONUS to the top bar's score.
const NeonCat = () => {
  const [message, setMessage] = useState(null);
  const [hops, setHops] = useState(0);
  const timerRef = useRef(null);
  const { addBonus } = useBonus();

  useEffect(() => () => clearTimeout(timerRef.current), []);

  const pet = () => {
    playArcadeBlip('meow');
    addBonus(CAT_BONUS);
    setMessage(`${MESSAGES[hops % MESSAGES.length]} +${CAT_BONUS}`);
    setHops(n => n + 1);
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setMessage(null), 2500);
  };

  return (
    <div className="neon-cat-perch">
      {message && <span className="neon-cat-bubble" role="status">{message}</span>}
      <div className="neon-cat-window">
      <button
        type="button"
        className={`neon-cat ${hops > 0 ? 'is-hopping' : ''}`}
        onClick={pet}
        aria-label="A neon cat. Click to pet it."
        title="?"
        key={hops}
      >
        <svg viewBox="-1 -1 20 16" shapeRendering="crispEdges" aria-hidden="true">
          {/* tail */}
          <path className="cat-line" d="M13 13 H16 V10 H17 V7 H16 V9 H15 V12 H13 Z" />
          {/* head + body, stepped like pixels */}
          <path className="cat-line" d="M2 0 H3 V1 H4 V2 H5 V3 H10 V2 H11 V1 H12 V0 H13 V9 H12 V14 H3 V9 H2 Z" />
          {/* eyes (blink) */}
          <rect className="cat-eye" x="4" y="4" width="2" height="2" />
          <rect className="cat-eye" x="9" y="4" width="2" height="2" />
          {/* nose */}
          <rect className="cat-nose" x="7" y="6" width="1" height="1" />
          {/* whiskers */}
          <path className="cat-whisker" d="M0 6 H3 M0 8 H3 M12 6 H15 M12 8 H15" />
        </svg>
      </button>
      </div>
    </div>
  );
};

export default NeonCat;
