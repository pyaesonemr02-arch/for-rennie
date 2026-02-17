/* =========================================
  UNLOCK SYSTEM (session-only + resilient)
  - Skips unlock screen during the current tab session only
  - Cinematic intro after successful unlock
  - Shake + glow feedback on wrong passcode
  - Enter key submits
========================================= */
(function () {
  const unlockBtn       = document.getElementById("unlockBtn");
  const passcodeInput   = document.getElementById("passcode");
  const unlockScreenEl  = document.getElementById("unlockScreen");
  const cinematicIntro  = document.getElementById("cinematicIntro");
  const errorMsg        = document.getElementById("errorMsg");
  const mainContent     = document.getElementById("mainContent");

  const PASSCODE = "676425";            // your secret code
  const SS_KEY   = "psa_unlocked";      // sessionStorage key
  let unlocking  = false;

  /** Small fade-out helper */
  function fadeOut(el, dur = 400) {
    if (!el) return Promise.resolve();
    el.style.transition = `opacity ${dur}ms ease`;
    el.style.opacity = "0";
    return new Promise(res => setTimeout(res, dur));
  }

  /** After unlock: play the cinematic intro, then show main content */
  function runCinematicThenShowMain() {
    if (!cinematicIntro || !mainContent) return;

    cinematicIntro.classList.remove("hidden");
    let done = false;

    const finish = () => {
      if (done) return;
      done = true;
      // Ensure cinematic intro vanishes completely
      cinematicIntro.style.display = "none";
      cinematicIntro.classList.add("hidden");
      // Reveal main content
      mainContent.classList.remove("hidden");
      // Optional: tweak body state if you used this elsewhere
      document.body.classList.add("no-bg");
    };

    // End when CSS animation ends or after a safe fallback delay
    cinematicIntro.addEventListener("animationend", finish, { once: true });
    setTimeout(finish, 3800);
  }

  /** ✅ Session-only bypass:
   * If the current tab session is already unlocked, skip the lock screen.
   * (This does NOT persist across tab/browser restarts.)
   */
  const alreadyUnlocked = sessionStorage.getItem(SS_KEY) === "1";
  if (alreadyUnlocked) {
    if (unlockScreenEl) {
      unlockScreenEl.style.display = "none";
      unlockScreenEl.classList.add("hidden");
    }
    if (mainContent) mainContent.classList.remove("hidden");
    return; // Stop here; no need to wire interactions
  }

  /** Core unlock flow */
  async function doUnlock() {
    if (unlocking) return;
    unlocking = true;

    if ((passcodeInput?.value || "").trim() === PASSCODE) {
      // Store flag only for this session
      try { sessionStorage.setItem(SS_KEY, "1"); } catch {}

      // Hide the lock screen smoothly, then run the intro and show main
      await fadeOut(unlockScreenEl, 400);
      if (unlockScreenEl) {
        unlockScreenEl.style.display = "none";
        unlockScreenEl.classList.add("hidden");
      }
      runCinematicThenShowMain();
    } else {
      // Wrong code: shake + glow + message
      passcodeInput?.classList.add("shake", "error-glow");
      if (errorMsg) { errorMsg.textContent = "Wrong passcode 💔"; }
      setTimeout(() => {
        passcodeInput?.classList.remove("shake", "error-glow");
        if (errorMsg) errorMsg.textContent = "";
        unlocking = false;
      }, 800);
    }
  }

  /** Wire up interactions (button + Enter key) */
  unlockBtn?.addEventListener("click", doUnlock);
  passcodeInput?.addEventListener("keydown", e => {
    if (e.key === "Enter") doUnlock();
  });
})();