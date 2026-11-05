/* =====================================================================
   PORTRAITS
   Each thinker can have a line-art portrait in portraits/<id>.svg.
   The SVGs draw with `currentColor`, so CSS decides the ink colour and
   the same file works in light and dark mode. A missing or broken file
   is not an error: the UI falls back to the thinker's `glyph`.
   ===================================================================== */

/* Only accept a plain SVG of paths and shapes: no scripts, links,
   event handlers or embedded content. The files are ours, but this keeps
   a bad edit from turning into injected markup. */
const ALLOWED = new Set(["svg", "path", "circle", "ellipse", "line", "polyline", "polygon", "rect", "g"]);

export function isSafePortrait(text) {
  if (typeof text !== "string" || !/^\s*(<!--[\s\S]*?-->\s*)?<svg[\s>]/.test(text)) return false;
  if (/\son[a-z]+\s*=|href\s*=|javascript:|<!\[CDATA\[|<!DOCTYPE|<!ENTITY/i.test(text)) return false;
  for (const m of text.matchAll(/<\/?([a-zA-Z][\w:-]*)/g)) if (!ALLOWED.has(m[1])) return false;
  return true;
}

/* Fetches every portrait and stores it as `ph.portrait` (SVG markup). */
export async function loadPortraits(philosophers, base = "portraits/") {
  await Promise.all(philosophers.map(async ph => {
    try {
      const res = await fetch(base + ph.id + ".svg");
      if (!res.ok) return;
      const text = await res.text();
      if (isSafePortrait(text)) ph.portrait = text.replace(/^\s*<!--[\s\S]*?-->\s*/, "");
      else console.warn("[dialectica] portraits/" + ph.id + ".svg was rejected: only plain SVG shapes are allowed");
    } catch { /* offline or missing: keep the glyph */ }
  }));
}

/* Fills a .portrait element with the thinker's portrait, or their glyph. */
export function paintPortrait(el, ph) {
  el.style.setProperty("--tint", ph.color);
  el.setAttribute("role", "img");
  el.setAttribute("aria-label", "Portrait of " + ph.name);
  if (ph.portrait) {
    el.classList.add("art");
    el.style.background = "";
    el.innerHTML = ph.portrait;
    el.firstElementChild?.setAttribute("aria-hidden", "true");
  } else {
    el.classList.remove("art");
    el.style.background = ph.color;
    el.textContent = ph.glyph;
  }
}
