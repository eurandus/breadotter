import { useEffect, useState } from 'react';
import HoloCard from './HoloCard.jsx';
import IdentityCard from '../cards/IdentityCard.jsx';
import PowersCard from '../cards/PowersCard.jsx';
import QuestsCard from '../cards/QuestsCard.jsx';

// foil: which shine treatment the card gets (see "foils" in styles.css)
// glow: the edge glow colour while the card is open
const CARDS = [
  { key: 'identity', label: 'Germaine Chin', foil: 'prism', glow: '#c58bff', Face: IdentityCard },
  { key: 'powers', label: 'Powers', foil: 'etched', glow: '#e3a33b', Face: PowersCard },
  { key: 'quests', label: 'Side quests', foil: 'pastel', glow: '#7fe0b8', Face: QuestsCard },
];

function useReducedMotion() {
  const query = '(prefers-reduced-motion: reduce)';
  const [reduce, setReduce] = useState(() => window.matchMedia(query).matches);
  useEffect(() => {
    const mq = window.matchMedia(query);
    const on = () => setReduce(mq.matches);
    mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, []);
  return reduce;
}

export default function Gallery() {
  const [active, setActive] = useState(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && setActive(null);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <>
      <div className={`backdrop${active ? ' on' : ''}`} onClick={() => setActive(null)} aria-hidden="true" />
      <section className={`gallery${active ? ' has-active' : ''}`} aria-label="Germaine's cards">
        {CARDS.map(({ key, label, foil, glow, Face }, i) => (
          <div className={`slot${active === key ? ' is-active' : ''}`} key={key} style={{ '--i': i }}>
            <HoloCard
              label={label}
              foil={foil}
              glow={glow}
              active={active === key}
              dimmed={active !== null && active !== key}
              showcase={i === 0}
              reduceMotion={reduceMotion}
              onToggle={() => setActive((a) => (a === key ? null : key))}
              onClose={() => setActive((a) => (a === key ? null : a))}
            >
              <Face />
            </HoloCard>
          </div>
        ))}
      </section>
      <p className="hint">{active ? 'Move to tilt · click anywhere to put it back' : 'Hover to tilt · click a card to take a closer look'}</p>
    </>
  );
}
