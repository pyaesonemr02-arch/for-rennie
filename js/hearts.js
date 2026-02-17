/* =========================================
   FLOATING HEARTS (mobile-safe + pause)
========================================= */
(() => {
  const heartsContainer = document.getElementById("heartsContainer");
  if (!heartsContainer) return;

  // Respect users who prefer less motion
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduceMotion) return;

  // Behind hero/UI (your hero overlay layers above it)
  heartsContainer.style.position = "fixed";
  heartsContainer.style.inset = "0";
  heartsContainer.style.pointerEvents = "none";
  heartsContainer.style.zIndex = "0";

  let intervalId = null;
  let period = matchMedia("(max-width: 480px)").matches ? 1200 : 800; // slower on mobile

  function createHeart() {
    const heart = document.createElement("div");
    heart.textContent = "💖";
    heart.style.position = "absolute";
    heart.style.left = (Math.random() * 100).toFixed(2) + "vw";
    heart.style.bottom = "-50px";
    heart.style.fontSize = (Math.random() * 20 + 20).toFixed(0) + "px";
    heart.style.animation = `floatUp ${(Math.random() * 5 + 5).toFixed(2)}s linear forwards`;
    heartsContainer.appendChild(heart);
    setTimeout(() => heart.remove(), 8000);
  }

  function start() { if (!intervalId) intervalId = setInterval(createHeart, period); }
  function stop()  { clearInterval(intervalId); intervalId = null; }

  // Pause when app is backgrounded (save battery)
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) stop();
    else start();
  });

  start();
})();