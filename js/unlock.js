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
        // 🎉 Success
        triggerConfetti();
        unlockScreen.style.opacity = "0";

        setTimeout(() => {
            unlockScreen.style.display = "none";
            cinematicIntro.classList.remove("hidden");

            // After cinematic animation
            setTimeout(() => {
                cinematicIntro.style.display = "none";
                document.getElementById("mainContent").classList.remove("hidden");
            }, 6000);

        }, 1000);

    } else {
        // ❌ Wrong
        passcodeInput.classList.add("shake","error-glow");
        errorMsg.innerText = "Wrong passcode 💔";

        setTimeout(() => {
            passcodeInput.classList.remove("shake","error-glow");
            errorMsg.innerText = "";
        }, 800);
    }
});
