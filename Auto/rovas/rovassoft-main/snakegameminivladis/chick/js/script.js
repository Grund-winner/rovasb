// js/script.js
// Clean, non-malicious game logic for CHICKY RUN
// - Handles Start button, center GIF, arrow counter, modal reset
// - Spawns decorative clouds and moving stripes
// No network calls, no telemetry, no external tokens.

(() => {
  // Elements from the HTML
  const centerGif = document.getElementById("centerGif");
  const startButton = document.getElementById("startButton");
  const counterContainer = document.getElementById("counterContainer");
  const modal = document.getElementById("gameEndModal");
  const modalOverlay = document.getElementById("modalOverlay");
  const modalOkButton = document.getElementById("modalOkButton");
  const cloudContainer = document.getElementById("cloudContainer");
  const stripeContainer = document.getElementById("stripe-container");

  // Simple GIF set used by original obfuscated script
  const gifs = ["images/chicks.gif", "images/chicks.gif#left"]; // keep these names so your assets still match

  // Build 11 arrow placeholders (same as original)
  let clickCount = 0;
  for (let i = 0; i < 11; i++) {
    const arrow = document.createElement("div");
    arrow.className = "arrow";
    counterContainer.appendChild(arrow);
  }

  // Helper: activate an arrow at index with direction ('left'|'right')
  function setArrowActive(index, dir) {
    const child = counterContainer.children[index];
    if (!child) return;
    child.className = `arrow ${dir} active`;
    child.innerHTML = dir === "left" ? "&#10094;" : "&#10095;"; // ‹ or ›
  }

  // Helper: reset all arrows
  function resetArrows() {
    Array.from(counterContainer.children).forEach(c => {
      c.className = "arrow";
      c.innerHTML = "";
    });
  }

  // Start button logic (keeps only gameplay UI logic)
  startButton.addEventListener("click", () => {
    if (clickCount >= 11) return;

    // pick a gif randomly (left.gif or right.gif)
    const choice = gifs[Math.floor(Math.random() * gifs.length)];

    // show bigger GIF briefly
    centerGif.src = choice;
    centerGif.style.width = "320px";
    centerGif.style.height = "auto";

    // mark arrow (left / right)
    const dir = choice.includes("left") ? "left" : "right";
    setArrowActive(clickCount, dir);

    clickCount++;

    // when done, show modal after small delay and reset state on OK
    if (clickCount === 11) {
      setTimeout(() => {
        modal.classList.add("active");
        modalOverlay.classList.add("active");
      }, 4050);
    }

    // after the same delay, return GIF to default chicks.gif and size
    setTimeout(() => {
      centerGif.src = "images/chicks.gif";
      centerGif.style.width = "150px";
      centerGif.style.height = "auto";
    }, 4050);
  });

  // Modal OK resets the game UI (no external actions)
  modalOkButton.addEventListener("click", () => {
    modal.classList.remove("active");
    modalOverlay.classList.remove("active");
    clickCount = 0;
    resetArrows();
  });

  // -------- Decorative: Clouds ----------
  function createCloud() {
    const cloud = document.createElement("div");
    cloud.className = "cloud";

    // random size and vertical position
    const width = 60 + Math.random() * 80; // px
    cloud.style.width = `${width}px`;
    cloud.style.height = `${width / 2}px`;
    cloud.style.top = `${10 + Math.random() * 60}%`; // not strictly tied to top container
    cloud.style.left = `-${width}px`; // start off-screen left

    // random travel time
    const duration = 15 + Math.random() * 10; // seconds
    cloud.style.animationDuration = `${duration}s`;
    // slightly randomize opacity
    cloud.style.opacity = `${0.75 + Math.random() * 0.25}`;

    cloudContainer.appendChild(cloud);

    // Remove after its animation completes
    setTimeout(() => cloud.remove(), duration * 1000 + 500);
  }

  // Start some clouds and continue spawning
  for (let i = 0; i < 5; i++) createCloud();
  setInterval(createCloud, 3000);

  // -------- Decorative: Moving Stripes ----------
  function spawnStripe() {
    const stripe = document.createElement("div");
    stripe.className = "stripe";

    // position stripe randomly across screen width
    const leftPerc = Math.random() * 100;
    stripe.style.left = `${leftPerc}%`;

    // random height & animation duration for variety
    const h = 15 + Math.random() * 30; // percent-ish of container, CSS handles conversion
    stripe.style.height = `${h}%`;
    const duration = 1.5 + Math.random() * 2.5; // seconds
    stripe.style.animationDuration = `${duration}s`;

    stripeContainer.appendChild(stripe);

    // Remove once it's off-screen (duration * 1s, but give small buffer)
    setTimeout(() => stripe.remove(), duration * 1000 + 300);
  }

  // spawn stripes at short intervals for continuous effect
  setInterval(spawnStripe, 250);
  // prefill some stripes
  for (let i = 0; i < 12; i++) setTimeout(spawnStripe, i * 150);

  // Ensure game keeps clean state on page unload (optional safety)
  window.addEventListener("beforeunload", () => {
    clickCount = 0;
    resetArrows();
  });

})();
