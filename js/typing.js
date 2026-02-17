/* =========================================
   TYPING LOVE MESSAGES (mobile-friendly)
========================================= */
(function () {
  const el = document.getElementById("typingText");
  if (!el) return;

  const messages = [
    "Rennie, you are my sunshine ☀️",
    "You make my world beautiful 🌸",
    "Every moment with you feels magical ✨",
    "I love you more every single day 💖"
  ];

  let msgIndex = 0, charIndex = 0, running = true;
  el.classList.add("typing");

  function tick() {
    if (!running) return;
    const msg = messages[msgIndex];
    if (charIndex < msg.length) {
      el.textContent += msg[charIndex++];
      setTimeout(tick, 60);
    } else {
      setTimeout(() => { el.textContent = ""; charIndex = 0; msgIndex = (msgIndex + 1) % messages.length; tick(); }, 2000);
    }
  }

  document.addEventListener("visibilitychange", () => {
    running = !document.hidden;
    if (running && el.textContent.length === 0) { charIndex = 0; tick(); }
  });

  tick();
})();