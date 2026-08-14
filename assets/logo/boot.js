// Living logo mark — boot sequence + the resident mark in the sidebar.
//
//   first visit (desktop, motion allowed):
//     born full screen -> hardens into the crisp mark (MSDF edge, particle-driven fill)
//     -> flies down to its slot under the availability line -> melts back into живое зерно
//   afterwards / repeat visits: the mark just lives in its slot.
//
// Never becomes the LCP element: the module is loaded after `load`, and the cover that
// hides the page during the intro is plain CSS painted by the document itself.
import { mountLiveLogo } from './scene-livelogo.js';

const BASE = './assets/logo/';
const SLOT_PX = 124;
const P = { flow: 0.16, swirl: 0.32, field: 0.35, hold: 1, slab: 0.3, churn: 0.7,
            trail: 0.62, heat: 1.0, density: 2.4, pointSize: 1.8, glow: 1.15, expand: 0.55 };
const INTRO_P = { ...P, trail: 0.68, density: 2.6, pointSize: 1.8, glow: 1.15 };

const EASE = (x) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);
const inkOf = () => (document.documentElement.dataset.theme === 'light' ? 0x26211c : 0xf2f0eb);
const COMMON = {
  res: 512, threshold: 80, fit: 0.88, blobSize: 16, edge: 'msdf',
  logo: './assets/favicon-light.svg', msdfUrl: BASE + 'logo-msdf.png',
};

function makeSlot() {
  const anchor = document.querySelector('.avail');
  if (!anchor) return null;
  const slot = document.createElement('div');
  slot.className = 'mark-slot';
  anchor.insertAdjacentElement('afterend', slot);
  return slot;
}

async function residentOnly() {
  const slot = makeSlot();
  if (!slot) return;
  await mountLiveLogo(slot, {
    ...COMMON, size: 128, tilt: 0.14, birthDur: 1.2,
    cycle: { logo: 3.2, dissolve: 1.7, chaos: 2.6, reform: 2.0 },
    params: { ...P },
  });
}

async function intro() {
  const cover = document.querySelector('.mark-intro');
  const slot = makeSlot();
  if (!cover || !slot) { document.documentElement.classList.remove('intro-on'); return residentOnly(); }

  const stage = document.createElement('div');
  stage.className = 'mark-intro-stage';
  cover.appendChild(stage);

  const api = await mountLiveLogo(stage, {
    ...COMMON, size: 224, tilt: 0.04, birthDur: 1.4, solid: 0, params: { ...INTRO_P },
  });
  api.setInk(inkOf());

  // Re-arm the fuse only NOW: the 6s one was measured from first paint and would burn
  // through the bundle download on a slow connection, lifting the cover mid-sequence.
  // From here the sequence is ~4.6s, so 10s is generous — and it is still a fuse: if
  // anything below dies, the page is never left hidden.
  clearTimeout(window.__introFuse);
  window.__introFuse = setTimeout(() => {
    document.documentElement.classList.remove('intro-on');
    document.querySelector('.mark-intro')?.remove();
  }, 10000);

  const T = { birth: 1.4, harden: 1.0, hold: 0.5, flight: 1.25, settle: 0.45, melt: 1.2 };
  let e = 0, last = performance.now(), landed = false, done = false;

  function target() {
    const r = slot.getBoundingClientRect();
    const W = innerWidth, H = innerHeight;
    const halfH = Math.tan((api.camera.fov / 2) * Math.PI / 180) * api.camera.position.z;
    return {
      x: (((r.left + r.width / 2) / W) * 2 - 1) * halfH * (W / H),
      y: -((((r.top + r.height / 2) / H) * 2 - 1)) * halfH,
      scale: r.height / H,
    };
  }

  function frame(now) {
    e += Math.min((now - last) / 1000, 1 / 20);
    last = now;
    advance();
    if (!done) requestAnimationFrame(frame);
  }

  function advance() {
    let k;

    if (e >= T.birth && (k = (e - T.birth) / T.harden) < 1) {
      const z = EASE(Math.max(0, k));
      api.setSolid(z);
      // the coverage threshold falls as it hardens: the solid front spreads from the
      // densest cores outward, then the contour becomes the field itself
      api.setCoverage(0.95 - 2.0 * z, 1.9 - 2.9 * z);
      api.params.trail = INTRO_P.trail * (1 - k * 0.94);
      api.params.density = INTRO_P.density * (1 - k * 0.75);
    } else if (e >= T.birth + T.harden && e < T.birth + T.harden + T.hold) {
      api.setSolid(1);
      api.setCoverage(-1.0, -0.98);
    } else if (e >= T.birth + T.harden + T.hold) {
      const ft = e - (T.birth + T.harden + T.hold);
      if ((k = ft / T.flight) < 1) {
        const d = target(), z = EASE(k);
        api.setTransform(1 + (d.scale - 1) * z, d.x * z, d.y * z);
        cover.style.background =
          `color-mix(in srgb, var(--bg) ${Math.round((1 - Math.max(0, (k - 0.35) / 0.65)) * 100)}%, transparent)`;
      } else if (!landed) {
        // hand the canvas to the slot on the SAME frame the flight ends — identical
        // screen position and size, so there is nothing to see
        landed = true;
        clearTimeout(window.__introFuse);
        api.setTransform(1, 0, 0);
        api.reparent(slot);
        cover.remove();
        document.documentElement.classList.remove('intro-on');
      } else {
        const mt = ft - T.flight - T.settle;
        if (mt > 0) {
          api.setSolid(Math.max(0, 1 - mt / T.melt));
          api.params.trail = P.trail;
          if (mt > T.melt && !done) { done = true; api.enableCycle(); }
        }
      }
    }
  }

  // manual driver for verification (?markdebug=1) — rAF is frozen in a hidden tab
  if (location.search.includes('markdebug')) {
    window.__mark = (dt = 1 / 60, n = 1) => {
      for (let i = 0; i < n; i++) { e += dt; api.stepManual(1, dt); advance(); }
      return { e: +e.toFixed(2), landed, solid: +api.solid.toFixed(2) };
    };
  }

  const skip = () => { if (!landed) e = T.birth + T.harden + T.hold + T.flight; };
  addEventListener('pointerdown', skip, { once: true });
  addEventListener('keydown', skip, { once: true });

  try { sessionStorage.setItem('mark-intro', '1'); } catch (err) {}
  requestAnimationFrame(frame);
}

// A hidden tab freezes requestAnimationFrame: the sequence would never advance and the
// cover would sit over the page until the visitor came back. Don't gate the page on it.
const canIntro = document.documentElement.classList.contains('intro-on') &&
                 (!document.hidden || location.search.includes('markdebug'));
if (!canIntro) {
  clearTimeout(window.__introFuse);
  document.documentElement.classList.remove('intro-on');
  document.querySelector('.mark-intro')?.remove();
}

const wanted = innerWidth >= 1024 && !matchMedia('(prefers-reduced-motion: reduce)').matches;
if (wanted) {
  (canIntro ? intro() : residentOnly())
    .catch((err) => {
      console.warn('[mark] disabled:', err);
      document.documentElement.classList.remove('intro-on');
      document.querySelector('.mark-intro')?.remove();
    });
}
