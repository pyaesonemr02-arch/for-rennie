/* ================================
   CONFESSION PAGE CONTROLLER
   - Locks scroll until the text finishes entering
   - Gentle background particles (mobile-optimized)
   - Slower timings for a more cinematic feel
================================ */
(function () {
  const html = document.documentElement;
  const body = document.body;
  const para = document.getElementById('confessionText');
  const canvas = document.getElementById('particles');

  /* 1) Lock scroll during entrance */
  const lockScroll = () => { html.classList.add('no-scroll'); body.classList.add('no-scroll'); };
  const unlockScroll = () => { html.classList.remove('no-scroll'); body.classList.remove('no-scroll'); };
  lockScroll();

  /* 2) Unlock after the CSS animation ends (with a safe fallback) */
  const done = () => unlockScroll();
  if (para) {
    // Unlock as soon as the text animation finishes
    para.addEventListener('animationend', done, { once: true });
    // Fallback in case the event is missed (e.g., motion settings changed mid-run)
    setTimeout(done, 3000); // matches ~2.4s animation + margin
  } else {
    // If the paragraph isn't found, fail open
    unlockScroll();
  }

  /* 3) Gentle particles behind the text (respect reduced motion) */
  const reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!canvas || reduceMotion) return;

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  // Clamp device pixel ratio for mobile performance
  const DPR = Math.min(1.5, Math.max(1, window.devicePixelRatio || 1));

  const state = {
    particles: [],
    // Slightly fewer for a calmer, slower background field
    count: Math.max(16, Math.floor(window.innerWidth / 34)),
    raf: null
  };

  function resize() {
    const w = window.innerWidth;
    const h = window.innerHeight;
    canvas.width  = Math.floor(w * DPR);
    canvas.height = Math.floor(h * DPR);
    canvas.style.width  = w + 'px';
    canvas.style.height = h + 'px';
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
  }

  class Particle {
    constructor() { this.reset(true); }
    reset(randomY = false) {
      this.x = Math.random() * window.innerWidth;
      this.y = randomY ? Math.random() * window.innerHeight
                       : window.innerHeight + Math.random() * 40;
      this.r = Math.random() * 1.6 + 0.6;
      // Slower upward float
      this.vy = -(Math.random() * 0.18 + 0.08);
      this.vx = (Math.random() - 0.5) * 0.12; // tiny sideways drift
      this.alphaBase = Math.random() * 0.55 + 0.25;
      this.alpha = this.alphaBase;
      this.pulse = Math.random() * 0.003 + 0.0015; // gentle twinkle cadence
      this.hue = 285 + Math.random() * 40; // purple-pink range
    }
    step(t) {
      this.y += this.vy;
      this.x += this.vx;
      // Soft twinkle
      this.alpha = this.alphaBase * (0.85 + Math.sin(t * this.pulse) * 0.15);
      if (this.y < -20 || this.x < -40 || this.x > window.innerWidth + 40) this.reset(false);
    }
    draw() {
      ctx.beginPath();
      ctx.fillStyle = `hsla(${this.hue}, 100%, 80%, ${this.alpha})`;
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  function initParticles() {
    state.particles = Array.from({ length: state.count }, () => new Particle());
  }

  function render(t = 0) {
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    for (const p of state.particles) { p.step(t); p.draw(); }
    state.raf = requestAnimationFrame(render);
  }

  function start() { if (!state.raf) state.raf = requestAnimationFrame(render); }
  function stop()  { if (state.raf) cancelAnimationFrame(state.raf); state.raf = null; }

  // Init
  resize();
  initParticles();
  start();

  // Keep responsive & battery-friendly
  window.addEventListener('resize', resize);
  document.addEventListener('visibilitychange', () => document.hidden ? stop() : start());
})();