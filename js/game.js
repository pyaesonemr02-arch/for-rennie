/* =========================================
   MINI HEART CLICK GAME
========================================= */

const scoreEl = document.getElementById("score");
const startGameBtn = document.getElementById("startGame");

let score = 0;
let gameInterval;

startGameBtn.addEventListener("click",()=>{
    score = 0;
    scoreEl.innerText = score;

    gameInterval = setInterval(()=>{
        spawnHeart();
    },800);

    setTimeout(()=>{
        clearInterval(gameInterval);
        alert("Game Over 💖 Final Score: "+score);
    },10000);
});

function spawnHeart(){
    const heart = document.createElement("div");
    heart.innerHTML = "💘";
    heart.style.position="fixed";
    heart.style.left=Math.random()*100+"vw";
    heart.style.top=Math.random()*100+"vh";
    heart.style.fontSize="30px";
    heart.style.cursor="pointer";

    heart.onclick=()=>{
        score++;
        scoreEl.innerText=score;
        heart.remove();
    };

    document.body.appendChild(heart);

    setTimeout(()=>heart.remove(),2000);
}
