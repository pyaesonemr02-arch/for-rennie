/* =========================================
   TIME SINCE WE MET
========================================= */

const countdownEl = document.getElementById("countdown");

// Change this date to your real anniversary
const startDate = new Date("2023-01-01T00:00:00");

function updateCountdown(){
    const now = new Date();
    const diff = now - startDate;

    const days = Math.floor(diff/(1000*60*60*24));
    const hours = Math.floor((diff/(1000*60*60))%24);
    const minutes = Math.floor((diff/1000/60)%60);
    const seconds = Math.floor((diff/1000)%60);

    countdownEl.innerHTML = `
        ${days} Days 💕
        ${hours} Hours 💕
        ${minutes} Minutes 💕
        ${seconds} Seconds
    `;
}

setInterval(updateCountdown,1000);
updateCountdown();
