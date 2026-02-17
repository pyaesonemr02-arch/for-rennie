/* =========================================
   CURSOR HEART TRAIL (throttled + touch-safe)
========================================= */
(function () {
  const isTouch = matchMedia("(pointer: coarse)").matches;
  if (isTouch) return; // disable by default on phones/tablets

  let last = 0;
  document.addEventListener("mousemove", (e) => {
    const now = performance.now();
    if (now - last < 40) return; // ~25 fps throttle
    last = now;

    const heart = document.createElement("div");
    heart.textContent = "💗";
    Object.assign(heart.style, {
      position: "fixed",
      left: e.clientX + "px",
      top: e.clientY + "px",
      transform: "translate(-50%,-50%)",
      pointerEvents: "none",
      fontSize: "15px",
      opacity: "0.85",
      transition: "transform .5s ease, opacity .5s ease",
      willChange: "transform, opacity",
      zIndex: 9999
    });
    document.body.appendChild(heart);
    requestAnimationFrame(() => {
      heart.style.transform = "translate(-50%,-80%) scale(1.15)";
      heart.style.opacity = "0";
    });
    setTimeout(() => heart.remove(), 500);
  });
})();