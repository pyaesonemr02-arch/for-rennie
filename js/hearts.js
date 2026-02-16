/* =========================================
   FLOATING HEARTS
========================================= */

const heartsContainer = document.getElementById("heartsContainer");

function createHeart() {
    const heart = document.createElement("div");
    heart.innerHTML = "💖";
    heart.style.position = "fixed";
    heart.style.left = Math.random()*100 + "vw";
    heart.style.bottom = "-50px";
    heart.style.fontSize = (Math.random()*20+20)+"px";
    heart.style.animation = `floatUp ${Math.random()*5+5}s linear forwards`;

    heartsContainer.appendChild(heart);

    setTimeout(()=>heart.remove(),8000);
}

setInterval(createHeart, 800);
