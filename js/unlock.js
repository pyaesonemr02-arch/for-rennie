/* =========================================
   UNLOCK SYSTEM
========================================= */

const unlockBtn = document.getElementById("unlockBtn");
const passcodeInput = document.getElementById("passcode");
const unlockScreen = document.getElementById("unlockScreen");
const cinematicIntro = document.getElementById("cinematicIntro");
const errorMsg = document.getElementById("errorMsg");

unlockBtn.addEventListener("click", () => {
    const code = passcodeInput.value.trim();

    if(code === "676425") {

    triggerConfetti();

    unlockScreen.classList.add("fade-out");

    setTimeout(() => {
        unlockScreen.style.display = "none";

        cinematicIntro.classList.remove("hidden");

        // Wait for animation to finish
        cinematicIntro.addEventListener("animationend", () => {
            cinematicIntro.style.display = "none";
            document.getElementById("mainContent")
            .classList.remove("hidden");
        }, { once: true });

    }, 800);
}
 else {
        // ❌ Wrong
        passcodeInput.classList.add("shake","error-glow");
        errorMsg.innerText = "Wrong passcode 💔";

        setTimeout(() => {
            passcodeInput.classList.remove("shake","error-glow");
            errorMsg.innerText = "";
        }, 800);
    }
});
