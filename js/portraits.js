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
  el.style.setProperty("--blink", -(Math.random() * 5.5).toFixed(2) + "s"); // so they don't all blink at once
  delete el.dataset.face; delete el.dataset.anim;
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

/* ---------------------------------------------------------------------
   EXPRESSIONS
   A portrait shows a held face (data-face) that follows the thinker's mood,
   and reacts to each reply with a bigger face and a head movement
   (data-anim) before settling back. The look of each face is in style.css.
   --------------------------------------------------------------------- */
export const MOOD_FACE = {
  composed: "neutral", impatient: "stern", intrigued: "interested", wavering: "uneasy",
  irritated: "cross", persuaded: "glad", dismissive: "scorn"
};
export const faceFor = mood => MOOD_FACE[mood] || "neutral";

/* How the thinker reacts to the reply just given. `before` is
   {conv, pat} from just before the reply; `kind` is what the engine
   matched (conversation.debug.kind), or null for a hint. */
export function reactionFor(before, c, kind) {
  if (c.result === "win") return { face: "glad", anim: "bounce" };
  if (c.result === "lose") return { face: "scorn", anim: "turn" };
  if (c.conv > before.conv) return { face: "astonished", anim: "jolt" };
  const lost = before.pat - c.pat;
  if (lost >= 2) return { face: "furious", anim: "recoil" };
  switch (kind) {
    case "repeat": case "stuffing": return { face: "cross", anim: "shake" };
    case "trap": return lost ? { face: "cross", anim: "shake" } : { face: "puzzled", anim: "tilt" };
    case "flatter": case "greet": case "agree": case "who are you": return { face: "amused", anim: "nod" };
    case "near miss": return { face: "interested", anim: "nod" };
    case "question": return { face: "thinking", anim: "" };
    case null: case undefined: return { face: "thinking", anim: "" };
    default: return { face: "puzzled", anim: "tilt" }; // deflect, too short, give up
  }
}

/* Sets a face (and optionally restarts a head movement) on portrait elements. */
export function setFace(els, face, anim = "") {
  for (const el of els) {
    if (!el) continue;
    el.dataset.face = face;
    if (el.dataset.anim !== anim || anim) {
      delete el.dataset.anim;
      if (anim) { void el.offsetWidth; el.dataset.anim = anim; } // reflow restarts the animation
    }
  }
}
