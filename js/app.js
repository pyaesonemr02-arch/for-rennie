document.getElementById("startStory")?.addEventListener("click", () => {
  try { typeof triggerConfetti === "function" && triggerConfetti(900, 100); } catch {}
  setTimeout(() => { window.location.href = "confession.html"; }, 800);
});