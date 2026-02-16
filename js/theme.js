/* =========================================
   THEME TOGGLE
========================================= */

const themeBtn = document.getElementById("themeToggle");

let darkMode = false;

themeBtn.addEventListener("click",()=>{
    darkMode = !darkMode;

    if(darkMode){
        document.body.style.background = "linear-gradient(135deg,#1e1e2f,#2b2b4f)";
        themeBtn.innerText = "☀️";
    } else {
        document.body.style.background = "linear-gradient(135deg,#ff9a9e,#fad0c4,#fbc2eb,#a18cd1)";
        themeBtn.innerText = "🌙";
    }
});
