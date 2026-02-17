/* =========================================
   MAIN APP CONTROLLER
========================================= */

document.getElementById("startStory")?.addEventListener("click", () => {
  try { typeof triggerConfetti === "function" && triggerConfetti(1200, 120); } catch {}
  setTimeout(() => {
    window.location.href = "confession.html";
  }, 900); // brief moment to enjoy the confetti
});