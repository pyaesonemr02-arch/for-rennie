/* =========================================
  UNLOCK BACKGROUND PARTICLES (mobile-light)
  - Gentle floating dots behind Unlock overlay
  - Respects prefers-reduced-motion
  - DPR clamped for performance
========================================= */
(function () {
  const canvas = document.getElementById('unlockParticles');
  if (!canvas) return;

  // Respect reduced motion
  const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce) return;

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const DPR = Math.min(1.5, Math.max(1, window.devicePixelRatio || 1));
  const state = {
    particles: [],
    count: Math.max(20, Math.floor(window.innerWidth / 28)), // light & responsive
    raf: null
  };

  function resize() {
    const w = window.innerWidth, h = window.innerHeight;
    canvas.width  = Math.floor(w * DPR);
    canvas.height = Math.floor(h * DPR);
    canvas.style.width  = w + 'px';
    canvas.style.height = h + 'px';
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
  }

  class P {
    constructor(spawnAnywhere) { this.reset(spawnAnywhere); }
    reset(spawnAnywhere) {
      this.x = Math.random() * window.innerWidth;
      this.y = spawnAnywhere ? Math.random() * window.innerHeight : window.innerHeight + 20;
      this.r = Math.random() * 1.6 + 0.6;
      this.vy = -(Math.random() * 0.22 + 0.08);     // slow float up
      this.vx = (Math.random() - 0.5) * 0.12;       // tiny drift
      this.base = Math.random() * 0.5 + 0.3;        // base opacity
      this.alpha = this.base;
      this.pulse = Math.random() * 0.003 + 0.0015;  // subtle twinkle
      this.hue = 285 + Math.random() * 40;          // pink/purple range
    }
    step(t) {
      this.y += this.vy; this.x += this.vx;
      this.alpha = this.base * (0.85 + Math.sin(t * this.pulse) * 0.15);
      if (this.y < -20 || this.x < -40 || this.x > window.innerWidth + 40) this.reset(false);
    }
    draw() {
      ctx.beginPath();
      ctx.fillStyle = `hsla(${this.hue}, 100%, 80%, ${this.alpha})`;
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  function init() {
    state.particles = Array.from({ length: state.count }, () => new P(true));
  }

  function render(t = 0) {
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    for (const p of state.particles) { p.step(t); p.draw(); }
    state.raf = requestAnimationFrame(render);
  }

  function start() { if (!state.raf) state.raf = requestAnimationFrame(render); }
  function stop()  { if (state.raf) cancelAnimationFrame(state.raf); state.raf = null; }

  // Boot
  resize(); init(); start();

  // Responsive & battery friendly
  window.addEventListener('resize', resize);
  document.addEventListener('visibilitychange', () => document.hidden ? stop() : start());
})();