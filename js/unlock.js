/* UNLOCK SYSTEM (mobile-safe + resilient) */
(function () {
  const unlockBtn       = document.getElementById("unlockBtn");
  const passcodeInput   = document.getElementById("passcode");
  const unlockScreenEl  = document.getElementById("unlockScreen");
  const cinematicIntro  = document.getElementById("cinematicIntro");
  const errorMsg        = document.getElementById("errorMsg");
  const mainContent     = document.getElementById("mainContent");

  const PASSCODE = "676425";
  let unlocking = false;

  function fadeOut(el, dur = 400) {
    el.style.transition = `opacity ${dur}ms ease`;
    el.style.opacity = "0";
    return new Promise(res => setTimeout(res, dur));
  }

  function runCinematicThenShowMain() {
    cinematicIntro.classList.remove("hidden");

    let done = false;

    const finish = () => {
      if (done) return;
      done = true;
      cinematicIntro.style.display = "none";
      mainContent.classList.remove("hidden");
      document.body.classList.add("no-bg");
    };

    cinematicIntro.addEventListener("animationend", finish, { once: true });
    setTimeout(finish, 3800);
  }

  async function doUnlock() {
    if (unlocking) return;
    unlocking = true;

    if (passcodeInput.value.trim() === PASSCODE) {
      await fadeOut(unlockScreenEl);
      unlockScreenEl.style.display = "none";
      runCinematicThenShowMain();
    } else {
      passcodeInput.classList.add("shake","error-glow");
      errorMsg.textContent = "Wrong passcode 💔";
      setTimeout(() => {
        passcodeInput.classList.remove("shake","error-glow");
        errorMsg.textContent = "";
        unlocking = false;
      }, 800);
    }
  }

  unlockBtn.addEventListener("click", doUnlock);
  passcodeInput.addEventListener("keydown", e => {
    if (e.key === "Enter") doUnlock();
  });
})();