// Background for the home page: a particle swarm searching a random landscape for its lowest point.
// The landscape is a few Gaussian wells plus a ripple, drawn as contour lines. Each particle follows
// the best point found by its neighbours on a ring (local-best PSO), so groups explore different wells
// before they agree, and a few particles restart at random spots every step, so there is always
// something exploring. After a while a new landscape fades in and the search starts again.
(function () {
  const canvas = document.getElementById("pf-swarm");
  if (!canvas || !canvas.getContext) return;

  const ctx = canvas.getContext("2d");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Standard constriction coefficients (Clerc and Kennedy).
  const W = 0.7298;
  const C1 = 1.49618;
  const C2 = 1.49618;
  const STEP_MS = 70; // one swarm iteration every STEP_MS, positions interpolated in between
  const STEPS_PER_RUN = 200; // about 14 s per landscape
  const FADE_MS = 1200;
  const TRAIL = 10;
  const RESPAWN = 0.012; // chance per step that a particle restarts somewhere random, so the search never goes still
  const GRID = 8; // px between field samples for the contours
  const LEVELS = 14;

  let width = 0;
  let height = 0;
  let dpr = 1;
  let colors = readColors();
  let field = null;
  let contours = null;
  let oldContours = null;
  let fadeStart = 0;
  let swarm = null;
  let step = 0;
  let lastStep = 0;
  let running = false;
  let visible = true;
  let frame = 0;

  function readColors() {
    const style = getComputedStyle(document.documentElement);
    return {
      theme: style.getPropertyValue("--global-theme-color").trim() || "#b509ac",
      line: style.getPropertyValue("--global-text-color-light").trim() || "#828282",
    };
  }

  function rand(a, b) {
    return a + Math.random() * (b - a);
  }

  function makeField() {
    const diag = Math.hypot(width, height);
    const wells = [];
    const count = Math.round(rand(5, 8));
    for (let i = 0; i < count; i++) {
      wells.push({
        x: rand(0.05, 0.95) * width,
        y: rand(0.05, 0.95) * height,
        depth: rand(0.4, 1),
        s: rand(0.06, 0.16) * diag,
      });
    }
    const ripple = {
      amp: 0.08,
      kx: (rand(5, 9) * Math.PI) / width,
      ky: (rand(4, 7) * Math.PI) / height,
      px: rand(0, Math.PI * 2),
      py: rand(0, Math.PI * 2),
    };
    return function (x, y) {
      let v = ripple.amp * Math.sin(ripple.kx * x + ripple.px) * Math.sin(ripple.ky * y + ripple.py);
      for (const w of wells) {
        const dx = x - w.x;
        const dy = y - w.y;
        v -= w.depth * Math.exp(-(dx * dx + dy * dy) / (2 * w.s * w.s));
      }
      return v;
    };
  }

  // Contour lines by marching squares, drawn once per landscape onto an offscreen canvas.
  function drawContours(f) {
    const off = document.createElement("canvas");
    off.width = canvas.width;
    off.height = canvas.height;
    const g = off.getContext("2d");
    g.scale(dpr, dpr);

    const nx = Math.ceil(width / GRID) + 1;
    const ny = Math.ceil(height / GRID) + 1;
    const v = new Float32Array(nx * ny);
    let lo = Infinity;
    let hi = -Infinity;
    for (let j = 0; j < ny; j++) {
      for (let i = 0; i < nx; i++) {
        const val = f(i * GRID, j * GRID);
        v[j * nx + i] = val;
        if (val < lo) lo = val;
        if (val > hi) hi = val;
      }
    }

    g.strokeStyle = colors.line;
    g.lineWidth = 0.8;
    for (let l = 1; l < LEVELS; l++) {
      const t = lo + ((hi - lo) * l) / LEVELS;
      // Deeper levels slightly stronger, so the wells read as wells.
      g.globalAlpha = 0.06 + 0.16 * (1 - l / LEVELS);
      g.beginPath();
      for (let j = 0; j < ny - 1; j++) {
        for (let i = 0; i < nx - 1; i++) {
          const a = v[j * nx + i];
          const b = v[j * nx + i + 1];
          const c = v[(j + 1) * nx + i + 1];
          const d = v[(j + 1) * nx + i];
          const x0 = i * GRID;
          const y0 = j * GRID;
          const pts = [];
          if (a < t !== b < t) pts.push([x0 + (GRID * (t - a)) / (b - a), y0]);
          if (b < t !== c < t) pts.push([x0 + GRID, y0 + (GRID * (t - b)) / (c - b)]);
          if (d < t !== c < t) pts.push([x0 + (GRID * (t - d)) / (c - d), y0 + GRID]);
          if (a < t !== d < t) pts.push([x0, y0 + (GRID * (t - a)) / (d - a)]);
          for (let k = 0; k + 1 < pts.length; k += 2) {
            g.moveTo(pts[k][0], pts[k][1]);
            g.lineTo(pts[k + 1][0], pts[k + 1][1]);
          }
        }
      }
      g.stroke();
    }
    return off;
  }

  function makeSwarm(f) {
    const n = Math.max(80, Math.min(400, Math.round((width * height) / 3500)));
    const vmax = 0.025 * Math.hypot(width, height);
    const ps = [];
    let best = null;
    for (let i = 0; i < n; i++) {
      const x = rand(0, width);
      const y = rand(0, height);
      const cost = f(x, y);
      const p = { x, y, px: x, py: y, vx: rand(-vmax, vmax), vy: rand(-vmax, vmax), bx: x, by: y, bc: cost, trail: [] };
      ps.push(p);
      if (!best || cost < best.c) best = { x, y, c: cost };
    }
    return { ps, best, vmax };
  }

  function iterate(f, s) {
    const ps = s.ps;
    const n = ps.length;
    // Neighbourhood best on a ring of radius 2, from the personal bests before this step.
    const nb = new Int32Array(n);
    for (let i = 0; i < n; i++) {
      let k = i;
      for (let o = -2; o <= 2; o++) {
        const j = (i + o + n) % n;
        if (ps[j].bc < ps[k].bc) k = j;
      }
      nb[i] = k;
    }
    for (let i = 0; i < n; i++) {
      const p = ps[i];
      if (Math.random() < RESPAWN) {
        p.x = p.px = p.bx = rand(0, width);
        p.y = p.py = p.by = rand(0, height);
        p.bc = f(p.x, p.y);
        p.vx = rand(-s.vmax, s.vmax);
        p.vy = rand(-s.vmax, s.vmax);
        p.trail.length = 0;
        continue;
      }
      const g = ps[nb[i]];
      p.trail.push(p.x, p.y);
      if (p.trail.length > TRAIL * 2) p.trail.splice(0, 2);
      p.px = p.x;
      p.py = p.y;
      p.vx = W * p.vx + C1 * Math.random() * (p.bx - p.x) + C2 * Math.random() * (g.bx - p.x);
      p.vy = W * p.vy + C1 * Math.random() * (p.by - p.y) + C2 * Math.random() * (g.by - p.y);
      const sp = Math.hypot(p.vx, p.vy);
      if (sp > s.vmax) {
        p.vx *= s.vmax / sp;
        p.vy *= s.vmax / sp;
      }
      p.x = Math.min(width, Math.max(0, p.x + p.vx));
      p.y = Math.min(height, Math.max(0, p.y + p.vy));
      const cost = f(p.x, p.y);
      if (cost < p.bc) {
        p.bc = cost;
        p.bx = p.x;
        p.by = p.y;
        if (cost < s.best.c) s.best = { x: p.x, y: p.y, c: cost };
      }
    }
  }

  function newRun(now) {
    oldContours = contours;
    fadeStart = now;
    field = makeField();
    contours = drawContours(field);
    swarm = makeSwarm(field);
    step = 0;
    lastStep = now;
  }

  function render(now) {
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const fade = oldContours ? Math.min(1, (now - fadeStart) / FADE_MS) : 1;
    if (oldContours && fade < 1) {
      ctx.globalAlpha = 1 - fade;
      ctx.drawImage(oldContours, 0, 0);
    }
    ctx.globalAlpha = fade;
    ctx.drawImage(contours, 0, 0);

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const t = Math.min(1, (now - lastStep) / STEP_MS);

    ctx.strokeStyle = colors.theme;
    ctx.lineWidth = 1;
    ctx.globalAlpha = 0.2 * fade;
    ctx.beginPath();
    for (const p of swarm.ps) {
      const tr = p.trail;
      if (tr.length < 2) continue;
      ctx.moveTo(tr[0], tr[1]);
      for (let k = 2; k < tr.length; k += 2) ctx.lineTo(tr[k], tr[k + 1]);
      ctx.lineTo(p.px + (p.x - p.px) * t, p.py + (p.y - p.py) * t);
    }
    ctx.stroke();

    ctx.fillStyle = colors.theme;
    ctx.globalAlpha = 0.7 * fade;
    for (const p of swarm.ps) {
      ctx.fillRect(p.px + (p.x - p.px) * t - 1.25, p.py + (p.y - p.py) * t - 1.25, 2.5, 2.5);
    }

    // The swarm's best point so far.
    const b = swarm.best;
    ctx.globalAlpha = 0.9 * fade;
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.arc(b.x, b.y, 7, 0, Math.PI * 2);
    ctx.moveTo(b.x - 12, b.y);
    ctx.lineTo(b.x - 4, b.y);
    ctx.moveTo(b.x + 4, b.y);
    ctx.lineTo(b.x + 12, b.y);
    ctx.moveTo(b.x, b.y - 12);
    ctx.lineTo(b.x, b.y - 4);
    ctx.moveTo(b.x, b.y + 4);
    ctx.lineTo(b.x, b.y + 12);
    ctx.stroke();
    ctx.globalAlpha = 1;
  }

  function tick(now) {
    frame = 0;
    if (!running) return;
    while (now - lastStep >= STEP_MS) {
      iterate(field, swarm);
      lastStep += STEP_MS;
      if (++step >= STEPS_PER_RUN) {
        newRun(now);
        break;
      }
    }
    render(now);
    frame = requestAnimationFrame(tick);
  }

  function resize() {
    const rect = canvas.getBoundingClientRect();
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = Math.max(1, Math.round(rect.width));
    height = Math.max(1, Math.round(rect.height));
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    contours = null;
    newRun(performance.now());
    oldContours = null;
    if (reduceMotion) {
      // One still frame of a settled search.
      for (let i = 0; i < STEPS_PER_RUN; i++) iterate(field, swarm);
      lastStep = -Infinity;
      render(performance.now());
    }
  }

  function update() {
    const shouldRun = !reduceMotion && visible && !document.hidden;
    if (shouldRun && !running) {
      running = true;
      lastStep = performance.now();
      frame = requestAnimationFrame(tick);
    } else if (!shouldRun && running) {
      running = false;
      if (frame) cancelAnimationFrame(frame);
    }
  }

  let resizeTimer = 0;
  window.addEventListener("resize", function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
      const rect = canvas.getBoundingClientRect();
      if (Math.abs(rect.width - width) > 40 || Math.abs(rect.height - height) > 120) resize();
    }, 200);
  });

  document.addEventListener("visibilitychange", update);

  if ("IntersectionObserver" in window) {
    new IntersectionObserver(function (entries) {
      visible = entries[0].isIntersecting;
      update();
    }).observe(canvas);
  }

  // Follow the light/dark toggle.
  new MutationObserver(function () {
    colors = readColors();
    contours = drawContours(field);
    oldContours = null;
    if (reduceMotion) render(performance.now());
  }).observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

  resize();
  update();
})();
