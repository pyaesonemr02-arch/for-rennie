/* =========================================
   TIME SINCE WE MET (local TZ + padding)
========================================= */
const countdownEl = document.getElementById("countdown");

// Local fixed date: June 6, 2024 00:00 (month is 0-based: 5=June)
const startDate = new Date(2024, 5, 6, 0, 0, 0);

function pad(n) { return String(n).padStart(2, "0"); }

function updateCountdown() {
  const diff = Date.now() - startDate.getTime();
  const days    = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours   = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);
  countdownEl.textContent = `${days} Days 💕  ${pad(hours)} Hours  ${pad(minutes)} Minutes  ${pad(seconds)} Seconds`;
}

updateCountdown();
setInterval(updateCountdown, 1000);