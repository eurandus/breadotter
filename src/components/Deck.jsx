import { useCallback, useEffect, useRef, useState } from 'react';
import { flushSync } from 'react-dom';
import TiltCard from './TiltCard.jsx';
import Tray from './Tray.jsx';
import IdentityCard from '../cards/IdentityCard.jsx';
import PowersCard from '../cards/PowersCard.jsx';
import QuestsCard from '../cards/QuestsCard.jsx';

const CARDS = [
  { key: 'identity', label: 'Germaine Chin', thumb: 't1', Face: IdentityCard },
  { key: 'powers', label: 'Powers', thumb: 't2', Face: PowersCard },
  { key: 'quests', label: 'Side quests', thumb: 't3', Face: QuestsCard },
];

function useReducedMotion() {
  const [reduce, setReduce] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const on = () => setReduce(mq.matches);
    mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, []);
  return reduce;
}

export default function Deck() {
  const N = CARDS.length;
  const [index, setIndex] = useState(0);
  const [wobbleKey, setWobbleKey] = useState(0);
  const busy = useRef(false);
  const cardRefs = useRef([]);
  const reduceMotion = useReducedMotion();

  // Bring card `to` to the front. The current front card flies off in `dir`
  // (-1 = left, 1 = right), then tucks in at the back of the stack.
  const go = useCallback(
    async (to, dir) => {
      if (busy.current || to === index) return;
      busy.current = true;
      const leaving = cardRefs.current[index];
      await leaving.flyOut(dir ?? (to > index ? -1 : 1));
      flushSync(() => setIndex(to));
      leaving.snapHome();
      setWobbleKey((k) => k + 1);
      busy.current = false;
    },
    [index]
  );

  // step(1) = next card (thrown left), step(-1) = previous (thrown right)
  const step = useCallback((d) => go((index + d + N) % N, d > 0 ? -1 : 1), [go, index, N]);

  // Arrow keys anywhere on the page
  useEffect(() => {
    const onKey = (e) => {
      if (e.target.closest?.('.tilt')) return; // the card handles its own keys
      if (e.key === 'ArrowRight') step(1);
      if (e.key === 'ArrowLeft') step(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [step]);

  // A little wobble on first load
  useEffect(() => {
    const t = setTimeout(() => setWobbleKey(1), 250);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <section className="deck" aria-roledescription="carousel" aria-label="Germaine's cards">
        {CARDS.map(({ key, label, Face }, k) => (
          <TiltCard
            key={key}
            ref={(el) => (cardRefs.current[k] = el)}
            pos={(k - index + N) % N}
            label={`${k + 1} of ${N}: ${label}`}
            onSwipe={step}
            wobbleKey={wobbleKey}
            reduceMotion={reduceMotion}
          >
            <Face />
          </TiltCard>
        ))}
      </section>

      <Tray cards={CARDS} index={index} onPick={(k) => go(k)} onStep={step} />
      <p className="hint">Drag to tilt · swipe for the next card</p>
      <p className="sr" aria-live="polite">
        Card {index + 1} of {N}: {CARDS[index].label}
      </p>
    </>
  );
}
