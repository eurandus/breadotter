import { useEffect, useRef } from 'react';
import { useHoloMotion } from '../lib/useHoloMotion.js';
import CardBack from './CardBack.jsx';

// One interactive card: tilt + foil on hover, click to view it up close.
// Layers (back to front): card back · face · foil shine · glare.
export default function HoloCard({
  label,
  foil = 'prism',
  glow = '#c58bff',
  active,
  dimmed,
  showcase = false,
  reduceMotion,
  onToggle,
  onClose,
  children,
}) {
  const rootRef = useRef(null);
  const translaterRef = useRef(null);
  const touched = useRef(false);
  const motion = useHoloMotion(rootRef, translaterRef, { reduceMotion });

  // Open / close
  const mounted = useRef(false);
  useEffect(() => {
    if (!mounted.current) { mounted.current = true; return; }
    if (active) motion.popover();
    else motion.retreat();
  }, [active, motion]);

  // Keep an open card centred when the window changes size
  useEffect(() => {
    if (!active) return;
    let t;
    const on = () => { clearTimeout(t); t = setTimeout(() => motion.center(), 200); };
    window.addEventListener('resize', on);
    return () => { window.removeEventListener('resize', on); clearTimeout(t); };
  }, [active, motion]);

  // Phone tilt drives an open card
  useEffect(() => {
    if (!active) return;
    let base = null;
    const on = (e) => {
      if (e.gamma == null || e.beta == null) return;
      if (!base) base = { g: e.gamma, b: e.beta };
      motion.orient(e.gamma - base.g, e.beta - base.b);
    };
    window.addEventListener('deviceorientation', on, true);
    return () => window.removeEventListener('deviceorientation', on, true);
  }, [active, motion]);

  // One-off showcase sweep on load, cancelled as soon as anyone interacts
  const stopShowcase = useRef(() => {});
  useEffect(() => {
    if (!showcase) return;
    const start = setTimeout(() => {
      if (!touched.current) stopShowcase.current = motion.showcase();
    }, 1800);
    return () => { clearTimeout(start); stopShowcase.current(); };
  }, [showcase, motion]);

  const onPointerMove = (e) => {
    if (dimmed) return; // another card is open
    touched.current = true;
    stopShowcase.current();
    motion.interact(e);
  };

  const onKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onToggle(); }
    if (e.key === 'Escape' && active) onClose();
  };

  return (
    <div
      ref={rootRef}
      className={`hcard${active ? ' active' : ''}${dimmed ? ' dimmed' : ''}`}
      data-foil={foil}
      style={{ '--card-glow': glow }}
    >
      <div ref={translaterRef} className="hcard__translater">
        <div
          className="hcard__rotator"
          role="button"
          tabIndex={0}
          aria-expanded={active}
          aria-label={`${active ? 'Close' : 'View'} card: ${label}`}
          onClick={() => { touched.current = true; stopShowcase.current(); onToggle(); }}
          onPointerMove={onPointerMove}
          onPointerLeave={() => motion.interactEnd()}
          onBlur={() => active && onClose()}
          onKeyDown={onKeyDown}
        >
          <div className="hcard__back" aria-hidden="true"><CardBack /></div>
          <div className="hcard__front">
            {children}
            <div className="hcard__shine" />
            <div className="hcard__glare" />
          </div>
        </div>
      </div>
    </div>
  );
}
