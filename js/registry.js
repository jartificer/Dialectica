/* =====================================================================
   REGISTRY
   Loads every philosopher listed in philosophers/index.js, checks each
   data file, and returns them in chronological order (by `born`).
   ===================================================================== */
import manifest from "../philosophers/index.js";
import { validatePhilosopher } from "./validate.js";

export async function loadPhilosophers({ onError = (id, errs) => console.error("[dialectica] " + id + ":\n  " + errs.join("\n  ")) } = {}) {
  const loaded = await Promise.all(manifest.map(async id => {
    try {
      const mod = await import("../philosophers/" + id + ".js");
      const ph = mod.default;
      const errs = validatePhilosopher(ph, id);
      if (errs.length) { onError(id, errs); return null; }
      return ph;
    } catch (e) {
      onError(id, ["could not load: " + e.message]);
      return null;
    }
  }));
  return loaded.filter(Boolean).sort((a, b) => a.born - b.born);
}
