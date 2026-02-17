/* =========================================
   THEME TOGGLE (system-aware + persist)
========================================= */
(function () {
  const btn = document.getElementById("themeToggle");
  if (!btn) return;

  const KEY = "psa_theme";
  function apply(mode) {
    if (mode === "dark") { document.body.classList.add("theme-dark"); btn.textContent = "☀️"; }
    else { document.body.classList.remove("theme-dark"); btn.textContent = "🌙"; }
  }

  let mode = localStorage.getItem(KEY) ||
             (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
  apply(mode);

  btn.addEventListener("click", () => {
    mode = mode === "dark" ? "light" : "dark";
    apply(mode);
    localStorage.setItem(KEY, mode);
  });
})();