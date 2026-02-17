document.getElementById("startStory")?.addEventListener("click", () => {
  try { typeof triggerConfetti === "function" && triggerConfetti(1100, 100); } catch {}
  setTimeout(() => { window.location.assign("confession.html"); }, 1000);
});