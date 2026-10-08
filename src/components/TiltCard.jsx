import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';

const FLY_MS = 300;

// One card in the deck. Handles pointer tilt, the foil/glare position,
// drag-to-swipe and the jelly wobble. Transforms are written straight to the
// DOM (not React state) so dragging stays at 60fps.
const TiltCard = forwardRef(function TiltCard(
  { pos, label, onSwipe, wobbleKey, reduceMotion, children },
  ref
) {
  const tiltRef = useRef(null);
  const jellyRef = useRef(null);
  const drag = useRef(null);
  const isFront = pos === 0;

  const card = () => tiltRef.current?.querySelector('.card');

  const setVars = (px, py, rx, ry) => {
    const c = card();
    if (!c) return;
    c.style.setProperty('--mx', `${(px * 100).toFixed(1)}%`);
    c.style.setProperty('--my', `${(py * 100).toFixed(1)}%`);
    c.style.setProperty('--rx', rx.toFixed(2));
    c.style.setProperty('--ry', ry.toFixed(2));
  };

  const resetVars = () => {
    const c = card();
    if (!c) return;
    c.style.removeProperty('--mx');
    c.style.removeProperty('--my');
    c.style.setProperty('--rx', 0);
    c.style.setProperty('--ry', 0);
  };

  const settle = () => {
    const t = tiltRef.current;
    t.style.transition = '';
    t.style.transform = '';
    resetVars();
  };

  const wobble = () => {
    if (reduceMotion) return;
    const j = jellyRef.current;
    j.classList.remove('wobble');
    void j.offsetWidth; // restart the animation
    j.classList.add('wobble');
  };

  useImperativeHandle(ref, () => ({
    // Throw the card off-screen; resolves once it is gone.
    flyOut(dir) {
      const t = tiltRef.current;
      t.style.transition = reduceMotion ? 'none' : `transform ${FLY_MS}ms cubic-bezier(.5,0,.8,.4)`;
      t.style.transform = `translateX(${dir * 130}%) rotate(${dir * 16}deg)`;
      return new Promise((r) => setTimeout(r, reduceMotion ? 0 : FLY_MS));
    },
    // Snap back to rest with no animation (used after it moves to the back).
    snapHome() {
      const t = tiltRef.current;
      t.style.transition = 'none';
      t.style.transform = '';
      resetVars();
      void t.offsetWidth;
      t.style.transition = '';
    },
  }));

  // Wobble whenever this card becomes the front card.
  useEffect(() => {
    if (isFront && wobbleKey > 0) wobble();
  }, [wobbleKey, isFront]); // eslint-disable-line react-hooks/exhaustive-deps

  const tiltFrom = (e, dx) => {
    const t = tiltRef.current;
    const r = t.getBoundingClientRect();
    const px = Math.min(1, Math.max(0, (e.clientX - r.left) / r.width));
    const py = Math.min(1, Math.max(0, (e.clientY - r.top) / r.height));
    let rx = (0.5 - py) * 26;
    let ry = (px - 0.5) * 30;
    if (reduceMotion) { rx *= 0.3; ry *= 0.3; }
    setVars(px, py, rx, ry);
    t.style.transform = `translateX(${dx}px) rotate(${dx * 0.05}deg) rotateX(${rx}deg) rotateY(${ry}deg)`;
  };

  const onPointerDown = (e) => {
    if (!isFront) return;
    drag.current = { x: e.clientX, t: performance.now(), dx: 0 };
    tiltRef.current.setPointerCapture(e.pointerId);
    tiltRef.current.style.transition = 'transform .08s linear';
  };

  const onPointerMove = (e) => {
    if (!isFront) return;
    if (drag.current) {
      drag.current.dx = e.clientX - drag.current.x;
      tiltFrom(e, drag.current.dx);
    } else if (e.pointerType === 'mouse') {
      tiltRef.current.style.transition = 'transform .12s ease-out';
      tiltFrom(e, 0);
    }
  };

  const onPointerUp = () => {
    const d = drag.current;
    if (!d) return;
    drag.current = null;
    const v = Math.abs(d.dx) / Math.max(1, performance.now() - d.t);
    if (Math.abs(d.dx) > 90 || (Math.abs(d.dx) > 30 && v > 0.6)) {
      onSwipe(d.dx < 0 ? 1 : -1);
      return;
    }
    settle();
    if (Math.abs(d.dx) > 8) wobble();
  };

  const onPointerLeave = () => {
    if (drag.current || !isFront) return;
    settle();
  };

  const onKeyDown = (e) => {
    if (e.key === 'ArrowRight') { e.preventDefault(); onSwipe(1); }
    if (e.key === 'ArrowLeft') { e.preventDefault(); onSwipe(-1); }
  };

  // `inert` keeps back cards out of the tab order and away from screen readers.
  const inertProps = isFront ? {} : { inert: '' };

  return (
    <div
      className="slot"
      data-pos={pos}
      style={{ zIndex: 10 - pos }}
      role="group"
      aria-roledescription="card"
      aria-label={label}
      aria-hidden={!isFront}
      {...inertProps}
    >
      <div className="float">
        <div
          ref={tiltRef}
          className="tilt"
          tabIndex={isFront ? 0 : -1}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
          onPointerLeave={onPointerLeave}
          onKeyDown={onKeyDown}
        >
          <div ref={jellyRef} className="jelly">{children}</div>
        </div>
      </div>
    </div>
  );
});

export default TiltCard;
