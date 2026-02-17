/* =========================================
   SIMPLE SLIDESHOW GALLERY (lazy + fade)
========================================= */
const gallery = document.getElementById("gallery");
if (gallery) {
  const images = [
    "assets/hero.jpg",
    "assets/back.jpg",
    "assets/hero.jpg",
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

  let current = 0;
  let timer = null;

  gallery.style.position = "relative";
  gallery.style.minHeight = "200px";
  gallery.style.overflow = "hidden";

  function show(index) {
    const src = images[index % images.length];
    const img = new Image();
    img.loading = "lazy";
    img.alt = "Our memory photo";
    Object.assign(img.style, {
      position: "absolute", inset: "0", width: "100%", height: "100%",
      objectFit: "cover", opacity: "0", transition: "opacity .6s ease"
    });

    img.onload = () => {
      while (gallery.firstChild) gallery.removeChild(gallery.firstChild);
      gallery.appendChild(img);
      requestAnimationFrame(() => (img.style.opacity = "1"));
    };
    img.onerror = next;

    img.src = src;
  }

  function next() { current = (current + 1) % images.length; show(current); }

  function start() { if (!timer) timer = setInterval(next, 3000); }
  function stop()  { clearInterval(timer); timer = null; }

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) stop(); else start();
  });

  show(current);
  start();
}