/* =========================================
   BACKGROUND MUSIC CONTROLLER
========================================= */

const bgMusic = document.getElementById("bgMusic");

let musicPlaying = false;

function toggleMusic() {
    if(musicPlaying){
        bgMusic.pause();
        musicPlaying = false;
    } else {
        bgMusic.play();
        musicPlaying = true;
    }
}

document.addEventListener("click",()=>{
    // Allow autoplay after interaction
    if(!musicPlaying){
        bgMusic.volume = 0.5;
    }
});
