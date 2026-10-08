import { useEffect, useMemo, useRef } from 'react';
import { Spring, clamp, remap } from './spring.js';

// Spring tunings (per 60fps frame)
const FOLLOW = { stiffness: 0.066, damping: 0.25 }; // tracking the pointer
const SETTLE = { stiffness: 0.01, damping: 0.06 }; // slow, wobbly return to rest
const POP = { stiffness: 0.033, damping: 0.45 }; // flying to / from the centre
const SHOW = { stiffness: 0.02, damping: 0.5 }; // showcase sweep

// Drives one holo card: pointer tilt, foil + glare position, and the
// "pop to centre" view. All values are written as CSS custom properties on
// the card's root element, so React never re-renders during motion.
export function useHoloMotion(rootRef, translaterRef, { reduceMotion }) {
  const s = useMemo(
    () => ({
      rotate: new Spring({ x: 0, y: 0 }, FOLLOW), // x = around Y axis, y = around X axis (deg)
      glare: new Spring({ x: 50, y: 50, o: 0 }, FOLLOW), // pointer % + foil opacity
      bg: new Spring({ x: 50, y: 50 }, FOLLOW), // foil background position %
      spin: new Spring({ x: 0, y: 0 }, POP), // extra rotation for the first-view spin
      move: new Spring({ x: 0, y: 0 }, POP), // px offset to the screen centre
      scale: new Spring({ v: 1 }, POP),
    }),
    []
  );
  const raf = useRef(null);
  const last = useRef(0);
  const settleTimer = useRef(null);
  const firstPop = useRef(true);

  const write = () => {
    const el = rootRef.current;
    if (!el) return;
    const g = s.glare.value;
    const st = el.style;
    st.setProperty('--pointer-x', `${g.x}%`);
    st.setProperty('--pointer-y', `${g.y}%`);
    st.setProperty('--px', (g.x - 50).toFixed(2));
    st.setProperty('--py', (g.y - 50).toFixed(2));
    st.setProperty('--pointer-from-center', clamp(Math.hypot(g.x - 50, g.y - 50) / 50, 0, 1).toFixed(3));
    st.setProperty('--pointer-from-left', (g.x / 100).toFixed(3));
    st.setProperty('--pointer-from-top', (g.y / 100).toFixed(3));
    st.setProperty('--card-opacity', g.o.toFixed(3));
    st.setProperty('--rotate-y', `${(s.rotate.value.x + s.spin.value.x).toFixed(2)}deg`);
    st.setProperty('--rotate-x', `${(s.rotate.value.y + s.spin.value.y).toFixed(2)}deg`);
    st.setProperty('--background-x', `${s.bg.value.x}%`);
    st.setProperty('--background-y', `${s.bg.value.y}%`);
    st.setProperty('--card-scale', s.scale.value.v.toFixed(4));
    st.setProperty('--translate-x', `${s.move.value.x.toFixed(1)}px`);
    st.setProperty('--translate-y', `${s.move.value.y.toFixed(1)}px`);
  };

  const tick = (now) => {
    const dt = Math.min(2, (now - (last.current || now)) / 16.667 || 1);
    last.current = now;
    let moving = false;
    for (const k in s) moving = s[k].step(dt) || moving;
    write();
    raf.current = moving ? requestAnimationFrame(tick) : null;
    if (!moving) last.current = 0;
  };

  const kick = () => {
    if (raf.current == null) raf.current = requestAnimationFrame(tick);
  };

  const follow = (bg, rot, glare) => {
    clearTimeout(settleTimer.current);
    s.bg.tune(FOLLOW); s.rotate.tune(FOLLOW); s.glare.tune(FOLLOW);
    s.bg.set(bg); s.rotate.set(rot); s.glare.set(glare);
    kick();
  };

  const api = useMemo(
    () => ({
      // Pointer moved over the card
      interact(e) {
        const r = translaterRef.current.getBoundingClientRect();
        const px = clamp(((e.clientX - r.left) / r.width) * 100);
        const py = clamp(((e.clientY - r.top) / r.height) * 100);
        const k = reduceMotion ? 10 : 3.5;
        follow(
          { x: remap(px, 0, 100, 37, 63), y: remap(py, 0, 100, 33, 67) },
          { x: -(px - 50) / k, y: (py - 50) / k },
          { x: px, y: py, o: 1 }
        );
      },

      // Phone tilt while a card is open (relative to the first reading)
      orient(gamma, beta) {
        const x = clamp(gamma, -16, 16);
        const y = clamp(beta, -18, 18);
        follow(
          { x: remap(x, -16, 16, 37, 63), y: remap(y, -18, 18, 33, 67) },
          { x: -x, y },
          { x: remap(x, -16, 16, 0, 100), y: remap(y, -18, 18, 0, 100), o: 1 }
        );
      },

      // Pointer left: after a pause, wobble slowly back to rest
      interactEnd(delay = 500) {
        clearTimeout(settleTimer.current);
        settleTimer.current = setTimeout(() => {
          s.rotate.tune(SETTLE); s.glare.tune(SETTLE); s.bg.tune(SETTLE);
          s.rotate.set({ x: 0, y: 0 });
          s.glare.set({ x: 50, y: 50, o: 0 });
          s.bg.set({ x: 50, y: 50 });
          kick();
        }, delay);
      },

      // Centre the card in the viewport (also used on resize)
      center() {
        const r = rootRef.current.getBoundingClientRect();
        const vw = document.documentElement.clientWidth;
        const vh = document.documentElement.clientHeight;
        s.move.set({ x: vw / 2 - r.left - r.width / 2, y: vh / 2 - r.top - r.height / 2 });
        kick();
      },

      // Open: fly to the centre, scale up, spin once the very first time
      popover() {
        const r = rootRef.current.getBoundingClientRect();
        const scale = Math.min((window.innerWidth / r.width) * 0.9, (window.innerHeight / r.height) * 0.9, 1.75);
        api.center();
        let delay = 100;
        if (firstPop.current && !reduceMotion) {
          s.spin.set({ x: 360, y: 0 });
          delay = 1000;
        }
        firstPop.current = false;
        s.scale.set({ v: scale }, { hard: reduceMotion });
        if (reduceMotion) s.move.set(s.move.target, { hard: true });
        api.interactEnd(delay);
        kick();
      },

      // Close: back to its place in the grid
      retreat() {
        s.scale.set({ v: 1 }, { hard: reduceMotion });
        s.move.set({ x: 0, y: 0 }, { hard: reduceMotion });
        s.spin.set({ x: 0, y: 0 }, { hard: reduceMotion });
        api.interactEnd(100);
        kick();
      },

      // A slow circular sweep so visitors see the foil without touching
      showcase(ms = 4000) {
        if (reduceMotion) return () => {};
        let r = 0;
        s.rotate.tune(SHOW); s.glare.tune(SHOW); s.bg.tune(SHOW);
        const id = setInterval(() => {
          r += 0.05;
          s.rotate.set({ x: Math.sin(r) * 18, y: Math.cos(r) * 18 });
          s.glare.set({ x: 55 + Math.sin(r) * 55, y: 55 + Math.cos(r) * 55, o: 0.8 });
          s.bg.set({ x: 20 + Math.sin(r) * 20, y: 20 + Math.cos(r) * 20 });
          kick();
        }, 20);
        const end = setTimeout(() => { clearInterval(id); api.interactEnd(0); }, ms);
        return () => { clearInterval(id); clearTimeout(end); };
      },
    }),
    [reduceMotion] // eslint-disable-line react-hooks/exhaustive-deps
  );

  useEffect(() => {
    write();
    return () => {
      cancelAnimationFrame(raf.current);
      clearTimeout(settleTimer.current);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return api;
}
