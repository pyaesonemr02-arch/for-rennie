/* =========================================
   SIMPLE SLIDESHOW GALLERY
========================================= */

const gallery = document.getElementById("gallery");

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