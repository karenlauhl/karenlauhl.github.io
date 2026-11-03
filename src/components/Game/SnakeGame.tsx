import { CSSProperties, useCallback, useEffect, useRef, useState } from 'react';
import { playArcadeBlip } from '../../utils/sound';
import './SnakeGame.css';

const COLS = 24;
const ROWS = 18;
const START_SPEED = 140;
const MIN_SPEED = 70;
const HIGH_SCORE_KEY = 'karenlauhl-snake-high-score';

interface Point {
  x: number;
  y: number;
}

type Direction = 'up' | 'down' | 'left' | 'right';
type Status = 'idle' | 'playing' | 'over';

const DIRECTIONS: Record<Direction, Point> = {
  up: { x: 0, y: -1 },
  down: { x: 0, y: 1 },
  left: { x: -1, y: 0 },
  right: { x: 1, y: 0 }
};

const KEY_MAP: Record<string, Direction | undefined> = {
  ArrowUp: 'up', ArrowDown: 'down', ArrowLeft: 'left', ArrowRight: 'right',
  w: 'up', s: 'down', a: 'left', d: 'right',
  W: 'up', S: 'down', A: 'left', D: 'right'
};

const readHighScore = (): number => {
  try {
    return Number(window.localStorage.getItem(HIGH_SCORE_KEY) || '0');
  } catch (error) {
    return 0;
  }
};

const writeHighScore = (value: number): void => {
  try {
    window.localStorage.setItem(HIGH_SCORE_KEY, String(value));
  } catch (error) {
    // Storage can be unavailable (private mode); the score is best-effort.
  }
};

const initialSnake = (): Point[] => [
  { x: 8, y: 9 },
  { x: 7, y: 9 },
  { x: 6, y: 9 }
];

const randomFood = (snake: Point[]): Point => {
  // Pick uniformly from the cells the snake isn't occupying, so this can't
  // spin on a nearly-full board the way rejection sampling would.
  const taken = new Set(snake.map(part => `${part.x},${part.y}`));
  const free: Point[] = [];
  for (let y = 0; y < ROWS; y += 1) {
    for (let x = 0; x < COLS; x += 1) {
      if (!taken.has(`${x},${y}`)) {
        free.push({ x, y });
      }
    }
  }
  return free[Math.floor(Math.random() * free.length)] || { x: 0, y: 0 };
};

const SnakeGame = () => {
  // Everything the tick reads lives in refs, so the loop never closes over
  // stale state. useState holds only what has to trigger a render.
  const snakeRef = useRef(initialSnake());
  const foodRef = useRef(randomFood(snakeRef.current));
  const dirRef = useRef(DIRECTIONS.right);
  const queuedDirRef = useRef<Point | null>(null);
  const speedRef = useRef(START_SPEED);
  const scoreRef = useRef(0);

  const [frame, setFrame] = useState({ snake: snakeRef.current, food: foodRef.current });
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(readHighScore);
  const [status, setStatus] = useState<Status>('idle');

  const start = useCallback(() => {
    snakeRef.current = initialSnake();
    foodRef.current = randomFood(snakeRef.current);
    dirRef.current = DIRECTIONS.right;
    queuedDirRef.current = null;
    speedRef.current = START_SPEED;
    scoreRef.current = 0;
    setFrame({ snake: snakeRef.current, food: foodRef.current });
    setScore(0);
    setStatus('playing');
  }, []);

  const turn = useCallback((name: Direction) => {
    const next = DIRECTIONS[name];
    const current = queuedDirRef.current || dirRef.current;
    // Reject 180° reversals — they'd instantly collide with the neck.
    if (!next || (next.x === -current.x && next.y === -current.y)) {
      return;
    }
    queuedDirRef.current = next;
  }, []);

  // Game loop. Keyed on status so it only runs while playing; the interval id
  // is cleared on cleanup, which is also what keeps StrictMode's double-
  // invoked effect in dev from leaving a second loop running at 2x speed.
  useEffect(() => {
    if (status !== 'playing') {
      return undefined;
    }

    let intervalId: number | undefined;

    const tick = () => {
      if (queuedDirRef.current) {
        dirRef.current = queuedDirRef.current;
        queuedDirRef.current = null;
      }

      const snake = snakeRef.current;
      const dir = dirRef.current;
      const head = { x: snake[0].x + dir.x, y: snake[0].y + dir.y };

      const hitWall = head.x < 0 || head.x >= COLS || head.y < 0 || head.y >= ROWS;
      const hitSelf = snake.some(part => part.x === head.x && part.y === head.y);

      if (hitWall || hitSelf) {
        playArcadeBlip('gameover');
        setHighScore(best => {
          if (scoreRef.current > best) {
            writeHighScore(scoreRef.current);
            return scoreRef.current;
          }
          return best;
        });
        setStatus('over');
        return;
      }

      const ate = head.x === foodRef.current.x && head.y === foodRef.current.y;
      const nextSnake = [head, ...(ate ? snake : snake.slice(0, -1))];
      snakeRef.current = nextSnake;

      if (ate) {
        playArcadeBlip('primary');
        foodRef.current = randomFood(nextSnake);
        scoreRef.current += 1;
        setScore(scoreRef.current);
        // Speed up slightly with each pickup, down to a floor.
        const faster = Math.max(MIN_SPEED, speedRef.current - 4);
        if (faster !== speedRef.current) {
          speedRef.current = faster;
          window.clearInterval(intervalId);
          intervalId = window.setInterval(tick, faster);
        }
      }

      setFrame({ snake: nextSnake, food: foodRef.current });
    };

    intervalId = window.setInterval(tick, speedRef.current);
    return () => window.clearInterval(intervalId);
  }, [status]);

  // Keyboard input.
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const direction = KEY_MAP[event.key];
      if (direction) {
        // Stop arrow keys scrolling the page behind the cabinet.
        event.preventDefault();
        turn(direction);
        return;
      }
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        if (status !== 'playing') {
          start();
        }
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [turn, start, status]);

  const cellStyle = (x: number, y: number): CSSProperties => ({
    left: `${(x / COLS) * 100}%`,
    top: `${(y / ROWS) * 100}%`,
    width: `${100 / COLS}%`,
    height: `${100 / ROWS}%`
  });

  return (
    <div className="snake-game">
      <div className="snake-hud">
        <span>SCORE {String(score).padStart(3, '0')}</span>
        <span>HI {String(highScore).padStart(3, '0')}</span>
      </div>

      <div className="snake-board-wrap">
      <div className="snake-board">
        {frame.snake.map((part, i) => (
          <span
            key={`${part.x}-${part.y}-${i}`}
            className={`snake-cell ${i === 0 ? 'snake-cell--head' : ''}`}
            style={cellStyle(part.x, part.y)}
          />
        ))}
        <span className="snake-food" style={cellStyle(frame.food.x, frame.food.y)} />

        {status !== 'playing' && (
          <div className="snake-overlay">
            {status === 'over' && (
              <p className="snake-overlay-title">GAME OVER</p>
            )}
            {status === 'over' && (
              <p className="snake-overlay-score">SCORE {score}</p>
            )}
            <button type="button" className="snake-start-btn" onClick={start}>
              {status === 'over' ? '▶ PLAY AGAIN' : '▶ INSERT COIN'}
            </button>
            <p className="snake-hint">Arrow keys / WASD — or use the pad below</p>
          </div>
        )}
      </div>
      </div>

      <div className="snake-dpad">
        <button type="button" className="dpad-btn dpad-btn--up" onClick={() => turn('up')} aria-label="Up">▲</button>
        <button type="button" className="dpad-btn dpad-btn--left" onClick={() => turn('left')} aria-label="Left">◀</button>
        <button type="button" className="dpad-btn dpad-btn--right" onClick={() => turn('right')} aria-label="Right">▶</button>
        <button type="button" className="dpad-btn dpad-btn--down" onClick={() => turn('down')} aria-label="Down">▼</button>
      </div>
    </div>
  );
};

export default SnakeGame;
