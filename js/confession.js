/* ================================
   CONFESSION PAGE CONTROLLER
================================ */
(function () {
  const html = document.documentElement;
  const body = document.body;
  const para = document.getElementById('confessionText');
  const canvas = document.getElementById('particles');

  /* Lock scroll during animation */
  const lockScroll = () => {
    html.classList.add('no-scroll');
    body.classList.add('no-scroll');
  };
  const unlockScroll = () => {
    html.classList.remove('no-scroll');
    body.classList.remove('no-scroll');
  };
  lockScroll();

  /* Unlock after animation finishes */
  para?.addEventListener('animationend', () => {
    unlockScroll();
  }, { once: true });

  /* Gentle particles (mobile-optimized) */
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!reduceMotion && canvas.getContext) {
    const ctx = canvas.getContext('2d');
    const DPR = Math.min(1.5, window.devicePixelRatio || 1);
    let particles = [];

    function resize() {
      canvas.width = innerWidth * DPR;
      canvas.height = innerHeight * DPR;
      canvas.style.width = innerWidth + "px";
      canvas.style.height = innerHeight + "px";
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    }

    class Particle {
      constructor(randomY = true) {
        this.reset(randomY);
      }
      reset(randomY) {
        this.x = Math.random() * innerWidth;
        this.y = randomY ? Math.random() * innerHeight : innerHeight + 20;
        this.r = Math.random() * 1.4 + 0.6;
        this.vy = -(Math.random() * 0.25 + 0.10);
        this.vx = (Math.random() - 0.5) * 0.15;
        this.alpha = Math.random() * 0.5 + 0.3;
      }
      update() {
        this.y += this.vy;
        this.x += this.vx;
        if (this.y < -20) this.reset(false);
      }
      draw() {
        ctx.beginPath();
        ctx.fillStyle = `hsla(295, 100%, 80%, ${this.alpha})`;
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    function render() {
      ctx.clearRect(0, 0, innerWidth, innerHeight);
      particles.forEach(p => {
        p.update();
        p.draw();
      });
      requestAnimationFrame(render);
    }

    /* Initialize particles */
    resize();
    particles = Array.from({ length: Math.floor(innerWidth / 35) },
      () => new Particle(true));

    render();
    addEventListener("resize", resize);
  }
})();