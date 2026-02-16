/* =========================================
   MAIN APP CONTROLLER
========================================= */

document.getElementById("startStory").addEventListener("click",()=>{
    triggerConfetti();
    document.querySelectorAll("section").forEach(sec=>{
        sec.classList.add("section-hidden");
    });

    setTimeout(()=>{
        document.querySelectorAll("section").forEach(sec=>{
            sec.classList.add("section-show");
        });
    },300);
});
