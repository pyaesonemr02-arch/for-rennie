/* =========================================
   Minimal Cross‑Fade Gallery (3s per photo)
   - Two stacked <img> layers
   - Cross-fade + tiny drift
   - Keeps border/ratio fixed by CSS
========================================= */
(function () {
  const gallery = document.getElementById("gallery");
  if (!gallery) return;

  // Prevent double init
  if (gallery.dataset.init === "1") return;
  gallery.dataset.init = "1";

  const images = [
    "assets/hero.jpg",
    "assets/back.jpg",
    "assets/back1.jpg",
    "assets/back2.jpg",
    "assets/back3.jpg",
    "assets/back4.jpg",
    "assets/back5.jpg",
    "assets/back6.jpg",
    "assets/back7.jpg",
    "assets/back8.jpg",
    "assets/back9.jpg",
    "assets/back10.jpg",
    "assets/back11.jpg",
    "assets/back12.jpg",
    "assets/back13.jpg",
    "assets/back14.jpg",
  ];

  // Build two layers once
  gallery.innerHTML = "";
  const a = document.createElement("img");
  const b = document.createElement("img");
  gallery.appendChild(a);
  gallery.appendChild(b);

  let current = 0;
  let showA = true;

  // Paint first image instantly
  a.src = images[current];
  a.classList.add("is-active");

  function next() {
    current = (current + 1) % images.length;

    const active = showA ? b : a;   // the one we are going to fade in
    const idle   = showA ? a : b;   // the one currently visible

    // Preload next, then cross-fade
    const img = new Image();
    img.src = images[current];
    img.onload = () => {
      active.src = img.src;
      // reset start pose to ensure the transform animates
      active.classList.remove("is-active");
      // next frame: fade in active, fade out idle
      requestAnimationFrame(() => {
        idle.classList.remove("is-active");
        active.classList.add("is-active");
        showA = !showA;
      });
    };
  }

  // 3s display + ~0.7s transition (feel free to tweak)
  setInterval(next, 3000);
})();
