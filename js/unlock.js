/* =========================================
  UNLOCK SYSTEM (mobile-safe + resilient)
  - Session timeout support (time-based + optional inactivity)
  - Skips unlock if a valid session exists (localStorage flag + expiry)
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

  // ===== CONFIGURE YOUR SESSION TIMEOUT HERE =====
  const PASSCODE        = "676425";       // Your secret code
  const SESSION_MIN     = 30;             // Session length in minutes (change as needed)
  const USE_INACTIVITY  = true;           // Reset expiry on user activity; if false, fixed duration
  const LS_KEY_UNLOCKED = "psa_unlocked"; // "1" when unlocked
  const LS_KEY_EXPIRES  = "psa_unlock_expires"; // timestamp (ms) when session should expire

  let unlocking  = false;

  /** Utilities */
  const nowMs = () => Date.now();
  const minutesToMs = (m) => m * 60 * 1000;
  const setSessionExpiry = (minutes = SESSION_MIN) => {
    const expiresAt = nowMs() + minutesToMs(minutes);
    try { localStorage.setItem(LS_KEY_EXPIRES, String(expiresAt)); } catch {}
    return expiresAt;
  };
  const getSessionExpiry = () => {
    const raw = localStorage.getItem(LS_KEY_EXPIRES);
    return raw ? Number(raw) : 0;
  };
  const isSessionValid = () => {
    const unlocked = localStorage.getItem(LS_KEY_UNLOCKED) === "1";
    const expiresAt = getSessionExpiry();
    return unlocked && expiresAt > nowMs();
  };
  const clearSession = () => {
    try {
      localStorage.removeItem(LS_KEY_UNLOCKED);
      localStorage.removeItem(LS_KEY_EXPIRES);
    } catch {}
  };

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
      // Optional: keep or remove depending on your styling needs
      document.body.classList.add("no-bg");
    };

    cinematicIntro.addEventListener("animationend", finish, { once: true });
    setTimeout(finish, 3800);
  }

  /** Show unlock screen (and hide main) */
  function showUnlock() {
    // Clear session flags to be safe
    clearSession();
    if (unlockScreenEl) {
      unlockScreenEl.style.display = "";
      unlockScreenEl.classList.remove("hidden");
      unlockScreenEl.style.opacity = "1";
    }
    if (mainContent) {
      mainContent.classList.add("hidden");
    }
  }

  /** Hide unlock and show main (used when session valid) */
  function bypassUnlockToMain() {
    if (unlockScreenEl) {
      unlockScreenEl.style.display = "none";
      unlockScreenEl.classList.add("hidden");
    }
    if (mainContent) {
      mainContent.classList.remove("hidden");
    }
  }

  /** Inactivity extension: update expiry on user activity (optional) */
  function wireInactivityExtension() {
    if (!USE_INACTIVITY) return;
    const bumpExpiry = () => setSessionExpiry(SESSION_MIN);
    // Lightweight activity events — extend session on interaction
    ["click", "keydown", "touchstart", "scroll"].forEach(evt =>
      document.addEventListener(evt, bumpExpiry, { passive: true })
    );

    // If tab is hidden for a long time, session timer still runs out naturally.
    // When user returns, we'll re-check validity.
    document.addEventListener("visibilitychange", () => {
      if (!document.hidden && !isSessionValid()) {
        showUnlock();
      }
    });
  }

  /** Boot: If session is valid, skip unlock; else show lock */
  if (isSessionValid()) {
    bypassUnlockToMain();
    wireInactivityExtension();
    return; // Done booting; no need to wire unlock interactions
  } else {
    showUnlock();
  }

  /** Core unlock flow */
  async function doUnlock() {
    if (unlocking) return;
    unlocking = true;

    if ((passcodeInput?.value || "").trim() === PASSCODE) {
      // Persist "unlocked" + set session expiry
      try { localStorage.setItem(LS_KEY_UNLOCKED, "1"); } catch {}
      setSessionExpiry(SESSION_MIN);

      // Optional: activity-based extension
      wireInactivityExtension();

      // Hide the lock screen smoothly, then run intro and show main
      await fadeOut(unlockScreenEl, 400);
      if (unlockScreenEl) {
        unlockScreenEl.style.display = "none";
        unlockScreenEl.classList.add("hidden");
      }
      runCinematicThenShowMain();
    } else {
      // Wrong code: shake + glow + message
      if (passcodeInput) {
        passcodeInput.classList.add("shake", "error-glow");
      }
      if (errorMsg) {
        errorMsg.textContent = "Wrong passcode 💔";
      }
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

  // ===== Optional: scheduled re-check (e.g., every minute) =====
  // This will auto-pop the unlock if the session expires while user stays on the page.
  setInterval(() => {
    if (!isSessionValid()) {
      showUnlock();
    }
  }, 60 * 1000); // check every 60s
})();
``