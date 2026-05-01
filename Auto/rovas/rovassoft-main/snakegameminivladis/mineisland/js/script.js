
// Kangaroo Jump — Clean, Optimized Core Game Logic
// Keeps original sprites: 'kengu.png' (default) and 'kenguzerk.png' (for 3x jump)
// Keeps platform tiles: plitka1.png / plitka2.png / plitka3.png
// Removes: telemetry, domain gating, anti-debug code, Telegram bot, webcam, secret modes, noisy logs.

(function () {
  "use strict";

  // ---------- DOM ----------
  document.addEventListener("DOMContentLoaded", () => {
    const kangaroo = document.getElementById("kangaroo");
    const platformsRoot = document.getElementById("platform-container");
    const playBtn = document.getElementById("play-button");

    if (!kangaroo || !platformsRoot || !playBtn) {
      console.error("[KangarooJump] Missing required elements: #kangaroo, #platform-container, #play-button");
      return;
    }

    // ---------- Assets (preload) ----------
    const imgDefault = new Image();
    imgDefault.src = "https://entypublic.github.io/snakegameminivladis/mineisland/kengu.png";
    const imgZerk = new Image();
    imgZerk.src = "https://entypublic.github.io/snakegameminivladis/mineisland/kenguzerk.png";

    // ---------- State ----------
    const isMobile = window.innerWidth < 768;
    const START_POS = { x: isMobile ? 80 : 120, y: 80 };
    const COEFFS = [1.1, 1.2, 1.5, 2, 3, 5, 10, 20, 50, 100];

    let kangarooPos = { ...START_POS };
    let platformEls = [];
    let usedPlatforms = new Set();
    let jumping = false;

    // ---------- Helpers ----------
    const plitkaFor = (coef) => {
      if (coef <= 2) return "https://entypublic.github.io/snakegameminivladis/mineisland/plitka1.png";
      if (coef <= 10) return "https://entypublic.github.io/snakegameminivladis/mineisland/plitka2.png";
      return "https://entypublic.github.io/snakegameminivladis/mineisland/plitka3.png";
    };

    // Arrange platforms along a nice arc, scaled by viewport
    function computePlatformsLayout() {
      const vw = window.innerWidth;
      const vh = window.innerHeight;

      const maxArcFrac = Math.min(0.45, (vw - vw * 0.05 - 200) / vw * 0.6);
      const R = vh * maxArcFrac;                 // radius-like control
      const baseX = Math.min(vw * 0.12, (vw - vw * 0.05 - 200) - R * Math.cos(-0.5 * Math.PI * 0.8));
      const baseY = vh * 0.5;

      const minScale = isMobile ? 0.5 : 0.65;
      const maxScale = isMobile ? 1.1 : 1.3;

      const items = [];
      for (let i = 0; i < COEFFS.length; i++) {
        // normalized angle offset along arc [0..1] skewed to look nicer
        let t;
        if (i === 0) t = 0.15;
        else if (i === 1) t = 0.32;
        else {
          const u = (i - 1) / (COEFFS.length - 2);
          t = 0.32 + Math.pow(u, 0.9) * 0.65;
        }
        const angle = (t - 0.5) * Math.PI * 0.8; // center the arc

        const left = baseX + R * Math.cos(angle);
        const bottom = baseY + R * Math.sin(angle);
        const scale = minScale + (1 - Math.abs(t - 0.5) * 1.8) * (maxScale - minScale);

        items.push({
          id: `p-${COEFFS[i]}`,
          coefficient: COEFFS[i],
          plitka: plitkaFor(COEFFS[i]),
          position: { left, bottom },
          scale
        });
      }
      return items;
    }

    function renderPlatforms() {
      platformsRoot.innerHTML = "";
      platformEls.length = 0;
      usedPlatforms.clear();
      const layout = computePlatformsLayout();

      for (let i = 0; i < layout.length; i++) {
        const item = layout[i];

        const wrapper = document.createElement("div");
        wrapper.className = "platform";
        wrapper.id = item.id;
        wrapper.dataset.coefficient = String(item.coefficient);
        wrapper.dataset.index = String(i);
        wrapper.style.left = `${item.position.left}px`;
        wrapper.style.bottom = `${item.position.bottom}px`;
        wrapper.style.transform = `scale(${item.scale})`;

        const img = document.createElement("img");
        img.className = "platform-image";
        img.src = item.plitka;

        const tag = document.createElement("div");
        tag.className = "coefficient";
        const tagImg = document.createElement("img");
        tagImg.src = `https://entypublic.github.io/snakegameminivladis/mineisland/${item.coefficient}.png`;
        tagImg.onerror = () => {
          tagImg.remove();
          tag.textContent = String(item.coefficient);
        };
        tag.appendChild(tagImg);

        wrapper.appendChild(img);
        wrapper.appendChild(tag);
        wrapper.addEventListener("click", () => jumpToPlatform(wrapper));
        platformsRoot.appendChild(wrapper);
        platformEls.push(wrapper);
      }
    }

    function setKangarooPos(pos, withTransition = false) {
      kangaroo.style.transition = withTransition ? "all 0.5s ease-out" : "none";
      kangaroo.style.left = `${pos.x}px`;
      kangaroo.style.bottom = `${pos.y}px`;
      kangarooPos = { ...pos };
    }

    function resetKangaroo() {
      kangaroo.style.backgroundImage = "url('https://entypublic.github.io/snakegameminivladis/mineisland/kengu.png')";
      kangaroo.style.transform = "scaleX(1)";
      setKangarooPos(START_POS, true);
    }

    function showResult(mult) {
      // Minimal, non-blocking toast-like result (keeps UI simple, no modals)
      const toast = document.createElement("div");
      toast.textContent = `Multiplier: ${mult}x`;
      toast.style.cssText =
        "position:fixed;inset:auto auto 24px 50%;transform:translateX(-50%);background:#111;color:#fff;padding:10px 14px;border-radius:10px;opacity:0;transition:opacity .2s;z-index:9999;font-family:sans-serif;";
      document.body.appendChild(toast);
      requestAnimationFrame(() => (toast.style.opacity = "1"));
      setTimeout(() => {
        toast.style.opacity = "0";
        setTimeout(() => toast.remove(), 250);
      }, 1200);
    }

    function jumpToPlatform(el) {
      if (jumping || usedPlatforms.has(el)) return;
      jumping = true;

      const coeff = Number(el.dataset.coefficient);
      const kRect = kangaroo.getBoundingClientRect();
      const pRect = el.getBoundingClientRect();
      const targetX = pRect.left + pRect.width / 2 - kRect.width / 2;
      const clampedX = Math.max(10, Math.min(targetX, window.innerWidth - kRect.width - 10));
      const targetTop = pRect.top - kRect.height * 0.8;
      const newPos = { x: clampedX, y: window.innerHeight - targetTop - kRect.height };

      // Special sprite for 3x
      if (coeff === 3) {
        kangaroo.style.backgroundImage = "url('https://entypublic.github.io/snakegameminivladis/mineisland/kenguzerk.png')";
        kangaroo.style.transform = "scaleX(1)";
      }

      setKangarooPos(newPos, true);
      el.style.opacity = "0.5";
      usedPlatforms.add(el);

      // End-of-jump sequence
      setTimeout(() => {
        kangaroo.classList.add("jump-end");
        setTimeout(() => {
          el.style.opacity = "0";
          setTimeout(() => (el.style.display = "none"), 400);
          kangaroo.classList.remove("jump-end");
          jumping = false;
          showResult(coeff);
          // Auto reset after a beat
          setTimeout(() => {
            resetKangaroo();
            // allow reusing the board
            platformEls.forEach(p => {
              p.style.opacity = "1";
              p.style.display = "block";
            });
            usedPlatforms.clear();
          }, 1000);
        }, 250);
      }, 450);
    }

    function pickTargetAndJump() {
      if (jumping) return;

      // Choose among 2/3/5/10 with simple weights (30/30/20/20)
      const options = [2, 3, 5, 10];
      const r = Math.random();
      const target =
        r < 0.3 ? options[0] :
        r < 0.6 ? options[1] :
        r < 0.8 ? options[2] :
                  options[3];

      const targetEl = platformEls.find(p => Number(p.dataset.coefficient) === target);
      if (targetEl) jumpToPlatform(targetEl);
    }

    // ---------- Init & events ----------
    renderPlatforms();
    kangaroo.style.backgroundImage = "url('https://entypublic.github.io/snakegameminivladis/mineisland/kengu.png')";
    resetKangaroo();

    playBtn.addEventListener("click", pickTargetAndJump);

    window.addEventListener("resize", () => {
      renderPlatforms();
      setKangarooPos(kangarooPos, false);
    });
  });
})();
