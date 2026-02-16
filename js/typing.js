/* =========================================
   TYPING LOVE MESSAGES
========================================= */

const typingEl = document.getElementById("typingText");

const messages = [
    "Rennie, you are my sunshine ☀️",
    "You make my world beautiful 🌸",
    "Every moment with you feels magical ✨",
    "I love you more every single day 💖"
];

let msgIndex = 0;
let charIndex = 0;

function typeMessage(){
    if(charIndex < messages[msgIndex].length){
        typingEl.innerHTML += messages[msgIndex][charIndex];
        charIndex++;
        setTimeout(typeMessage,60);
    } else {
        setTimeout(()=>{
            typingEl.innerHTML = "";
            charIndex = 0;
            msgIndex = (msgIndex+1)%messages.length;
            typeMessage();
        },2000);
    }
}

typeMessage();
