/* =========================================
   CURSOR HEART TRAIL
========================================= */

document.addEventListener("mousemove",(e)=>{
    const heart = document.createElement("div");
    heart.innerHTML="💗";
    heart.style.position="fixed";
    heart.style.left=e.clientX+"px";
    heart.style.top=e.clientY+"px";
    heart.style.pointerEvents="none";
    heart.style.fontSize="15px";
    heart.style.opacity="0.8";

    document.body.appendChild(heart);

    setTimeout(()=>heart.remove(),500);
});
