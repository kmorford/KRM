/* Matrix "rain" background — numbers/symbols only */
(function () {
  const canvas = document.getElementById('matrix');
  if (!canvas) return; // graceful no-op if canvas not present

  const ctx = canvas.getContext('2d', { alpha: false });
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Character set (numbers + a few symbols for terminal vibe)
  const CHARS = "0123456789#$%&@";
  const BG_COLOR = '#0b0b0b';
  const GLYPH_COLOR = '#00ff99';
  const TRAIL_FADE = 0.08;    // 0..1 (higher = faster fade)
  const FRAME_MIN_MS = 16;    // ~60 FPS throttle

  let w, h, cols, drops, fontSize, last = 0;

  function resize() {
    const dpr = Math.max(1, Math.min(window.devicePixelRatio || 1, 2)); // clamp for perf
    const vw = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    const vh = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

    // CSS ensures canvas is 100vw x 100vh; match internal buffer to DPR
    canvas.width = Math.floor(vw * dpr);
    canvas.height = Math.floor(vh * dpr);
    canvas.style.width = '100vw';
    canvas.style.height = '100vh';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    w = vw;
    h = vh;

    // Responsive glyph size: scales with viewport
    fontSize = Math.max(14, Math.floor(Math.min(w, h) / 50));
    ctx.font = `${fontSize}px "Courier New", monospace`;

    cols = Math.floor(w / fontSize);
    drops = new Array(cols).fill(0).map(() => Math.floor(Math.random() * -50)); // staggered start
  }

  function draw(ts) {
    const delta = ts - last;
    if (delta < FRAME_MIN_MS) { requestAnimationFrame(draw); return; }
    last = ts;

    // Trail fade
    ctx.fillStyle = `rgba(11,11,11,${TRAIL_FADE})`;
    ctx.fillRect(0, 0, w, h);

    // Glyph render
    ctx.shadowColor = GLYPH_COLOR;
    ctx.fillStyle = GLYPH_COLOR;

    for (let i = 0; i < cols; i++) {
      const x = i * fontSize;
      const y = drops[i] * fontSize;

      ctx.shadowBlur = 8;
      const c = CHARS.charAt(Math.floor(Math.random() * CHARS.length));
      ctx.fillText(c, x, y);
      ctx.shadowBlur = 0;

      // Reset with randomness to avoid uniform bands
      if (y > h && Math.random() > 0.975) {
        drops[i] = Math.floor(-Math.random() * 30);
      } else {
        drops[i]++;
      }
    }

    requestAnimationFrame(draw);
  }

  function start() {
    resize();
    // Pre-fill background to avoid flash
    ctx.fillStyle = BG_COLOR;
    ctx.fillRect(0, 0, w, h);
    if (!prefersReduced) requestAnimationFrame(draw);
  }

  // Keep crisp on resize and when tab becomes visible again
  window.addEventListener('resize', resize, { passive: true });
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') {
      ctx.fillStyle = BG_COLOR;
      ctx.fillRect(0, 0, w, h);
    }
  });

  start();
})();

