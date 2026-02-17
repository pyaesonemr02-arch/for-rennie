/* =========================================
  BACKGROUND MUSIC (audio-only)
  - Works with <audio id="bgMusic" ... loop></audio>
  - Supports a toggle button with id="musicToggle" (Mode A)
  - Optional global function toggleMusic() (Mode B)
  - Handles mobile autoplay restrictions (needs user gesture)
  - Light fade in/out for polish
========================================= */
(function () {
  const audio = document.getElementById("bgMusic");
  if (!audio) {
    console.warn("[music] #bgMusic <audio> not found.");
    return;
  }

  // --- Config ---
  const FADE_MS = 250;          // fade duration (ms)
  const DEFAULT_VOL = 0.6;      // initial volume when playing
  const STORAGE_KEY = "psa_music_playing"; // remember state across pages (optional)

  let playing = false;
  let fadeTimer = null;

  // Small fade helper
  function fadeTo(target, ms = FADE_MS) {
    clearInterval(fadeTimer);
    const start = audio.volume;
    const delta = target - start;
    const steps = Math.max(1, Math.round(ms / 20));
    let i = 0;

    fadeTimer = setInterval(() => {
      i++;
      const t = i / steps;
      audio.volume = start + delta * t;
      if (i >= steps) {
        clearInterval(fadeTimer);
        audio.volume = target;
      }
    }, 20);
  }

  async function playMusic() {
    try {
      audio.volume = 0;
      const p = audio.play();
      if (p && typeof p.then === "function") {
        await p;
      }
      fadeTo(DEFAULT_VOL);
      playing = true;
      rememberState(true);
      updateToggleUI();
    } catch (e) {
      // Autoplay blocked until user interacts; button press should allow it.
      console.warn("[music] Unable to start audio until user interacts.", e);
      playing = false;
      rememberState(false);
      updateToggleUI();
    }
  }

  function pauseMusic() {
    fadeTo(0);
    setTimeout(() => {
      audio.pause();
      playing = false;
      rememberState(false);
      updateToggleUI();
    }, FADE_MS);
  }

  // ----- Mode A: Use #musicToggle button (recommended) -----
  const btn = document.getElementById("musicToggle");
  function updateToggleUI() {
    if (!btn) return;
    btn.setAttribute("aria-pressed", playing ? "true" : "false");
    btn.textContent = playing ? "🎵 Pause Music" : "🎵 Play Music";
  }
  if (btn) {
    btn.addEventListener(
      "click",
      async () => {
        if (!playing) await playMusic();
        else pauseMusic();
      },
      { passive: true }
    );
  }

  // ----- Mode B: Optional global function toggleMusic() -----
  // If your HTML calls onclick="toggleMusic()", expose it:
  if (!window.toggleMusic) {
    window.toggleMusic = async function () {
      if (!playing) await playMusic();
      else pauseMusic();
    };
  }

  // ----- Persist state across pages (optional) -----
  function rememberState(isPlaying) {
    try {
      localStorage.setItem(STORAGE_KEY, isPlaying ? "1" : "0");
    } catch {}
  }
  function loadState() {
    try {
      return localStorage.getItem(STORAGE_KEY) === "1";
    } catch {
      return false;
    }
  }

  // ----- Restore state after a user gesture -----
  // Many mobile browsers require a gesture before audio playback.
  // We listen to the first interaction and start if the user had music on.
  const wantPlay = loadState();
  function onFirstGesture() {
    document.removeEventListener("click", onFirstGesture, true);
    document.removeEventListener("touchstart", onFirstGesture, true);
    if (wantPlay) {
      playMusic(); // will succeed after gesture
    } else {
      audio.volume = DEFAULT_VOL; // set a sane volume for when they toggle
      updateToggleUI();
    }
  }
  document.addEventListener("click", onFirstGesture, true);
  document.addEventListener("touchstart", onFirstGesture, true);

  // ----- Save battery: pause when tab hidden; resume when visible (optional) -----
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      if (playing) {
        audio.pause(); // pause silently; keep state
      }
    } else {
      // Resume only if user intended it to play
      if (playing) {
        playMusic();
      }
    }
  });

  // Initial UI sync
  updateToggleUI();
})();