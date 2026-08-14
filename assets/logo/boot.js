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
  // one framing number for every surface: the mark takes 82% of min(width, height),
  // so the margin around it is guaranteed on a phone, a laptop and inside the slot alike
  cover: 0.82,
  res: 512, threshold: 80, fit: 0.88, blobSize: 16, edge: 'msdf',
  logo: './assets/favicon-light.svg', msdfUrl: BASE + 'logo-msdf.png',
};

// Phones are not excused from the sequence, they are given a smaller budget for it.
const SMALL = innerWidth < 1024;
const BUDGET = SMALL
  ? { resident: 96, introSize: 160, res: 384, dprCap: 1.5 }
  : { resident: 128, introSize: 224, res: 512, dprCap: 2 };

const getSlot = () => document.querySelector('.mark-slot');

async function residentOnly() {
  const slot = getSlot();
  if (!slot) return;
  const api = await mountLiveLogo(slot, {
    ...COMMON, res: BUDGET.res, dprCap: BUDGET.dprCap,
    size: BUDGET.resident, tilt: 0.14, birthDur: 1.2,
    cycle: { logo: 3.2, dissolve: 1.7, chaos: 2.6, reform: 2.0 },
    params: { ...P },
  });
  // A reload is not a rebirth. Run the simulation forward before the first visible
  // frame so the mark arrives already formed and mid-cycle, instead of drawing itself
  // from a single dot every time the page is refreshed.
  api.stepManual(340, 1 / 30);
}

async function intro() {
  const cover = document.querySelector('.mark-intro');
  const slot = getSlot();
  if (!cover || !slot) { document.documentElement.classList.remove('intro-on'); return residentOnly(); }

  const stage = document.createElement('div');
  stage.className = 'mark-intro-stage';
  cover.appendChild(stage);

  const api = await mountLiveLogo(stage, {
    ...COMMON, res: BUDGET.res, dprCap: BUDGET.dprCap,
    size: BUDGET.introSize, tilt: 0.04, birthDur: 1.4, solid: 0, params: { ...INTRO_P },
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
    const r = slot.getBoundingClientRect();   // the slot is reserved in markup: it never moves
    const W = innerWidth, H = innerHeight;
    const halfH = Math.tan((api.camera.fov / 2) * Math.PI / 180) * api.camera.position.z;
    return {
      x: (((r.left + r.width / 2) / W) * 2 - 1) * halfH * (W / H),
      y: -((((r.top + r.height / 2) / H) * 2 - 1)) * halfH,
      // both canvases frame by min(w, h) with the same cover, so the flight's end scale
      // is just the ratio of those minima — the handover cannot change size
      scale: Math.min(r.width, r.height) / Math.min(W, H),
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
      // open the slot now: the nav glides down while the mark is still descending,
      // so by the time it lands the space is already its own
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

  const skip = () => { if (!landed) e = T.birth + T.harden + T.hold + T.flight; };
  addEventListener('pointerdown', skip, { once: true });
  addEventListener('keydown', skip, { once: true });

  try { sessionStorage.setItem('mark-intro', '1'); } catch (err) {}
  requestAnimationFrame(frame);
}

// A hidden tab freezes requestAnimationFrame: the sequence would never advance and the
// cover would sit over the page until the visitor came back. Don't gate the page on it.
const canIntro = document.documentElement.classList.contains('intro-on') && !document.hidden;
if (!canIntro) {
  clearTimeout(window.__introFuse);
  document.documentElement.classList.remove('intro-on');
  document.querySelector('.mark-intro')?.remove();
}

if (!matchMedia('(prefers-reduced-motion: reduce)').matches) {
  (canIntro ? intro() : residentOnly())
    .catch((err) => {
      console.warn('[mark] disabled:', err);
      document.documentElement.classList.remove('intro-on');
      document.querySelector('.mark-intro')?.remove();
    });
}
