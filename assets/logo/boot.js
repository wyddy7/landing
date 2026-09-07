import { initialQuality } from './render-budget.js?v=glass-startup-1';

const slot = document.querySelector('.mark-slot');
function releaseIntroGate(reason = 'unavailable') {
  window.__glassIntroRelease?.(reason);
  window.__glassIntroRequested = false;
  document.documentElement.classList.remove('glass-intro-pending', 'glass-intro-active');
  document.documentElement.style.removeProperty('--glass-content-opacity');
  clearTimeout(window.__glassIntroFuse);
}
function introAllowed() {
  return window.__glassIntroRequested === true &&
    !matchMedia('(prefers-reduced-motion: reduce)').matches &&
    !document.hidden && !window.scrollX && !window.scrollY && !location.hash;
}

async function boot() {
  if (!slot) { releaseIntroGate(); return; }
  const quality = initialQuality({
    saveData: navigator.connection?.saveData,
    cores: navigator.hardwareConcurrency, memory: navigator.deviceMemory,
    reduced: matchMedia('(prefers-reduced-motion: reduce)').matches,
  });
  slot.dataset.glassQuality = quality;
  if (quality === 'static') { releaseIntroGate('save-data'); slot.dataset.glassState = 'static'; return; }
  slot.dataset.glassState = 'loading';
  const controller = new AbortController();
  const timeout = setTimeout(() => {
    controller.abort(); releaseIntroGate(); slot.dataset.glassState = 'static';
    context?.getExtension('WEBGL_lose_context')?.loseContext();
  }, 6000);
  let context;
  try {
    // Reuse the capability probe as the renderer's context; no spare GPU context.
    const canvas = document.createElement('canvas');
    const attributes = { alpha: true, antialias: false, powerPreference: 'low-power' };
    context = canvas.getContext('webgl2', attributes) || canvas.getContext('webgl', attributes);
    if (!context || !context.getShaderPrecisionFormat(context.FRAGMENT_SHADER, context.HIGH_FLOAT)?.precision) {
      throw new Error('WebGL with high-precision fragment shading unavailable');
    }
    const { mountGlassLogo } = await import('./scene-glasslogo.js?v=glass-startup-1');
    if (controller.signal.aborted) throw new Error('Logo startup timed out');
    const api = await mountGlassLogo(slot, { quality, canvas, context, signal: controller.signal });
    if (controller.signal.aborted) { api.dispose(); return; }
    // Input, an anchor jump or the loading fuse may have cancelled the gate.
    if (introAllowed()) api.startIntro();
    else releaseIntroGate(document.hidden ? 'hidden' : window.scrollX || window.scrollY ? 'scroll-position' : 'not-requested');
  } catch (error) {
    context?.getExtension('WEBGL_lose_context')?.loseContext();
    slot.dataset.glassState = 'static'; slot.dataset.glassQuality = 'static';
    releaseIntroGate();
    console.warn('Glass logo unavailable; keeping the inline SVG.', error);
  } finally { clearTimeout(timeout); }
}
boot();
