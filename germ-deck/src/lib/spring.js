// A tiny damped spring for objects of numbers, e.g. { x: 0, y: 0 }.
// Each frame: velocity += (stiffness * distance - damping * velocity) * dt
// Low damping relative to stiffness = bouncy; high = smooth.

export const clamp = (v, min = 0, max = 100) => Math.min(Math.max(v, min), max);
export const remap = (v, a1, a2, b1, b2) => b1 + ((b2 - b1) * (v - a1)) / (a2 - a1);

export class Spring {
  constructor(initial, { stiffness, damping }) {
    this.value = { ...initial };
    this.target = { ...initial };
    this.velocity = Object.fromEntries(Object.keys(initial).map((k) => [k, 0]));
    this.stiffness = stiffness;
    this.damping = damping;
  }

  tune({ stiffness, damping }) {
    this.stiffness = stiffness;
    this.damping = damping;
  }

  set(target, { hard = false } = {}) {
    Object.assign(this.target, target);
    if (hard) {
      Object.assign(this.value, target);
      for (const k in this.velocity) this.velocity[k] = 0;
    }
  }

  // Advance by dt frames (1 = one 60fps frame). Returns true while still moving.
  step(dt) {
    let moving = false;
    for (const k in this.value) {
      const dist = this.target[k] - this.value[k];
      this.velocity[k] += (this.stiffness * dist - this.damping * this.velocity[k]) * dt;
      this.value[k] += this.velocity[k] * dt;
      if (Math.abs(dist) < 0.01 && Math.abs(this.velocity[k]) < 0.01) {
        this.value[k] = this.target[k];
        this.velocity[k] = 0;
      } else {
        moving = true;
      }
    }
    return moving;
  }
}
