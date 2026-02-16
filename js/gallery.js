/* =========================================
   SIMPLE SLIDESHOW GALLERY
========================================= */

const gallery = document.getElementById("gallery");

const images = [
    "assets/hero.jpg",
    "assets/back.jpg",
    "assets/hero.jpg"
];

let currentSlide = 0;

function renderGallery(){
    gallery.innerHTML = `
        <img src="${images[currentSlide]}" 
             style="width:100%;border-radius:15px;transition:all 0.5s;">
    `;
}

function nextSlide(){
    currentSlide = (currentSlide+1)%images.length;
    renderGallery();
}

setInterval(nextSlide,3000);
renderGallery();
